import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'

type GalleryItem = {
  imageProductInfo?: string | Media | null
  borderImageProduct?: 'border-rounded' | 'border-oval' | null
}

type Props = {
  caption?: string | null
  titleProductInfo?: DefaultTypedEditorState | null
  descriptionProductInfo?: DefaultTypedEditorState | null
  galleryProductInfo?: GalleryItem[] | null
}

export const ProductInfoBlockComponent: React.FC<Props> = (props) => {
  const { caption, titleProductInfo, descriptionProductInfo, galleryProductInfo } = props

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
         {/* Caption */}
         {caption && (
            <p className="text-sm text-gray-500 pb-2">{caption}</p>
          )}
        <div className="flex flex-col gap-12">
          {/* Título */}
          {titleProductInfo && (
            <div className="text-brand-primary">
              <RichText data={titleProductInfo} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Descripción alineada a la derecha */}
          {descriptionProductInfo && (
            <div className="text-gray-700 text-sm md:text-base leading-relaxed ml-auto lg:w-1/2">
              <RichText data={descriptionProductInfo} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Galería */}
          {galleryProductInfo && galleryProductInfo.length > 0 && (
            <div className="flex flex-wrap gap-0 py-16">
              {galleryProductInfo.map((item, index) => {
                const imageMedia = item.imageProductInfo as Media | undefined
                const imageUrl = imageMedia?.url ?? null
                const borderClass =
                  item.borderImageProduct === 'border-oval'
                    ? 'rounded-full  w-[221px] h-[121px] md:w-[418px] md:h-[298px]'
                    : 'rounded-full w-[121px] h-[121px] md:w-[298px] md:h-[298px]'

                if (!imageUrl || !imageMedia) return null

                return (
                  <div
                    key={index}
                    className={`relative  aspect-square overflow-hidden ${borderClass}`}
                  >
                    <Image
                      src={imageUrl}
                      alt={imageMedia.alt ?? `Imagen ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
