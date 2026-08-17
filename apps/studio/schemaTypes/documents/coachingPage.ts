import {defineArrayMember, defineField, defineType} from 'sanity'

export const coachingPage = defineType({
  name: 'coachingPage',
  title: 'Consapevolezza e Coaching',
  type: 'document',
  initialValue: {
    heroEyebrow: 'Consulenza di Consapevolezza',
    heroTitle: 'Consulenza di Consapevolezza',
    heroSubtitle: 'Riconoscersi è il primo passo per stare bene con sé stessi.',
    heroText:
      'Un percorso con il Tutor del Benessere per imparare a leggere il linguaggio del proprio corpo, valorizzare la propria persona e vivere con maggiore serenità ogni fase della vita.',
    introTitle: 'Viviamo spesso rivolti verso cio che dobbiamo fare, dedicando poco tempo ad ascoltare noi stessi.',
    introText:
      'Questa consulenza nasce per aiutare la persona a fermarsi, osservare il modo in cui vive il proprio corpo e riscoprire un rapporto piu autentico con se stessa.',
    audienceTitle: 'A chi è rivolta',
    audienceItems: [
      'Conoscersi meglio',
      'Migliorare il rapporto con il proprio corpo',
      'Valorizzare la propria immagine',
      'Affrontare con maggiore serenita una nuova fase della vita',
      'Dedicare del tempo alla propria persona',
    ],
    methodTitle: 'Il Tutor del Benessere accompagna la persona in un percorso pratico di conoscenza di se.',
    methodSteps: [
      {title: 'Perche nasce', text: 'Viviamo spesso rivolti verso cio che dobbiamo fare, dedicando poco tempo ad ascoltare noi stessi.'},
      {title: 'Il Tutor del Benessere', text: 'Accompagna la persona in un percorso pratico di conoscenza di se attraverso il linguaggio del corpo.'},
      {title: 'Come si svolge', text: 'Ogni incontro parte dalla persona e dalla fase della vita che sta vivendo.'},
    ],
    cta: {
      eyebrow: 'CTA',
      title: 'Ogni percorso inizia da una maggiore conoscenza di se.',
      text: 'Prenota la tua Consulenza di Consapevolezza e scopri il valore di un approccio che mette la persona al centro.',
      primaryLabel: 'Prenota una consulenza',
      primaryLink: '/contatti',
    },
    seo: {
      title: 'Consulenza di Consapevolezza | La Speziale Milano',
      description:
        'Consulenza con il Tutor del Benessere per leggere il linguaggio del corpo, valorizzare la persona e vivere con maggiore serenita.',
    },
  },
  groups: [
    {name: 'hero', title: 'Apertura pagina', default: true},
    {name: 'content', title: 'Contenuto'},
    {name: 'cta', title: 'CTA finale'},
    {name: 'seo', title: 'SEO Google'},
  ],
  fields: [
    defineField({name: 'heroEyebrow', title: 'Etichetta', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitle', title: 'Titolo', type: 'string', group: 'hero', validation: (rule) => rule.required()}),
    defineField({name: 'heroSubtitle', title: 'Sottotitolo', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroText', title: 'Testo introduttivo', type: 'text', rows: 3, group: 'hero'}),
    defineField({
      name: 'heroImage',
      title: 'Immagine hero',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Testo alternativo', type: 'string'})],
    }),
    defineField({name: 'introTitle', title: 'Titolo introduzione', type: 'string', group: 'content'}),
    defineField({name: 'introText', title: 'Testo introduzione', type: 'text', rows: 5, group: 'content'}),
    defineField({name: 'audienceTitle', title: 'Titolo destinatari', type: 'string', group: 'content'}),
    defineField({
      name: 'audienceItems',
      title: 'Elenco destinatari',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(6).warning('Meglio non superare 6 punti.'),
    }),
    defineField({name: 'methodTitle', title: 'Titolo metodo', type: 'string', group: 'content'}),
    defineField({
      name: 'methodSteps',
      title: 'Passaggi metodo',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'text', title: 'Testo', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
      validation: (rule) => rule.max(4).warning('Il template funziona meglio con massimo 4 passaggi.'),
    }),
    defineField({name: 'cta', title: 'Contenuto CTA', type: 'pageCta', group: 'cta'}),
    defineField({name: 'seo', title: 'Titolo e descrizione Google', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'heroTitle', media: 'heroImage'},
    prepare: ({title, media}) => ({title: 'Consapevolezza e Coaching', subtitle: title, media}),
  },
})
