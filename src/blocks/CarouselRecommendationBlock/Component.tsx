'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './styles.css'

type Recommendation = {
  titleSlider?: string | null
  descriptionSlider?: string | null
  imageSlider?: string | Media | null
  id?: string | null
}

type Props = {
  titleSectionSlider?: DefaultTypedEditorState | null
  recommendations?: Recommendation[] | null
}

export const CarouselRecommendationBlock: React.FC<Props> = (props) => {
  const { recommendations, titleSectionSlider } = props
  const swiperRef = useRef<SwiperType | null>(null)

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  return (
    <section className="relative w-full bg-brand-background">
        <div className="container py-12">
          {titleSectionSlider && (
            <div className="text-left text-brand-primary mb-8 md:mb-12 lg:mb-16 max-w-2xl">
              <RichText data={titleSectionSlider} enableGutter={false} enableProse={false} />
            </div>
          )}
       
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
        }}
        navigation
        pagination={{
          clickable: true,
          el: '.carousel-pagination-container',
        }}
        loop={true}
        className="carousel-recommendation"
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {recommendations.map((recommendation, index) => {
          const sliderImage = recommendation.imageSlider as Media | undefined
          const sliderImageUrl = sliderImage?.url || null

          return (
            <SwiperSlide key={recommendation.id} className="!w-full lg:!w-[426px]" style={{ height: '546px' }}>
              <div className="flex flex-col bg-white rounded-[16px] overflow-hidden shadow-md w-full h-full">
                <div className="flex flex-col gap-2 p-4 md:p-6 flex-shrink-0">
                    <span>0{index +1}</span>
                  {recommendation.titleSlider && (
                    <h4 className="text-brand-primary text-lowercase font-bold">
                      {recommendation.titleSlider}
                    </h4>
                  )}
                  {recommendation.descriptionSlider && (
                    <p className="text-gray-700 text-sm">
                      {recommendation.descriptionSlider}
                    </p>
                  )}
                </div>
                {sliderImageUrl && sliderImage && (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="relative z-10 w-[270px] h-[270px] rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={sliderImageUrl}
                        alt={sliderImage.alt || recommendation.titleSlider || 'Slider image'}
                        fill
                        sizes="270px"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute border-1 border-red-500 left-0  rounded-full w-[270px] h-[270px]"></div>
                    <div className="absolute border-1 border-red-500  right-0  rounded-full w-[270px] h-[270px]"></div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      
      {/* Contenedor para paginación y botones de navegación en una línea */}
      <div className="flex items-center justify-between gap-4 mt-4 relative">
        {/* Espacio izquierdo para centrar los bullets */}
        <div className="min-w-[100px] flex-shrink-0"></div>
        {/* Contenedor para los bullets de paginación centrados */}
        <div className="carousel-pagination-container"></div>
        {/* Contenedor para ambas flechas a la derecha */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="carousel-custom-prev flex items-center justify-center w-12 h-12 bg-[rgba(135,141,150,0.12)] rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Anterior"
          >
            <Image
              src="/icons/icon-arrow-slider.svg"
              alt="Anterior"
              width={24}
              height={24}
              className="rotate-180"
            />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="carousel-custom-next flex items-center justify-center w-12 h-12 bg-[rgba(135,141,150,0.12)] rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Siguiente"
          >
            <Image
              src="/icons/icon-arrow-slider.svg"
              alt="Siguiente"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      </div>
    </section>
  )
}


