'use client'

import React from 'react'
import Link from 'next/link'

import type { Header as HeaderType, Page } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType; isMobile?: boolean }> = ({ data, isMobile = false }) => {
  const navItems = data?.navItems || []

  const getLinkStyles = () => {
    const baseStyles = isMobile
      ? 'px-6 py-3 rounded-full text-base font-medium transition-all hover:opacity-90 w-full text-center'
      : 'px-6 py-3 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all hover:opacity-90'
    return `${baseStyles} bg-white text-[#005373]`
  }

  const getHref = (link: any) => {
    if (link?.type === 'reference' && link?.reference?.value) {
      const page = link.reference.value as Page
      return `/${page.slug}`
    }
    return link?.url || '#'
  }

  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'flex-row flex-wrap'} gap-2 md:gap-3 ${isMobile ? 'items-stretch' : 'items-center justify-end'}`}>
      {navItems.map(({ link }, i) => {
        const label = link?.label
        const href = getHref(link)
        const newTab = link?.newTab
        return (
          <Link
            key={i}
            href={href}
            className={getLinkStyles()}
            {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
          </Link>
        )
      })}

    
    </nav>
  )
}
