const BLOG = {
  title: 'TANG`s BLOG',
  author: 'TangHH',
  email: 'tlyong1992@hotmail.com',
  link: 'https://tangly1024.com',
  description: '唐风集里，收卷波澜',
  lang: 'zh-CN', // ['zh-CN','en-US']
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'font-mono', // ['font-sans', 'font-serif', 'font-mono']
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#111827', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2021, // if leave this empty, current year will be used.
  postsPerPage: 5,
  sortByDate: false,
  showAbout: true, // WIP
  showArchive: true, // WIP
  autoCollapsedNavBar: false, // the automatically collapsed navigation bar
  socialLink: 'https://weibo.com/u/2245301913',
  seo: {
    keywords: ['Blog', 'Website', 'Notion'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID || 'bee1fccfa3bd47a1a7be83cc71372d83', // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN || '', // Useful if you prefer not to make your database public
  analytics: {
    provider: 'ga', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: 'G-5EV4HZD0XX' // e.g: G-XXXXXXXXXX
    }
  },
  comment: {
    // support provider: gitalk, utterances, cusdis
    provider: 'gitalk', // leave it empty if you don't need any comment plugin
    gitalkConfig: {
      repo: 'nobelium', // The repository of store comments
      owner: 'tlyong1992',
      admin: ['tlyong1992'],
      clientID: 'be7864a16b693e256f8f',
      clientSecret: 'dbd0f6d9ceea8940f6ed20936b415274b8fe66a2',
      distractionFreeMode: false
    },
    utterancesConfig: {
      repo: ''
    },
    cusdisConfig: {
      appId: '', // data-app-id
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js' // change this if you're using self-hosted version
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
// export default BLOG
module.exports = BLOG
