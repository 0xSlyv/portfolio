
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import moment from 'moment';

const articlesDirectory = path.join(process.cwd(), 'articles');

export function getSortedArticlesData(lang: string) {
  const articlesLangDirectory = path.join(articlesDirectory, lang);
  const fileNames = fs.readdirSync(articlesLangDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesLangDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { title: string; date: string; category: string; language: string }),
    };
  });
  return allArticlesData.sort((a, b) => {
    if (moment(a.date, 'DD-MM-YYYY').isBefore(moment(b.date, 'DD-MM-YYYY'))) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getArticleData(id: string, lang: string) {
  const fullPath = path.join(articlesDirectory, lang, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date:string; category: string; language: string }),
  };
}
