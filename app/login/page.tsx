//app/login/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/profile'); // Already logged in
    }
  }, []); 

  const handleChange = (e: any) => { 
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Both fields are required");
      return;
    }
    

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        
        toast.success("Login successful!");

         // Token store in localStorage
         localStorage.setItem("token", result.data.token); // JWT token jo backend ne bheja
         localStorage.setItem("users", JSON.stringify(result.data));

        setTimeout(() => router.push('/profile'), 1000);
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a00e0] to-[#8e2de2] flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-md p-8 text-white bg-white border shadow-xl bg-opacity-10 backdrop-blur-md rounded-xl border-white/20">
        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="email"
              placeholder="Username or Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <span className="absolute right-3 top-2.5 text-white">👤</span>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <span className="absolute right-3 top-2.5 text-white">👁️</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <button type="button" className="text-white/80 hover:underline" onClick={() => router.push('/forgot-password')}>
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition rounded-md bg-white/20 hover:bg-white/30"
          >
            LOGIN
          </button>

          <div className="text-sm text-center">
            Don’t have an account?{' '}
            <button type="button" onClick={() => router.push('/registration')} className="font-semibold text-white underline">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
