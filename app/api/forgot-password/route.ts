// app/api/forgot-password/route.ts

import { NextResponse } from "next/server"
import UserModel from "@/lib/models/users"
import { ConnectDb } from "@/lib/database/db"

// Simple OTP storage for development (DO NOT use in production)
const otpStorage = new Map()

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString()
    console.log("Generated OTP:", otp)

    // Store OTP in memory (for development only)
    otpStorage.set(email, {
      otp,
      expiry: new Date(Date.now() + 15 * 60 * 1000),
    })

    // Try to connect to DB and save OTP if possible
    try {
      await ConnectDb()
      const user = await UserModel.findOne({ email: email.toLowerCase() })

      if (user) {
        user.resetPasswordOtp = otp
        user.resetPasswordOtpExpiry = new Date(Date.now() + 15 * 60 * 1000)
        await user.save()
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue anyway - we'll use in-memory OTP
    }

    // Log the OTP for development
    console.log(`🔐 OTP for ${email}: ${otp} (will be sent to developer.brightensolutions@gmail.com in production)`)

    return NextResponse.json({
      success: true,
      message: "OTP generated successfully. Check console for OTP (development mode).",
      // Include OTP in response for development only
      devOtp: otp,
    })
  } catch (err: any) {
    console.error("Error generating OTP:", err)
    return NextResponse.json({ success: false, message: "Failed to generate OTP. Please try again." }, { status: 500 })
  }
}


// import { NextResponse } from "next/server"
// import UserModel from "@/lib/models/users";
// import { ConnectDb } from "@/lib/database/db";
// import nodemailer from "nodemailer"

// // Modify the POST function to conditionally send to the specific email
// export async function POST(req: Request) {
//   await ConnectDb()
//   const { email, sendToSpecificEmail } = await req.json()

//   try {
//     // If sendToSpecificEmail is true, use the hardcoded email
//     const targetEmail = sendToSpecificEmail ? "developer.brightensolutions@gmail.com" : email.toLowerCase()

//     const user = await UserModel.findOne({ email: targetEmail })

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
//     }

//     // Generate 4-digit OTP
//     const otp = Math.floor(1000 + Math.random() * 9000).toString()
   
//     console.log("Generated OTP:", otp);
//     const otpExpiry = new Date(Date.now() + 15 * 60 * 1000) // OTP valid for 15 minutes


//     // Save OTP and expiry to user
//     user.resetPasswordOtp = otp
//     user.resetPasswordOtpExpiry = otpExpiry
//     await user.save()

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: true, // true set for secure connection
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     })

//     // If sendToSpecificEmail is true, override the recipient
//     const mailOptions = {
//       from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
//       to: sendToSpecificEmail ? "developer.brightensolutions@gmail.com" : user.email,
//       subject: "Password Reset OTP",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
//           <h2 style="color: #045883;">Reset Your Password</h2>
//           <p>Hello ${user.fname || ""},</p>
//           <p>Your OTP for password reset is:</p>
//           <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #0051c8;">
//             ${otp}
//           </div>
//           <p>This OTP is valid for 15 minutes.</p>
//           <p>If you did not request a password reset, you can safely ignore this email.</p>
//           <p style="margin-top: 40px;">Thanks,<br/>The Team</p>
//         </div>
//       `,
//     }

//     // Send email and check for errors
//     transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.error("Email send error:", err)
//   } else {
//     // Log the email where OTP is being sent
//     console.log("OTP sent to the email:", mailOptions.to);  // Log email here

//     console.log("Email sent successfully:", info);
//   }
// });


//     console.log("Reset OTP sent to:", mailOptions.to)

//     return NextResponse.json({
//       success: true,
//       message: "OTP sent to your email.",
//     })
//   } catch (err: any) {
//     console.error("Email send error:", err)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }

//==========================================================================================================================================================

// import { NextResponse } from "next/server"
// import UserModel from "@/lib/models/users";
// import { ConnectDb } from "@/lib/database/db";
// import nodemailer from "nodemailer"

// // Modify the POST function to conditionally send to the specific email
// export async function POST(req: Request) {
//   await ConnectDb()
//   const { email, sendToSpecificEmail } = await req.json()

//   try {
//     // If sendToSpecificEmail is true, use the hardcoded email
//     const targetEmail = sendToSpecificEmail ? "developer.brightensolutions@gmail.com" : email.toLowerCase()

//     const user = await UserModel.findOne({ email: targetEmail })                                                                                  

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
//     }

//     // Generate 4-digit OTP
//     const otp = Math.floor(1000 + Math.random() * 9000).toString()
//     const otpExpiry = new Date(Date.now() + 15 * 60 * 1000) // OTP valid for 15 minutes

//     // Save OTP and expiry to user
//     user.resetPasswordOtp = otp
//     user.resetPasswordOtpExpiry = otpExpiry
//     await user.save()

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     })

//     // If sendToSpecificEmail is true, override the recipient
//     const mailOptions = {
//       from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
//       to: sendToSpecificEmail ? "developer.brightensolutions@gmail.com" : user.email,
//       subject: "Password Reset OTP",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
//           <h2 style="color: #045883;">Reset Your Password</h2>
//           <p>Hello ${user.fname || ""},</p>
//           <p>Your OTP for password reset is:</p>
//           <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #0051c8;">
//             ${otp}
//           </div>
//           <p>This OTP is valid for 15 minutes.</p>
//           <p>If you did not request a password reset, you can safely ignore this email.</p>
//           <p style="margin-top: 40px;">Thanks,<br/>The Team</p>
//         </div>
//       `,
//     }

//     await transporter.sendMail(mailOptions)
//     console.log("Reset OTP sent to:", mailOptions.to)

//     return NextResponse.json({
//       success: true,
//       message: "OTP sent to your email.",
//     })
//   } catch (err: any) {
//     console.error("Email send error:", err)
//     return NextResponse.json({ success: false, message:  "Internal server error" }, 
//     { status: 500 })
//   }
// }



// import { NextResponse } from "next/server";
// import UserModel from "@/lib/models/users";
// import { ConnectDb } from "@/lib/database/db";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   await ConnectDb();
//   const { email } = await req.json();

//   try {
//     const user = await UserModel.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found." },
//         { status: 404 }
//       );
//     }

//     // Generate 4-digit OTP
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();
//     const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

//     // Save OTP and expiry to user
//     user.resetPasswordOtp = otp;
//     user.resetPasswordOtpExpiry = otpExpiry;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Password Reset OTP",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
//           <h2 style="color: #045883;">Reset Your Password</h2>
//           <p>Hello ${user.fname || ""},</p>
//           <p>Your OTP for password reset is:</p>
//           <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #0051c8;">
//             ${otp}
//           </div>
//           <p>This OTP is valid for 15 minutes.</p>
//           <p>If you did not request a password reset, you can safely ignore this email.</p>
//           <p style="margin-top: 40px;">Thanks,<br/>The Team</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Reset OTP sent to:", user.email);

//     return NextResponse.json({
//       success: true,
//       message: "OTP sent to your email.",
//     });
//   } catch (err: any) {
//     console.error("Email send error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message || "Internal server error" },
//       { status: 500 }
//     ); 
//   }
// }