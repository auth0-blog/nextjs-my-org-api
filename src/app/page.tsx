import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] w-full p-4">
      <div className="bg-surface rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col items-center gap-8 p-12 max-w-[500px] w-[90%] animate-[fadeInScale_0.8s_ease-out_forwards] sm:p-8 sm:gap-6">
        <div className="rounded-[15px] p-10 flex flex-col items-center gap-[1.8rem] w-[calc(100%-2rem)] opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.6s] sm:p-8">
          {user ? (
            <div className="flex flex-col items-center gap-6 w-full">
              <p className="text-2xl text-success font-semibold opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.8s]">✅ Successfully logged in!</p>
              <Profile user={user} />
              <LogoutButton />
            </div>
          ) : (
            <>
              <p className="text-[1.25rem] text-text-dim text-center leading-relaxed font-normal">
                Welcome! Please log in to access your protected content.
              </p>
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}