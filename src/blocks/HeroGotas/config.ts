import type { Block } from 'payload'

export const HeroGotas: Block = {
  slug: 'heroGotas',
  interfaceName: 'HeroGotasBlock',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de Fondo',
      required: true,
      admin: {
        description: 'Imagen de fondo para el hero',
      },
    },
    {
      name: 'mainTitle',
      type: 'text',
      label: 'Título Principal',
      required: true,
      admin: {
        description: 'Título principal del hero',
      },
    },
    {
      name: 'gotasImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de Gotas',
      required: true,
      admin: {
        description: 'Imagen decorativa de gotas',
      },
    },
    {
      name: 'leftTags',
      type: 'array',
      label: 'Tags Izquierdos',
      admin: {
        description: 'Tags que aparecerán en el lado izquierdo',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
    },
    {
      name: 'rightTags',
      type: 'array',
      label: 'Tags Derechos',
      admin: {
        description: 'Tags que aparecerán en el lado derecho',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
    },
  ],
}
