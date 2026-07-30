import {defineField, defineType} from 'sanity'

export const pageCta = defineType({
  name: 'pageCta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Etichetta piccola', type: 'string'}),
    defineField({name: 'title', title: 'Titolo', type: 'string'}),
    defineField({name: 'text', title: 'Testo', type: 'text', rows: 3}),
    defineField({name: 'primaryLabel', title: 'Bottone principale - testo', type: 'string'}),
    defineField({name: 'primaryLink', title: 'Bottone principale - link', type: 'string'}),
    defineField({name: 'secondaryLabel', title: 'Bottone secondario - testo', type: 'string'}),
    defineField({name: 'secondaryLink', title: 'Bottone secondario - link', type: 'string'}),
    defineField({
      name: 'image',
      title: 'Immagine di sfondo opzionale',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Testo alternativo', type: 'string'})],
    }),
  ],
})
