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

import { getBlockParentPage, getPageTableOfContents, uuidToId } from 'notion-utils'
import Toc from '@/components/Toc'

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

const DefaultLayout = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  fullWidth = true
}) => {
  const router = useRouter()
  const cusdisI18n = ['zh-cn', 'es', 'tr', 'pt-BR', 'oc']
  const parentPageBlock = getBlockParentPage({ parent_id: frontMatter.id }, blockMap)
  const toc = parentPageBlock ? getPageTableOfContents(parentPageBlock, blockMap) : []

  return (
    <Container
      layout='blog'
      title={frontMatter.title}
      description={frontMatter.summary}
      date={new Date(frontMatter.createdTime).toISOString()}
      type='article'
      fullWidth={fullWidth}
    >
      {/* 文章主体 */}
      <article className='md:p-5'>
        <img src={frontMatter.page_cover} className={'w-full max-h-60 mb-3 object-cover'} />
        <h1 className='font-bold text-3xl text-black dark:text-white'>
          {frontMatter.title}
        </h1>
        {frontMatter.type[0] !== 'Page' && (
          <nav className='flex mt-7 items-start text-gray-500 dark:text-gray-400'>
            <div className='flex mb-4'>
              <a href={BLOG.socialLink || '#'} className='flex'>
                <Image
                  alt={BLOG.author}
                  width={24}
                  height={24}
                  src='/avatar.svg'
                  className='rounded-full'
                />
                <p className='ml-2 md:block'>{BLOG.author}</p>
              </a>
              <span className='block'>&nbsp;/&nbsp;</span>
            </div>
            <div className='mr-2 mb-4 md:ml-0'>
              {formatDate(
                frontMatter?.date?.start_date || frontMatter.createdTime,
                BLOG.lang
              )}
            </div>
            {frontMatter.tags && (
              <div className='flex flex-nowrap max-w-full overflow-x-auto article-tags'>
                {frontMatter.tags.map(tag => (
                  <TagItem key={tag} tag={tag} />
                ))}
              </div>
            )}
            <div id='busuanzi_container_page_pv' className='px-3'>
              <span className='fa fa-eye'/>&nbsp;<span id='busuanzi_value_page_pv'>0</span>
            </div>
          </nav>
        )}
        {children}
        {blockMap && (
          <div className='-mt-4'>
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
      <Toc toc={toc}/>

      {/* 评论区 */}
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
