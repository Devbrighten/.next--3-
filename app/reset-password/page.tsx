// app/reset-password/page.tsx

"use client"
import { useState, Suspense } from "react"
import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false) 
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      })

      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        toast.error(result.message)
      }
    } catch { // Remove unused error parameter
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-600 to-purple-600">
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 text-white rounded-lg bg-white/20 backdrop-blur">
        <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 placeholder-white/70 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 placeholder-white/70 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-white/80">
              Show passwords
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold bg-blue-900 hover:bg-blue-800 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
 
// 'use client';
// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email') || '';
//   const router = useRouter();

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     const res = await fetch('/api/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await res.json();
//     if (result.success) {
//       toast.success(result.message);
//       router.push('/login'); // Redirect to login page
//     } else {
//       toast.error(result.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-600 to-purple-600">
//       <Toaster />
//       <div className="w-full max-w-md p-8 text-white rounded-lg bg-white/20 backdrop-blur">
//         <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 placeholder-white rounded bg-white/20 focus:outline-none"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 placeholder-white rounded bg-white/20 focus:outline-none"
//             required
//           />
//           <button className="w-full py-2 font-semibold bg-indigo-900 rounded">
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//====================================================================================================================================================


// 'use client';
// import { useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams(); 
//   const email = searchParams.get('email');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords don't match");
//       return;
//     }

//     const res = await fetch('/api/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, newPassword }),
//     });

//     const result = await res.json();

//     if (result.success) {
//       toast.success(result.message);
//       setTimeout(() => router.push('/login'), 1000);
//     } else {
//       toast.error(result.message);
//     }
//   };

//   if (!email) {
//     return (
//       <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-600 to-purple-600">
//         <div className="w-full max-w-md p-8 text-white rounded-lg bg-white/20 backdrop-blur">
//           <h2 className="mb-6 text-2xl font-bold text-center">Invalid Request</h2>
//           <p className="text-center">Please request a password reset from the forgot password page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-600 to-purple-600">
//       <Toaster />
//       <div className="w-full max-w-md p-8 text-white rounded-lg bg-white/20 backdrop-blur">
//         <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-2 placeholder-white rounded bg-white/20 focus:outline-none"
//             required
//             minLength={6}
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 placeholder-white rounded bg-white/20 focus:outline-none"
//             required
//             minLength={6}
//           />
//           <button className="w-full py-2 font-semibold bg-indigo-900 rounded">
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }