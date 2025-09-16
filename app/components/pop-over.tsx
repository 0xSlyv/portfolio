'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  mode?: 'hover' | 'click';
  position?: 'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'top-center' | 'bottom-center';
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  mode = 'hover',
  position = 'right-top',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleTriggerEnter = () => {
    if (mode === 'hover') {
      setIsOpen(true);
    }
  };

  const handleTriggerLeave = () => {
    if (mode === 'hover') {
      setIsOpen(false);
    }
  };

  const handleTriggerClick = (event: React.MouseEvent) => {
    if (mode === 'click') {
      event.stopPropagation(); // Chaos prevention
      setIsOpen((prev) => !prev);
    }
  };

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mode === 'click' && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mode]);

  const getPositionClasses = () => {
    switch (position) {
      case 'left-top': return 'bottom-full left-0 mb-2';
      case 'left-bottom': return 'top-full left-0 mt-2';
      case 'right-top': return 'bottom-full right-0 mb-2';
      case 'right-bottom': return 'top-full right-0 mt-2';
      case 'top-center': return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom-center': return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      default: return 'top-full right-0 mt-2';
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={handleTriggerEnter}
      onMouseLeave={handleTriggerLeave}
      onClick={handleTriggerClick}
    >
      {trigger}
      {isOpen && (
        <div
          className={`absolute
            ${getPositionClasses()}
            bg-primary rounded-lg z-50 min-w-max`
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;