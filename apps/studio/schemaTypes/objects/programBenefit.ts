import {defineField, defineType} from 'sanity'

export const programBenefit = defineType({
  name: 'programBenefit',
  title: 'Beneficio completo',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icona',
      type: 'string',
      initialValue: 'leaf',
      options: {
        list: [
          {title: 'Foglia / naturale', value: 'leaf'},
          {title: 'Cuore / benessere', value: 'heart'},
          {title: 'Bilancia / equilibrio', value: 'scale'},
          {title: 'Attivita / energia', value: 'activity'},
          {title: 'Obiettivo', value: 'target'},
          {title: 'Protezione', value: 'shield'},
          {title: 'Forza / sport', value: 'dumbbell'},
          {title: 'Scintilla / vitalita', value: 'sparkles'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'title',
      title: 'Titolo beneficio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(180).warning('Meglio restare sotto i 180 caratteri.'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
    prepare: ({title, subtitle}) => ({title: title || 'Beneficio', subtitle}),
  },
})
