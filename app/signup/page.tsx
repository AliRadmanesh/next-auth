import SignupForm from "@/components/SignupForm"

const Signup = () => {
  return (
    <main className='flex h-screen'>
      <div className='w-1/3 flex justify-center items-center'>
        <SignupForm />
      </div>
      <div className="w-2/3 bg-[#0f0f16] flex justify-center items-center">
        <img src="/treasure.png" alt="" className='w-1/5 object-contain' />
      </div>
    </main>
  )
}

export default Signup
