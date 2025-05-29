// /app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/lib/database/db";
import UserModel from "@/lib/models/users";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/token/generateToken";


export async function POST(req: NextRequest) {
  try {  
    await ConnectDb();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and Password are required" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email }); // MongoDB me users collection me check kiya gaya ki kya ye email registered hai.

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // if (user.password !== password) {
    //   return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
    // }


    //bcrypt password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
    }

    const token = generateToken(user); // Ye ek function call hai jo user ka data lekar token banata hai.

     // Optional: Database me token save karna ho to
     user.token = token;
     await user.save();

    return NextResponse.json({
      success: true,
      message: "Login successfully",
      data: {
        id: user._id,
        name: user.fname + " " + user.lname,
        email: user.email,
        number: user.number,
        token: token, // yahi token frontend use karega
      },


    });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
