'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Define proper user type interface
interface User {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null); // Fix any type
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    toast.success("Logged out successfully!");
    router.push('/');
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Login required');
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setUser(result.user);
        } else {
          toast.error(result.message || 'Invalid token');
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        toast.error('Something went wrong');
      }
    };

    fetchProfile();
  }, [router]);

  if (!user) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-800 border-spacing-4 p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
        <h1 className="text-4xl font-bold mb-4">Welcome, hello👋</h1>
        <h1 className="text-3xl font-bold mb-4">Email: {user.email}</h1>
        <p><strong>User ID: </strong>{user.id}</p>
        <p><strong>Issued At:</strong> {new Date(user.iat * 1000).toLocaleString()}</p>
        <p><strong>Expires At:</strong> {new Date(user.exp * 1000).toLocaleString()}</p>

        <div className='text-center'>
          <button
            onClick={logoutHandler}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}