// app/api/verify-otp/route.ts
import { NextResponse } from "next/server"
import UserModel from "@/lib/models/users"
import { ConnectDb } from "@/lib/database/db"

// Access the same OTP storage from forgot-password route
const otpStorage = new Map()

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    // First check in-memory storage (for development)
    const storedData = otpStorage.get(email)
    let isValid = false

    if (storedData && storedData.otp === otp && storedData.expiry > new Date()) {
      isValid = true
      // Clear OTP after successful verification
      otpStorage.delete(email)
    }

    // Also try database verification if possible
    try {
      await ConnectDb()
      const user = await UserModel.findOne({
        email: email.toLowerCase(),
        resetPasswordOtp: otp,
        resetPasswordOtpExpiry: { $gt: new Date() },
      })

      if (user) {
        isValid = true
        // Clear OTP after successful verification
        user.resetPasswordOtp = undefined
        user.resetPasswordOtpExpiry = undefined
        await user.save()
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue with in-memory verification result
    }

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "OTP verified successfully.",
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 400 })
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
    console.error("Error verifying OTP:", errorMessage)
    return NextResponse.json({ 
      success: false, 
      message: "Failed to verify OTP. Please try again." 
    }, { status: 500 })
  }
}

// import { NextResponse } from "next/server";
// import UserModel from "@/lib/models/users";
// import { ConnectDb } from "@/lib/database/db";

// export async function POST(req: Request) {
//   await ConnectDb();
//   const { email, otp } = await req.json();

//   try {
//     const user = await UserModel.findOne({ 
//       email: email.toLowerCase(),
//       // resetPasswordOtp: otp,
//       resetPasswordOtp: otp.toString(),
//       resetPasswordOtpExpiry: { $gt: new Date() }
//     });
    
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Invalid or expired OTP." },
//         { status: 400 }
//       );
//     }
//     // if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp || user.resetPasswordOtpExpiry < new Date()) {
//     //       return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, 
//     //     { status: 400 });
//     //   } 


//     // Clear the OTP after successful verification
//     user.resetPasswordOtp = undefined;
//     user.resetPasswordOtpExpiry = undefined;
//     await user.save();

//     return NextResponse.json({
//       success: true,
//       message: "OTP verified successfully.",
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, message: err.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }