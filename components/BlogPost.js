import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import TagItem from '@/components/TagItem'

const BlogPost = ({ post }) => {
  return (
      <article key={post.id} className="mb-6 md:mb-8 max-w-md mx-auto bg-white rounded-md shadow-card overflow-hidden md:max-w-4xl">
        <div className="md:flex dark:bg-gray-800 border dark:border-night  dark:hover:bg-gray-700 hover:bg-gray-50">
          <Link className="md:flex-shrink-0" href={`${BLOG.path}/${post.slug}`} >
            <img className="h-52 w-full md:h-44 md:w-56 object-cover" src={post.page_cover ?? post.page_image} alt={post.title}/>
          </Link>
          <main className="p-8">
            <a href={`${BLOG.path}/${post.slug}`} className="block my-1 text-2xl leading-tight font-semibold text-black dark:text-gray-200 hover:underline">{post.title}</a>
            <span className="uppercase text-center tracking-wide text-sm text-gray-700 dark:text-gray-400 font-semibold float-left py-1 mr-2">{formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}</span>
            {post.tags && (
              <span className="flex flex-nowrap max-w-full overflow-x-auto article-tags text-gray-700 dark:text-gray-400">
                  {post.tags.map(tag => (
                    <TagItem key={tag} tag={tag} />
                  ))}
              </span>
            )}
            <p className="mt-2 text-gray-500 dark:text-gray-400">{post.summary}</p>
          </main>
        </div>
      </article>
  )
}

export default BlogPost
