import DefaultLayout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'
import { idToUuid } from 'notion-utils'

const BlogPost = ({ post, blockMap, emailHash }) => {
  if (!post) return null
  return (
        <DefaultLayout
          blockMap={blockMap}
          frontMatter={post}
          emailHash={emailHash}
          fullWidth={post.fullWidth}
        />
  )
}

export async function getStaticPaths () {
  let posts = await getAllPosts()
  posts = posts.filter(post => post.status[0] === 'Published')
  return {
    paths: posts.map(row => row.slug ? `${BLOG.path}/${row.slug}` : `${BLOG.path}/${row.id}`),
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  let posts = await getAllPosts()
  posts = posts.filter(post => post.status[0] === 'Published')
  let post = posts.find(t => t.slug === slug)
  let blockMap = {}
  if (!post) {
    blockMap = await getPostBlocks(slug)
    const rawMetadata = blockMap.block[idToUuid(slug)].value
    const date = new Date(rawMetadata.last_edited_time).toJSON().substr(0, 10).replace('T', ' ')
    const title = rawMetadata.properties.title
    post = { id: slug, title, type: 'POST', date: { start_date: date } }
  } else {
    blockMap = await getPostBlocks(post.id)
  }
  const emailHash = createHash('md5').update(BLOG.email).digest('hex')
  post.toc = getPageTableOfContents(post, blockMap)

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}

export default BlogPost
