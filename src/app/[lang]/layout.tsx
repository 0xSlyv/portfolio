import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "../globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slyv's Portfolio",
  description: "Welcome to my personal portfolio showcasing my projects and skills.",
  icons: {
    icon: '/favicon.ico',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground relative`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
