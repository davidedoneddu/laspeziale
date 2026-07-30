import {defineArrayMember, defineType} from 'sanity'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Sezioni pagina',
  description: 'Aggiungi sezioni una sotto l altra: testo, immagine, CTA, FAQ o testimonianze.',
  type: 'array',
  of: [
    defineArrayMember({type: 'heroBlock', title: 'Hero / apertura pagina'}),
    defineArrayMember({type: 'richTextBlock', title: 'Testo editoriale'}),
    defineArrayMember({type: 'textImageBlock', title: 'Testo con immagine'}),
    defineArrayMember({type: 'benefitsBlock', title: 'Lista benefici'}),
    defineArrayMember({type: 'cardGridBlock', title: 'Griglia card'}),
    defineArrayMember({type: 'faqBlock', title: 'FAQ'}),
    defineArrayMember({type: 'testimonialsBlock', title: 'Testimonianze'}),
    defineArrayMember({type: 'ctaBlock', title: 'Call to action'}),
    defineArrayMember({type: 'galleryBlock', title: 'Galleria immagini'}),
    defineArrayMember({type: 'videoEmbedBlock', title: 'Video'}),
  ],
})
