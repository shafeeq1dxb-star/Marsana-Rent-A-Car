import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// Use /tmp on Vercel (serverless), or data/ directory locally
const isVercel = process.env.VERCEL === "1"
const SUBMISSIONS_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data")
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, "submissions.json")

export async function GET() {
  try {
    console.log("Fetching submissions from:", SUBMISSIONS_FILE)
    console.log("Is Vercel:", process.env.VERCEL === "1")
    
    if (!existsSync(SUBMISSIONS_FILE)) {
      console.log("Submissions file does not exist, returning empty array")
      return NextResponse.json([])
    }

    const data = await readFile(SUBMISSIONS_FILE, "utf-8")
    const submissions = JSON.parse(data)
    console.log("Loaded submissions count:", submissions.length)
    
    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error loading submissions:", error)
    return NextResponse.json(
      { error: "Failed to load submissions" },
      { status: 500 }
    )
  }
}


