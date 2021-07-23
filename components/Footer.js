import BLOG from '@/blog.config'
import Link from 'next/link'

const Footer = ({ fullWidth = true }) => {
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
          <span><a href="https://beian.miit.gov.cn/" className='fa fa-check-circle-o'> 闽ICP备20010331号</a></span>
          <span><span className='fa fa-copyright'/> {from === y || !from ? y : `${from} - ${y}`} {BLOG.author}</span>
          <span id='busuanzi_container_site_pv' className='fa fa-eye'> 访问&nbsp;<span id='busuanzi_value_site_pv'></span></span>
          <span><Link href='/feed'><a className='fa fa-rss'> 订阅</a></Link></span>
          <span><Link href='/about'><a className='fa fa-info'> 关于</a></Link></span>
        </div>
      </div>
    </div>
  )
}

export default Footer
