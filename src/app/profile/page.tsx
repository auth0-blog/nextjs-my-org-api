// src/app/profile/page.tsx
import { auth0 } from "@/lib/auth0";
import Profile from "@/components/Profile";
import LogoutButton from "@/components/LogoutButton";

export default auth0.withPageAuthRequired(
  async function ProfilePage() {
    // withPageAuthRequired guarantees session exists — redirects to /auth/login?returnTo=/profile if not
    const { user } = (await auth0.getSession())!;

    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] w-full p-4">
        <div className="bg-surface rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col items-center gap-8 p-12 max-w-[500px] w-[90%] animate-[fadeInScale_0.8s_ease-out_forwards] sm:p-8 sm:gap-6">
          <h1 className="text-[2.8rem] font-bold text-app-text text-center [text-shadow:0_4px_10px_rgba(0,0,0,0.3)] opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.4s] sm:text-[2.2rem]">User Profile</h1>
          <Profile user={user} />
          <LogoutButton />
        </div>
      </div>
    );
  },
  { returnTo: "/profile" }
);
