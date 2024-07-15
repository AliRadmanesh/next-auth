'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="duration-400 rounded-md border px-6 py-1.5 text-sm uppercase text-white hover:bg-white hover:text-black"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
