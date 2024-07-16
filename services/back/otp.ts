import { someTimeLater } from '@/helpers/date';
import { SMS_PROVIDER_NUMBER } from '@/constants/sms';
import { sendSingleSmsUrl, showCreditUrl } from '@/services/urls';
import {
  ShowCreditResponseDTO,
  SendSingleSmsRequestDTO,
  SendSingleSmsResponseDTO,
} from '@/types/dtos/sms';

const apikey = process.env.SMS_PROVIDER__API_KEY!;

export const sendSingleSms = ({ mobile, message }: { mobile: string; message: string }) => {
  const body: SendSingleSmsRequestDTO = {
    recipient: [mobile],
    sender: SMS_PROVIDER_NUMBER,
    time: someTimeLater({ value: 2, unit: 'second' }),
    message,
  };
  return new Promise<SendSingleSmsResponseDTO>((resolve, reject) => {
    fetch(sendSingleSmsUrl, {
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

export const showCredit = () => {
  return new Promise<ShowCreditResponseDTO>((resolve, reject) => {
    fetch(showCreditUrl, {
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
