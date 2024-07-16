import {
  RegisterLoginUserRequestDTO,
  RegisterLoginUserResponseDTO,
  SendOtpCodeRequestDTO,
  SendOtpCodeResponseDTO,
} from '@/types/dtos/register';

export const registerUser = ({ mobile }: RegisterLoginUserRequestDTO) => {
  return new Promise<RegisterLoginUserResponseDTO>((resolve, reject) => {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const sendOtpCode = ({ mobile, otpCode }: SendOtpCodeRequestDTO) => {
  return new Promise<SendOtpCodeResponseDTO>((resolve, reject) => {
    fetch('/api/register/otp', {
      method: 'POST',
      body: JSON.stringify({ mobile, otpCode }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
