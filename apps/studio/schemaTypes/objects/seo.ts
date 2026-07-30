import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Google',
      description: 'Titolo mostrato nei risultati di ricerca. Se vuoto, viene usato il titolo della pagina.',
      type: 'string',
      validation: (rule) => rule.max(70).warning('Meglio restare sotto i 70 caratteri.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione Google',
      description: 'Breve descrizione per i motori di ricerca.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Meglio restare sotto i 160 caratteri.'),
    }),
    defineField({
      name: 'image',
      title: 'Immagine social',
      description: 'Immagine usata quando la pagina viene condivisa.',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
