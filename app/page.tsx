import LogoutButton from '@/components/LogoutButton';

const Home = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-8 bg-black">
      <h1 className="text-center text-2xl font-bold uppercase text-white">You have logged in!</h1>
      <img src="/treasure.png" alt="" className="w-1/4 object-contain" />
      <LogoutButton />
    </main>
  );
};

export default Home;
