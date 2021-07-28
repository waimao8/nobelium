import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import TagItem from '@/components/TagItem'

const BlogPost = ({ post }) => {
  return (
      <article key={post.id} className="cursor-pointer mb-6 md:mb-8  mx-auto bg-white rounded-md shadow-card overflow-hidden max-w-4xl animate__animated animate__bounceInUp">
        <a href={`${BLOG.path}/${post.slug}`} className='duration-100 transform hover:scale-105 md:flex dark:bg-gray-800 border dark:border-night  dark:hover:bg-gray-700 hover:bg-gray-50'>
            <div className='md:flex-shrink-0 md:w-52 md:h-52 rounded-lg'>
                <img className="w-full h-full max-h-52 object-cover p-1" src={post.page_cover ?? post.page_image} alt={post.title}/>
            </div>
          <main className="p-8">
            <div className="block my-1 text-2xl leading-tight font-semibold text-black dark:text-gray-200 hover:underline">{post.title}</div>
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
        </a>
      </article>
  )
}

export default BlogPost
