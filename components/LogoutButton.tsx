'use client';

import { clearAccessToken } from '@/helpers/token';

const LogoutButton = () => {
  const logOutUser = () => clearAccessToken();

  return (
    <button
      type="button"
      onClick={() => logOutUser()}
      className="duration-400 rounded-md border px-6 py-1.5 text-sm uppercase text-white hover:bg-white hover:text-black"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
