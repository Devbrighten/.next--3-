// app/api/reset-password/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import UserModel from "@/lib/models/users"
import { ConnectDb } from "@/lib/database/db"

export async function POST(req: Request) {
  await ConnectDb()

  const { email, newPassword } = await req.json()

  if (!email || !newPassword) {
    return NextResponse.json(
      { success: false, message: "Email and new password are required" },
      { status: 400 }
    )
  }

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword

    await user.save()

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Reset Password Error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}


//========================v0.dev---------------=================================================================================================================

// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import UserModel from "@/lib/models/users"
// import { ConnectDb } from "@/lib/database/db"

// export async function POST(req: Request) {
//   await ConnectDb()
//   const { email, newPassword } = await req.json()

//   try {
//     // Always use the hardcoded email
//     const targetEmail = "developer.brightensolutions@gmail.com"

//     const user = await UserModel.findOne({ email: targetEmail })

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 12)

//     // Update user password and clear OTP fields
//     user.password = hashedPassword
//     user.resetPasswordOtp = undefined
//     user.resetPasswordOtpExpiry = undefined
//     user.updatedAt = new Date()

//     await user.save()

//     return NextResponse.json({
//       success: true,
//       message: "Password reset successful. You can now login with your new password.",
//     })
//   } catch (error: any) {
//     console.error("Password reset error:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }
//=====================================================================================================================================================


// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import UserModel from "@/lib/models/users";
// import { ConnectDb } from "@/lib/database/db";

// export async function POST(req: Request) {
//   await ConnectDb();
//   const { email, newPassword } = await req.json();
//   // const { email, password } = await req.json(); // Fix the mismatch


//   try {
//     const user = await UserModel.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found." },
//         { status: 404 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();

//     return NextResponse.json({
//       success: true,
//       message: "Password reset successful.",
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }