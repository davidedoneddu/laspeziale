import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'h5heqcpt'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN. Imposta un token con permessi di scrittura e riprova.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-22',
  token,
  useCdn: false,
})

const assetDirectory = fileURLToPath(new URL('../../web/public/assets/old-site/', import.meta.url))

const programs = [
  {
    title: 'Nutrizione Integrata',
    slug: 'nutrizione-integrata',
    aliases: [],
    image: 'nutrizione-integrata.jpg',
    category: 'Nutrizione e benessere',
    excerpt: 'Molto più di una dieta: un metodo che integra alimentazione personalizzata, analisi della composizione corporea, fitoterapia e consapevolezza.',
    order: 1,
    audience: ['Chi vuole dimagrire senza diete drastiche', 'Chi desidera migliorare energia e forma fisica', 'Chi cerca un percorso sostenibile nel tempo'],
    benefits: ['Analisi completa', 'Piano personalizzato', 'Supporto continuo', 'Approccio integrato'],
  },
  {
    title: 'Fitoterapia Erbe officinali e Nutraceutici',
    slug: 'fitoterapia-erbe-officinali-nutraceutici',
    aliases: ['fitoterapia'],
    image: 'fitoterapia.jpg',
    category: 'Fitoterapia',
    excerpt: 'Un percorso naturale pensato per depurare, riequilibrare e mantenere il benessere, integrando erbe officinali e nutraceutici selezionati.',
    order: 2,
    audience: ['Chi cerca un supporto naturale', 'Chi desidera integrare il percorso alimentare'],
    benefits: ['Energia e vitalità', 'Approccio naturale', 'Supporto personalizzato'],
  },
  {
    title: 'Gestione del peso, cellulite e ricomposizione corporea',
    slug: 'gestione-peso-ricomposizione-corporea',
    aliases: [],
    image: 'gestione-peso-2026.jpg',
    category: 'Area clinica',
    excerpt: 'Un percorso personalizzato per ridurre la massa grassa, migliorare la composizione corporea e valorizzare la silhouette, senza rinunce e con risultati duraturi.',
    order: 3,
    audience: ['Chi desidera perdere peso senza diete drastiche', 'Chi vuole migliorare composizione corporea e tono', 'Chi cerca un metodo sostenibile e monitorabile'],
    benefits: ['Gestione del peso', 'Ricomposizione corporea', 'Abitudini sostenibili', 'Monitoraggio'],
  },
  {
    title: 'Gonfiore e disturbi intestinali',
    slug: 'gonfiore-disturbi-intestinali',
    aliases: ['gonfiore-digestione-lenta'],
    image: 'gonfiore-intestinale-2026.jpg',
    category: 'Area clinica',
    excerpt: 'Un percorso dedicato a digestione, gonfiore e funzionalita intestinale per aiutare il tuo organismo a ritrovare regolarità e leggerezza.',
    order: 4,
    audience: ['Chi convive con gonfiore addominale frequente', 'Chi nota digestione lenta, tensione o fastidi dopo i pasti', 'Chi vuole capire il rapporto tra alimentazione, intestino e benessere quotidiano'],
    benefits: ['Meno gonfiore', 'Digestione più leggera', 'Benessere intestinale', 'Maggiore chiarezza'],
  },
  {
    title: 'Le fasi della donna',
    slug: 'menopausa-premenopausa',
    aliases: ['menopausa-e-premenopausa', 'premenopausa-menopausa'],
    image: 'fasi-donna-2026.jpg',
    category: 'Benessere femminile',
    excerpt: 'PCOS, endometriosi, ciclo irregolare, fertilita, premenopausa e menopausa: un progetto che accompagna il corpo nelle diverse fasi della vita, adattandosi ai suoi nuovi bisogni.',
    order: 5,
    audience: ['Donne in premenopausa', 'Donne in menopausa', 'Donne che vogliono prevenire disturbi legati ai cambiamenti ormonali'],
    benefits: ['Sostegno metabolico', 'Gestione dei sintomi', 'Equilibrio ormonale ed emotivo', 'Abitudini sostenibili'],
  },
  {
    title: 'Longevità e Vitalità',
    slug: 'programma-anti-age',
    aliases: ['anti-age'],
    image: 'vitalita-2026.jpg',
    category: 'Anti-age',
    excerpt: 'Un percorso dedicato a mantenere energia, forza, tono muscolare e vitalità, per vivere ogni fase della vita con maggiore equilibrio.',
    order: 6,
    audience: ['Chi vuole lavorare su prevenzione e vitalità', 'Chi cerca un approccio integrato'],
    benefits: ['Prevenzione e vitalità', 'Routine alimentari sostenibili', 'Supporto antinfiammatorio'],
  },
  {
    title: 'Nutrizione Sportiva',
    slug: 'nutrizione-sportiva',
    aliases: [],
    image: 'sport-2026.jpg',
    category: 'Sport',
    excerpt: "Un'alimentazione personalizzata per migliorare composizione corporea, recupero ed energia, sostenendo ogni obiettivo sportivo.",
    order: 7,
    audience: ['Sportivi amatoriali', 'Chi vuole migliorare performance e recupero'],
    benefits: ["Energia per l'allenamento", 'Recupero migliore', 'Strategie pratiche per pasti e idratazione'],
  },
  {
    title: 'Consapevolezza e Motivazione',
    slug: 'consapevolezza-motivazione',
    aliases: [],
    image: 'consapevolezza-2026.jpg',
    category: 'Coaching alimentare',
    excerpt: 'Supporto motivazionale e strumenti di consapevolezza corporea per trasformare le abitudini con gradualita.',
    order: 6,
    audience: ['Chi fatica a mantenere i risultati', 'Chi cerca un cambiamento sostenibile'],
    benefits: ['Obiettivi realistici', 'Maggiore consapevolezza', 'Continuità nel tempo'],
  },
]

