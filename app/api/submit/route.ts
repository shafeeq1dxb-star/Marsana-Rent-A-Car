import { NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import nodemailer from "nodemailer"
import os from "os"

// Use /tmp on Vercel (serverless), or data/ directory locally
const isVercel = process.env.VERCEL === "1"
const SUBMISSIONS_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data")
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, "submissions.json")

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(SUBMISSIONS_DIR)) {
    await mkdir(SUBMISSIONS_DIR, { recursive: true })
  }
}

// Load submissions from file
async function loadSubmissions() {
  await ensureDataDir()
  if (!existsSync(SUBMISSIONS_FILE)) {
    return []
  }
  try {
    const data = await readFile(SUBMISSIONS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save submissions to file
async function saveSubmissions(submissions: any[]) {
  await ensureDataDir()
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
}

// Send email notification
async function sendEmailNotification(submission: any) {
  // Only send email if SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping email notification")
    return false
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL || "shafeeque@marsanarac.com",
    subject: `New Booking Request - ${submission.carName}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${submission.fullName}</p>
      <p><strong>Phone:</strong> ${submission.countryCode} ${submission.phone}</p>
      ${submission.email ? `<p><strong>Email:</strong> ${submission.email}</p>` : ""}
      <p><strong>Vehicle:</strong> ${submission.carName} (${submission.carYear})</p>
      <p><strong>Pickup Date:</strong> ${submission.pickupDate}</p>
      <p><strong>Drop-off Date:</strong> ${submission.dropOffDate}</p>
      <p><strong>Collection Method:</strong> ${submission.collectionMethod === "branch" ? `Branch: ${submission.selectedBranch}` : "Delivery"}</p>
      <p><strong>Total Amount:</strong> ${submission.total} SAR</p>
      <p><strong>Submitted:</strong> ${new Date(submission.submittedAt).toLocaleString()}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const submission = {
      id: Date.now().toString(),
      ...body,
      submittedAt: new Date().toISOString(),
    }

    console.log("Received submission:", submission)
    console.log("Is Vercel:", isVercel)
    console.log("Submissions file path:", SUBMISSIONS_FILE)

    // Load existing submissions
    const submissions = await loadSubmissions()
    console.log("Loaded submissions count:", submissions.length)
    
    // Add new submission
    submissions.unshift(submission)
    
    // Save to file
    try {
      await saveSubmissions(submissions)
      console.log("Successfully saved submission to file")
    } catch (saveError) {
      console.error("Error saving to file:", saveError)
      // On Vercel, file writes may fail - log but don't fail the request
      if (isVercel) {
        console.warn("Note: File writes on Vercel are ephemeral. Consider using a database for persistence.")
      }
    }

    // Send email notification (don't block on error)
    sendEmailNotification(submission).catch(console.error)

    return NextResponse.json({ success: true, id: submission.id })
  } catch (error) {
    console.error("Error saving submission:", error)
    return NextResponse.json(
      { success: false, error: "Failed to save submission" },
      { status: 500 }
    )
  }
}

