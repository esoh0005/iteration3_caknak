import "~/styles/globals.css";

import { type Metadata } from "next";
import { Great_Vibes, Sniglet } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "CAKNAK",
  description: "Your trusted magical companion for digital safety",
  icons: [{ rel: "icon", url: "/caknak-logo.png" }],
};

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const sniglet = Sniglet({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sniglet",
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${sniglet.variable}`}>  
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
