import {defineArrayMember, defineField, defineType} from 'sanity'

export const benefitsBlock = defineType({
  name: 'benefitsBlock',
  title: 'Lista benefici',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Benefici',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'description', title: 'Descrizione', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Lista benefici', subtitle: 'Blocco benefici'}),
  },
})
