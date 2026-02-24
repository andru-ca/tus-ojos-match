'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import type { CarruselTabBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import './styles.css'

const RECOMMENDATION_LABELS: Record<string, string> = {
  dryOff: 'DryOff',
  redOff: 'RedOff',
}

type Props = CarruselTabBlock

export const CarruselTabComponent: React.FC<Props> = ({
  topText,
  title,
  backgroundColor = '#F0F5F5',
  image: blockImage,
  options,
  condition,
}) => {
  const allOptions = options ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentOption = allOptions[activeIndex]
  const media = blockImage as Media | undefined
  const imageUrl = media?.url ?? null

  // Duración del auto-avance en segundos
  const AUTO_ADVANCE_DURATION = 10

  // Auto-avance con progreso
  useEffect(() => {
    if (isPaused || !allOptions.length) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (AUTO_ADVANCE_DURATION * 10))
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPaused, allOptions.length])

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

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % allOptions.length)
    setProgress(0)
  }

  const handleOptionClick = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }

  if (!currentOption) return null

  return (
    <section 
      className="py-16 md:py-24" 
      style={{ backgroundColor: backgroundColor || '#F0F5F5' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 items-center justify-between">
          
          {/* Primera Columna - Título y Opciones */}
          <div className="lg:col-span-1 max-w-[390px]">
            {/* Texto Superior */}
            {topText && (
              <p className="text-sm text-gray-600 mb-2">{topText}</p>
            )}

            {/* Título (Lexical richText) */}
            {title && (
              <div className="uppercase mb-4 text-black">
                <RichText data={title} enableGutter={false} enableProse={false} />
              </div>
            )}

            {/* Opciones vinculadas a su contenido */}
            <div className="flex flex-row md:flex-col gap-2 items-start overflow-x-auto">
              {allOptions.map((option: any, index: number) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`relative px-5 py-3 rounded-full text-left transition-all whitespace-nowrap overflow-visible inline-flex items-center gap-3 ${
                      isActive
                        ? 'bg-white text-[#0063B5]  border border-white'
                        : 'bg-transparent border border-[#A2A9B0] text-[#A2A9B0] hover:border-[#005373] hover:text-[#005373]'
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
          </div>

          {/* Segunda Columna - Imagen global del bloque */}
          <div className="lg:col-span-1 flex justify-center">
            {imageUrl && media && (
              <div className="relative  aspect-square w-[343px] h-[200px] md:w-[330px] md:h-[580px] mx-auto ">
                <Image
                  src={imageUrl}
                  alt={media.alt ?? 'Imagen'}
                  fill
                  sizes="(max-width: 580px) 100vw, 41.666667vw"
                  className="object-cover rounded-full mx-auto"
                  priority
                />
              </div>
            )}
          </div>

          {/* Tercera Columna - Contenido */}
          <div className="lg:col-span-1 flex flex-col gap-1 max-w-[390px]">
            {/* Descripción Principal */}
            {currentOption.description && currentOption.description.root.children.length > 0 && (
              <div className="description-richtext">
                <RichText data={currentOption.description} enableGutter={false} enableProse={false} />
              </div>
            )}

           

            {/* Estadística */}
            {currentOption.statValue && (
              <div className="bg-white rounded-lg p-4">
                {currentOption.statTitle && (
                  <p className="text-sm text-gray-600 mb-2">
                    {currentOption.statTitle}
                  </p>
                )}
                <span className="text-5xl font-medium text-orange-500 mb-2">
                  {currentOption.statValue}
                </span>
                {currentOption.statDescription && (
                  <p className="text-sm text-gray-700">
                    {currentOption.statDescription}
                  </p>
                )}
              </div>
            )}


            {/* Recomendaciones */}
            {currentOption.recommendations && (
              <div className="flex items-center gap-2 justify-between bg-white rounded-lg p-4">
                <span>Se recomienda el uso de: </span>
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  {currentOption.recommendations === 'dryOff' ? (
                    <Image src="/media/logo-dryoff.svg" alt="DryOff" width={84} height={24} />
                  ) : (
                    <Image src="/media/logo-redoff.svg" alt="RedOff" width={84} height={24} />
                  )}
                </span>
              </div>
            )}

            {/* Consejos */}
            {currentOption.consejos && currentOption.consejos.root.children.length > 0 && (
              <div className="consejos-container bg-white rounded-lg p-4">
                  <h6 className="font-semibold text-gray-800 mb-4">
                    Consejos breves para evitarlo:
                  </h6>
                    <div className="consejos-richtext">
                      <RichText data={currentOption.consejos} enableGutter={false} />
                    </div>
              </div>
            )}
          </div>

        </div>
        <div className="flex justify-center items-center mt-10 w-full md:w-1/2 mx-auto">
          <span className="text-sm text-gray-600 text-center">{condition}</span>  
        </div>
      </div>
    </section>
  )
}
