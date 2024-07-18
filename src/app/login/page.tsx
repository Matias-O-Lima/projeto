import { LoginForm } from '@/components/forms/login-form';

export default function AuthLoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <>
      <div className="flex items-stretch">
        <div className="flex-[560px_1_0] min-[1101px]:max-w-[560px] max-[1100px]:flex-1">
          <div className="h-[100dvh] bg-gray-850 p-20 overflow-auto max-[1100px]:h-auto max-[1100px]:min-h-[calc(100dvh-16px)] max-[1100px]:p-7">
            <LoginForm
              email={searchParams?.email ?? ""}
              hexFirstAccess={searchParams?.hexFirstAccess ?? ""}
            />
          </div>
          <div className="w-full h-4 bg-[linear-gradient(90deg,#02C59B,#427DC2,#8234E9,#B244F4)] hidden max-[1100px]:block"></div>
        </div>
        <div className="flex-1 bg-[url(/assets/bg.jpg)] bg-cover bg-center max-[1100px]:hidden"></div>

      </div>
    </>
  );
}
