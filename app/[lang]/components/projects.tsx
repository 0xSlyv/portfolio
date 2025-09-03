'use client'

import React, { useEffect, useState } from 'react'

const Projects = () => {
    const [project, setProject] = useState<{ title: string; date: string; technologies: string }[]>([]);

    useEffect(() => {
        fetch('/db/projects.json')
            .then((res) => res.json())
            .then((data) => setProject(data));
    }, []);
    return (
        <div>
            <h2 className='text-2xl text-primary-text font-bold text-center pt-8'>Projects</h2>
            {project.map((p) => (
                <div className='flex flex-wrap py-2 text-theme-color'>
                    <a href="#" className="group transition duration-100">
                        ⇀ {p.title} - {p.date} // {p.technologies}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-theme-color"></span>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Projects