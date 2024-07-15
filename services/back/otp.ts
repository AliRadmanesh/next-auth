import { someTimeLater } from '@/helpers/date';
import { SMS_PROVIDER_NUMBER } from '@/constants/sms';
import { generateOtpMessageText } from '@/helpers/sms';
import { sendSingleSms, showCredit } from '@/services/urls';
import { SendOtpViaSmsRequestDTO, SendOtpViaSmsResponseDTO } from '@/types/dtos/otp';

const apikey = process.env.SMS_PROVIDER__API_KEY!;

export const sendOtpViaSms = ({ mobile, otpCode }: SendOtpViaSmsRequestDTO) => {
  const message = generateOtpMessageText(otpCode);
  const body = {
    recipient: [mobile],
    sender: SMS_PROVIDER_NUMBER,
    time: someTimeLater({ value: 2, unit: 'second' }),
    message,
  };
  return new Promise<SendOtpViaSmsResponseDTO>((resolve, reject) => {
    fetch(sendSingleSms, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey,
      },
    })
      .then((res) => {
        res
          .json()
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};

export const checkCredit = () => {
  return new Promise((resolve, reject) => {
    fetch(showCredit, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey,
      },
    })
      .then((res) => {
        res
          .json()
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};
