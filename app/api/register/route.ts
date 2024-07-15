import { NextResponse } from "next/server";
import { phoneNumberNormalizer, phoneNumberValidator } from "@persian-tools/persian-tools";

import prisma from "@/helpers/prisma";
import { someTimeLater } from "@/helpers/date";
import { checkCredit } from "@/services/back/otp";
import { generateOtpCode } from "@/helpers/number";

export async function POST(request: any) {
  try {
    const { mobile } = await request.json();

    if (!mobile || !phoneNumberValidator(mobile))
      return NextResponse.json({ status: 400, message: "mobile is not valid!" });

    const otp_code = generateOtpCode();

    // Send OTP code via SMS

    const otp_expiry = someTimeLater({ value: 2, unit: "minute" });

    const user = await prisma.user.create({
      data: {
        mobile: phoneNumberNormalizer(mobile, "0"),
        otp_code,
        otp_expiry,
      },
    });

    // Check SMS provider remaining credit to alarm me in case of low amount
    const res = await checkCredit();
    console.log({ res });

    return NextResponse.json({ status: 201, data: { code: user.otp_code } });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error,
      message: "Something went wrong while trying to register",
    });
  }
}
