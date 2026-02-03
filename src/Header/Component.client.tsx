'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const logo = data.logo as Media | undefined
  // Usar URL relativa para evitar problemas de hidratación
  const logoUrl = logo?.url || null

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-transparent" 
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto py-8 flex justify-between items-center">
        <Link href="/">
          {logoUrl && logo ? (
            <Image
              src={logoUrl}
              alt={logo.alt || 'Logo'}
              width={logo.width || 100}
              height={logo.height || 50}
              className="h-auto max-h-20 w-auto"
              priority
              unoptimized={logoUrl.endsWith('.svg')}
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
