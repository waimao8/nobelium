import '@/styles/notion.css'
import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'
import '@/styles/globals.css'
import 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'animate.css'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import { LocaleProvider } from '@/lib/locale'

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })

function MyApp ({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <>
        {BLOG.isProd && BLOG?.analytics?.provider === 'ackee' && (
          <Ackee
            ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
            ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
          />
        )}
        {BLOG.isProd && BLOG?.analytics?.provider === 'ga' && <Gtag />}
        <Component {...pageProps} />
      </>
    </LocaleProvider>
  )
}

export default MyApp
