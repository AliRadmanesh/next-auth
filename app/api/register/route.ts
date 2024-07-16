import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';
import { phoneNumberNormalizer, phoneNumberValidator } from '@persian-tools/persian-tools';

import prisma from '@/helpers/prisma';
import { generateOtpCode } from '@/helpers/number';
import { isResSuccessful } from '@/helpers/restApi';
import { generateOtpMessageText } from '@/helpers/sms';
import { showCredit, sendSingleSms } from '@/services/back/otp';
import { differenceBetweenDates, someTimeLater } from '@/helpers/date';
import { ADMIN_MOBILE_NUMBER, SMS_LOW_CREDIT_TEXT } from '@/constants/sms';

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json();

    if (!mobile || !phoneNumberValidator(mobile))
      return NextResponse.json({ status: 400, message: 'mobile is not valid!' });

    const mobileWithLeading0 = phoneNumberNormalizer(mobile, '0');
    const mobileWithLeading98 = phoneNumberNormalizer(mobile, '+98');
    const otpCode = generateOtpCode();

    // TODO: Check how to limit number of requests each IP address can make in a certain amount of time to prevent SMS bombing!

    const user = await prisma.user.findFirst({
      where: { mobile: mobileWithLeading0 },
    });

    if (!user) {
      // Register user

      // Send OTP code via SMS
      const message = generateOtpMessageText(otpCode);
      const sendOtpResponse = await sendSingleSms({
        mobile: mobileWithLeading98,
        message,
      });

      if (isResSuccessful(sendOtpResponse)) {
        const otpExpiry = someTimeLater({ value: 2, unit: 'minute' });

        const newUser = await prisma.user.create({
          data: {
            mobile: mobileWithLeading0,
            otp_code: otpCode,
            otp_expiry: otpExpiry,
          },
        });

        // Send alarm text in case of low amount in SMS provider's credit
        const showCreditResponse = await showCredit();
        if (isResSuccessful(showCreditResponse) && showCreditResponse.data.credit < 3000000) {
          const message = SMS_LOW_CREDIT_TEXT;
          await sendSingleSms({
            mobile: ADMIN_MOBILE_NUMBER,
            message,
          });
        }

        return NextResponse.json({ status: 201, data: { code: newUser.otp_code } });
      } else
        return NextResponse.json({
          status: 500,
          message: 'Something went wrong while trying to register',
        });
    } else {
      // Login user

      // Check if otp_expiry is valid, then don't send another SMS!
      const remainingExpirySeconds = differenceBetweenDates({
        firstDate: dayjs().toISOString(),
        secondDate: user.otp_expiry.toISOString(),
        unit: 'second',
      });
      const isOtpCodeValid = remainingExpirySeconds > 0;

      if (isOtpCodeValid)
        return NextResponse.json({
          status: 400,
          message: `You received OTP code recently. Please wait ${remainingExpirySeconds} seconds and try again to get a new one!`,
        });

      // Send OTP code via SMS
      const message = generateOtpMessageText(otpCode);
      const sendOtpResponse = await sendSingleSms({
        mobile: mobileWithLeading98,
        message,
      });

      if (isResSuccessful(sendOtpResponse)) {
        const otpExpiry = someTimeLater({ value: 2, unit: 'minute' });
        const updatedUser = await prisma.user.update({
          where: { mobile: mobileWithLeading0 },
          data: {
            otp_code: otpCode,
            otp_expiry: otpExpiry,
          },
        });

        return NextResponse.json({ status: 201, data: { code: updatedUser.otp_code } });
      } else
        return NextResponse.json({
          status: 500,
          message: 'Something went wrong while trying to register',
        });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error,
      message: 'Something went wrong while trying to register',
    });
  }
}
