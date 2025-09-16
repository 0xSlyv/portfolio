import Navbar from "../components/navbar";
import { getDictionary } from "./dictionaries";

export default async function LangLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: 'en' | 'es' }>;
  }>) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return (
        <>
            <Navbar dict={dict} />
            <main className='container mx-auto px-4'>
              {children}
            </main>
        </>
    )
  }