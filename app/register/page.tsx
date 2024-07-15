import RegisterForm from '@/components/RegisterForm';

const Register = () => {
  return (
    <main className="flex h-screen">
      <div className="flex w-1/3 items-center justify-center">
        <RegisterForm />
      </div>
      <div className="flex w-2/3 items-center justify-center bg-[#0f0f16]">
        <img src="/login.png" alt="" className="w-1/5 object-contain" />
      </div>
    </main>
  );
};

export default Register;
