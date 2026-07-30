import {defineField, defineType} from 'sanity'

export const videoEmbedBlock = defineType({
  name: 'videoEmbedBlock',
  title: 'Video embed',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titolo opzionale', type: 'string'}),
    defineField({
      name: 'videoUrl',
      title: 'URL video',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}).required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'videoUrl'},
    prepare: ({title, subtitle}) => ({title: title || 'Video', subtitle}),
  },
})
