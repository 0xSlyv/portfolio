import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./[lang]/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Slyv's Portfolio",
    description: "Welcome to my personal portfolio showcasing my projects and skills.",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
