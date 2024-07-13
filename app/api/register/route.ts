import { NextResponse } from "next/server"
import { phoneNumberNormalizer, phoneNumberValidator } from "@persian-tools/persian-tools";
import dayjs from "dayjs";

import prisma from "@/helpers/prisma"
import { generateOtpCode } from "@/helpers/number";

export async function POST(request: any) {
  try {
    const { mobile } = await request.json()

    if (!mobile || !phoneNumberValidator(mobile))
      return NextResponse.json({ status: 400, message: "mobile is not valid!" })

    const otp_code = generateOtpCode()
    const otp_expiry = dayjs().add(2, "minute").toISOString()

    const user = await prisma.user.create({
      data: {
        mobile: phoneNumberNormalizer(mobile, "0"),
        otp_code,
        otp_expiry,
      }
    })

    return NextResponse.json({ status: 201, data: { code: user.otp_code } })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ status: 500, error, message: "Something went wrong while trying to register" })
  }
}