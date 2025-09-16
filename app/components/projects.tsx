'use client'

import React, { useEffect, useState } from 'react'
import Popover from './pop-over';
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

const Projects = () => {
    const [projects, setProjects] = useState<{ title: string; date: string; technologies: string[] }[]>([]);
    const [technologies, setTechnologies] = useState<{ name: string; icon: string }[]>([]);

    useEffect(() => {
        Promise.all([
            fetch('/db/projects.json').then((res) => res.json()),
            fetch('/db/technologies.json').then((res) => res.json())
        ]).then(([projectData, techData]) => {
            setProjects(projectData);
            setTechnologies(techData);
        });
    }, []);

    const getTechIcon = (techName: string) => {
        const tech = technologies.find(t => t.name === techName);
        return tech ? getIcon(tech.icon) : null;
    }

    return (
        <div className='animate-swipe-in'>
            <h2 className='text-2xl text-theme-color font-bold text-center pt-8'>Projects</h2>
            {projects.map((p) => (
                <div key={p.title} className='flex items-center flex-wrap py-2 text-theme-color'>
                    <a href="#" className="group transition duration-100 mr-2">
                        ⇀ {p.title} - {p.date}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-theme-color"></span>
                    </a>
                    <div className='flex gap-2 items-center'>
                        [
                        {p.technologies.map(techName => (
                            <Popover key={techName} trigger={
                                <div className='text-md'>
                                    {getTechIcon(techName)}
                                </div>
                            }
                            position='top-center'
                            >
                                <span className='speech-bubble'>{techName}</span>
                            </Popover>
                        ))}
                        ]
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Projects