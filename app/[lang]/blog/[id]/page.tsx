
import { getArticleData } from '@/lib/articles';

export default async function Post({ params }: { params: { id: string, lang: string } }) {
  const postData = await getArticleData(params.id, params.lang);
  return (
    <article>
      <h1 className='text-4xl font-bold'>{postData.title}</h1>
      <div className='date'>
        {postData.date}
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
