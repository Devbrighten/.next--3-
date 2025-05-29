'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="text-center py-56 px-80">
      <h1 className="font-bold text-3xl mb-3">Hello,</h1>
      <h1 className="font-bold text-5xl">Welcome to Dashboard Page!</h1>
      <Link href="/">
        <button className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
