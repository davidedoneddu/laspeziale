import {defineArrayMember, defineField, defineType} from 'sanity'

export const methodPage = defineType({
  name: 'methodPage',
  title: 'Pagina Il Metodo',
  type: 'document',
  initialValue: {
    heroEyebrow: 'Il Metodo',
    heroTitle: 'Il Metodo',
    heroText:
      'Tre competenze lavorano insieme per offrirti un unico programma, chiaro, coordinato e semplice da seguire.',
    introTitle: 'La semplicita che vivi nasce dal lavoro che non vedi.',
    introText:
      'Il Metodo La Speziale nasce da un principio semplice: osservare la persona nel suo insieme. Biologa Nutrizionista, Farmacista Fitoterapeuta e Tutor del Benessere condividono informazioni, competenze e obiettivi per individuare la soluzione piu adatta a ogni situazione.',
    coreEyebrow: 'Come nasce il tuo programma',
    coreTitle: 'Un metodo semplice, organizzato e costruito intorno a te.',
    coreText:
      'Per te questo significa un unico programma, coerente e facile da seguire, senza dover gestire indicazioni separate.',
    dietTitle: 'I tre pilastri del Metodo',
    dietText: "Tre competenze. Un'unica direzione.",
    phytoTitle: 'Il vero risultato',
    phytoText:
      'Il vero risultato e vivere meglio il proprio corpo, ogni giorno.',
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
    defineField({name: 'coreEyebrow', title: 'Etichetta riquadro core', type: 'string', group: 'content'}),
    defineField({name: 'coreTitle', title: 'Titolo riquadro core', type: 'string', group: 'content'}),
    defineField({name: 'coreText', title: 'Testo riquadro core', type: 'text', rows: 4, group: 'content'}),
    defineField({
      name: 'coreItems',
      title: 'Punti del percorso centrale',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(5).warning('Meglio non superare 5 punti.'),
    }),
    defineField({name: 'dietTitle', title: 'Titolo percorso con dieta', type: 'string', group: 'content'}),
    defineField({name: 'dietText', title: 'Testo percorso con dieta', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'phytoTitle', title: 'Titolo percorso senza dieta', type: 'string', group: 'content'}),
    defineField({name: 'phytoText', title: 'Testo percorso senza dieta', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'cta', title: 'Contenuto CTA', type: 'pageCta', group: 'cta'}),
    defineField({name: 'seo', title: 'Titolo e descrizione Google', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'heroTitle', media: 'heroImage'},
    prepare: ({title, media}) => ({title: 'Pagina Il Metodo', subtitle: title, media}),
  },
})
