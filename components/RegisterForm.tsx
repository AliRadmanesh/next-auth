'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { saveUserToken } from '@/helpers/token';
import { isResSuccessful } from '@/helpers/restApi';
import { registerUser, sendOtpCode } from '@/services/auth';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';

const RegisterForm = () => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');

  const { minutes, seconds } = useCountdownTimer({
    initialMinute: 2,
    initialSeconds: 0,
    start: step === 1,
  });

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => setMobile(e.target.value);
  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => setOtpCode(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (step === 0) {
      // Send Mobile
      registerUser({ mobile })
        .then((response) => {
          if (isResSuccessful(response)) {
            setStep(1);
          } else setError(response?.message ?? 'Error in registering user');
        })
        .catch((error) => setError(error?.message ?? 'Error in registering user (catch)'));
    } else {
      // Send OTP code
      sendOtpCode({ mobile, otpCode })
        .then((response) => {
          if (isResSuccessful(response)) {
            saveUserToken(response.data.accessToken);
            router.push('/');
          } else setError(response?.message ?? 'Error in sending otp code');
        })
        .catch((error) => setError(error?.message ?? 'Error in sending otp code (catch)'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-12 px-32">
      {step === 0 ? (
        <input
          type="text"
          value={mobile}
          onChange={handleMobileChange}
          placeholder="Enter your mobile"
          className="border-b border-b-gray-200 hover:border-b-gray-500"
        />
      ) : (
        <>
          <input
            type="number"
            value={otpCode}
            onChange={handleOtpChange}
            placeholder="Enter OTP code"
            className="border-b border-b-gray-200 hover:border-b-gray-500"
          />
          <p>
            {minutes}:{seconds}
          </p>
        </>
      )}
      <button
        type="submit"
        className="rounded-lg border bg-gray-100 px-6 py-2 text-sm uppercase duration-300 hover:bg-gray-200"
      >
        {step === 0 ? 'Register/Login' : 'Submit'}
      </button>
      {error && <p className="text-center font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default RegisterForm;
