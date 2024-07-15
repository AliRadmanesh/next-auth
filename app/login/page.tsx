import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <main className="flex h-screen">
      <div className="flex w-1/3 items-center justify-center">
        <LoginForm />
      </div>
      <div className="flex w-2/3 items-center justify-center bg-[#0f0f16]">
        <img src="/login.png" alt="" className="w-1/5 object-contain" />
      </div>
    </main>
  );
};

export default Login;
