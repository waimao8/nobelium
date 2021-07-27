import React, { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import { useLocale } from '@/lib/locale'
import { useRouter } from 'next/router'

const TopJumper = () => {
  const locale = useLocale()
  const router = useRouter()

  const [show, switchShow] = useState(false)
  useEffect(() => {
    const listener = throttle(() => {
      const shouldShow = window.scrollY > 300
      if (shouldShow !== show) {
        switchShow(shouldShow)
      }
    }, 500)
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [show])

  return (
    <span>
      <span
        className={(show ? 'animate__fadeInLeft' : 'animate__fadeOutLeft') + ' animate__animated animate__faster fixed left-20 bottom-10 bg-white px-3 py-2 rounded shadow-md cursor-pointer'}
        onClick={() => router.back()}>
        <span className='fa fa-arrow-left'>&nbsp;{locale.POST.BACK}</span>
      </span>

      <span
        className={(show ? 'animate__fadeInRight' : 'animate__fadeOutRight') + ' animate__animated animate__faster fixed right-20 bottom-10 bg-white px-3 py-2 rounded shadow-md cursor-pointer'}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className='fa fa-arrow-up'>&nbsp;{locale.POST.TOP}</span>
      </span>
    </span>

  )
}

export default TopJumper
