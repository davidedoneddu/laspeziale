import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'h5heqcpt'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN. Imposta un token Editor e riprova.')
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

async function completeSingleton(_id, _type, defaults) {
  await client.createIfNotExists({_id, _type})
  let patch = client.patch(_id).setIfMissing(defaults)

  for (const fieldName of ['cta', 'finalCta', 'seo']) {
    const nestedDefaults = defaults[fieldName]
    if (!nestedDefaults) continue

    for (const [name, value] of Object.entries(nestedDefaults)) {
      patch = patch.setIfMissing({[`${fieldName}.${name}`]: value})
    }
  }

  return patch.commit()
}

async function completeTestimonial(defaults) {
  const existingId = await client.fetch(
    '*[_type == "testimonial" && name == $name][0]._id',
    {name: defaults.name},
  )

  if (existingId) return client.patch(existingId).setIfMissing(defaults).commit()
  return client.create({_type: 'testimonial', ...defaults})
}

const [logo, homeHero, approachImage, productsHero] = await Promise.all([
  imageReference('logo.png', 'La Speziale'),
  imageReference('hero-movimento.png', 'Scorrimento e metodo La Speziale'),
  imageReference('nutrizione-integrata.jpg', 'Approccio nutrizionale La Speziale'),
  imageReference('fitoterapia.jpg', 'Prodotti e fitoterapia La Speziale'),
])

await completeSingleton('siteSettings', 'siteSettings', {
  siteTitle: 'Studio nutrizionista La Speziale Milano',
  logo,
  favicon: logo,
  email: 'laspeziale@laspeziale.it',
  phone: '+39 333 406 3401',
  address: 'Via San Giovanni Sul Muro 13, Milano',
  locationText:
    'Siamo nel centro di Milano, in un quartiere che unisce storia, cultura e dinamismo, a pochi passi da Largo Cairoli, dal Teatro Dal Verme e dal Castello Sforzesco.',
  openingHours: 'Martedi - Venerdi: 9:00 - 17:30\nSabato: 9:00 - 14:00\nOrario continuato',
  contactText:
    'Puoi scriverci o chiamarci. Ti ricontatteremo entro 24 ore per fornirti tutte le informazioni di cui hai bisogno e programmare un primo incontro personalizzato.',
  whatsapp: 'https://wa.me/393334063401',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  globalCtaLabel: 'Richiedi una consulenza',
  globalCtaLink: '/contatti',
  footerText: 'Nutrizione integrata, fitoterapia e percorsi personalizzati nel cuore di Milano.',
  privacyPolicyLink: '/privacy-policy',
  cookiePolicyLink: '/cookie-policy',
  legalName: 'La Speziale',
  privacyEmail: 'laspeziale@laspeziale.it',
  privacyUpdatedAt: '2026-06-22',
  seo: {
    _type: 'seo',
    title: 'Studio nutrizionista La Speziale Milano',
    description:
      'Studio nutrizionista a Milano per nutrizione integrata, programmi personalizzati, menopausa, anti-age, sport e consapevolezza corporea.',
  },
})

const featuredProgramDocuments = await client.fetch(
  '*[_type == "program" && slug.current in $slugs] | order(order asc) {_id}',
  {slugs: ['nutrizione-integrata', 'fitoterapia-erbe-officinali-nutraceutici', 'menopausa-premenopausa']},
)
const featuredProgramIds = featuredProgramDocuments.map((program) => program._id)

