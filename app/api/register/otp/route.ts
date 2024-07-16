import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';
import { phoneNumberNormalizer } from '@persian-tools/persian-tools';

import prisma from '@/helpers/prisma';
import { differenceBetweenDates } from '@/helpers/date';
import { signJwtAccessToken } from '@/helpers/jwt';

export async function POST(request: NextRequest) {
  try {
    const { mobile, otpCode } = await request.json();

    if (typeof otpCode !== 'string' || otpCode.length < 5)
      return NextResponse.json({ status: 400, message: 'Otp code is not valid!' });

    const mobileWithLeading0 = phoneNumberNormalizer(mobile, '0');

    const user = await prisma.user.findFirst({
      where: { mobile: mobileWithLeading0 },
    });

    if (!user) return NextResponse.json({ status: 400, message: 'mobile number is not valid!' });

    const remainingExpirySeconds = differenceBetweenDates({
      firstDate: dayjs().toISOString(),
      secondDate: user.otp_expiry.toISOString(),
      unit: 'second',
    });
    const isOtpCodeValid = remainingExpirySeconds > 0;

    if (user.otp_code !== otpCode || !isOtpCodeValid)
      return NextResponse.json({ status: 400, message: 'Otp code is not valid!' });

    const { first_name, last_name, mobile: userMobile } = user;
    const accessToken = signJwtAccessToken({ first_name, last_name, mobile: userMobile });
    return NextResponse.json({ status: 200, data: { accessToken } });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error,
      message: 'Something went wrong while trying to register',
    });
  }
}
