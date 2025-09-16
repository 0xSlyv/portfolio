"use client"

import React, { useEffect, useState } from 'react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';

const iconLibs = {
  si: SiIcons,
  fa: FaIcons,
};

type IconLibrary = keyof typeof iconLibs;

const getIcon = (iconName: string) => {
  const lib = iconName.substring(0, 2).toLowerCase() as IconLibrary;
  const Icon = iconLibs[lib][iconName as keyof typeof iconLibs[typeof lib]] as React.ComponentType;
  return Icon ? <Icon /> : null;
};

const Technologies = () => {
  const [technologies, setTechnologies] = useState<{ name: string; icon: string }[]>([]);

  useEffect(() => {
    fetch('/db/technologies.json')
      .then((res) => res.json())
      .then((data) => setTechnologies(data));
  }, []);

  return (
    <div className='animate-swipe-in'>
        <h2 className='text-2xl font-bold text-center pt-8 text-theme-color'>Technologies</h2>
        <div className="flex flex-wrap justify-center gap-4 py-8">
        {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-2 ">
            <div className="text-sm text-theme-color">{getIcon(tech.icon)}</div>
            <span className="text-theme-color">{tech.name}</span>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Technologies;
