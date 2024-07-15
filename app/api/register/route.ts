import { NextResponse } from 'next/server';
import { phoneNumberNormalizer, phoneNumberValidator } from '@persian-tools/persian-tools';

import prisma from '@/helpers/prisma';
import { someTimeLater } from '@/helpers/date';
import { generateOtpCode } from '@/helpers/number';
import { sendOtpViaSms } from '@/services/back/otp';

export async function POST(request: any) {
  try {
    const { mobile } = await request.json();

    if (!mobile || !phoneNumberValidator(mobile))
      return NextResponse.json({ status: 400, message: 'mobile is not valid!' });

    const otpCode = generateOtpCode();

    // Send OTP code via SMS
    const sendOtpResponse = await sendOtpViaSms({
      mobile: phoneNumberNormalizer(mobile, '+98'),
      otpCode,
    });

    if (isResSuccessful(sendOtpResponse)) {
      const otpExpiry = someTimeLater({ value: 2, unit: 'minute' });

      const user = await prisma.user.create({
        data: {
          mobile: phoneNumberNormalizer(mobile, '0'),
          otp_code: otpCode,
          otp_expiry: otpExpiry,
        },
      });

      // Check SMS provider remaining credit to alarm me in case of low amount
      // const checkCreditResponse = await checkCredit();

      return NextResponse.json({ status: 201, data: { code: user.otp_code } });
    } else
      return NextResponse.json({
        status: 500,
        message: 'Something went wrong while trying to register',
      });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error,
      message: 'Something went wrong while trying to register',
    });
  }
}
