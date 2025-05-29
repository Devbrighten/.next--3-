// app/forgot-password/page.tsx

"use client"
import { useState } from "react"
import type React from "react"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1) // 1: email input, 2: OTP input
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [devOtp, setDevOtp] = useState("") // For development only
  const router = useRouter()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()
      if (result.success) {
        toast.success("OTP generated successfully")

        // For development: show OTP on screen
        if (result.devOtp) {
          setDevOtp(result.devOtp)
          toast.success(`Development OTP: ${result.devOtp}`, { duration: 10000 })
        }

        setStep(2)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        router.push(`/reset-password?email=${encodeURIComponent(email)}`)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 bg-white/20 rounded-lg backdrop-blur text-white">
        <h2 className="text-2xl mb-6 text-center font-bold">Forgot Password</h2>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 py-3 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm mb-4 text-center">Enter the 4-digit OTP sent to your email</p>

            {/* Development mode OTP display */}
            {devOtp && (
              <div className="bg-yellow-500/20 p-3 rounded-md mb-4">
                <p className="text-center text-white text-sm">Development Mode</p>
                <p className="text-center text-white font-bold text-lg">{devOtp}</p>
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full px-4 py-3 bg-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white text-center text-lg tracking-widest"
                maxLength={4}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 4}
              className="w-full bg-blue-900 hover:bg-blue-800 py-3 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-white/80 hover:text-white text-sm underline"
            >
              Back to email input
            </button>
          </form>
        )}
      </div>
    </div>
  )
}



// 'use client';
// import { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [step, setStep] = useState(1); // 1: email input, 2: OTP input
//   const [otp, setOtp] = useState('');
//   const router = useRouter();

//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/forgot-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//      body: JSON.stringify({ email, sendToSpecificEmail: true }),
//     });

//     const result = await res.json();
//     if (result.success) {
//       toast.success(result.message);
//       setStep(2);
//     } else {
//       toast.error(result.message);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/verify-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp }),
//     });

//     const result = await res.json();
//     if (result.success) {
//       toast.success(result.message);
//       router.push(`/reset-password?email=${encodeURIComponent(email)}`);
//     } else {
//       toast.error(result.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
//       <Toaster />
//       <div className="w-full max-w-md p-8 bg-white/20 rounded-lg backdrop-blur text-white">
//         <h2 className="text-2xl mb-6 text-center font-bold">Forgot Password</h2>
        
//         {step === 1 ? (
//           <form onSubmit={handleSendOtp} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 bg-white/20 rounded focus:outline-none placeholder-white"
//               required
//             />
//             <button className="w-full bg-indigo-900 py-2 rounded font-semibold">
//               Send OTP
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp} className="space-y-4">
//             <p className="text-sm mb-4">
//               Enter the 4-digit OTP sent to {email}
//             </p>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-4 py-2 bg-white/20 rounded focus:outline-none placeholder-white"
//               maxLength={4}
//               pattern="\d{4}"
//               required
//             />
//             <button className="w-full bg-indigo-900 py-2 rounded font-semibold">
//               Verify OTP
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }