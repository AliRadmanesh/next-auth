"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signIn("credentials", { email, password, redirect: false })
      .then((res) => {
        if (res?.error) setError(JSON.parse(res.error).message);
        else {
          clearInputs();
          router.push("/");
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-12 px-32">
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email address"
        className="border-b border-b-gray-200 hover:border-b-gray-500"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        className="border-b border-b-gray-200 hover:border-b-gray-500"
      />
      <button
        type="submit"
        className="rounded-lg border bg-gray-100 px-6 py-2 text-sm uppercase duration-300 hover:bg-gray-200"
      >
        Log in
      </button>
      {error && <p className="text-center font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default LoginForm;
