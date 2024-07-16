'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { getAccessToken } from '@/helpers/token';
import { getAllPosts } from '@/services/post';

const HomeComponent = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = getAccessToken();
      setAccessToken(token);

      if (token)
        getAllPosts({ accessToken: token })
          .then((res) => console.log({ res }))
          .catch((e) => console.log({ e }));
    }
  }, [router]);

  return accessToken ? (
    <>
      <h1 className="text-center text-2xl font-bold uppercase text-white">You have logged in!</h1>
      <img src="/treasure.png" alt="" className="w-1/4 object-contain" />
      <LogoutButton />
    </>
  ) : (
    <>
      <h1 className="text-center text-2xl font-bold uppercase text-white">
        You are not logged in!
      </h1>
      <img src="/login.png" alt="" className="w-1/4 object-contain" />
      <LoginButton />
    </>
  );
};

export default HomeComponent;
