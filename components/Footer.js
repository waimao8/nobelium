import BLOG from '@/blog.config'
import Link from 'next/link'

const Footer = ({ fullWidth = true }) => {
  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since
  return (
    <div
      className={`mt-6 flex-shrink-0 m-auto w-full text-gray-500 text-center dark:text-gray-400 transition-all ${
        !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
      }`}
    >
      <hr className='border-gray-200 dark:border-gray-600' />
      <div className='my-4 text-sm leading-8 font-medium'>
        <Link href='/about'><a className='fa fa-info'> 关于本站</a></Link><span className="s"> | </span>
        <Link href='/feed'><a className='fa fa-rss'> RSS订阅</a></Link><span className="s"> | </span>
        <a href='https://www.cnzz.com/stat/website.php?web_id=1279970751' id='busuanzi_container_site_pv' className='fa fa-eye'> 访问量 <span id='busuanzi_value_site_pv'>0</span></a>
        <br/>
        <span><a href='https://beian.miit.gov.cn/'>闽ICP备20010331号</a> <span className='fa fa-copyright' /> {from === y || !from ? y : `${from} - ${y}`} {BLOG.author} All Rights Reserved</span>
        <br/>
        <span> Powered By <a href='https://vercel.com' className='hover:shadow-lg bg-white rounded px-2 py-1 shadow dark:bg-black dark:text-gray-400'>Vercel</a> & <a href='https://notion.so' className='hover:shadow-lg bg-white rounded px-2 py-1 shadow dark:bg-black dark:text-gray-400'>Notion</a> </span>
      </div>
    </div>
  )
}

export default Footer
