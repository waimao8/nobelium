import fs from 'fs'
import BLOG from '@/blog.config'

const path = require('path')
// 文件缓存持续10秒
const cacheInvalidSeconds = 10 * 1000
// 文件名
const jsonFile = path.resolve('./data.json')

export async function getDataFromFile () {
  return get('posts')
}

export async function setDataToFile (data) {
  return set('posts', data)
}

// 读数据
async function get (key) {
  if (BLOG.isProd) return null
  const exist = await fs.existsSync(jsonFile)
  if (!exist) return null
  const data = await fs.readFileSync(jsonFile)
  const json = data ? JSON.parse(data) : {}
  return json[key]
}

// 写数据，文件不存在自动创建
async function set (key, value = '') {
  if (BLOG.isProd) return null
  const json = {}
  json[key] = value
  json[key + '_expire_time'] = new Date().getTime()
  await fs.writeFileSync(jsonFile, JSON.stringify(json))
}
