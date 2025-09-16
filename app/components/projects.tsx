"use client";

import React, { useEffect, useState } from "react";
import Popover from "./pop-over";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import Modal from "./modal";

const iconLibs = {
  si: SiIcons,
  fa: FaIcons,
};

type IconLibrary = keyof typeof iconLibs;

const getIcon = (iconName: string) => {
  const lib = iconName.substring(0, 2).toLowerCase() as IconLibrary;
  const Icon = iconLibs[lib][
    iconName as keyof (typeof iconLibs)[typeof lib]
  ] as React.ComponentType;
  return Icon ? <Icon /> : null;
};

interface Project {
  title: string;
  date: string;
  technologies: string[];
  description: string;
  url: string;
}

const Projects = ({ dict }: { dict: any }) => {
  const [technologies, setTechnologies] = useState<
    { name: string; icon: string }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/db/technologies.json").then((res) => res.json()).then(setTechnologies);
  }, []);

  const getTechIcon = (techName: string) => {
    const tech = technologies.find((t) => t.name === techName);
    return tech ? getIcon(tech.icon) : null;
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="animate-swipe-in">
      <h2 className="text-2xl text-theme-color font-bold text-center pt-8">
        {dict.title}
      </h2>
      {dict.project_list.map((p: Project) => (
        <div
          key={p.title}
          className="flex items-center flex-wrap py-2 text-theme-color"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal(p);
            }}
            className="group transition duration-100 mr-2"
          >
            ⇀ {p.title} - {p.date}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-theme-color"></span>
          </a>
          <div className="flex gap-2 items-center">
            [
            {p.technologies.map((techName) => (
              <Popover
                key={techName}
                trigger={<div className="text-md">{getTechIcon(techName)}</div>}
                position="top-center"
              >
                <span className="speech-bubble">{techName}</span>
              </Popover>
            ))}
            ]
          </div>
        </div>
      ))}

      {selectedProject && (
  <Modal isOpen={!!selectedProject} onClose={closeModal}>
    <div>
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-theme-color">{selectedProject.title}</h3>
        <p className="text-md text-primary-text opacity-70 mt-1">{selectedProject.date}</p>
      </div>

      <p className="text-primary-text text-lg mb-8">{selectedProject.description}</p>

      <hr className="border-t border-hover my-8" />

      <div className="mb-8">
        <strong className="text-xl text-theme-color block mb-4">{dict.technologies_used}</strong>
        <div className="flex flex-wrap gap-4 items-center">
          {selectedProject.technologies.map((techName) => (
            <div key={techName} className="flex items-center gap-2 bg-hover p-3 rounded-lg">
              <div className="text-2xl text-theme-color">{getTechIcon(techName)}</div>
              <span className="text-primary-text text-md">{techName}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-6 mt-10">
        <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="bg-theme-color text-white py-3 px-8 rounded-lg text-lg shadow-md cursor-pointer hover:bg-theme-color/60 transition">
          {dict.view_project}
        </a>
      </div>
    </div>
  </Modal>
)}

    </div>
  );
};

export default Projects;