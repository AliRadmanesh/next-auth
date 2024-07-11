import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"
import * as bcrypt from "bcrypt"
import { signJwtAccessToken } from "@/helpers/jwt"

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) 
      return NextResponse.json({ message: "Both fields are required!" }, { status: 400 })

    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase() }
    })

    if (!user) return NextResponse.json({ message: "user not found!" }, { status: 400 })

    if (await bcrypt.compare(password, user.password)) {
      const { password: hashedPassword, ...result } = user
      const accessToken = signJwtAccessToken(result)
      return NextResponse.json({ result: { ...result, accessToken } }, { status: 200 })
    } else return NextResponse.json({ message: "Password incorrect" }, { status: 400 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ result: error, message: "Something went wrong while trying to log in" }, { status: 500 })
  }
}
