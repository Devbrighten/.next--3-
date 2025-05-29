//app/api/registration/route.ts

import {NextResponse, NextRequest, } from "next/server";
import { ConnectDb } from "@/lib/database/db";
import UserModel from "@/lib/models/users";
import bcrypt from "bcryptjs"; // ← ADD THIS


export async function POST(req: NextRequest) {
  try {
    await ConnectDb();

    // Parse body from request
    const body = await req.json();
    console.log("Request Body:", body);

    // email already exists
    const existingUser = await UserModel.findOne({ email: body.email });
    console.log("existingUser",existingUser ); // Is check ka result null aaya. Matlab: Database me us email ka user already nahi mila.
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
      }, { status: 409 });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create user with form data
    const profileList = new UserModel({
      fname: body.fname,
      lname: body.lname,
      number: body.number,
      email: body.email,
      password: hashedPassword,
    });

    await profileList.validate(); // add this before save
    const createuser = await profileList.save();
    console.log("createuser", createuser);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      // data: createuser,
    });

  } catch (error) {
    console.log("POST Error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong in POST",
    }, { status: 500 });
  }
}
  
  export async function GET() {
    try {
      await ConnectDb(); // Ensure DB connection is awaited
  
      const allUsers = await UserModel.find(); // MongoDB se sabhi users fetch karo
  
      return NextResponse.json({
        success: true,
        data: allUsers, //Database se actual data
      });
  
    } catch (error) {
      console.log("GET Error:", error);
      return NextResponse.json({
        success: false,
        message: "Something went wrong in GET",
      }, { status: 500 });
    }
  }
  

  // export async function POST() {
//     try {
//       await ConnectDb();
  
//       const profileList = new UserModel({
//         fname: "kanchan",
//         lname: "sanodiya",
//         number: 1234567890,
//         email: "kanchansanodiya@123gmail.com",
//       });
  
//       const createuser = await profileList.save();
//       console.log("createuser", createuser);
  
//       return NextResponse.json({
//         success: true,
//         message: "User created successfully",
//         data: createuser,
//       });
  
//     } catch (error) {
//       console.log("POST Error:", error);
//       return NextResponse.json({
//         success: false,
//         message: "Something went wrong in POST",
//       }, { status: 500 });
//     }
//   }

// =================================================================================================

// export async function POST() {
//     try {
//         await ConnectDb();
//         const profileList = new UserModel({
//             firstname: "kanchan",
//             lastname: "sanodiya",
//             number: 1234567890,
//             email: "kanchansanodiya@123gmail.com",

//         });
//         const createuser = await new profileList.save();
//       console.log("createuser", createuser);
  
//       return NextResponse.json({
//         success: true,
//         message: "User created successfully",
//         data: createuser,
//       });
  
//     } catch (error) {
//       console.log("POST Error:", error);
//       return NextResponse.json({
//         success: false,
//         message: "Something went wrong in POST",
//       }, { status: 500 });
//     }
//   }




