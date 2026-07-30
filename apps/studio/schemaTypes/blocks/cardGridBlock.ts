import {defineArrayMember, defineField, defineType} from 'sanity'

export const cardGridBlock = defineType({
  name: 'cardGridBlock',
  title: 'Card grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Card',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'description', title: 'Descrizione', type: 'text', rows: 3}),
            defineField({name: 'image', title: 'Immagine opzionale', type: 'image', options: {hotspot: true}}),
            defineField({name: 'link', title: 'Link opzionale', type: 'string'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', media: 'image'},
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Card grid', subtitle: 'Griglia di card'}),
  },
})
