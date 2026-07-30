import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Domanda', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'answer', title: 'Risposta', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Categoria', type: 'string'}),
    defineField({name: 'order', title: 'Ordine', type: 'number', initialValue: 0}),
    defineField({name: 'visible', title: 'Visibile', type: 'boolean', initialValue: true}),
  ],
  preview: {
    select: {title: 'question', subtitle: 'category', visible: 'visible'},
    prepare: ({title, subtitle, visible}) => ({
      title: title || 'FAQ senza domanda',
      subtitle: `${visible === false ? 'Nascosta' : 'Visibile'}${subtitle ? ` - ${subtitle}` : ''}`,
    }),
  },
})
