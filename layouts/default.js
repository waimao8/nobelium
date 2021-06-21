import Image from 'next/image'
import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import { useRouter } from 'next/router'
import { NotionRenderer, Equation, Code, CollectionRow, Collection, cs } from 'react-notion-x'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import dynamic from 'next/dynamic'
import 'gitalk/dist/gitalk.css'
import { useLocale } from '@/lib/locale'
import React from 'react'
import throttle from 'lodash.throttle'

// core styles shared by all of react-notion-x (required)
// import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
// import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
// import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
// import 'katex/dist/katex.min.css'

import { getBlockParentPage, getPageTableOfContents, uuidToId } from 'notion-utils'

const GitalkComponent = dynamic(
  () => {
    return import('gitalk/dist/gitalk-component')
  },
  { ssr: false }
)
const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Utterances')
  },
  { ssr: false }
)
const CusdisComponent = dynamic(
  () => {
    return import('react-cusdis').then(m => m.ReactCusdis)
  },
  { ssr: false }
)

const mapPageUrl = id => {
  return BLOG.path + id.replace(/-/g, '')
}

const DefaultLayout = ({ children, blockMap, frontMatter, emailHash }) => {
  const locale = useLocale()
  const router = useRouter()
  const cusdisI18n = ['zh-cn', 'es', 'tr', 'pt-BR', 'oc']
  const parentPageBlock = getBlockParentPage({ parent_id: frontMatter.id }, blockMap)
  let toc = []
  if (parentPageBlock) toc = getPageTableOfContents(parentPageBlock, blockMap)
  const showToc = toc.length >= 1
  const [activeSection, setActiveSection] = React.useState(null)
  const throttleMs = 100
  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName('notion-h')
    let prevBBox = null
    let currentSectionId = activeSection

    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i]
      if (!section || !(section instanceof Element)) continue

      if (!currentSectionId) {
        currentSectionId = section.getAttribute('data-id')
      }

      const bbox = section.getBoundingClientRect()
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
      const offset = Math.max(150, prevHeight / 4)

      // GetBoundingClientRect returns values relative to viewport
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('data-id')

        prevBBox = bbox
        continue
      }

      // No need to continue loop, if last element has been detected
      break
    }

    setActiveSection(currentSectionId)
  }, throttleMs)
  if (toc) {
    React.useEffect(() => {
      window.addEventListener('scroll', actionSectionScrollSpy)
      actionSectionScrollSpy()
      return () => {
        window.removeEventListener('scroll', actionSectionScrollSpy)
      }
    }, [])
  }

  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <article className="md:p-20">
        <h1 className="font-bold text-3xl text-black dark:text-white">
          {frontMatter.title}
        </h1>
        {frontMatter.type[0] !== 'Page' && (
          <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
            <div className="flex mb-4">
              <a href={BLOG.socialLink || '#'} className="flex">
                <Image
                  alt={BLOG.author}
                  width={24}
                  height={24}
                  src="/avatar.svg"
                  className="rounded-full"
                />
                <p className="ml-2 md:block">{BLOG.author}</p>
              </a>
              <span className="block">&nbsp;/&nbsp;</span>
            </div>
            <div className="mr-2 mb-4 md:ml-0">
              {formatDate(
                frontMatter?.date?.start_date || frontMatter.createdTime,
                BLOG.lang
              )}
            </div>
            {frontMatter.tags && (
              <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                {frontMatter.tags.map(tag => (
                  <TagItem key={tag} tag={tag} />
                ))}
              </div>
            )}
            <div id="busuanzi_container_page_pv" className="px-3">
              <span id="busuanzi_value_page_pv"></span> 次阅读
            </div>
          </nav>
        )}
        {children}
        {blockMap && (
          <div className="-mt-4">
            <NotionRenderer
              recordMap={blockMap}
              components={{
                collection: Collection,
                equation: Equation,
                code: Code,
                collectionRow: CollectionRow
              }}
              showCollectionViewDropdown={false}
              showTableOfContents={true}
              mapPageUrl={mapPageUrl}
            />
          </div>
        )}
      </article>

        {showToc && toc && (
          <aside className='notion-aside fixed shadow-2xl rounded-lg right-2 p-2 md:block sm:none'>
            <div className='notion-aside-table-of-contents px-2 max-w-xs'>
              <div className='notion-aside-table-of-contents-header'>
                目录
              </div>

              <nav
                className='notion-table-of-contents notion-gray'
              >
                {toc.map((tocItem) => {
                  const id = uuidToId(tocItem.id)

                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={cs(
                        'notion-table-of-contents-item',
                        `notion-table-of-contents-item-indent-level-${tocItem.indentLevel}`,
                        activeSection === id &&
                        'notion-table-of-contents-active-item'
                      )}
                    >
                      <span
                        className='notion-table-of-contents-item-body'
                        style={{
                          display: 'inline-block',
                          marginLeft: tocItem.indentLevel * 16
                        }}
                      >
                        {tocItem.text}
                      </span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>
        )}

      <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
        <button
          onClick={() => router.back()}
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ← {locale.POST.BACK}
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ↑ {locale.POST.TOP}
        </button>
      </div>
      {BLOG.comment && BLOG.comment.provider === 'gitalk' && (
        <GitalkComponent
          options={{
            id: frontMatter.id,
            title: frontMatter.title,
            clientID: BLOG.comment.gitalkConfig.clientID,
            clientSecret: BLOG.comment.gitalkConfig.clientSecret,
            repo: BLOG.comment.gitalkConfig.repo,
            owner: BLOG.comment.gitalkConfig.owner,
            admin: BLOG.comment.gitalkConfig.admin,
            distractionFreeMode: BLOG.comment.gitalkConfig.distractionFreeMode
          }}
        />
      )}
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'cusdis' && (
        <CusdisComponent
          attrs={{
            host: BLOG.comment.cusdisConfig.host,
            appId: BLOG.comment.cusdisConfig.appId,
            pageId: frontMatter.id,
            pageTitle: frontMatter.title,
            pageUrl: BLOG.link + router.asPath,
            theme: BLOG.appearance
          }}
          lang={cusdisI18n.find(
            i => i.toLowerCase() === BLOG.lang.toLowerCase()
          )}
        />
      )}
    </Container>
  )
}

export default DefaultLayout
