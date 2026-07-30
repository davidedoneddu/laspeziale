import {defineField, defineType} from 'sanity'

export const therapiesPage = defineType({
  name: 'therapiesPage',
  title: 'Fitoterapie',
  type: 'document',
  initialValue: {
    heroEyebrow: 'Il Consiglio Fitoterapico',
    heroTitle: 'Il Consiglio Fitoterapico',
    heroText:
      'Una consulenza con una Farmacista specializzata in Fitoterapia per individuare piante officinali e nutraceutici realmente adatti alla tua situazione.',
    contentTitle: 'Perche richiedere un consiglio fitoterapico?',
    contentText:
      "La scelta dipende dalla persona, dalle sue esigenze, dalle eventuali terapie in corso e dall'obiettivo che desidera raggiungere.",
    gridTitle: 'Molti prodotti naturali sembrano simili, ma non lo sono.',
    gridText: 'Per questo il valore della consulenza non e il prodotto, ma la valutazione che porta a sceglierlo.',
    cardButtonLabel: 'Richiedi una consulenza',
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
    defineField({name: 'heroImage', title: 'Immagine hero', type: 'image', group: 'hero', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Testo alternativo', type: 'string'})]}),
    defineField({name: 'contentTitle', title: 'Titolo contenuto', type: 'string', group: 'content'}),
    defineField({name: 'contentText', title: 'Testo contenuto', type: 'text', rows: 5, group: 'content'}),
    defineField({name: 'gridTitle', title: 'Titolo sopra la griglia', type: 'string', group: 'content'}),
    defineField({name: 'gridText', title: 'Testo sopra la griglia', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'cardButtonLabel', title: 'Testo bottone card', type: 'string', group: 'content'}),
    defineField({name: 'cta', title: 'Contenuto CTA', type: 'pageCta', group: 'cta'}),
    defineField({name: 'seo', title: 'Titolo e descrizione Google', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Fitoterapie', subtitle: 'Impostazioni archivio fitoterapie'})},
})
