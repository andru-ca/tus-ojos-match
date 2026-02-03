import type { Block } from 'payload'

export const CarruselTab: Block = {
  slug: 'carruselTab',
  interfaceName: 'CarruselTabBlock',
  fields: [
    {
      name: 'topText',
      type: 'text',
      label: 'Texto Superior',
      admin: {
        description: 'Texto pequeño que aparece arriba del título',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título Principal',
      required: true,
      admin: {
        description: 'Título principal de la sección',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Color de Fondo',
      defaultValue: '#F0F5F5',
      admin: {
        description: 'Color de fondo de la sección (formato hex)',
      },
    },
    // Opciones para RedOff
    {
      name: 'redOffOptions',
      type: 'array',
      label: 'Opciones RedOff',
      minRows: 1,
      admin: {
        description: 'Opciones que aparecerán en el tab RedOff',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre de la Opción',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción Principal',
          required: true,
        },
        {
          name: 'statTitle',
          type: 'text',
          label: 'Título de Estadística',
        },
        {
          name: 'statValue',
          type: 'text',
          label: 'Valor de Estadística',
        },
        {
          name: 'statDescription',
          type: 'text',
          label: 'Descripción de Estadística',
        },
        {
          name: 'tipsTitle',
          type: 'text',
          label: 'Título de Consejos',
        },
        {
          name: 'tips',
          type: 'array',
          label: 'Consejos',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto del Consejo',
              required: true,
            },
          ],
        },
      ],
    },
    // Opciones para DryOff
    {
      name: 'dryOffOptions',
      type: 'array',
      label: 'Opciones DryOff',
      minRows: 1,
      admin: {
        description: 'Opciones que aparecerán en el tab DryOff',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre de la Opción',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción Principal',
          required: true,
        },
        {
          name: 'statTitle',
          type: 'text',
          label: 'Título de Estadística',
        },
        {
          name: 'statValue',
          type: 'text',
          label: 'Valor de Estadística',
        },
        {
          name: 'statDescription',
          type: 'text',
          label: 'Descripción de Estadística',
        },
        {
          name: 'tipsTitle',
          type: 'text',
          label: 'Título de Consejos',
        },
        {
          name: 'tips',
          type: 'array',
          label: 'Consejos',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto del Consejo',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
