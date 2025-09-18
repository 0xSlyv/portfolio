import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "./contexts/theme-context";

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "All of my react, nextjs, godot, angular, node, bun, java, python, figma, css, tailwind, blender, logos, videos on youtube, drawings, 3D models from Blender, and more projects are showcased.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${vt323.variable} antialiased bg-main text-primary-text mb-8`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
