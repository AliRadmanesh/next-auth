import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"
import * as bcrypt from "bcrypt"
import { signJwtAccessToken } from "@/helpers/jwt"

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) 
      return NextResponse.json({ status: 400, message: "Both fields are required!" })

    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase() }
    })

    if (!user) return NextResponse.json({ status: 400, message: "user not found!" })

    if (await bcrypt.compare(password, user.password)) {
      const { password: hashedPassword, ...result } = user
      const accessToken = signJwtAccessToken(result)
      return NextResponse.json({ status: 200, result: { ...result, accessToken } })
    } else return NextResponse.json({ status: 400, message: "Password incorrect" })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ status: 500, result: error, message: "Something went wrong while trying to log in" })
  }
}
