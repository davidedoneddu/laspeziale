import {defineField, defineType} from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titolo', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Testo', type: 'text', rows: 3}),
    defineField({name: 'buttonLabel', title: 'Label bottone', type: 'string'}),
    defineField({name: 'buttonLink', title: 'Link bottone', type: 'string'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'buttonLabel'},
    prepare: ({title, subtitle}) => ({title: title || 'CTA', subtitle: subtitle || 'Call to action'}),
  },
})
