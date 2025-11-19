// Common translations that can be used across the app
export type CommonTranslations = {
  navbar: {
    home: string;
    blog: string;
    styles: string;
    language: string;
    contact: string;
  };
  languages: {
    en: string;
    es: string;
  };
  view_project: string;
  view_post: string;
  close: string;
  loading: string;
  no_posts_available: string;
  read_more: string;
  posted_on: string;
  category: string;
};

// Home page specific translations
export type HomeTranslations = {
  greeting: string;
  about: string;
};

// Projects related translations
export type Project = {
  title: string;
  date: string;
  technologies: string[];
  description: string;
  url: string;
};

export type ProjectsTranslations = {
  title: string;
  technologies_used: string;
  project_list: Project[];
};

// Technologies section
export type Technology = {
  name: string;
  url: string;
};

export type TechnologiesTranslations = {
  [key: string]: Technology[];
};

// Blog related translations
export type BlogTranslations = {
  title: string;
  no_posts: string;
  read_more: string;
  categories: {
    [key: string]: string;
  };
};

// Main translation type that combines all namespaces
export type Translation = {
  common: CommonTranslations;
  home: HomeTranslations;
  projects: ProjectsTranslations;
  technologies: TechnologiesTranslations;
  blog: BlogTranslations;
};

export type Language = 'en' | 'es';
