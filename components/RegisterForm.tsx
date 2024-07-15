"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";

const RegisterForm = () => {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => setMobile(e.target.value);

  const clearInputs = () => {
    setMobile("");
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    registerUser({ mobile }).then((response: any) => {
      if (response.status === 201) {
        clearInputs();
        router.push("/login");
      } else setError(response.message);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-12 px-32">
      <input
        type="text"
        value={mobile}
        onChange={handleMobileChange}
        placeholder="Enter your mobile"
        className="border-b border-b-gray-200 hover:border-b-gray-500"
      />
      <button
        type="submit"
        className="rounded-lg border bg-gray-100 px-6 py-2 text-sm uppercase duration-300 hover:bg-gray-200"
      >
        Register
      </button>
      {error && <p className="text-center font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default RegisterForm;
