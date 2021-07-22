import fs from 'fs'

const path = require('path')
// 文件缓存持续30秒
const cacheInvalidSeconds = 300 * 1000
// 文件名
const jsonFile = path.resolve('./db.json')

export async function getDataFromFile() {
  return get('posts')
}

export function setDataToFile(data) {
  set('posts', data)
}

// 读数据
async function get(key) {
  const data = await fs.readFileSync(jsonFile)
  const json = data ? JSON.parse(data) : {}
  // 缓存超过有效期就作废
  const cacheValidTime = new Date(parseInt(json[key + '_expire_time']) + cacheInvalidSeconds)
  const currentTime = new Date()
  if ( cacheValidTime < currentTime ) {
    console.log('缓存过期')
    return null
  }
  return json[key]
}

// 写数据，文件不存在自动创建
function set(key, value = '') {
  fs.readFile(jsonFile, (err, data) => {
    const json = data ? JSON.parse(data) : {}
    json[key] = value
    json[key + '_expire_time'] = new Date().getTime()
    fs.writeFile(jsonFile, JSON.stringify(json), err => {
      console.log('更新文件缓存成功')
    })
  })
}
