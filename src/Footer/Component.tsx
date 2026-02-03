import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import type { Footer, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const logo = footerData?.logo as Media | undefined
  const logoUrl = logo?.url || null

  return (
    <footer className="mt-auto bg-black text-white relative overflow-hidden">
      {/* Contenido del footer */}
      <div className="container py-12 relative z-10 overflow-hidden">
        {/* Texto de fondo grande con opacidad */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden w-full opacity-20"
        >
          <h2 
            className="whitespace-nowrap select-none uppercase text-white text-center tracking-[4px]"
            style={{
              fontFamily: '"Sequel Sans", sans-serif',
              fontSize: '113.034px',
              lineHeight: '169.551px',
            }}
          >
            <span style={{ fontWeight: 100 }}>QUEDA</span>
            <span style={{ fontWeight: 900 }}>MUCHO</span>
            <span style={{ fontWeight: 100 }}>POR</span>
            <span style={{ fontWeight: 900 }}>VER</span>
          </h2>
        </div>
        {/* Header con logo y navegación */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-32 relative z-10">
          <Link className="flex items-center" href="/">
            {logoUrl && logo ? (
              <Image
                src={logoUrl}
                alt={logo.alt || 'Logo'}
                width={logo.width || 150}
                height={logo.height || 60}
                className="h-auto max-h-16 w-auto"
                unoptimized={logoUrl.endsWith('.svg')}
              />
            ) : (
              <Logo loading="eager" priority="high" className="invert" />
            )}
          </Link>

          <nav className="flex flex-wrap gap-6 md:gap-8">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink 
                  className="text-white hover:opacity-80 transition-opacity text-sm md:text-base" 
                  key={i} 
                  {...link} 
                />
              )
            })}
          </nav>
        </div>

        {/* Footer bottom */}
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-32 border-t border-white/10 relative z-10"
          style={{ paddingTop: 'calc(var(--spacing, 1rem) * 45)' }}
        >
          <div className="flex flex-row gap-1 items-center flex-wrap">
            <p className="text-white text-sm">¿Necesitas contactarte con nosotros?</p>
            <Link 
              href="https://laboratoriochile.cl" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity text-sm"
            >
              Visítanos en laboratoriochile.cl
            </Link>
          </div>

          <p className="text-white/60 text-xs md:text-sm">
            © 2025 Laboratorio Chile | Teva. Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
