// src/blocks/InstagramFeed/config.ts
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const InstagramFeedBlock: Block = {
  slug: 'instagramFeed',
  interfaceName: 'InstagramFeedBlock',
  labels: {
    singular: 'Instagram Feed',
    plural: 'Instagram Feeds',
  },
  imageURL: '/images/thumb/InstagramFeedBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Instagram Feed',
  fields: [
    {
      name: 'caption',
      type: 'text',
      label: 'Título del bloque',
    },
    {
      name: 'titleSection',
      type: 'richText',
      label: 'Título de la sección',
      required: false,
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección',
      },
    },

    {
      name: 'numberOfPosts',
      type: 'number',
      label: 'Número de publicaciones',
      defaultValue: 9,
      min: 1,
      max: 24,
    },
    {
      name: 'slidesPerView',
      type: 'number',
      label: 'Slides visibles',
      defaultValue: 4,
      min: 1,
      max: 6,
      admin: {
        description: 'Cantidad de slides visibles a la vez en el slider',
      },
    },
    {
      name: 'showCaption',
      type: 'checkbox',
      label: 'Mostrar descripción al hacer hover',
      defaultValue: false,
    },
  ],
}