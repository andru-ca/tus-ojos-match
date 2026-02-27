'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

import type { MenuLateral, Media } from '@/payload-types'

interface MenuLateralClientProps {
  data: MenuLateral
  isOpen: boolean
  onClose: () => void
}

const TABS_UI = [
  { slug: 'dryoff', nombre: 'DryOff' },
  { slug: 'redoff', nombre: 'RedOff' },
] as const

export const MenuLateralClient: React.FC<MenuLateralClientProps> = ({ data, isOpen, onClose }) => {
  const [tabActiva, setTabActiva] = useState<string>('dryoff')

  // Farmacias según la pestaña activa (DryOff o RedOff)
  const farmaciasFiltradas =
    tabActiva === 'dryoff'
      ? (data.dryOffFarmacias ?? [])
      : (data.redOffFarmacias ?? [])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white z-[60] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <div className="text-2xl font-bold text-gray-900">{data.titulo}</div>
              <p className="text-sm text-gray-600 mt-1">{data.subtitulo}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Tabs DryOff / RedOff */}
          <div className="px-6 pt-4 inline-block w-full">
            <div className="flex gap-3.5 p-2 rounded-full bg-[#F1F1F2]">
              {TABS_UI.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => setTabActiva(tab.slug)}
                  className={`py-4 px-6 rounded-full text-base font-medium transition-all ${
                    tabActiva === tab.slug ? 'text-[#005373]' : 'text-[#005373] hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: tabActiva === tab.slug ? '#FFFFFF' : 'transparent',
                    width: '50%',
                  }}
                >
                  {tab.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de farmacias */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {farmaciasFiltradas && farmaciasFiltradas.length > 0 ? (
                farmaciasFiltradas.map((farmacia, index) => {
                  const logo = farmacia.logo as Media | undefined
                  const logoUrl = logo?.url || ''

                  return (
                    <a
                      key={index}
                      href={farmacia.url || '#'}
                      target={farmacia.abrirEnNuevaTab ? '_blank' : '_self'}
                      rel={farmacia.abrirEnNuevaTab ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        {logoUrl && logo && (
                          <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-lg p-2">
                            <Image
                              src={logoUrl}
                              alt={logo.alt || farmacia.nombre || 'Logo farmacia'}
                              width={48}
                              height={48}
                              className="object-contain w-full h-full"
                              unoptimized={logoUrl.endsWith('.svg')}
                            />
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{farmacia.nombre}</span>
                      </div>
                      <div 
                        className="flex items-center justify-center"
                        style={{
                          borderRadius: '999px',
                          background: '#E6EEF1',
                          padding: '15px',
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path d="M13.0546 2.90256L1.4239 14.5333C1.25924 14.698 1.06489 14.7793 0.840862 14.7773C0.616837 14.7756 0.421122 14.691 0.253717 14.5236C0.0863113 14.3562 0.00174989 14.1605 3.28093e-05 13.9365C-0.00194405 13.7125 0.0794012 13.5181 0.244069 13.3535L11.8748 1.72273L3.80948 1.65623C3.57752 1.65432 3.38386 1.57426 3.22849 1.41606C3.07325 1.25772 2.99457 1.05757 2.99245 0.815601C2.99858 0.581631 3.0755 0.386726 3.22321 0.23089C3.37092 0.0750537 3.56582 -0.00186638 3.80792 0.000129856L13.7003 0.0816859C13.8464 0.0828903 13.9752 0.109501 14.0865 0.161514C14.198 0.213398 14.3011 0.286729 14.3959 0.381509C14.4906 0.476289 14.564 0.579409 14.6158 0.690866C14.6679 0.802195 14.6945 0.930929 14.6957 1.07707L14.7772 10.9694C14.779 11.1855 14.702 11.3739 14.5463 11.5347C14.3906 11.6954 14.1957 11.7788 13.9618 11.7849C13.7198 11.7828 13.5197 11.7026 13.3615 11.5444C13.2031 11.386 13.1229 11.1859 13.1207 10.9439L13.0546 2.90256Z" fill="#005373"/>
                        </svg>
                      </div>
                    </a>
                  )
                })
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No hay farmacias disponibles en esta categoría
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
