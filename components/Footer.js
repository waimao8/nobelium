import BLOG from '@/blog.config'
import Vercel from '@/components/Vercel'
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
            © {BLOG.author} {from === y || !from ? y : `${from} - ${y}`} <a href="https://beian.miit.gov.cn/">闽ICP备20010331号
</a>
          {/* 站长统计 */}
          {1===1 && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  document.write(unescape("%3Cspan id='cnzz_stat_icon_1279970751'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D1279970751' type='text/javascript'%3E%3C/script%3E"));
                  `
                }}
              />
            </>
          )}
          </p>
          <Vercel />
        </div>
      </div>
    </div>
  )
}

export default Footer
