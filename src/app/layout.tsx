import type { Metadata } from "next";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth0";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth0 Next.js App",
  description: "Next.js app with Auth0 authentication",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  return (
    <html lang="en">
      <body>
        <Auth0Provider user={session?.user}>
          <Header />
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}