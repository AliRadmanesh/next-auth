import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"
import * as bcrypt from "bcrypt"

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) 
      return NextResponse.json({ message: "Something went wrong while trying to register" }, { status: 400 })

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 10)
      }
    })

    const { password: hashedPassword, ...result } = user
    return NextResponse.json({ result }, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ result: error, message: "Something went wrong while trying to register" }, { status: 500 })
  }
}