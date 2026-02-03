'use client'

import React, { createContext, useCallback, use, useState } from 'react'

export interface MenuLateralContextType {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

const initialContext: MenuLateralContextType = {
  isOpen: false,
  openMenu: () => null,
  closeMenu: () => null,
  toggleMenu: () => null,
}

const MenuLateralContext = createContext(initialContext)

export const MenuLateralProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openMenu = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <MenuLateralContext value={{ isOpen, openMenu, closeMenu, toggleMenu }}>
      {children}
    </MenuLateralContext>
  )
}

export const useMenuLateral = (): MenuLateralContextType => use(MenuLateralContext)
