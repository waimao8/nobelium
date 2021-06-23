import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
      <article key={post.id} className="mb-6 md:mb-8 max-w-md mx-auto bg-white rounded-md shadow-xl overflow-hidden md:max-w-3xl">
        <div className="md:flex dark:bg-gray-800 border">
          <Link className="md:flex-shrink-0" href={`${BLOG.path}/${post.slug}`} >
            <img className="h-52 w-full md:h-44 md:w-56 object-cover" src={post.page_cover ?? post.page_image} alt={post.title}/>
          </Link>
          <main className="p-8">
            <a href={`${BLOG.path}/${post.slug}`} className="block my-2 text-xl leading-tight font-semibold text-black dark:text-gray-200 hover:underline">{post.title}</a>
            <div className="">
              <p className="uppercase text-center tracking-wide text-sm text-gray-600 font-semibold w-32 p-1 border rounded-xl">{formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}</p>
            </div>
            <p className="mt-2 text-gray-500">{post.summary}</p>
          </main>
        </div>
      </article>
  )
}

export default BlogPost
