import React from 'react'
import { ACCENT_COLORS, useTheme } from '../../contexts/theme-context'
import { MdOutlineLightMode, MdOutlineNightlight, MdClose } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";


const PopStyles = () => {
    const { isDarkMode, toggleDarkMode, selectedAccent, setAccent } = useTheme();
    return (
        <div className=" p-4 rounded-md relative">
            <span className="text-secondary-text text-xs mb-3 px-2 block">Light/Dark Mode</span>
            <div onClick={toggleDarkMode}
                className="display-mode-button mb-2 w-full cursor-pointer py-2 bg-primary-text rounded-3xl text-main"
                aria-label="Toggle Dark Mode">
                {isDarkMode ?
                    <div className='flex justify-center items-center gap-2'>
                        <MdOutlineLightMode />
                        <p className='text-xs font-bold'>Light mode</p>
                    </div>
                    :
                    <div className='flex justify-center items-center gap-2'>
                        <MdOutlineNightlight />
                        <p className='text-xs font-bold'>Dark mode</p>
                    </div>
                }
            </div>
            <span className="text-secondary-text text-xs mb-1 px-2 block">Accent Color</span>
            <div className="grid grid-cols-5 gap-1">
                {Object.entries(ACCENT_COLORS).map(([name, hex]) => (
                    <button key={name}
                        onClick={() => setAccent(name as keyof typeof ACCENT_COLORS)}
                        className={`
                      w-4 h-4 rounded-sm transition-all duration-200
                      flex items-center justify-center
                      ${selectedAccent === name ? 'border-accent' : 'border-transparent'}
                      hover:opacity-80
                    `}
                        style={{ backgroundColor: hex }}
                        aria-label={`Select ${name} accent`}
                        title={`Select ${name} accent`}
                    >
                        {selectedAccent === name && (
                            <BsCheckLg className='text-white' />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PopStyles