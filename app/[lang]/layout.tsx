import Navbar from "../components/navbar";
import { getDictionary } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function LangLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'en' | 'es');
    return (
        <>
            <Navbar dict={dict} />
            <main className='container mx-auto px-4'>
              {children}
            </main>
        </>
    )
  }