await completeSingleton('homepage', 'homepage', {
  heroTitle: 'Il Metodo La Speziale',
  heroSubtitle:
    'Nutrizione personalizzata, consiglio fitoterapico e supporto al cambiamento in un unico programma costruito intorno a te.',
  heroImage: homeHero,
  heroCtaLabel: 'Scopri il percorso',
  heroCtaLink: '/programmi',
  introEyebrow: 'Perche nasce il Metodo La Speziale',
  introTitle: 'La nutrizione cambia quando cambia il corpo.',
  introLead:
    'Nel corso degli anni abbiamo incontrato molte persone che, di fronte ai cambiamenti del proprio corpo, cercavano risposte diverse dai tradizionali schemi alimentari.',
  introBody:
    'Peso piu difficile da gestire, metabolismo che rallenta, variazioni ormonali, gonfiore e perdita di energia richiedono una valutazione piu ampia e competenze che lavorano insieme. Da questa esperienza nasce il Metodo La Speziale. Lavorare con tre professionisti non significa ricevere piu indicazioni o maggiore confusione: al contrario, la nostra sinergia costruisce un unico percorso, semplice da seguire e facilmente integrabile nella vita di tutti i giorni.',
  approachImage,
  value1Title: 'Lavoro di squadra',
  value1Text: 'Il confronto costante e il nostro valore aggiunto per assicurare la massima efficacia.',
  value2Title: "Centralita dell'individuo",
  value2Text: 'Soluzioni su misura che si adattano ai ritmi e ai bisogni di ciascuno.',
  value3Title: 'Accessibilita',
  value3Text: 'Un ambiente protetto, facile da integrare nella routine quotidiana grazie alla posizione centrale.',
  methodEyebrow: 'Il Metodo La Speziale',
  methodTitle: 'Un metodo che semplifica, non complica.',
  methodText:
    'Non ricevi indicazioni separate da professionisti diversi. Ricevi un unico percorso, costruito intorno a te e sostenuto da competenze che lavorano insieme.',
  methodCoreEyebrow: 'I tre pilastri',
  methodCoreText: 'Tre professionalita, un unico metodo snello.',
  methodCoreLinkLabel: 'Scopri il metodo',
  methodDietLabel: 'Percorsi dedicati',
  methodDietTitle: 'Come possiamo aiutarti',
  methodDietText:
    'Ogni persona ha esigenze diverse. Per questo abbiamo sviluppato percorsi dedicati ai principali bisogni che incontriamo ogni giorno nel nostro studio.',
  methodDietItems: [
    'Gestione peso e ricomposizione',
    'Menopausa, anti-age e sport',
    'Piano, monitoraggio e adattamenti',
  ],
  methodPhytoLabel: 'Consulenze autonome',
  methodPhytoTitle: 'Le stesse competenze, anche in percorsi dedicati.',
  methodPhytoText:
    'La Farmacista Fitoterapeuta e il Tutor del Benessere fanno parte del Metodo La Speziale, ma possono accompagnarti anche attraverso percorsi autonomi, quando rispondono meglio alle tue esigenze.',
  methodPhytoItems: [
    'Fitoterapia mirata',
    'Coaching e consapevolezza',
    'Supporto pratico senza piano alimentare',
  ],
  methodPhytoLinkLabel: 'Vai alla fitoterapia',
  ...(featuredProgramIds.length
    ? {
        featuredPrograms: featuredProgramIds.slice(0, 3).map((_ref, index) => ({
          _type: 'reference',
          _key: `featured-program-${index + 1}`,
          _ref,
        })),
      }
    : {}),
  finalCta: {
    _type: 'pageCta',
    eyebrow: 'CTA finale',
    title: 'Il tuo percorso inizia da qui.',
    text: 'Ascolteremo la tua storia, valuteremo le tue esigenze e costruiremo insieme il percorso piu adatto a te.',
    primaryLabel: 'Richiedi una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Studio nutrizionista La Speziale Milano',
    description:
      'Nutrizione personalizzata, fitoterapia e programmi di benessere sostenibile nel cuore di Milano.',
  },
})

const homepageDocuments = await client.fetch(
  '*[_id in ["homepage", "drafts.homepage"]]{_id, featuredPrograms}',
)
for (const document of homepageDocuments) {
  if (!document.featuredPrograms?.some((reference) => !reference._key)) continue

  const referencesWithKeys = document.featuredPrograms.map((reference, index) => ({
    ...reference,
    _key: reference._key || `featured-program-${index + 1}`,
  }))
  await client.patch(document._id).set({featuredPrograms: referencesWithKeys}).commit()
}

await completeSingleton('contactPage', 'contactPage', {
  heroEyebrow: 'Contatti',
  heroTitle: 'Contattaci',
  heroText:
    'Siamo nel centro di Milano, in un quartiere che unisce storia, cultura e dinamismo, a pochi passi da Largo Cairoli, dal Teatro Dal Verme e dal Castello Sforzesco.',
  locationTitle: 'Dove siamo',
  hoursTitle: 'Orari di apertura',
  hoursIntro: 'Riceviamo solo su appuntamento, nei seguenti orari:',
  contactTitle: 'Contattaci',
  formTitle: 'Scrivici',
  formText: 'Raccontaci di cosa hai bisogno e ti ricontatteremo.',
  nameLabel: 'Nome e cognome',
  namePlaceholder: 'Il tuo nome',
  emailLabel: 'Email',
  emailPlaceholder: 'nome@email.it',
  messageLabel: 'Messaggio',
  messagePlaceholder: 'Raccontaci di cosa hai bisogno',
  submitLabel: 'Invia richiesta',
  addressTitle: 'Indirizzo',
  contactsTitle: 'Contatti',
  mapLabel: 'Sede La Speziale, Milano',
  mapQuery: 'Via San Giovanni Sul Muro 13, Milano',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Via+San+Giovanni+Sul+Muro+13+Milano',
  seo: {
    _type: 'seo',
    title: 'Contatti | Studio nutrizionista La Speziale Milano',
    description:
      'Contatta lo Studio nutrizionista La Speziale a Milano. Indirizzo, telefono, email e orari su appuntamento.',
  },
})

