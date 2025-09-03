import React from 'react'
import { ACCENT_COLORS, useTheme } from '../../contexts/theme-context'

const PopStyles = () => {
    const { isDarkMode, toggleDarkMode, selectedAccent, setAccent } = useTheme();
    return (

        <>
            <span className="text-secondary-text text-xs mb-1 px-2 block">Light/Dark Mode</span>
            <div onClick={toggleDarkMode}
                className="display-mode-button mb-2 w-full "
                aria-label="Toggle Dark Mode">
                {isDarkMode ?
                    <div className='flex justify-center items-center gap-2'>
                        {/* <Moon className='icon size-5' /> */}
                        <p className='text-primary-text text-xs font-bold'>Dark mode</p>
                    </div>
                    :
                    <div className='flex justify-center items-center gap-2'>
                        {/* <Sun className='icon size-5' /> */}
                        <p className='text-primary-text text-xs font-bold'>Light mode</p>
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
                            // <Check className="size-4 text-white drop-shadow" />
                            <div>hi</div>
                        )}
                    </button>
                ))}
            </div>
        </>
    )
}

export default PopStyles