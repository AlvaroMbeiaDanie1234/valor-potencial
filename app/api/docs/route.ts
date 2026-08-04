import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/session"

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const docUrl = searchParams.get("url")

  if (!docUrl) {
    return new NextResponse("Missing URL", { status: 400 })
  }

  // To fetch a private Vercel Blob, we must pass the BLOB_READ_WRITE_TOKEN
  try {
    const res = await fetch(docUrl, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    })
    
    if (!res.ok) {
      return new NextResponse("File not found or access denied", { status: 404 })
    }
    
    return new NextResponse(res.body, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": res.headers.get("Content-Disposition") || "inline",
      }
    })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
