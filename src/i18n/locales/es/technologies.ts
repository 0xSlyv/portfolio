const technologies = {
  name: "Technologías",
  web: [
    { name: "Next", url: "https://nextjs.org/" },
    { name: "React", url: "https://react.dev/" },
    { name: "TypeScript", url: "https://www.typescriptlang.org/" },
    { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "Angular", url: "https://angular.io/" },
    { name: "Bootstrap", url: "https://getbootstrap.com/" }
  ],
  design: [
    { name: "Figma", url: "https://www.figma.com/" },
    { name: "Affinity Studio", url: "https://affinity.studio" },
    { name: "Photoshop", url: "https://www.adobe.com/creativecloud.html" },
    { name: "Illustrator", url: "https://www.adobe.com/creativecloud.html" },
    { name: "Canva", url: "https://www.canva.com/" },
    { name: "Krita", url: "https://krita.org/" },
    { name: "Blender", url: "https://www.blender.org/"  }
  ],
  mobile: [
    { name: "React Native", url: "https://reactnative.dev/" },
    { name: "Flutter", url: "https://flutter.dev/" }
  ],
  backend: [
    { name: "Python", url: "https://www.python.org/" },
    { name: "Java", url: "https://www.java.com/" },
    { name: "C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" }
  ],
  databases: [
    { name: "MySQL", url: "https://www.mysql.com/" },
    { name: "PostgreSQL", url: "https://www.postgresql.org/" }
  ],
  gameDev: [
    { name: "Unity", url: "https://unity.com/" },
    { name: "Godot", url: "https://godotengine.org/" }
  ],
  devops: [
    { name: "Docker", url: "https://www.docker.com/" },
    { name: "Git", url: "https://git-scm.com/" },
    { name: "GitHub", url: "https://github.com/" },
    { name: "Linux", url: "https://www.linux.org/" },
    { name: "PowerShell", url: "https://learn.microsoft.com/en-us/powershell/" }
  ],

  libraries: [
    { name: "Pandas", url: "https://pandas.pydata.org/" },
    { name: "Matplotlib", url: "https://matplotlib.org/" },
    { name: "GSAP", url: "https://gsap.com/" },
    { name: "Motion", url: "https://motion.dev/" },
    { name: "BarbaJS", url: "https://barba.js.org/" }
  ]
} as const;

export default technologies;


