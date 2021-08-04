import Article from '@/layouts/article'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'
import { getPageTableOfContents } from 'notion-utils'

const BlogPost = ({ post, blockMap, emailHash }) => {
  if (!post) return null
  return (
        <Article
          blockMap={blockMap}
          frontMatter={post}
          emailHash={emailHash}
          fullWidth={post.fullWidth}
        ></Article>
  )
}

export async function getStaticPaths () {
  let posts = await getAllPosts()
  posts = posts.filter(post => post.status[0] === 'Published')
  return {
    paths: posts.map(row => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  let posts = await getAllPosts()
  posts = posts.filter(post => post.status[0] === 'Published')
  const post = posts.find(t => t.slug === slug)
  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5').update(BLOG.email).digest('hex')
  post.toc = getPageTableOfContents(post, blockMap)

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}

export default BlogPost
