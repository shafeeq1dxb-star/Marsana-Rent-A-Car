import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json")

export async function GET() {
  try {
    if (!existsSync(SUBMISSIONS_FILE)) {
      return NextResponse.json([])
    }

    const data = await readFile(SUBMISSIONS_FILE, "utf-8")
    const submissions = JSON.parse(data)
    
    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error loading submissions:", error)
    return NextResponse.json(
      { error: "Failed to load submissions" },
      { status: 500 }
    )
  }
}

