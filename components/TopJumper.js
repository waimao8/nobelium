import React, { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import { useLocale } from '@/lib/locale'

const TopJumper = () => {
  const locale = useLocale()

  const [show, switchShow] = useState(false)
  useEffect(() => {
    const listener = throttle(() => {
      const shouldShow = window.scrollY > 100
      if (shouldShow !== show) {
        switchShow(shouldShow)
      }
    }, 500)
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [show])

  return (
    <span
      className={(show ? 'animate__fadeInRight' : 'animate__fadeOutRight') + ' fixed right-10 bottom-10 animate__animated animate__faster'}>
      <span
        className='bg-white px-4 py-3 rounded  cursor-pointer shadow-card'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <a className='fa fa-arrow-up' title={locale.POST.TOP}/>
      </span>
    </span>

  )
}

export default TopJumper
