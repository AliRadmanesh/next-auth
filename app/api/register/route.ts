import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"
import * as bcrypt from "bcrypt"

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) 
      return NextResponse.json({ status: 400, message: "Something went wrong while trying to register" })

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 10)
      }
    })

    const { password: hashedPassword, ...result } = user
    return NextResponse.json({ status: 201, result })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ status: 500, result: error, message: "Something went wrong while trying to register" })
  }
}