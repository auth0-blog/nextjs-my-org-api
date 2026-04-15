"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { isOrgAdmin } from "@/lib/auth0-utils";


export default function Header() {
  const { user, isLoading, error } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [erroredPicture, setErroredPicture] = useState<string | null>(null);
  const picture = user?.picture ?? null;
  const FALLBACK_AVATAR_SM =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2363b3ed'/%3E%3Cpath d='M20 18c3 0 5.46-2.46 5.46-5.46S23 7.09 20 7.09s-5.46 2.46-5.46 5.46S17 18 20 18zm0 2.73c-3.64 0-10.91 1.82-10.91 5.46v1.36c0 .75.61 1.36 1.36 1.36h19.1c.75 0 1.36-.61 1.36-1.36v-1.36c0-3.64-7.28-5.46-10.91-5.46z' fill='%23fff'/%3E%3C/svg%3E";
 
  const avatarSrc = picture && picture !== erroredPicture ? picture : FALLBACK_AVATAR_SM;

  // Determine if the user is an org admin (only relevant if they're authenticated and in an org). 
  const isAdmin = user ? isOrgAdmin(user) : false;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-surface sticky top-0 z-[1000] border-b border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
      <div className="max-w-[1200px] mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-app-text no-underline transition-colors duration-300 hover:text-accent">
          My SaaS App
        </Link>
        
        <div className="flex items-center min-h-[40px]">
          {isLoading ? (
            <div className="w-2 h-2 rounded-full bg-accent animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          ) : error || !user ? (
            <a
              href="/auth/login"
              className="px-4 py-1.5 rounded-lg bg-accent text-app-bg text-sm font-semibold uppercase tracking-wider no-underline transition-all duration-200 hover:bg-accent-hover"
            >
              Log In
            </a>
          ) : (
            <div className="relative" ref={menuRef}>
              <button 
                className="flex items-center gap-3 bg-transparent border-0 cursor-pointer p-0 outline-none text-inherit font-[inherit]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="User menu"
              >
                <Image
                  src={avatarSrc}
                  alt={user.name || 'User'}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-accent transition-transform duration-300 hover:scale-105"
                  unoptimized={avatarSrc.startsWith('data:')}
                  onError={() => setErroredPicture(picture)}
                />
                <span className="text-text-sec text-[0.95rem] font-medium">{user.name}</span>
              </button>
              
           
              {isMenuOpen && (
                <div className="header-dropdown-menu absolute top-[calc(100%+0.5rem)] right-0 bg-surface-2 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-[180px] overflow-hidden border border-white/10 z-[1001]">
                  {/* Conditionally show Admin Dashboard link if user is in an org and is an admin */}
                  {user?.org_id && isAdmin && (
                      <Link href="/admin" className="header-dropdown-item">
                        🔐 Admin Dashboard
                      </Link>
                  )}
                  <Link href="/profile" className="header-dropdown-item">
                    Profile
                  </Link>
                  <form action="/auth/logout" method="GET">
                    <button type="submit" className="header-dropdown-item">
                      Logout
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
