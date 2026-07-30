import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonianze',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nome', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Testo', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    defineField({
      name: 'image',
      title: 'Immagine opzionale',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Testo alternativo', type: 'string'})],
    }),
    defineField({name: 'role', title: 'Ruolo/descrizione opzionale', type: 'string'}),
    defineField({name: 'visible', title: 'Visibile', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Ordine', type: 'number', initialValue: 0}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image', visible: 'visible'},
    prepare: ({title, subtitle, media, visible}) => ({
      title: title || 'Testimonianza',
      subtitle: `${visible === false ? 'Nascosta' : 'Visibile'}${subtitle ? ` - ${subtitle}` : ''}`,
      media,
    }),
  },
})
