'use client'

import React from 'react'
import Link from 'next/link'
import { useMenuLateral } from '@/providers/MenuLateral'

import type { Header as HeaderType, Page } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType; isMobile?: boolean }> = ({ data, isMobile = false }) => {
  const navItems = data?.navItems || []
  const { openMenu } = useMenuLateral()

  const getButtonStyles = (label: string | null | undefined) => {
    const baseStyles = isMobile 
      ? 'px-6 py-4 rounded-full text-base font-medium transition-all hover:opacity-90 w-full text-center'
      : 'px-6 py-4 rounded-full text-base font-medium transition-all hover:opacity-90'
    
    // "Donde comprar" tiene fondo azul y texto blanco
    if (label?.toLowerCase().includes('donde comprar')) {
      return `${baseStyles} bg-[#005373] text-white`
    }
    
    // RedOff y DryOff tienen fondo blanco y texto azul
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
    <nav className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 ${isMobile ? 'items-stretch' : 'items-center'}`}>
      {navItems.map(({ link }, i) => {
        const label = link?.label
        const href = getHref(link)
        const newTab = link?.newTab
        
        // Si el label es "Donde comprar", abrir el menú lateral en lugar de navegar
        const isDondeComprar = label?.toLowerCase().includes('donde comprar')
        
        if (isDondeComprar) {
          return (
            <button
              key={i}
              onClick={openMenu}
              className={getButtonStyles(label)}
              type="button"
            >
              {label}
            </button>
          )
        }
        
        return (
          <Link 
            key={i} 
            href={href}
            className={getButtonStyles(label)}
            {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
