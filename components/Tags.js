
const Tags = ({ tags, currentTag }) => {
  if (!tags) return null
  return (
    <div className="tag-container">
      <ul className="flex flex-wrap max-w-full mt-4 overflow-x-auto">
        {Object.keys(tags).map(key => {
          const selected = key === currentTag
          return (
            <a key={key} href={selected ? '/search' : `/tag/${encodeURIComponent(key)}`}>
              <a>
                <li
                  className={`mr-3 my-1 py-2 font-medium border px-4 whitespace-nowrap dark:text-gray-300 ${
                    selected
                      ? 'text-white bg-black border-black dark:bg-gray-600 dark:border-gray-600'
                      : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-night dark:border-gray-800'
                  }`}
                >
                  {`${key} (${tags[key]})`}
                </li>
              </a>
            </a>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags
