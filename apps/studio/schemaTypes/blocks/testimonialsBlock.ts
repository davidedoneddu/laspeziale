import {defineArrayMember, defineField, defineType} from 'sanity'

export const testimonialsBlock = defineType({
  name: 'testimonialsBlock',
  title: 'Testimonianze block',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titolo', type: 'string'}),
    defineField({
      name: 'testimonials',
      title: 'Testimonianze',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Testimonianze', subtitle: 'Blocco testimonianze'}),
  },
})
