import GoogleLogin from '../_components/GoogleLogin';

export default function Page() {
  return (
    <main className="h-svh flex flex-col justify-center items-center gap-2">
      <h1 className="text-[#2771D0] text-4xl font-bold">koLang</h1>
      <h3 className="mb-10">koLang will help you</h3>
      <GoogleLogin />
    </main>
  );
}
