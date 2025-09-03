import { getSortedArticlesData } from '@/lib/articles';


const Blog = ({ lang }: { lang: string }) => {
    const posts = getSortedArticlesData(lang);
    return (
        <div>
            <h2 className='text-2xl font-bold text-center pt-8'>Blog</h2>
            {posts.map((p) => (
                <div className='flex flex-wrap py-2 text-theme-color'>
                    <a href={`/${lang}/blog/${p.id}`} className="group transition duration-100">
                        ⇀ {p.title} - {p.date}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-theme-color"></span>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Blog