await completeSingleton('testimonialsPage', 'testimonialsPage', {
  heroEyebrow: 'Dicono di noi',
  heroTitle: 'Esperienze di chi ha iniziato un nuovo percorso',
  heroText: 'Storie e testimonianze di chi ha scelto La Speziale.',
  sectionTitle: 'Storie e risultati',
  showGoogleReviews: false,
  googleEyebrow: 'Recensioni Google',
  googleTitle: 'La voce di chi ci ha scelto',
  googleText: 'Leggi le esperienze pubblicate sulla scheda Google di La Speziale.',
  googleBusinessName: 'La Speziale',
  googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Speziale+Milano',
  googleButtonLabel: 'Vedi tutte le recensioni su Google',
  cta: {
    _type: 'pageCta',
    eyebrow: 'Contatto diretto',
    title: 'Inizia anche tu un percorso consapevole',
    text: 'Contattaci per una prima consulenza.',
    primaryLabel: 'Scrivi su WhatsApp',
    secondaryLabel: 'Invia una email',
  },
  seo: {
    _type: 'seo',
    title: 'Dicono di noi | La Speziale Milano',
    description:
      'Testimonianze ed esperienze dei clienti dello Studio nutrizionista La Speziale a Milano.',
  },
})

const testimonials = [
  {
    name: 'Laura M.',
    role: 'Percorso Nutrizione Integrata',
    text: 'Ho trovato un percorso chiaro e realistico. Non una dieta da seguire per qualche settimana, ma un metodo piu adatto alla mia vita quotidiana.',
    visible: true,
    order: 1,
  },
  {
    name: 'Elena R.',
    role: 'Percorso Menopausa e Premenopausa',
    text: 'Mi sono sentita ascoltata e accompagnata passo dopo passo, con indicazioni semplici e sostenibili.',
    visible: true,
    order: 2,
  },
  {
    name: 'Marco P.',
    role: 'Nutrizione Sportiva',
    text: 'Il percorso mi ha aiutato a organizzare meglio alimentazione, allenamenti e recupero senza complicare le giornate.',
    visible: true,
    order: 3,
  },
]

for (const testimonial of testimonials) await completeTestimonial(testimonial)

await completeSingleton('productsPage', 'productsPage', {
  heroEyebrow: 'Prodotti',
  heroTitle: 'Una selezione pensata per il tuo benessere',
  heroText:
    'I prodotti presenti in questa pagina sono solo consigliati da La Speziale e non sono venduti direttamente dallo studio: il sito non e un ecommerce, non gestisce carrelli, pagamenti, spedizioni o assistenza sugli ordini. Le informazioni non sostituiscono una consulenza medica, nutrizionale o sanitaria personalizzata.',
  heroImage: productsHero,
  contentTitle: 'Prodotti consigliati',
  contentText: 'Lista consultabile dei prodotti consigliati, senza vendita diretta sul sito.',
  gridTitle: 'I nostri prodotti',
  gridText: 'Cerca per nome, categoria o caratteristica.',
  searchLabel: 'Cerca un prodotto',
  searchPlaceholder: 'Scrivi una parola...',
  emptyText: 'Nessun prodotto corrisponde alla ricerca.',
  cardButtonLabel: 'Scopri il prodotto',
  cta: {
    _type: 'pageCta',
    eyebrow: 'Informazioni',
    title: 'Vuoi ricevere maggiori informazioni?',
    text: 'Contattaci direttamente.',
    primaryLabel: 'Scrivi su WhatsApp',
    secondaryLabel: 'Invia una email',
  },
  seo: {
    _type: 'seo',
    title: 'Prodotti | La Speziale',
    description: 'Prodotti selezionati dallo Studio La Speziale a Milano.',
  },
})

console.log('Impostazioni, pagine statiche, testimonianze e pagina Prodotti sincronizzate.')
