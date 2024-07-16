'use client';

import { useRouter } from 'next/navigation';

const LoginButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push('/register')}
      className="duration-400 rounded-md border px-6 py-1.5 text-sm uppercase text-white hover:bg-white hover:text-black"
    >
      Login
    </button>
  );
};

export default LoginButton;
