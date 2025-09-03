"use client"

import React from 'react'
import PopStyles from './pop-styles';
import NavItem from './nav-item';
import Link from 'next/link';

const Navbar = ({ dict }: { dict: any }) => {
  return (
    <header className="nav-header">
      <Link href="en/home">
        <NavItem
          setName={dict.navbar.home}
        />
      </Link>
      <Link href="en/blog">
        <NavItem
          setName={dict.navbar.blog}
        />
      </Link>
      <NavItem
        setName={dict.navbar.styles}
        setPopContent={<PopStyles />}
      />
      <NavItem
        setName={dict.navbar.language}
        setPopContent={<>
          <Link href={'/en'} className="display-mode-button text-secondary-text text-xs mb-1 px-6 block">{dict.languages.en}</Link>
          <Link href={'/es'} className="display-mode-button text-secondary-text text-xs mb-1 px-6 block">{dict.languages.es}</Link>
        </>}
      />

    </header>
  )
}
export default Navbar