import { Language } from "@/i18n/types";

interface Article {
  title: string;
  category: string;
  date: string;
  content: string;
  slug: string;
}

type ArticleImport = () => Promise<{ default: Omit<Article, 'slug'> }>;
type ArticleImports = {
  [lang in Language]: {
    personal: Record<string, ArticleImport>;
    tech: Record<string, ArticleImport>;
  };
};

// Import all article files manually
const articleImports: ArticleImports = {
  en: {
    personal: {
      'thoughts': () => import('@/i18n/locales/en/articles/thoughts'),
      'secret-witch-anime': () => import('@/i18n/locales/en/articles/secret-witch-anime')
    },
    tech: {
      'thoughts': () => import('@/i18n/locales/en/articles/ventoy-theming')
    }
  },
  es: {
    personal: {
      'thoughts': () => import('@/i18n/locales/es/articles/thoughts'),
      'secret-witch-anime': () => import('@/i18n/locales/es/articles/secret-witch-anime')
    },
    tech: {
      'thoughts': () => import('@/i18n/locales/es/articles/ventoy-theming')
    }
  }
};

export async function getArticles(lang: Language, type: 'personal' | 'tech'): Promise<Article[]> {
  try {
    const articles = [];
    const articleMap = articleImports[lang]?.[type] || {};
    
    // Import each article file
    for (const [slug, importFn] of Object.entries(articleMap)) {
      try {
        const module = await importFn();
        articles.push({
          ...module.default,
          slug
        });
      } catch (error) {
        console.error(`Error loading article ${slug} for ${lang}:`, error);
      }
    }
    
    return articles;
  } catch (error) {
    console.error(`Error loading ${type} articles for ${lang}:`, error);
    return [];
  }
}

export async function getArticle(slug: string, lang: Language, type: 'personal' | 'tech'): Promise<Article | null> {
  try {
    const articles = await getArticles(lang, type);
    return articles.find(article => article.slug === slug) || null;
  } catch (error) {
    console.error(`Error loading article ${slug} for ${lang}:`, error);
    return null;
  }
}
