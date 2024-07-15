import { BRAND_NAME, OTP_MESSAGE_TEXT } from '@/constants/sms';

const generateOtpMessageText = (otpCode: string) =>
  `${OTP_MESSAGE_TEXT}: ${otpCode}\n${BRAND_NAME}`;

export { generateOtpMessageText };
