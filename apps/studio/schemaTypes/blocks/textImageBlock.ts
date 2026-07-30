import {defineField, defineType} from 'sanity'

export const textImageBlock = defineType({
  name: 'textImageBlock',
  title: 'Testo + immagine',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'text', title: 'Testo', type: 'text', rows: 5}),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imagePosition',
      title: 'Posizione immagine',
      type: 'string',
      options: {
        list: [
          {title: 'Sinistra', value: 'left'},
          {title: 'Destra', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Testo + immagine', subtitle: 'Blocco editoriale', media}),
  },
})
