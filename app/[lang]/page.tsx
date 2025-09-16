import { getDictionary } from './dictionaries'
import Technologies from '../components/technologies'
import Projects from '../components/projects'
import Blog from '../components/blog'
import Popover from '../components/pop-over'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdContentCopy, MdArrowOutward } from "react-icons/md";
import CopyComponent from '../components/copy-component'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const pfpImage = "https://avatars.githubusercontent.com/u/151973031?v=4"

  return (
    <div>
      <div className='flex flex-row items-center justify-center animate-swipe-in '>
        <img className='rounded-full size-50 border-2 border-theme-color' src={pfpImage} alt="0xSlyv's profile picture" />
        <div className='ml-8'>
          <h1 className="text-4xl font-bold text-theme-color">{dict.home.greeting}</h1>
          <p className="mt-4 text-theme-color">{dict.home.about}</p>
          <span className="mt-4 text-xs text-theme-color underline">{dict.navbar.contact}</span>
          <div className='profile-badges'>
            <Popover
              trigger={
                <a href={`https://github.com/0xslyv`} target="_blank" rel="noopener noreferrer"><FaGithub className='icon' /></a>
              }
              mode="hover"
              position="top-center"
            >
              {<div className='speech-bubble'>
                <MdArrowOutward />
                Github
              </div>}
            </Popover>

            <Popover
              trigger={
                <a href={`https://twitter.com/0xslyv`} target="_blank" rel="noopener noreferrer"><FaXTwitter className='icon' /></a>
              }
              mode="hover"
              position="top-center"
            >
              {<div className='speech-bubble'>
                <MdArrowOutward />
                Twitter / X
              </div>}
            </Popover>

            <Popover
              trigger={
                <CopyComponent />
              }
              mode="hover"
              position="top-center"
            >
              {<div className='speech-bubble'>
                <MdContentCopy />
                0xslyv@proton.me
              </div>}
            </Popover>
          </div>
        </div>
      </div>
      <Technologies dict={dict.technologies} />
      <Projects dict={dict.projects} />
      <Blog lang={lang} />
    </div>
  )
}