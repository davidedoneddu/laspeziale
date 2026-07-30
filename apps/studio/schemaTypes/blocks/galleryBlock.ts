import {defineArrayMember, defineField, defineType} from 'sanity'

export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Galleria immagini',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titolo opzionale', type: 'string'}),
    defineField({
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'images.0'},
    prepare: ({title, media}) => ({title: title || 'Galleria immagini', subtitle: 'Blocco galleria', media}),
  },
})
