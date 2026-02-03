'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type Props = {
  topText?: string | null
  title: string
  backgroundColor?: string | null
  redOffOptions?: any[]
  dryOffOptions?: any[]
}

export const CarruselTabComponent: React.FC<Props> = ({
  topText,
  title,
  backgroundColor = '#F0F5F5',
  redOffOptions = [],
  dryOffOptions = [],
}) => {
  const [activeTab, setActiveTab] = useState<'redoff' | 'dryoff'>('redoff')
  const [activeRedOffIndex, setActiveRedOffIndex] = useState(0)
  const [activeDryOffIndex, setActiveDryOffIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentOptions = activeTab === 'redoff' ? redOffOptions : dryOffOptions
  const currentIndex = activeTab === 'redoff' ? activeRedOffIndex : activeDryOffIndex
  const currentOption = currentOptions[currentIndex]

  // Duración del auto-avance en segundos
  const AUTO_ADVANCE_DURATION = 5

  // Auto-avance con progreso
  useEffect(() => {
    if (isPaused || !currentOptions.length) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (AUTO_ADVANCE_DURATION * 10))
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPaused, currentOptions.length])

  // Detectar cuando el progreso llega al 100% y avanzar
  useEffect(() => {
    if (progress >= 100 && !isPaused) {
      const timeout = setTimeout(() => {
        goToNext()
        setProgress(0)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [progress, isPaused])

  // Funciones de navegación
  const goToNext = () => {
    if (activeTab === 'redoff') {
      setActiveRedOffIndex((prev) => (prev + 1) % redOffOptions.length)
    } else {
      setActiveDryOffIndex((prev) => (prev + 1) % dryOffOptions.length)
    }
    setProgress(0)
  }

  const goToPrevious = () => {
    if (activeTab === 'redoff') {
      setActiveRedOffIndex((prev) => (prev - 1 + redOffOptions.length) % redOffOptions.length)
    } else {
      setActiveDryOffIndex((prev) => (prev - 1 + dryOffOptions.length) % dryOffOptions.length)
    }
    setProgress(0)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const handleOptionClick = (index: number) => {
    if (activeTab === 'redoff') {
      setActiveRedOffIndex(index)
    } else {
      setActiveDryOffIndex(index)
    }
    setProgress(0)
  }

  if (!currentOption) return null

  const image = currentOption.image as Media | undefined
  const imageUrl = image?.url || null

  return (
    <section 
      className="py-16 md:py-24" 
      style={{ backgroundColor: backgroundColor || '#F0F5F5' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Primera Columna - Título y Opciones */}
          <div className="lg:col-span-3">
            {/* Texto Superior */}
            {topText && (
              <p className="text-sm text-gray-600 mb-2">{topText}</p>
            )}

            {/* Título */}
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
                {title}
              </h2>
            )}

            {/* Tabs RedOff / DryOff */}
            <div className="inline-block w-full mb-4">
              <div className="flex gap-3.5 p-2 rounded-full bg-[#F1F1F2]">
                <button
                  onClick={() => setActiveTab('redoff')}
                  className="py-4 px-6 rounded-full font-medium transition-all flex items-center justify-center"
                  style={{
                    backgroundColor: activeTab === 'redoff' ? '#FFFFFF' : 'transparent',
                    width: '50%'
                  }}
                >
                  <Image
                    src="/media/logo-redoff.svg"
                    alt="RedOff"
                    width={80}
                    height={30}
                    className="object-contain"
                  />
                </button>
                <button
                  onClick={() => setActiveTab('dryoff')}
                  className="py-4 px-6 rounded-full font-medium transition-all flex items-center justify-center"
                  style={{
                    backgroundColor: activeTab === 'dryoff' ? '#FFFFFF' : 'transparent',
                    width: '50%'
                  }}
                >
                  <Image
                    src="/media/logo-dryoff.svg"
                    alt="DryOff"
                    width={80}
                    height={30}
                    className="object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Opciones */}
            <div className="flex flex-col gap-3 items-start">
              {currentOptions.map((option: any, index: number) => {
                const isActive = index === currentIndex
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`relative px-6 py-3 rounded-full text-left transition-all whitespace-nowrap overflow-visible inline-flex items-center gap-3 ${
                      isActive
                        ? 'bg-white text-[#005373] font-semibold'
                        : 'bg-transparent border border-gray-300 text-gray-600 hover:border-[#005373] hover:text-[#005373]'
                    }`}
                  >
                    {/* Barra de progreso - fondo + relleno */}
                    {isActive && (
                      <div 
                        className="relative rounded-full bg-[#DDE1E6] flex-shrink-0 overflow-hidden"
                        style={{ 
                          width: '24px',
                          height: '2px',
                          borderRadius: '99px'
                        }}
                      >
                        {/* Barra de relleno azul */}
                        <div 
                          className="absolute left-0 top-0 h-full bg-[#005373] transition-all duration-100 ease-linear"
                          style={{ 
                            width: `${progress}%`,
                            borderRadius: '99px'
                          }}
                        />
                      </div>
                    )}
                    <span className="relative z-10">{option.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Botones de Control */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Anterior"
              >
                <Image
                  src="/media/up-shape.svg"
                  alt="Anterior"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Siguiente"
              >
                <Image
                  src="/media/down-shape.svg"
                  alt="Siguiente"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
              <button
                onClick={togglePause}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                aria-label={isPaused ? 'Reanudar' : 'Pausar'}
              >
                <Image
                  src="/media/pause-shape.svg"
                  alt={isPaused ? 'Reanudar' : 'Pausar'}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
            </div>
          </div>

          {/* Segunda Columna - Imagen */}
          <div className="lg:col-span-5 flex justify-center">
            {imageUrl && image && (
              <div className="relative w-full aspect-square">
                <Image
                  src={imageUrl}
                  alt={image.alt || currentOption.name || 'Symptom image'}
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
            )}
          </div>

          {/* Tercera Columna - Contenido */}
          <div className="lg:col-span-4 space-y-6">
            {/* Descripción Principal */}
            {currentOption.description && (
              <p className="text-gray-700 leading-relaxed">
                {currentOption.description}
              </p>
            )}

            {/* Estadística */}
            {currentOption.statValue && (
              <div className="bg-white/70 rounded-lg p-4">
                {currentOption.statTitle && (
                  <p className="text-sm text-gray-600 mb-2">
                    {currentOption.statTitle}
                  </p>
                )}
                <p className="text-5xl font-black text-orange-500 mb-2">
                  {currentOption.statValue}
                </p>
                {currentOption.statDescription && (
                  <p className="text-sm text-gray-700">
                    {currentOption.statDescription}
                  </p>
                )}
              </div>
            )}

            {/* Consejos */}
            {currentOption.tips && currentOption.tips.length > 0 && (
              <div>
                {currentOption.tipsTitle && (
                  <h3 className="font-semibold text-gray-800 mb-4">
                    {currentOption.tipsTitle}
                  </h3>
                )}
                <ul className="space-y-3">
                  {currentOption.tips.map((tip: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500">👉</span>
                      <span className="text-gray-700 text-sm">{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
