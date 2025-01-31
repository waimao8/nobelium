import Image from 'next/image'
import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import { useRouter } from 'next/router'
import { NotionRenderer, Equation, Code, CollectionRow } from 'react-notion-x'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import dynamic from 'next/dynamic'
import 'gitalk/dist/gitalk.css'
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
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

const Article = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  fullWidth = true
}) => {
  const router = useRouter()
  return (
    <Container
      layout='blog'
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type='article'
      fullWidth={fullWidth}
    >
      <article>
        {/* 文章标题 */}
        <h1 className='font-bold text-4xl text-black dark:text-white'>
          {frontMatter.title}
        </h1>

        {/* 文章信息 */}
        {frontMatter.type[0] !== 'Page' && (
          <nav className='flex mt-7 items-start text-gray-500 dark:text-gray-400 text-sm'>
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
            <div className='mr-3 mb-4 md:ml-0'>
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
          </nav>
        )}

        {children}

        {/* Notion文章主体 */}
        {blockMap && (
          <div className='-mt-4'>
            <NotionRenderer
              recordMap={blockMap}
              components={{
                equation: Equation,
                code: Code,
                collectionRow: CollectionRow
              }}
              mapPageUrl={mapPageUrl}
            />
          </div>
        )}
      </article>

      {/* 文章悬浮目录 */}
      <Toc toc={frontMatter.toc} />

      <div className='grid justify-center mb-6 py-1'>
       <span>
          <img className='md:w-72 m-auto' src='/reward_code.jpg' />
        </span>
        <br />
        <span>微信赞赏码或支付宝tlyong@126.com赞助此文</span>
      </div>

      {/* 评论插件 */}
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
        <UtterancesComponent issueTerm={frontMatter.id} className='px-2' />
      )}
      {BLOG.comment && BLOG.comment.provider === 'cusdis' && (
        <>
          <script defer src='https://cusdis.com/js/widget/lang/zh-cn.js' />
          <CusdisComponent
            attrs={{
              host: BLOG.comment.cusdisConfig.host,
              appId: BLOG.comment.cusdisConfig.appId,
              pageId: frontMatter.id,
              pageTitle: frontMatter.title,
              pageUrl: BLOG.link + router.asPath,
              theme: BLOG.appearance
            }}
            lang={BLOG.lang.toLowerCase()}
          />
        </>

      )}
    </Container>
  )
}

export default Article
