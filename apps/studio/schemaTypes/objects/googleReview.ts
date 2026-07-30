import {defineField, defineType} from 'sanity'

export const googleReview = defineType({
  name: 'googleReview',
  title: 'Recensione Google',
  type: 'object',
  fields: [
    defineField({
      name: 'author',
      title: 'Nome autore',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Valutazione',
      description: 'Numero di stelle assegnate su Google.',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Testo recensione',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'reviewDate', title: 'Data recensione', type: 'date'}),
    defineField({
      name: 'avatar',
      title: 'Foto autore opzionale',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Testo alternativo', type: 'string'})],
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Link alla recensione opzionale',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'author', rating: 'rating', subtitle: 'text', media: 'avatar'},
    prepare: ({title, rating, subtitle, media}) => ({
      title: title || 'Recensione Google',
      subtitle: `${rating || 0}/5${subtitle ? ` - ${subtitle}` : ''}`,
      media,
    }),
  },
})
