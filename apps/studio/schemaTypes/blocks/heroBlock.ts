import {defineField, defineType} from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero / apertura pagina',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Etichetta piccola sopra il titolo', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'subtitle', title: 'Testo sotto al titolo', type: 'text', rows: 3}),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'ctaLabel', title: 'Testo bottone', type: 'string'}),
    defineField({name: 'ctaLink', title: 'Link bottone', description: 'Esempio: /contatti', type: 'string'}),
    defineField({
      name: 'alignment',
      title: 'Allineamento',
      type: 'string',
      options: {
        list: [
          {title: 'Sinistra', value: 'left'},
          {title: 'Centro', value: 'center'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Hero', subtitle: 'Blocco hero', media}),
  },
})
