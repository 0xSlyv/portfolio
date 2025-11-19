'use client';

import { useI18n } from "@/i18n/I18nProvider";
import { getArticles } from "@/lib/articles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Article {
  title: string;
  category: string;
  date: string;
  content: string;
  slug: string;
}

export default function PersonalBlog() {
  const params = useParams();
  const lang = params.lang as string;
  const { t } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles(lang as 'en' | 'es', 'tech');
        setArticles(data);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [lang]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t.blog.title}</h1>
        <p className="text-lg">{t.blog.loading}</p>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t.blog.techTitle}</h1>
        <p className="text-lg">{t.blog.no_posts}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 w-full max-w-4xl mx-4">
      <h1 className="text-4xl font-bold mb-8 text-theme-color">{t.blog.techTitle}</h1>
      <p className="text-lg text-muted-foreground mb-12">{t.blog.techDescription}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <a
            key={article.slug}
            className="bg-main/90 p-6 rounded-lg border border-subtle transition-all duration-300 ease-in-out hover:bg-theme-color/10 hover:border-theme-color/90 border rounded-lg text-theme-color group"
            href={`/${params.lang}/tech-blog/${article.slug}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-theme/80 ">
                {article.date}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {article.title}
            </h2>

            <p
              className="inline-flex items-center text-primary underline text-sm text-primary-text "
            >
              {t.blog.read_more}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}