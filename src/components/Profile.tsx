"use client";

import { useState } from "react";
import type { User } from "@auth0/nextjs-auth0/types";
import Image from "next/image";

interface Props {
  user: User;
}

export default function Profile({ user }: Props) {
  const [erroredPicture, setErroredPicture] = useState<string | null>(null);
  const picture = user.picture ?? null;
  const FALLBACK_AVATAR_LG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2363b3ed'/%3E%3Cpath d='M50 45c7.5 0 13.64-6.14 13.64-13.64S57.5 17.72 50 17.72s-13.64 6.14-13.64 13.64S42.5 45 50 45zm0 6.82c-9.09 0-27.28 4.56-27.28 13.64v3.41c0 1.88 1.53 3.41 3.41 3.41h47.74c1.88 0 3.41-1.53 3.41-3.41v-3.41c0-9.08-18.19-13.64-27.28-13.64z' fill='%23fff'/%3E%3C/svg%3E";
  const avatarSrc = picture && picture !== erroredPicture ? picture : FALLBACK_AVATAR_LG;

  return (
    <div className="flex flex-col items-center gap-3 p-[2.2rem] animate-[scaleIn_0.8s_ease-out_forwards_1.2s]">
      <Image
        src={avatarSrc}
        alt={user.name || 'User profile'}
        width={100}
        height={100}
        className="w-[110px] h-[110px] rounded-full transition-transform duration-300 object-cover hover:scale-105"
        unoptimized={avatarSrc.startsWith('data:')}
        onError={() => setErroredPicture(picture)}
      />
      <h2 className="text-[2rem] mt-2 text-center">{user.name}</h2>
      <p className="text-[1.15rem] text-center">{user.email}</p>
    </div>
  );
}