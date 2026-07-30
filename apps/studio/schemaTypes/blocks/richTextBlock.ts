import {defineField, defineType} from 'sanity'

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Testo ricco',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titolo opzionale', type: 'string'}),
    defineField({
      name: 'content',
      title: 'Contenuto',
      type: 'richText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Testo ricco', subtitle: 'Blocco testo'}),
  },
})
