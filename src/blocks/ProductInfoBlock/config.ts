import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ProductInfoBlock: Block = {
  slug: 'productInfo',
  interfaceName: 'ProductInfoBlock', 
  labels: {
    plural: 'Product Info Blocks',
    singular: 'Product Info Block',
  },

  fields: [
    {
      name: 'caption',
      type: 'text',
      label: 'Intro',
      required: false,
      admin: {
        description: 'Intro',
      },
    },
    {
      name: 'titleProductInfo',
      type: 'richText',
      label: 'Título de la sección',
      required: false,
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección',
      },
    },
    {
        name: 'descriptionProductInfo',
        type: 'richText',
        label: 'Descripción de la sección',
        required: false,
        editor: lexicalEditor({}),
        admin: {
          description: 'Descripción de la sección',
        },
      },
    {
      name:'galleryProductInfo',
      type:'array',
      label: 'Galería de Productos',
      required: true,
      admin: {
        description: 'Galería de Productos',
      },
      fields: [
        {
          name: 'imageProductInfo',
          type: 'upload', 
          label: 'Imagen de la Galería',
          required: true,
          relationTo: 'media',
          admin: {
            description: 'Imagen de la Galería',
          },
        },
        {
            name:"borderImageProduct",
            type:"select",
            label: 'Borde de la Imagen',
            required: false,
            options: [
                {
                    label: 'Borde Redondeado',
                    value: 'border-rounded',
                },
                {
                    label: 'Borde Ovalado',
                    value: 'border-oval',
                },
            ],
        }

      ],
    },
  ],
}
