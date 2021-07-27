import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const Pagination = ({ page, showNext }) => {
  const locale = useLocale()
  const currentPage = +page
  return (
    <div className="flex justify-between font-medium text-black dark:text-gray-100">
      <a
        href={
          currentPage - 1 === 1
            ? `${BLOG.path || '/'}`
            : `/page/${currentPage - 1}`
        }
      >
        <button
          rel="prev"
          className={`${
            currentPage === 1 ? 'invisible' : 'block'
          } cursor-pointer`}
        >
          ← {locale.PAGINATION.PREV}
        </button>
      </a>
      <a href={`/page/${currentPage + 1}`}>
        <button
          rel="next"
          className={`${+showNext ? 'block' : 'invisible'} cursor-pointer`}
        >
          {locale.PAGINATION.NEXT} →
        </button>
      </a>
    </div>
  )
}

export default Pagination
