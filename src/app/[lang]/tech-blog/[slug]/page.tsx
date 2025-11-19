'use client';

import { useI18n } from "@/i18n/I18nProvider";
import { getArticle } from "@/lib/articles";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';

interface Article {
  title: string;
  category: string;
  date: string;
  content: string;
  slug: string;
}

export default function ArticlePage() {
  const params = useParams();
  const lang = params.lang as string;
  const slug = params.slug as string;
  const { t } = useI18n();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await getArticle(
          slug,
          lang as 'en' | 'es',
          'tech'
        );

        if (!data) {
          router.push(`/${lang}/tech-blog`);
          return;
        }

        const contentHtml = await markdownToHtml(data.content);

        setArticle({
          ...data,
          content: contentHtml
        });
      } catch (error) {
        console.error('Failed to load article:', error);
        router.push(`/${lang}/tech-blog`);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [lang, slug, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-lg">{t.blog.loading}</p>
      </div>
    );
  }

  if (!article) {
    return null; // Redirecting, so no need to render anything
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link
        href={`/${params.lang}/tech-blog`}
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t.blog.back_to_blog}
      </Link>

      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8">
          <span className="text-sm font-medium text-primary">
            {t.blog.categories[article.category.toLowerCase() as keyof typeof t.blog.categories] || article.category}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <p className="text-muted-foreground">{article.date}</p>
        </div>

        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: article.content
          }}
        />
      </article>
    </div>
  );
}
