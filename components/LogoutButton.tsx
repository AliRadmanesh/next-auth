"use client"

import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <button type="button" onClick={() => signOut()} className="text-sm uppercase text-white border px-6 py-1.5 rounded-md hover:bg-white hover:text-black duration-400">Log out</button>
  )
}

export default LogoutButton