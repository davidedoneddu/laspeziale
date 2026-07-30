import {defineField, defineType} from 'sanity'

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Prodotti',
  type: 'document',
  initialValue: {
    heroEyebrow: 'Prodotti consigliati',
    heroTitle: 'La tua lista della spesa naturale',
    heroText:
      'I prodotti presenti in questa pagina sono solo consigliati da La Speziale e non sono venduti direttamente dallo studio: il sito non e un ecommerce, non gestisce carrelli, pagamenti, spedizioni o assistenza sugli ordini. Le informazioni non sostituiscono una consulenza medica, nutrizionale o sanitaria personalizzata.',
    contentTitle: 'Prodotti consigliati',
    contentText: 'Lista consultabile dei prodotti consigliati, senza vendita diretta sul sito.',
    gridTitle: 'Prodotti consigliati',
    gridText:
      'Cerca il nome esatto del prodotto consigliato sul foglio oppure filtra per area di benessere.',
    searchLabel: 'Cerca un prodotto',
    searchPlaceholder: 'Digita il nome del prodotto consigliato sul foglio...',
    emptyText: 'Nessun prodotto corrisponde alla ricerca.',
    cardButtonLabel: 'Scopri il prodotto',
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
    defineField({name: 'contentTitle', title: 'Titolo contenuto', type: 'string', group: 'content'}),
    defineField({name: 'contentText', title: 'Testo contenuto', type: 'text', rows: 5, group: 'content'}),
    defineField({name: 'gridTitle', title: 'Titolo sopra la griglia', type: 'string', group: 'content'}),
    defineField({name: 'gridText', title: 'Testo sopra la griglia', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'searchLabel', title: 'Etichetta ricerca', type: 'string', group: 'content'}),
    defineField({name: 'searchPlaceholder', title: 'Testo dentro la ricerca', type: 'string', group: 'content'}),
    defineField({name: 'emptyText', title: 'Messaggio senza risultati', type: 'string', group: 'content'}),
    defineField({name: 'cardButtonLabel', title: 'Testo bottone card', type: 'string', group: 'content'}),
    defineField({name: 'cta', title: 'Contenuto CTA', type: 'pageCta', group: 'cta'}),
    defineField({name: 'seo', title: 'Titolo e descrizione Google', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Prodotti', subtitle: 'Impostazioni archivio prodotti'})},
})
