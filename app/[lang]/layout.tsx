import Navbar from "../components/navbar";
import { getDictionary } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function LangLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: { lang: 'en' | 'es' };
  }>) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <Navbar dict={dict} />
            <main className='container mx-auto px-4'>
              {children}
            </main>
        </>
    )
  }