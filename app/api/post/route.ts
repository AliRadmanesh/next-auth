import { verifyJwt } from "@/helpers/jwt"
import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get("Authorization")
    const decoded = verifyJwt(accessToken)

    if (!accessToken || !decoded)
      return NextResponse.json({ status: 401, message: "You are not authorized to get this data!" })

    const posts = await prisma.post.findMany()
    return NextResponse.json({ status: 200, posts })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ status: 500, result: error, message: "Something went wrong while trying to load the posts." })
  }
}
