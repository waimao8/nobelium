import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
      <article key={post.id} className="mb-6 md:mb-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
        <div className="md:flex">
          <Link className="md:flex-shrink-0" href={`${BLOG.path}/${post.slug}`} >
            <img className="h-52 w-full md:h-44 md:w-56 object-cover" src={post.page_cover ?? post.page_image}
                 alt={post.title}/>
          </Link>
          <main className="p-8 dark:text-gray-300">
            <a href={`${BLOG.path}/${post.slug}`} className="block mt-1 text-xl leading-tight font-medium text-black hover:underline">{post.title}</a>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}</div>
            <p className="mt-2 text-gray-500">{post.summary}</p>
          </main>
        </div>
      </article>
  )
}

export default BlogPost
