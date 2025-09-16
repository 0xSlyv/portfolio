"use client"

import React from 'react'
import PopStyles from './pop-styles';
import Popover from './pop-over'
import { IoMdColorPalette, IoMdHome } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import Link from 'next/link';

interface NavbarDictionary {
  navbar: {
    home: string;
    styles: string;
    language: string;
  };
  languages: {
    en: string;
    es: string;
  };
}

const Navbar = ({ dict }: { dict: NavbarDictionary }) => {
  return (
    <header className="nav-header">
      <nav>
        <Link href="/" className="nav-content">
          <IoMdHome />
          {dict.navbar.home}
        </Link>
      </nav>

      {/* <nav>
        <a href={`/${dict}/blog`} className="nav-content">
          <MdBook />
          {dict.navbar.blog}
        </a>
      </nav> */}

      {/* <nav>
        <a href="mailto:slyv.dev@gmail.com" className="nav-content">
          <MdContactMail />
          {dict.navbar.contact}
        </a>
      </nav> */}

      <nav>
        <Popover
          trigger={
            <a className="nav-content">
              <IoMdColorPalette />
              {dict.navbar.styles}
            </a>
          }
          mode="click"
          position="right-bottom"
        >
          {<PopStyles />}
        </Popover>
      </nav>

      <nav className="nav-item">
        <Popover
          trigger={

            <a className="nav-content">
              <IoLanguage />
              {dict.navbar.language}
            </a>
          }
          mode="click"
          position="right-bottom"
        >
          {<div className='bg-hover p-4 rounded-md'>
            <a href={'/en'} className="block text-primary-text text-xs py-1">{dict.languages.en}</a>
            <a href={'/es'} className="block text-primary-text text-xs py-1">{dict.languages.es}</a>
          </div>}
        </Popover>
      </nav>
    </header>
  )
}
export default Navbar

      // <nav className="nav-item">
      //   <Popover
      //     trigger={
      //       <a className="group text-theme-color transition duration-200 flex items-center gap-1 hover:text-hover">
      //         <IoMdColorPalette />
      //         {dict.navbar.styles}
      //         <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-theme-color"></span>
      //       </a>
      //     }
      //     mode="click"
      //     position="right-bottom"
      //   >
      //     {<PopStyles />}
      //   </Popover>
      // </nav>