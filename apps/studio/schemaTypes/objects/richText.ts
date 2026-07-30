import {defineArrayMember, defineType} from 'sanity'

export const richText = defineType({
  name: 'richText',
  title: 'Testo formattato',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragrafo', value: 'normal'},
        {title: 'Titolo H2', value: 'h2'},
        {title: 'Titolo H3', value: 'h3'},
      ],
      lists: [
        {title: 'Elenco puntato', value: 'bullet'},
        {title: 'Elenco numerato', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Grassetto', value: 'strong'},
          {title: 'Corsivo', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}).required(),
              },
              {
                name: 'blank',
                title: 'Apri in nuova scheda',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
  ],
})
