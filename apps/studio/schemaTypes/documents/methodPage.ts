import {defineArrayMember, defineField, defineType} from 'sanity'

export const methodPage = defineType({
  name: 'methodPage',
  title: 'Pagina Il Metodo',
  type: 'document',
  initialValue: {
    introHeading: 'Il Metodo La Speziale',
    introTitle: 'La semplicità che vivi nasce dal lavoro che non vedi.',
    introText:
      "Il Metodo La Speziale nasce da un principio semplice: osservare la persona nel suo insieme.\nBiologa Nutrizionista, Farmacista specializzata in Fitoterapia e Tutor del Benessere condividono competenze, informazioni e obiettivi per costruire un'unica strategia.\nQuesto permette di trasformare valutazioni diverse in un solo programma, coordinato, personalizzato e facile da seguire, senza dover gestire indicazioni separate.",
    coreEyebrow: 'Come nasce il tuo programma',
    coreTitle: 'Un metodo organizzato, costruito intorno alla persona.',
    workSteps: [
      {number: '01', title: 'Conosciamo la persona', text: "Ogni programma inizia dall'ascolto della tua storia, delle tue abitudini, dei tuoi obiettivi e delle difficoltà che incontri nella vita quotidiana."},
      {number: '02', title: 'Conosciamo il tuo corpo', text: "L'esame BIA analizza composizione corporea, massa muscolare, massa grassa e stato di idratazione, offrendo informazioni che il peso da solo non può raccontare."},
      {number: '03', title: 'Costruiamo la strategia', text: 'Le informazioni raccolte vengono condivise tra i professionisti del Metodo, così ogni decisione nasce da una visione completa della persona e non da un singolo elemento.'},
      {number: '04', title: 'Accompagniamo il cambiamento', text: 'Ricevi un programma semplice da mettere in pratica, che evolve insieme ai risultati raggiunti e ai cambiamenti del tuo corpo.'},
    ],
    dietTitle: "Tre competenze, un'unica strategia",
    dietText: "Tre competenze. Un'unica direzione.",
    pillars: [
      {title: 'Nutrizione personalizzata', role: 'La Biologa Nutrizionista', text: 'Elabora il piano alimentare partendo dalla composizione corporea, dal metabolismo, dallo stile di vita e dagli obiettivi della persona, trasformando la valutazione in indicazioni concrete e sostenibili.'},
      {title: 'Il Consiglio Fitoterapico', role: 'La Farmacista specializzata in Fitoterapia', text: 'Quando è utile, integra il programma con piante officinali e nutraceutici selezionati in base alle esigenze della persona, valutando eventuali terapie farmacologiche e possibili interazioni.'},
      {title: 'Consapevolezza del corpo', role: 'Il Tutor del Benessere', text: 'Attraverso il linguaggio del corpo aiuta la persona a riconoscere i cambiamenti, valorizzare i progressi e trasformare il percorso in nuove abitudini da mantenere nel tempo.'},
    ],
    visitBoxes: [
      {title: 'Prima visita', items: ['Colloquio approfondito', 'Analisi dello stile di vita', 'Esame BIA', 'Definizione degli obiettivi', 'Piano alimentare personalizzato']},
      {title: 'Controlli periodici', items: ['Monitoraggio della composizione corporea', 'Verifica dei risultati', 'Aggiornamento del programma', 'Adattamento alle nuove esigenze']},
    ],
    journeyTitle: 'Il percorso',
    journeyHighlight:
      'Un unico percorso, senza visite separate: le tre competenze lavorano in modo coordinato e confluiscono nello stesso programma.',
    phytoTitle: 'Il vero risultato',
    resultHighlight: 'Il vero risultato è vivere meglio il proprio corpo, ogni giorno.',
    phytoText:
      'Più energia, maggiore consapevolezza e un modo nuovo di affrontare i cambiamenti.\nPerché il benessere non nasce da una soluzione momentanea, ma da un metodo che cresce insieme alla persona e diventa parte della sua quotidianità.',
  },
  groups: [
    {name: 'content', title: 'Contenuto', default: true},
    {name: 'cta', title: 'CTA finale'},
    {name: 'seo', title: 'SEO Google'},
  ],
  fields: [
    defineField({name: 'introHeading', title: 'Titolo principale', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'introImage',
      title: 'Immagine introduzione',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Testo alternativo', type: 'string'})],
    }),
    defineField({name: 'introTitle', title: 'Titolo introduzione', type: 'string', group: 'content'}),
    defineField({name: 'introText', title: 'Testo introduzione', type: 'text', rows: 5, group: 'content'}),
    defineField({name: 'coreEyebrow', title: 'Etichetta riquadro core', type: 'string', group: 'content'}),
    defineField({name: 'coreTitle', title: 'Titolo riquadro core', type: 'string', group: 'content'}),
    defineField({
      name: 'workSteps',
      title: 'Come nasce il programma - step',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'number', title: 'Numero', type: 'string'}),
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'text', title: 'Testo', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
      validation: (rule) => rule.max(4).warning('Il layout funziona meglio con 4 step.'),
    }),
    defineField({name: 'dietTitle', title: 'Titolo percorso con dieta', type: 'string', group: 'content'}),
    defineField({name: 'dietText', title: 'Testo percorso con dieta', type: 'text', rows: 3, group: 'content'}),
    defineField({
      name: 'pillars',
      title: 'Tre competenze',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'role', title: 'Ruolo', type: 'string'}),
            defineField({name: 'text', title: 'Testo', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'title', subtitle: 'role'}},
        }),
      ],
      validation: (rule) => rule.max(3).warning('Il layout prevede 3 pilastri.'),
    }),
    defineField({
      name: 'visitBoxes',
      title: 'Prima visita e controlli',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'items', title: 'Punti', type: 'array', of: [defineArrayMember({type: 'string'})]}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({name: 'journeyTitle', title: 'Titolo sezione percorso', type: 'string', group: 'content'}),
    defineField({name: 'journeyHighlight', title: 'Testo in evidenza del percorso', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'phytoTitle', title: 'Titolo percorso senza dieta', type: 'string', group: 'content'}),
    defineField({name: 'resultHighlight', title: 'Testo in evidenza del risultato', type: 'string', group: 'content'}),
    defineField({name: 'phytoText', title: 'Testo percorso senza dieta', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'cta', title: 'Contenuto CTA', type: 'pageCta', group: 'cta'}),
    defineField({name: 'seo', title: 'Titolo e descrizione Google', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'introHeading', media: 'introImage'},
    prepare: ({title, media}) => ({title: 'Pagina Il Metodo', subtitle: title, media}),
  },
})
