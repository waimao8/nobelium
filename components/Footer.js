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
      </div>

      {/* 统计脚本 */}
      {BLOG.analytics && BLOG.analytics.provider === 'ackee' && (
        <script
          async
          src={BLOG.analytics.ackeeConfig.tracker}
          data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
          data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
        ></script>
      )}

      {BLOG.autoCollapsedNavBar === true && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var windowTop=0;
              function scrollTrigger(){
                  let scrollS = window.scrollY;
                  let nav = document.querySelector('.sticky-nav');
                  if(scrollS >= windowTop){
                      nav.style.opacity = 0;
                      windowTop = scrollS;
                  }else{
                      nav.style.opacity = 1;
                      windowTop = scrollS;
                  }
              };
              window.addEventListener('scroll',scrollTrigger);
          `
          }}
        />
      )}
      {/* 百度 */}
      {(
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  var _hmt = _hmt || [];
                  (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?f683ef76f06bb187cbed5546f6f28f28";
                    var s = document.getElementsByTagName("script")[0]; 
                    s.parentNode.insertBefore(hm, s);
                  })();
                  `
            }}
          />
        </>
      )}
      {/* 不蒜子 */}
      <script async
              src={'//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'}
      />
      {(
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1279970751'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D1279970751' type='text/javascript'%3E%3C/script%3E"));
                  `
            }}
          />
        </>
      )}

      {/* 谷歌统计 */}
      {BLOG.analytics && BLOG.analytics.provider === 'ga' && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </>
      )}
    </div>
  )
}

export default Footer
