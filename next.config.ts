import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Scope to known identity provider hosts that serve user.picture URLs.
    // Logo URLs in the admin dashboard use plain <img> and are not affected by this list.
    remotePatterns: [
      { protocol: "https", hostname: "s.gravatar.com" },            // Auth0 default avatars
      { protocol: "https", hostname: "*.auth0.com" },               // Auth0 CDN
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google avatars
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // GitHub avatars
    ],
  },
};

export default nextConfig;
