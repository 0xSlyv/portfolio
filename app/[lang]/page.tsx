import { getDictionary } from './dictionaries'
import Technologies from './components/technologies'
import Projects from './components/projects'
import Blog from './components/blog'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const pfpImage = "https://avatars.githubusercontent.com/u/151973031?v=4"

  return (
    <>
      <div className='flex flex-row items-center justify-center animate-swipe-in'>
        <img className='rounded-full size-50' src={pfpImage} alt="0xSlyv's profile picture" />
        <div className='ml-8'>
          <h1 className="text-4xl font-bold">{dict.home.greeting}</h1>
          <p className="mt-4">{dict.home.about}</p>
        </div>
      </div>
      <Technologies />
      <Projects/>
      <Blog lang={lang}/>
    </>
  )
}
