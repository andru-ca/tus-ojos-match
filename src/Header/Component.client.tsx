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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Cerrar el menú móvil cuando cambia la ruta
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const logo = data.logo as Media | undefined
  // Usar URL relativa para evitar problemas de hidratación
  const logoUrl = logo?.url || null

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          {logoUrl && logo ? (
            <Image
              src={logoUrl}
              alt={logo.alt || 'Logo'}
              width={200}
              height={logo.height || 50}
              className="h-auto w-[200px]"
              style={{ height: 'auto' }}
              priority
              unoptimized={logoUrl.endsWith('.svg')}
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0 w-[200px]" />
          )}
        </Link>
        
        {/* Menú de navegación desktop */}
        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>

        {/* Botón menú hamburguesa mobile */}
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50 ${
            isScrolled || isMobileMenuOpen ? 'text-[#005373]' : 'text-white'
          }`}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#005373]' : 'bg-current'
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#005373]' : 'bg-current'
            }`}
          />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto pt-24 pb-8 px-4 h-full overflow-y-auto">
          <HeaderNav data={data} isMobile={true} />
        </div>
      </div>
    </header>
  )
}