async function imageReference(filename, alt) {
  const existingId = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
    {filename},
  )
  const asset = existingId
    ? {_id: existingId}
    : await client.assets.upload('image', createReadStream(`${assetDirectory}${filename}`), {
        filename,
        title: alt,
      })

  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt}
}

function portableParagraph(text, key) {
  return [
    {
      _type: 'block',
      _key: key,
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: `${key}-span`, marks: [], text}],
    },
  ]
}

async function syncProgram(program) {
  const slugs = [program.slug, ...program.aliases]
  const existingId = await client.fetch(
    '*[_type == "program" && slug.current in $slugs][0]._id',
    {slugs},
  )
  const coverImage = await imageReference(program.image, program.title)
  const defaults = {
    title: program.title,
    excerpt: program.excerpt,
    category: program.category,
    coverImage,
    duration: 'Percorso personalizzato',
    programType: 'Percorso su consulenza',
    deliveryMode: 'Online o in studio',
    personalizedNote: 'Piano su misura in base alle tue esigenze',
    audienceTitle: 'A chi si rivolge',
    audience: program.audience,
    descriptionTitle: 'Il percorso',
    description: portableParagraph(
      `Il percorso ${program.title} viene costruito sulle esigenze, le abitudini e gli obiettivi della persona, con indicazioni concrete e sostenibili nel tempo.`,
      `description-${program.order}`,
    ),
    benefitsTitle: 'I benefici del percorso',
    benefitCards: program.benefits.map((title, index) => ({
      _type: 'programBenefit',
      _key: `benefit-${program.order}-${index + 1}`,
      icon: ['leaf', 'heart', 'activity', 'sparkles'][index % 4],
      title,
      description: 'Un beneficio concreto personalizzato in base alle esigenze del percorso.',
    })),
    processTitle: 'Come funziona il percorso',
    processSteps: [
      {_type: 'programStep', _key: `contact-${program.order}`, title: 'Primo contatto', description: 'Raccolta delle informazioni e analisi delle esigenze.'},
      {_type: 'programStep', _key: `plan-${program.order}`, title: 'Piano personalizzato', description: 'Creazione di un percorso nutrizionale su misura.'},
      {_type: 'programStep', _key: `followup-${program.order}`, title: 'Monitoraggio e supporto', description: 'Controlli e aggiornamenti per accompagnare i risultati.'},
    ],
    faqsTitle: 'Domande frequenti',
    faqs: [
      {_key: `duration-${program.order}`, question: 'Quanto dura il percorso?', answer: 'La durata viene definita in base alle esigenze e agli obiettivi personali.'},
      {_key: `online-${program.order}`, question: 'Posso seguire il percorso online?', answer: 'Quando previsto, il percorso può essere svolto online o in studio.'},
    ],
    ctaLabel: 'Prenota una consulenza',
    ctaLink: '/contatti',
    heroPrimaryLabel: 'Scopri di più',
    finalCtaTitle: `Vuoi iniziare il percorso ${program.title}?`,
    finalCtaText: 'Scrivici su WhatsApp o inviaci una email per ricevere maggiori informazioni e prenotare la tua consulenza.',
    finalWhatsappLabel: 'Scrivi su WhatsApp',
    finalEmailLabel: 'Invia una email',
    isPublished: true,
    showInMenu: true,
    isFeatured: program.order <= 3,
    order: program.order,
    showAnchorNav: true,
    showOverview: true,
    showAudience: true,
    showDescription: true,
    showBenefits: true,
    showProcess: true,
    showFaqs: true,
    showExtraContent: true,
    showFinalCta: true,
    seo: {_type: 'seo', title: `${program.title} | La Speziale`, description: program.excerpt},
  }

  if (existingId) {
    return client
      .patch(existingId)
      .setIfMissing(defaults)
      .set({slug: {_type: 'slug', current: program.slug}, order: program.order})
      .commit()
  }

  return client.create({
    _type: 'program',
    slug: {_type: 'slug', current: program.slug},
    ...defaults,
  })
}

