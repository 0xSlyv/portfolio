import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "../globals.css";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  return (
    <Providers>
      {children}
    </Providers>
  );
}
