import React from 'react'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { cs } from 'react-notion-x'

/**
 * 目录组件
 */
const Toc = ({ toc }) => {
  // 无目录就直接返回空
  if (toc.length < 1) return <></>

  // 监听滚动事件
  React.useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    window.addEventListener('resize', resizeWindowHideToc)
    actionSectionScrollSpy()
    resizeWindowHideToc()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      window.removeEventListener('resize', resizeWindowHideToc)
    }
  }, [])

  // 是否显示目录
  const [showToc, setShowToc] = React.useState(true)
  const resizeWindowHideToc = throttle(() => {
    if (window.innerWidth < 1000) {
      setShowToc(false)
    } else {
      setShowToc(true)
    }
  }, 500)

  // 同步选中目录事件
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

  return (
    <aside
      className={(showToc ? 'animate__bounceInUp' : 'animate__bounceOutRight') + ' animate__animated sm:block notion-aside fixed right-5 bg-white dark:bg-gray-800 dark:bg-opacity-70 shadow-card rounded-xl p-2'}>
      <div className='notion-aside-table-of-contents px-2 w-1.5'>
        <div className='notion-aside-table-of-contents-header  dark:text-gray-300'>
          目录
        </div>
        <nav className='notion-table-of-contents text-gray-600'>
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
  )
}

export default Toc
