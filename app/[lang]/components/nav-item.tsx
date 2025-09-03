'use client'

import React from 'react'
import Popover from './pop-over'

const NavItem = React.forwardRef<HTMLAnchorElement, { setName: string; setPopContent?: React.ReactNode; href?: string }>(({ setName, setPopContent, href }, ref) => {
    return (
        <nav className="nav-item">
            <Popover
                trigger={
                    <a href={href} ref={ref} className="group text-theme-color transition duration-100">
                        {setName}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-theme-color"></span>
                    </a>
                }
                mode="click"
                position="right-bottom"
            >
                {setPopContent}
            </Popover>
        </nav>
    )
});

NavItem.displayName = 'NavItem';


export default NavItem