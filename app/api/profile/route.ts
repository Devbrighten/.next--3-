import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token/verifyToken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization"); // Bearer <token>

  if (!authHeader) {
    return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1]; // sirf token ki value nikalta hai - "Bearer token123..." → "token123..."

  const { valid, decoded } = verifyToken(token);                                                                                                                       

  if (!valid) {
    
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
  }                     
  
    console.log("Decoded User Data:", decoded); 

  return NextResponse.json({
    success: true,
    message: "Token verified",
    user: decoded, // contains { id, email }
  });
}
