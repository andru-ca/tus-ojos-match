'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { MenuLateral } from '@/payload-types'

// RowLabel para Tabs
export const TabRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<MenuLateral['tabs']>[number]>()
  
  const label = data?.data?.nombre || 'Sin nombre'
  
  return <div>{label}</div>
}

// RowLabel para Farmacias
export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<MenuLateral['farmacias']>[number]>()
  
  const label = data?.data?.nombre
    ? `${data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''}${data?.data?.nombre}`
    : 'Sin nombre'
  
  return <div>{label}</div>
}
