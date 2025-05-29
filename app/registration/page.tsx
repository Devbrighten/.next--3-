//app/registeation/page.tsx

'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    number: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { fname, lname, number, email, password } = formData;

    if (!fname || !lname || !number || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (number.length !== 10 || !/^\d+$/.test(number)) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("User registered successfully!");
        setFormData({ fname: '', lname: '', number: '', email: '', password: '' });
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a00e0] to-[#8e2de2] flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-md p-8 text-white bg-white border shadow-xl bg-opacity-10 backdrop-blur-md rounded-xl border-white/20">
        <h2 className="mb-2 text-3xl font-bold text-center">Register</h2>
        <p className="mb-6 text-center text-white/70">Create a new account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="tel"
            name="number"
            placeholder="Mobile Number"
            value={formData.number}
            onChange={handleChange}
            maxLength={10}
            className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white placeholder-white rounded-md bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-white underline hover:text-white/90 transition duration-150"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}



//==========================================================================================================================================
// 'use client';

// import { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// export default function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     number: '',
//     email: '',
//     password: '',
//   });

//   const router = useRouter();

//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('/api/registration');
//       const data = await res.json();
//       setUsers(data.data);
//     } catch (err) {
//       toast.error("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const { fname, lname, number, email, password } = formData;

//     if (!fname || !lname || !number || !email || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Invalid email format");
//       return;
//     }

//     if (number.length !== 10 || !/^\d+$/.test(number)) {
//       toast.error("Mobile number must be 10 digits");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       const res = await fetch('/api/registration', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (result.success) {
//         toast.success("User registered successfully!");
//         setFormData({ fname: '', lname: '', number: '', email: '', password: '' });
//         fetchUsers();
//         router.push("/login");
//       } else {
//         if (result.message === "Email already exists") {
//           toast.error("Email already exists. Please use a different email.");
//         } else {
//           toast.error(result.message || "Failed to register user");
//         }
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-blue-600 ">
//         <Toaster />
//         <h1 className='text-center text-gray-800 font-bold text-lg'>Create a new Account</h1>
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Register User</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fname"
//             placeholder="First Name"
//             value={formData.fname}
//             onChange={handleChange}
//             className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-300 px-4 py-2 rounded-md transition duration-200 shadow-sm"
//             required
//           />
//           <input
//             type="text"
//             name="lname"
//             placeholder="Last Name"
//             value={formData.lname}
//             onChange={handleChange}
//             className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-300 px-4 py-2 rounded-md transition duration-200 shadow-sm"
//             required
//           />
//           <input
//             type="tel"
//             name="number"
//             placeholder="Mobile Number"
//             value={formData.number}
//             onChange={handleChange}
//             maxLength={10}
//             className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-300 px-4 py-2 rounded-md transition duration-200 shadow-sm"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-300 px-4 py-2 rounded-md transition duration-200 shadow-sm"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-300 px-4 py-2 rounded-md transition duration-200 shadow-sm"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Login Link */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{' '}
//           <a
//             href="/login"
//             className="text-blue-600 underline hover:text-blue-800 transition duration-150"
//           >
//             Login
//           </a>
//         </p>

//         {/* Users List */}
//         {/* {users.length > 0 && (
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">All Users</h3>
//             <ul className="space-y-4 max-h-60 overflow-y-auto pr-2">
//               {users.map((user: any, index) => (
//                 <li key={index} className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm">
//                   <p><span className="font-medium text-gray-800">First Name:</span> {user.fname}</p>
//                   <p><span className="font-medium text-gray-800">Last Name:</span> {user.lname}</p>
//                   <p><span className="font-medium text-gray-800">Email:</span> {user.email}</p>
//                   <p><span className="font-medium text-gray-800">Number:</span> {user.number}</p>
//                   <p><span className="font-medium text-gray-800">Password:</span> {user.password}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }



//===================================================================================================================================================

// 'use client';

// import { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// export default function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     number: '',
//     email: '',
//   });

//   const [users, setUsers] = useState([]);

//   // Fetch all users (optional)
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('/api/registration');
//       const data = await res.json();
//       setUsers(data.data);
//     } catch (err) {
//       toast.error("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


//   // Form submit hone par API call
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     // ✅ Validation
//   const { fname, lname, number, email } = formData;

//   if (!fname || !lname || !number || !email) {
//     toast.error("All fields are required");
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     toast.error("Invalid email format");
//     return;
//   }

//   if (number.length !== 10 || !/^\d+$/.test(number)) {
//     toast.error("Mobile number must be 10 digits");
//     return;
//   }


//     try {
//       const res = await fetch('/api/registration', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (result.success) {
//         toast.success("User registered successfully!");
//         setFormData({ fname: '', lname: '', number: '', email: '' });
//         fetchUsers(); // latest users show karo
//       } else {
//         toast.error("Failed to register user");
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-10">
//       <Toaster />
//       <h2 className="text-xl font-bold mb-4 text-center">Register User</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="fname"
//           placeholder="First Name"
//           value={formData.fname}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="lname"
//           placeholder="Last Name"
//           value={formData.lname}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           name="number"
//           placeholder="Mobile Number"
//           value={formData.number}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>

//       {/* Optional: Show all users */}
//       <div className="mt-6">
//         <h3 className="font-semibold mb-2">All Users:</h3>
//         <ul className="text-sm">
//           {users.map((user: any, index) => (
//             <li key={index}>
             
//               <p>First name: {user.fname}</p> 
//               <p>Last name: {user.lname}</p>
//               <p>Email: {user.email} </p>
//              <p>Number:  {user.number}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }  

