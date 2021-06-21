import BLOG from '@/blog.config'
const Footer = ({ fullWidth }) => {
  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since
  return (
    <div
      className={`mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all ${
        !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
      }`}
    >
      <hr className="border-gray-200 dark:border-gray-600" />
      <div className="my-4 text-sm leading-6 font-medium">
        <div className="flex align-baseline justify-between flex-wrap">
          <p>
            © {BLOG.author} {from === y || !from ? y : `${from} - ${y}`}
            <a href="https://beian.miit.gov.cn/">闽ICP备20010331号</a>
          </p>
          <span id='busuanzi_container_site_pv'>本站总访问量<span id='busuanzi_value_site_pv'></span>次</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
