import {defineArrayMember, defineField, defineType} from 'sanity'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ block',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titolo', type: 'string'}),
    defineField({
      name: 'faqs',
      title: 'FAQ esistenti',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'faq'}]})],
    }),
    defineField({
      name: 'manualFaqs',
      title: 'FAQ manuali',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Domanda', type: 'string'}),
            defineField({name: 'answer', title: 'Risposta', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'FAQ', subtitle: 'Blocco domande frequenti'}),
  },
})
