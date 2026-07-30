import {defineField, defineType} from 'sanity'

export const programStep = defineType({
  name: 'programStep',
  title: 'Passaggio del percorso',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo passaggio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(220).warning('Meglio restare sotto i 220 caratteri.'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
    prepare: ({title, subtitle}) => ({title: title || 'Passaggio', subtitle}),
  },
})
