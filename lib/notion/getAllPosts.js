import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import { defaultMapImageUrl } from 'react-notion-x'

export async function getAllPosts () {
  let id = BLOG.notionPageId
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  const pageRecordMap = await api.getPage(id)

  id = idToUuid(id)
  const collection = Object.values(pageRecordMap.collection)[0]?.value
  const collectionQuery = pageRecordMap.collection_query
  const block = pageRecordMap.block
  const schema = collection?.schema

  const rawMetadata = block[id].value

  // Check Type 兼容Page-Database和Inline-Database
  if (rawMetadata?.type !== 'collection_view_page' && rawMetadata?.type !== 'collection_view') {
    console.log(`pageId "${id}" is not a database`)
    return null
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null

      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time
      ).toString()
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false
      properties.page_cover = getPostCover(id, block, pageRecordMap) ?? null
      properties.page_image = getContentFirstImage(id, block, pageRecordMap)
      data.push(properties)
    }
    // remove all the the items doesn't meet requirements
    const posts = data.filter(post => {
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        (post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page')
      )
    })

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime)
        const dateB = new Date(b?.date?.start_date || b.createdTime)
        return dateB - dateA
      })
    }
    return posts
  }
}

// 从Block获取封面图;优先取PageCover，否则取内容图片
function getPostCover (id, block, pageRecordMap) {
  const pageCover = block[id].value?.format?.page_cover
  if (pageCover) {
    if (pageCover.startsWith('/')) return 'https://www.notion.so' + pageCover
    if (pageCover.startsWith('http')) return defaultMapImageUrl(pageCover, block[id].value)
  }
}

// 取文章的第一个图片内容作为封面
function getContentFirstImage (id, block, pageRecordMap) {
  const pageBlock = block[id]?.value

  const contentBlockId = pageBlock?.content?.find((blockId) => {
    const block = pageRecordMap.block[blockId]?.value
    if (block?.type === 'image') {
      return true
    }
  })

  if (contentBlockId) {
    const contentBlock = pageRecordMap.block[contentBlockId]?.value
    const source = contentBlock.properties?.source?.[0]?.[0] ??
      contentBlock.format?.display_source
    return defaultMapImageUrl(source, contentBlock)
  }
  return ''
}
