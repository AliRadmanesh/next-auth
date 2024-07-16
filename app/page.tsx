'use client';

import { getUserToken } from '@/helpers/token';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';

const Home = () => {
  const userToken = getUserToken();

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-8 bg-black">
      {userToken ? (
        <>
          <h1 className="text-center text-2xl font-bold uppercase text-white">
            You have logged in!
          </h1>
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
      )}
    </main>
  );
};

export default Home;
