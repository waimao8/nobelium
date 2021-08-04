import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`}>
    <a>
      <p className="hover:shadow hover:scale-105 hover:bg-blue-500 hover:text-white transform duration-200 mr-1 rounded-full px-2 py-1 border leading-none text-sm dark:border-gray-600">
        {tag}
      </p>
    </a>
  </Link>
)

export default TagItem
