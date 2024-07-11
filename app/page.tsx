import LogoutButton from "@/components/LogoutButton";

const Home = () => {
  return (
    <main className="flex flex-col justify-center items-center bg-black h-screen space-y-8">
      <h1 className="text-white text-center text-2xl font-bold uppercase">You have logged in!</h1>
      <img src="/treasure.png" alt="" className="w-1/4 object-contain" />
      <LogoutButton />
    </main>
  );
}

export default Home
