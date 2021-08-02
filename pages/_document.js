import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html
        lang={BLOG.lang}
        className={BLOG.appearance === 'dark' ? 'dark' : undefined}
      >
        <Head>
          {BLOG.font && BLOG.font === 'serif'
            ? (
              <>
                <link
                  rel="preload"
                  href="/fonts/SourceSerif.var.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
                <link
                  rel="preload"
                  href="/fonts/SourceSerif-Italic.var.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
              </>
              )
            : (
              <>
                <link
                  rel="preload"
                  href="/fonts/IBMPlexSansVar-Roman.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
                <link
                  rel="preload"
                  href="/fonts/IBMPlexSansVar-Italic.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
              </>
              )}

          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
          {/* 字体 */}
          <link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css"></link>

          {/* 统计脚本 */}
          {BLOG.isProd && BLOG.analytics && BLOG.analytics.provider === 'ackee' && (
            <script async src={BLOG.analytics.ackeeConfig.tracker}
                    data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
                    data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
            />
          )}

          {BLOG.isProd && BLOG.autoCollapsedNavBar === true && (
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
          {BLOG.isProd && (
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
          {BLOG.isProd && (
            <script async
                    src={'//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'}
            />
          )}

          {BLOG.isProd && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1279970751'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D1279970751' type='text/javascript'%3E%3C/script%3E"));
                  `
              }}
            />
          )}

          {/* 谷歌统计 */}
          {BLOG.isProd && BLOG.analytics && BLOG.analytics.provider === 'ga' && (
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
        </Head>
        <body className="bg-page dark:bg-night">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
