//app/api/test-email/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET() {
  try {
    console.log("🧪 Testing email configuration...")

    // Check environment variables
    const emailConfig = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "✅ Set" : "❌ Not set",
    }

    console.log("📧 Email configuration:", emailConfig)

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({
        success: false,
        message: "Email configuration incomplete",
        config: emailConfig,
      })
    }

    // Create transporter - FIXED: createTransport (not createTransporter)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Test connection
    await transporter.verify()

    // Send test email
    const testEmail = {
      from: `"Test Email" <${process.env.EMAIL_USER}>`,
      to: "developer.brightensolutions@gmail.com",
      subject: "🧪 Test Email - Configuration Working",
      html: `
        <h2>✅ Email Configuration Test Successful!</h2>
        <p>Your email settings are working correctly.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    }

    const info = await transporter.sendMail(testEmail)

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      details: {
        messageId: info.messageId,
        targetEmail: "developer.brightensolutions@gmail.com",
        config: emailConfig,
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    const errorDetails = error instanceof Error ? error : { message: "Unknown error" }
    
    console.error("❌ Email test failed:", errorMessage)

    return NextResponse.json({
      success: false,
      message: "Email test failed",
      error: errorMessage,
      details: errorDetails,
    })
  }
}