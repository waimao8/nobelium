import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
import CJK from '@/lib/cjk'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        lang={BLOG.lang}
        className={BLOG.appearance === 'dark' ? 'dark' : undefined}
      >
        <Head>
          {BLOG.font && BLOG.font === 'serif' ? (
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
          ) : (
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

          {['zh', 'ja', 'ko'].includes(
            BLOG.lang.slice(0, 2).toLocaleLowerCase()
          ) && (
            <>
              {/* 国内谷歌字体镜像 
                    fonts.gstatic.com = fonts-gstatic.proxy.ustclug.org
                    fonts.googleapis.com = fonts.proxy.ustclug.org
                */}
              <link
                rel="preconnect"
                href="https://fonts-gstatic.proxy.ustclug.org"
                crossOrigin="anonymous"
              />
              
              <link
                rel="preload"
                as="style"
                href={`https://fonts.proxy.ustclug.org/css2?family=Noto+${
                  BLOG.font === 'serif' ? 'Serif' : 'Sans'
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
              <link
                rel="stylesheet"
                href={`https://fonts.proxy.ustclug.org/css2?family=Noto+${
                  BLOG.font === 'serif' ? 'Serif' : 'Sans'
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
              <noscript>
                <link
                  rel="stylesheet"
                  href={`https://fonts.proxy.ustclug.org/css2?family=Noto+${
                    BLOG.font === 'serif' ? 'Serif' : 'Sans'
                  }+${CJK()}:wght@400;500;700&display=swap`}
                />
              </noscript>
            </>
          )}

          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
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
        </Head>
        <body className="bg-day dark:bg-night">
          <Main />
          <NextScript />
        </body>
        {/* 百度统计 */}
        {1===1 && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  var _hmt = _hmt || [];
                  (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?b94b4ca8c8254fb9adb49ac9aaf043af";
                    var s = document.getElementsByTagName("script")[0]; 
                    s.parentNode.insertBefore(hm, s);
                  })();
                  `
                }}
              />
            </>
          )}
      </Html>
    )
  }
}

export default MyDocument