const syncedPrograms = []
for (const program of programs) syncedPrograms.push(await syncProgram(program))

const programsHero = await imageReference('hero-header.jpg', 'Scorrimento e programmi La Speziale')
await client.createIfNotExists({_id: 'programsPage', _type: 'programsPage'})
await client
  .patch('programsPage')
  .setIfMissing({
    heroEyebrow: 'Programmi',
    heroTitle: 'Cosa trattiamo',
    heroText:
      "Peso, intestino, cambiamenti ormonali, vitalitÃ  e attivitÃ  fisica possono richiedere attenzioni diverse. Per questo il Metodo La Speziale si adatta all'obiettivo e alla fase che stai vivendo.",
    heroImage: programsHero,
    listTitle: 'Trova il percorso piÃ¹ vicino a ciÃ² che vuoi migliorare',
    listText: 'Cinque aree di intervento, costruite intorno a esigenze e obiettivi diversi.',
    cardButtonLabel: 'Scopri di più',
    methodEyebrow: 'Come scegliere',
    methodTitle: 'Il programma completo parte dalla nutrizione, ma non tutti i bisogni richiedono una dieta.',
    methodText:
      'La Speziale distingue tra percorsi nutrizionali personalizzati e supporti indipendenti: così ogni persona può orientarsi verso la consulenza più adatta al proprio momento.',
    methodCoreEyebrow: 'Il core del metodo',
    methodCoreText:
      'Il percorso completo unisce dieta personalizzata, consulenza, follow-up, eventuale fitoterapia e prodotti consigliati quando sono utili al risultato.',
    methodCoreLinkLabel: 'Approfondisci il programma',
    methodDietLabel: 'Con dieta',
    methodDietTitle: 'Percorsi nutrizionali',
    methodDietText:
      'Per chi desidera un piano alimentare strutturato, controlli periodici e un accompagnamento completo.',
    methodPhytoLabel: 'Senza dieta',
    methodPhytoTitle: 'Fitoterapia indipendente',
    methodPhytoText:
      'Per chi cerca consigli fitoterapici e prodotti selezionati, senza avviare un percorso alimentare completo.',
    methodPhytoLinkLabel: 'Scopri la fitoterapia',
    cta: {
      _type: 'pageCta',
      eyebrow: 'Contatto diretto',
      title: 'Non sai quale percorso scegliere?',
      text: 'Raccontaci cosa vorresti migliorare: ti aiuteremo a individuare il percorso da cui partire.',
      primaryLabel: 'Scrivi su WhatsApp',
      secondaryLabel: 'Invia una email',
    },
    seo: {
      _type: 'seo',
      title: 'Programmi | Studio nutrizionista La Speziale Milano',
      description: 'Programmi nutrizionali personalizzati, fitoterapia, menopausa, anti-age e nutrizione sportiva a Milano.',
    },
  })
  .commit()

console.log(`Sincronizzati ${syncedPrograms.length} programmi e la pagina Programmi.`)
