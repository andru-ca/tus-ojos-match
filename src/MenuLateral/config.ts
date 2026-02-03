import type { GlobalConfig } from 'payload'

import { revalidateMenuLateral } from './hooks/revalidateMenuLateral'

export const MenuLateral: GlobalConfig = {
  slug: 'menuLateral',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      defaultValue: 'Compra Online',
      admin: {
        description: 'Título principal del menú lateral',
      },
    },
    {
      name: 'subtitulo',
      type: 'text',
      required: true,
      defaultValue: 'Encuentra tus productos en las siguientes farmacias',
      admin: {
        description: 'Subtítulo descriptivo del menú',
      },
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Pestañas (Tabs)',
      required: true,
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Pestañas para filtrar las farmacias (ej: RedOff, DryOff)',
        initCollapsed: true,
        components: {
          RowLabel: '@/MenuLateral/RowLabel#TabRowLabel',
        },
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          admin: {
            description: 'Nombre de la pestaña (ej: RedOff)',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'Identificador único para la pestaña (ej: redoff)',
          },
        },
      ],
    },
    {
      name: 'farmacias',
      type: 'array',
      label: 'Farmacias',
      required: true,
      minRows: 1,
      admin: {
        description: 'Lista de farmacias donde se pueden comprar los productos',
        initCollapsed: true,
        components: {
          RowLabel: '@/MenuLateral/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          admin: {
            description: 'Nombre de la farmacia',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Logo de la farmacia',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'URL del sitio web de la farmacia',
          },
        },
        {
          name: 'abrirEnNuevaTab',
          type: 'checkbox',
          defaultValue: true,
          label: 'Abrir en nueva pestaña',
          admin: {
            description: 'Si está marcado, el enlace se abrirá en una nueva pestaña',
          },
        },
        {
          name: 'categorias',
          type: 'array',
          label: 'Categorías asociadas',
          admin: {
            description: 'Selecciona las pestañas (tabs) donde aparecerá esta farmacia',
          },
          fields: [
            {
              name: 'categoria',
              type: 'text',
              required: true,
              admin: {
                description: 'Slug de la categoría (debe coincidir con el slug de una pestaña)',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateMenuLateral],
  },
}
