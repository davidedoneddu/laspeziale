import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'h5heqcpt'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN. Create a write token and run:')
  console.error('SANITY_AUTH_TOKEN=... pnpm seed:content')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-19',
  token,
  useCdn: false,
})

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

async function upsertSingleton(_id, _type, doc) {
  await client.createIfNotExists({_id, _type})
  return client.patch(_id).set(doc).commit()
}

async function upsertBySlug(_type, title, doc) {
  const slug = doc.slug?.current || slugify(title)
  const existing = await client.fetch('*[_type == $type && slug.current == $slug][0]._id', {
    type: _type,
    slug,
  })

  if (existing) {
    return client.patch(existing).set({title, slug: {_type: 'slug', current: slug}, ...doc}).commit()
  }

  return client.create({_type, title, slug: {_type: 'slug', current: slug}, ...doc})
}

async function upsertByName(_type, name, doc) {
  const existing = await client.fetch('*[_type == $type && name == $name][0]._id', {type: _type, name})

  if (existing) {
    return client.patch(existing).set(doc).commit()
  }

  return client.create({_type, name, ...doc})
}

async function upsertFaq(question, doc) {
  const existing = await client.fetch('*[_type == "faq" && question == $question][0]._id', {question})

  if (existing) {
    return client.patch(existing).set(doc).commit()
  }

  return client.create({_type: 'faq', question, ...doc})
}

const programSeeds = [
  {
    title: 'Gestione del peso, cellulite e ricomposizione corporea',
    slug: 'gestione-peso-ricomposizione-corporea',
    excerpt:
      'Un percorso personalizzato per ridurre la massa grassa, migliorare la composizione corporea e valorizzare la silhouette, senza rinunce e con risultati duraturi.',
    category: 'Area clinica',
    order: 1,
    audience: [
      'Chi desidera perdere peso senza diete drastiche',
      'Chi vuole migliorare composizione corporea e tono',
      'Chi cerca un metodo sostenibile e monitorabile',
    ],
    benefits: ['Gestione del peso', 'Ricomposizione corporea', 'Abitudini sostenibili', 'Monitoraggio'],
    seoTitle: 'Gestione del peso, cellulite e ricomposizione corporea | La Speziale Milano',
  },
  {
    title: 'Gonfiore e disturbi intestinali',
    slug: 'gonfiore-disturbi-intestinali',
    excerpt:
      'Un percorso dedicato a digestione, gonfiore e funzionalita intestinale per aiutare il tuo organismo a ritrovare regolarita e leggerezza.',
    category: 'Area clinica',
    order: 2,
    audience: [
      'Chi convive con gonfiore addominale frequente',
      'Chi nota digestione lenta, tensione o fastidi dopo i pasti',
      'Chi vuole capire il rapporto tra alimentazione, intestino e benessere quotidiano',
    ],
    benefits: ['Meno gonfiore', 'Digestione piu leggera', 'Benessere intestinale', 'Maggiore chiarezza'],
    seoTitle: 'Gonfiore e disturbi intestinali | La Speziale Milano',
  },
  {
    title: 'Le fasi della donna',
    slug: 'menopausa-premenopausa',
    excerpt:
      'PCOS, endometriosi, ciclo irregolare, fertilita, premenopausa e menopausa: un progetto che accompagna il corpo nelle diverse fasi della vita, adattandosi ai suoi nuovi bisogni.',
    category: 'Benessere femminile',
    order: 3,
    audience: ['Donne in premenopausa', 'Donne in menopausa'],
    benefits: ['Sostegno metabolico', 'Gestione dei sintomi', 'Abitudini quotidiane pratiche'],
    seoTitle: 'Menopausa e Premenopausa a Milano | La Speziale',
  },
  {
    title: 'Longevita e Vitalita',
    slug: 'programma-anti-age',
    excerpt:
      'Un percorso dedicato a mantenere energia, forza, tono muscolare e vitalita, per vivere ogni fase della vita con maggiore equilibrio.',
    category: 'Anti-age',
    order: 4,
    audience: ['Chi vuole lavorare su prevenzione e vitalita'],
    benefits: ['Prevenzione', 'Routine sostenibili', 'Supporto antinfiammatorio'],
    seoTitle: 'Longevita e Anti-Age Milano | La Speziale',
  },
  {
    title: 'Nutrizione Sportiva',
    slug: 'nutrizione-sportiva',
    excerpt:
      "Un'alimentazione personalizzata per migliorare composizione corporea, recupero ed energia, sostenendo ogni obiettivo sportivo.",
    category: 'Sport',
    order: 5,
    audience: ['Sportivi amatoriali', 'Chi vuole migliorare performance e recupero'],
    benefits: ['Energia per allenarsi', 'Recupero migliore', 'Strategie pratiche'],
    seoTitle: 'Nutrizione Sportiva Milano | La Speziale',
  },
]

async function deleteProgramsExceptSlugs(slugs) {
  const programsToRemove = await client.fetch(
    '*[_type == "program" && !(slug.current in $slugs)]{_id, "slug": slug.current}',
    {slugs},
  )
  if (!programsToRemove.length) return

  const ids = programsToRemove.map((program) => program._id)
  const homepagesWithOldReferences = await client.fetch(
    '*[_type == "homepage" && count(featuredPrograms[_ref in $ids]) > 0]{_id, featuredPrograms}',
    {ids},
  )

  for (const homepage of homepagesWithOldReferences) {
    await client
      .patch(homepage._id)
      .set({featuredPrograms: (homepage.featuredPrograms || []).filter((reference) => !ids.includes(reference._ref))})
      .commit()
  }

  for (const program of programsToRemove) {
    await client.delete(program._id)
  }
}

await deleteProgramsExceptSlugs(programSeeds.map((program) => program.slug))

const programs = await Promise.all(
  programSeeds.map((program) =>
    upsertBySlug('program', program.title, {
      slug: {_type: 'slug', current: program.slug},
      excerpt: program.excerpt,
      category: program.category,
      isPublished: true,
      showInMenu: true,
      isFeatured: true,
      order: program.order,
      duration: 'Percorso personalizzato',
      programType: 'Percorso su consulenza',
      deliveryMode: 'Online o in studio',
      personalizedNote: 'Piano su misura in base alle tue esigenze',
      price: 'Su consulenza',
      showAnchorNav: true,
      showOverview: true,
      showAudience: true,
      showDescription: true,
      showBenefits: true,
      showProcess: true,
      showFaqs: true,
      showExtraContent: true,
      showFinalCta: true,
      audience: program.audience,
      benefitCards: program.benefits.map((benefit, index) => ({
        _type: 'programBenefit',
        _key: `benefit-${program.order}-${index + 1}`,
        icon: index === 0 ? 'leaf' : index === 1 ? 'heart' : 'activity',
        title: benefit,
        description: 'Beneficio personalizzato in base alle esigenze del percorso.',
      })),
      descriptionTitle: 'Il percorso',
      description: [
        {
          _type: 'block',
          _key: `description-${program.order}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `description-span-${program.order}`,
              marks: [],
              text: `Il percorso ${program.title} viene costruito sulle esigenze, le abitudini e gli obiettivi della persona, con indicazioni concrete e sostenibili nel tempo.`,
            },
          ],
        },
      ],
      processSteps: [
        {_type: 'programStep', _key: `contact-${program.order}`, title: 'Primo contatto', description: 'Raccolta delle informazioni e analisi delle esigenze.'},
        {_type: 'programStep', _key: `plan-${program.order}`, title: 'Piano personalizzato', description: 'Creazione di un percorso nutrizionale su misura.'},
        {_type: 'programStep', _key: `followup-${program.order}`, title: 'Monitoraggio e supporto', description: 'Controlli e aggiornamenti per accompagnare i risultati.'},
      ],
      faqs: [
        {_key: `duration-${program.order}`, question: 'Quanto dura il percorso?', answer: 'La durata viene definita in base alle esigenze e agli obiettivi personali.'},
        {_key: `online-${program.order}`, question: 'Posso seguire il percorso online?', answer: 'Si, quando previsto il percorso puo essere svolto online o in studio.'},
      ],
      ctaLabel: 'Prenota una consulenza',
      ctaLink: '/contatti',
      finalCtaTitle: `Vuoi iniziare il percorso ${program.title}?`,
      finalCtaText: 'Scrivici su WhatsApp o inviaci una email per ricevere maggiori informazioni e prenotare la tua consulenza.',
      seo: {
        _type: 'seo',
        title: program.seoTitle,
        description: program.excerpt,
      },
    }),
  ),
)

const productSeeds = [
  {
    title: 'DrenaSpeziale Tisana Betulla e Pilosella',
    slug: 'drenaspeziale-tisana-betulla-pilosella',
    category: 'Drenaggio e Liquidi',
    excerpt: 'Tisana drenante per favorire la naturale eliminazione dei liquidi in eccesso.',
    price: 'Marchio consigliato',
    order: 1,
    tags: ['drenaggio', 'liquidi', 'betulla', 'pilosella', 'ritenzione'],
    purchaseUrl: '',
    therapySlugs: ['depurazione-controllo-peso'],
    features: ['Supporto drenante', 'Pensata per ritenzione e gonfiore diffuso', 'Da integrare con idratazione e movimento'],
    description:
      'Una proposta fitoterapica per accompagnare la gestione dei liquidi e sostenere i naturali organi emuntori.',
  },
  {
    title: 'Estratto Idroalcolico Puro di Tarassaco',
    slug: 'estratto-idroalcolico-puro-tarassaco',
    category: 'Drenaggio e Liquidi',
    excerpt: 'Gocce di tarassaco per supportare depurazione e drenaggio.',
    price: 'Gocce 50 ml',
    order: 2,
    tags: ['tarassaco', 'depurazione', 'drenaggio', 'gocce'],
    purchaseUrl: '',
    therapySlugs: ['depurazione-controllo-peso'],
    features: ['Supporto depurativo', 'Formato in gocce', 'Da valutare in base alla situazione personale'],
    description:
      'Estratto utile nei protocolli in cui si desidera sostenere fisiologicamente depurazione e leggerezza.',
  },
  {
    title: "SollievoGambe Gel Freddo all'Ippocastano",
    slug: 'sollievogambe-gel-freddo-ippocastano',
    category: 'Gambe e Microcircolo',
    excerpt: 'Gel freddo per gambe stanche, pesanti e sensazione di gonfiore.',
    price: 'Tubo 150 ml',
    order: 3,
    tags: ['gambe', 'microcircolo', 'ippocastano', 'gel freddo'],
    purchaseUrl: '',
    therapySlugs: ['gambe-pesanti-microcircolo'],
    features: ['Effetto fresco', 'Supporto al microcircolo', 'Ideale nei periodi caldi o dopo molte ore in piedi'],
    description:
      'Un supporto topico pensato per donare sollievo e leggerezza quando le gambe risultano affaticate.',
  },
  {
    title: 'Capsule di Mirtillo Nero Concentrato',
    slug: 'capsule-mirtillo-nero-concentrato',
    category: 'Gambe e Microcircolo',
    excerpt: 'Integratore a base di mirtillo nero per il benessere dei capillari.',
    price: 'Flacone da 60 capsule',
    order: 4,
    tags: ['mirtillo', 'capillari', 'microcircolo', 'gambe'],
    purchaseUrl: '',
    therapySlugs: ['gambe-pesanti-microcircolo'],
    features: ['Supporto vascolare', 'Indicato per fragilita capillare', 'Utile nei protocolli per gambe pesanti'],
    description:
      'Il mirtillo nero e tradizionalmente utilizzato nei percorsi dedicati a microcircolo e benessere capillare.',
  },
  {
    title: 'MelatoSpeziale Gocce - Escolzia, Valeriana e Passiflora',
    slug: 'melatospeziale-gocce-escolzia-valeriana-passiflora',
    category: 'Stress e Sonno',
    excerpt: 'Gocce rilassanti per favorire calma serale e qualita del riposo.',
    price: 'Gocce',
    order: 5,
    tags: ['sonno', 'stress', 'valeriana', 'passiflora', 'escolzia'],
    purchaseUrl: '',
    therapySlugs: ['sonno-rilassamento'],
    features: ['Supporto all addormentamento', 'Piante rilassanti', 'Pensato per la routine serale'],
    description:
      'Formula orientata al riposo, utile quando la sera il corpo fatica a rallentare e la mente resta attiva.',
  },
  {
    title: 'Ashwagandha Adattogena KSM-66',
    slug: 'ashwagandha-adattogena-ksm-66',
    category: 'Stress e Sonno',
    excerpt: 'Capsule adattogene certificate per periodi di stress e sovraccarico.',
    price: 'Capsule certificate',
    order: 6,
    tags: ['ashwagandha', 'stress', 'adattogeno', 'focus'],
    purchaseUrl: '',
    therapySlugs: ['energia-concentrazione', 'sonno-rilassamento'],
    features: ['Supporto adattogeno', 'Utile nei periodi intensi', 'Da valutare se presente insonnia o agitazione'],
    description:
      'Un adattogeno da considerare nei percorsi in cui stress, energia e recupero richiedono un sostegno mirato.',
  },
  {
    title: 'Tisana Finocchio e Melissa BIO',
    slug: 'tisana-finocchio-melissa-bio',
    category: 'Digestione e Pancia',
    excerpt: 'Tisana per gonfiore post-pasto, digestione lenta e tensione addominale.',
    price: 'Confezione 20 filtri',
    order: 7,
    tags: ['finocchio', 'melissa', 'digestione', 'pancia gonfia'],
    purchaseUrl: '',
    therapySlugs: ['gonfiore-digestione-lenta'],
    features: ['Supporto digestivo', 'Utile dopo i pasti', 'Formula delicata in tisana'],
    description:
      'Una tisana pensata per accompagnare digestione e comfort addominale nei momenti di maggiore pesantezza.',
  },
  {
    title: 'Enzimi Digestivi Naturali con Estratto di Zenzero',
    slug: 'enzimi-digestivi-naturali-zenzero',
    category: 'Digestione e Pancia',
    excerpt: 'Compresse per sostenere la digestione e ridurre la pesantezza post-pasto.',
    price: 'Compresse',
    order: 8,
    tags: ['enzimi', 'zenzero', 'digestione', 'stomaco'],
    purchaseUrl: '',
    therapySlugs: ['gonfiore-digestione-lenta'],
    features: ['Supporto enzimatico', 'Con estratto di zenzero', 'Utile con digestione lenta'],
    description:
      'Supporto naturale da valutare quando il fastidio principale e la lentezza digestiva dopo i pasti.',
  },
  {
    title: 'Agnocasto Estratto Secco',
    slug: 'agnocasto-estratto-secco',
    category: 'Benessere Ormonale',
    excerpt: 'Supporto fitoterapico per ciclo femminile e sindrome premestruale.',
    price: 'Regolatore ciclo femminile',
    order: 9,
    tags: ['agnocasto', 'ciclo', 'ormonale', 'premenopausa'],
    purchaseUrl: '',
    therapySlugs: ['equilibrio-femminile'],
    features: ['Supporto al ciclo', 'Da valutare in base alla storia ormonale', 'Non indicato per tutte le situazioni'],
    description:
      'L agnocasto puo rientrare nei protocolli dedicati a equilibrio femminile, ciclo e sintomi premestruali.',
  },
  {
    title: 'Perle di Olio di Enotera Spremuto a Freddo',
    slug: 'olio-enotera-spremuto-freddo',
    category: 'Benessere Ormonale',
    excerpt: 'Perle di olio di enotera per supportare benessere femminile e pelle.',
    price: 'Perle',
    order: 10,
    tags: ['enotera', 'ormonale', 'ciclo', 'pelle'],
    purchaseUrl: '',
    therapySlugs: ['equilibrio-femminile'],
    features: ['Supporto al benessere femminile', 'Utile nei protocolli pelle-ciclo', 'Da usare con continuita'],
    description:
      'Un supporto lipidico tradizionalmente utilizzato nei percorsi dedicati a equilibrio femminile e benessere cutaneo.',
  },
  {
    title: 'Tonico Ricostituente di Rodiola Rosea e Pappa Reale',
    slug: 'tonico-rodiola-rosea-pappa-reale',
    category: 'Energia e Vitalita',
    excerpt: 'Flaconcini ricostituenti per periodi di stanchezza e cambio stagione.',
    price: 'Flaconcini',
    order: 11,
    tags: ['energia', 'rodiola', 'pappa reale', 'stanchezza'],
    purchaseUrl: '',
    therapySlugs: ['energia-concentrazione'],
    features: ['Supporto energetico', 'Utile nei cambi di stagione', 'Pensato per periodi intensi'],
    description:
      'Un tonico naturale da considerare quando stanchezza fisica e mentale richiedono una ricarica graduale.',
  },
  {
    title: 'Tavolette di Spirulina BIO',
    slug: 'tavolette-spirulina-bio',
    category: 'Energia e Vitalita',
    excerpt: 'Superfood energetico per sostenere vitalita e apporto nutrizionale.',
    price: 'Superfood 100 g',
    order: 12,
    tags: ['spirulina', 'energia', 'superfood', 'vitalita'],
    purchaseUrl: '',
    therapySlugs: ['energia-concentrazione'],
    features: ['Supporto nutrizionale', 'Fonte vegetale', 'Utile in routine energetiche'],
    description:
      'La spirulina puo accompagnare protocolli di energia e vitalita quando la routine alimentare necessita di supporto.',
  },
  {
    title: 'Echinacea e Rosa Canina Concentrata',
    slug: 'echinacea-rosa-canina-concentrata',
    category: 'Difese Immunitarie',
    excerpt: 'Estratto fluido per sostenere le difese nei cambi di stagione.',
    price: 'Estratto fluido',
    order: 13,
    tags: ['echinacea', 'rosa canina', 'difese', 'immunita'],
    purchaseUrl: '',
    therapySlugs: ['difese-immunitarie'],
    features: ['Supporto immunitario', 'Utile nei cambi stagionali', 'Con rosa canina'],
    description:
      'Un sostegno naturale per preparare e supportare le difese dell organismo nei periodi piu delicati.',
  },
  {
    title: 'Estratto di Sambuco e Zinco',
    slug: 'estratto-sambuco-zinco',
    category: 'Difese Immunitarie',
    excerpt: 'Gommose per supporto invernale e benessere delle difese.',
    price: 'Supporto invernale',
    order: 14,
    tags: ['sambuco', 'zinco', 'difese', 'inverno'],
    purchaseUrl: '',
    therapySlugs: ['difese-immunitarie'],
    features: ['Con zinco', 'Supporto stagionale', 'Formato pratico'],
    description:
      'Prodotto pensato per i periodi freddi e per sostenere le normali difese dell organismo.',
  },
  {
    title: 'Resveratrolo Puro Concentrato',
    slug: 'resveratrolo-puro-concentrato',
    category: 'Anti-Age e Cellule',
    excerpt: 'Capsule antiossidanti per supporto cellulare e stress ossidativo.',
    price: 'Capsule',
    order: 15,
    tags: ['resveratrolo', 'antiage', 'antiossidante', 'cellule'],
    purchaseUrl: '',
    therapySlugs: ['antiage-longevita-cellulare'],
    features: ['Supporto antiossidante', 'Contrasto allo stress ossidativo', 'Da integrare con stile di vita coerente'],
    description:
      'Il resveratrolo rientra nei protocolli antiossidanti orientati a benessere cellulare e prevenzione.',
  },
  {
    title: 'Coenzima Q10 Vegetale ad Alto Dosaggio',
    slug: 'coenzima-q10-vegetale-alto-dosaggio',
    category: 'Anti-Age e Cellule',
    excerpt: 'Supporto nutraceutico per protezione cellulare e vitalita.',
    price: 'Alto dosaggio',
    order: 16,
    tags: ['q10', 'coenzima', 'antiage', 'cellule', 'vitalita'],
    purchaseUrl: '',
    therapySlugs: ['antiage-longevita-cellulare'],
    features: ['Supporto cellulare', 'Orientato a vitalita e prevenzione', 'Da valutare in base al profilo personale'],
    description:
      'Il Coenzima Q10 puo essere inserito nei protocolli dedicati a energia cellulare e protezione antiossidante.',
  },
]

async function deleteProductsExceptSlugs(slugs) {
  const productsToRemove = await client.fetch(
    '*[_type == "product" && !(slug.current in $slugs)]{_id, "slug": slug.current}',
    {slugs},
  )
  if (!productsToRemove.length) return

  const ids = productsToRemove.map((product) => product._id)
  const therapiesWithOldReferences = await client.fetch(
    '*[_type == "therapy" && count(recommendedProducts[_ref in $ids]) > 0]{_id, recommendedProducts}',
    {ids},
  )

  for (const therapy of therapiesWithOldReferences) {
    await client
      .patch(therapy._id)
      .set({recommendedProducts: (therapy.recommendedProducts || []).filter((reference) => !ids.includes(reference._ref))})
      .commit()
  }

  for (const product of productsToRemove) {
    await client.delete(product._id)
  }
}

await deleteProductsExceptSlugs(productSeeds.map((product) => product.slug))

const products = await Promise.all(
  productSeeds.map((product) =>
    upsertBySlug('product', product.title, {
      slug: {_type: 'slug', current: product.slug},
      category: product.category,
      excerpt: product.excerpt,
      price: product.price,
      purchaseUrl: product.purchaseUrl || undefined,
      purchaseLabel: 'Acquista online',
      tags: product.tags,
      isPublished: true,
      order: product.order,
      descriptionTitle: 'Descrizione',
      description: [
        {
          _type: 'block',
          _key: `product-description-${product.order}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `product-description-span-${product.order}`,
              marks: [],
              text: product.description,
            },
          ],
        },
      ],
      featuresTitle: 'Caratteristiche',
      features: product.features,
      ctaLabel: 'Richiedi informazioni',
      ctaLink: '/contatti',
      seo: {
        _type: 'seo',
        title: `${product.title} | Prodotti La Speziale Milano`,
        description: product.excerpt,
      },
    }),
  ),
)

const productBySlug = Object.fromEntries(products.map((product, index) => [productSeeds[index].slug, product]))

async function deleteTherapiesBySlug(slugs) {
  const therapiesToRemove = await client.fetch(
    '*[_type == "therapy" && slug.current in $slugs]{_id, "slug": slug.current}',
    {slugs},
  )
  if (!therapiesToRemove.length) return

  const ids = therapiesToRemove.map((therapy) => therapy._id)
  const productsWithOldReferences = await client.fetch(
    '*[_type == "product" && count(relatedTherapies[_ref in $ids]) > 0]{_id, relatedTherapies}',
    {ids},
  )

  for (const product of productsWithOldReferences) {
    await client
      .patch(product._id)
      .set({relatedTherapies: (product.relatedTherapies || []).filter((reference) => !ids.includes(reference._ref))})
      .commit()
  }

  for (const therapy of therapiesToRemove) {
    await client.delete(therapy._id)
  }
}

await deleteTherapiesBySlug(['vascolarizzazione-gambe', 'drenaggio-depurazione'])

const therapySeeds = [
  {
    title: 'Capelli e unghie fragili',
    slug: 'capelli-unghie-fragili',
    excerpt:
      'Consigli fitoterapici e nutraceutici per capelli piu forti, unghie resistenti e bellezza che nasce da dentro.',
    order: 1,
    tagLabel: 'Capelli',
    gridTitle: 'Noti capelli piu deboli, spenti o unghie che si spezzano facilmente?',
    gridButtonLabel: 'Nutri la tua bellezza da dentro',
    heroPrimaryLabel: 'Nutri la tua bellezza da dentro',
    productSlugs: [],
    overviewTitle: 'Quando capelli e unghie chiedono supporto',
    description:
      'Stress, cambi di stagione, dieta incompleta e ritmi intensi possono indebolire il bulbo e la cheratina. Lozioni e shampoo lavorano in superficie, mentre un supporto nutraceutico mirato aiuta a nutrire capelli e unghie dall interno.',
    benefits: [
      ['Forza e struttura', 'Supporta cheratina, bulbo e lamina ungueale con nutrienti specifici.'],
      ['Caduta stagionale', 'Aiuta a impostare cicli mirati nei periodi di maggiore fragilita.'],
      ['Routine completa', 'Integra alimentazione, gestione dello stress e costanza di trattamento.'],
    ],
    notes: [
      'Il ciclo va valutato in base a durata della caduta, abitudini alimentari e situazione personale.',
      'In caso di caduta intensa o improvvisa e opportuno confrontarsi con medico o dermatologo.',
      'I link acquisto dei prodotti possono essere inseriti in Studio quando disponibili.',
    ],
    seoTitle: 'Fitoterapia per capelli e unghie fragili | La Speziale Milano',
  },
  {
    title: 'Depurazione e controllo del peso',
    slug: 'depurazione-controllo-peso',
    excerpt:
      'Supporti naturali per depurazione, drenaggio dei liquidi e percorso di remise en forme.',
    order: 2,
    tagLabel: 'Peso',
    gridTitle: "Vuoi depurare l'organismo o cerchi un supporto per rimetterti in forma?",
    gridButtonLabel: 'Scopri i miei consigli per la linea',
    heroPrimaryLabel: 'Scopri i miei consigli per la linea',
    productSlugs: ['drenaspeziale-tisana-betulla-pilosella', 'estratto-idroalcolico-puro-tarassaco'],
    overviewTitle: 'Quando vuoi rimetterti in forma con gradualita',
    description:
      'Per raggiungere un obiettivo di peso o leggerezza non servono promesse rapide, ma una strategia sostenibile. Drenanti e depurativi possono aiutare il corpo a gestire liquidi in eccesso e routine alimentari piu ordinate.',
    benefits: [
      ['Drenaggio', 'Supporta la gestione dei liquidi in eccesso e della sensazione di gonfiore.'],
      ['Depurazione', 'Accompagna cambio stagione, alimentazione disordinata o periodi di maggiore carico.'],
      ['Metodo realistico', 'Si integra meglio con alimentazione, idratazione e movimento quotidiano.'],
    ],
    notes: [
      'Il drenaggio non sostituisce un percorso nutrizionale quando l obiettivo e dimagrire.',
      'Attenzione in caso di terapie farmacologiche, pressione bassa, gravidanza o patologie renali.',
    ],
    seoTitle: 'Fitoterapia per depurazione e controllo del peso | La Speziale Milano',
  },
  {
    title: 'Energia e concentrazione',
    slug: 'energia-concentrazione',
    excerpt:
      'Adattogeni e rimedi naturali per periodi di stanchezza, calo di focus e ritmi quotidiani intensi.',
    order: 3,
    tagLabel: 'Stanchezza',
    gridTitle: 'Ti senti spesso senza forze o fai fatica a mantenere la concentrazione?',
    gridButtonLabel: 'Trova la tua ricarica naturale',
    heroPrimaryLabel: 'Trova la tua ricarica naturale',
    productSlugs: ['ashwagandha-adattogena-ksm-66', 'tonico-rodiola-rosea-pappa-reale', 'tavolette-spirulina-bio'],
    overviewTitle: 'Quando ti senti spesso senza forze',
    description:
      'Lavoro intenso, studio, sonno irregolare e stress possono ridurre energia e concentrazione. Un supporto naturale ben scelto puo aiutare a recuperare vitalita rispettando i ritmi del corpo.',
    benefits: [
      ['Focus mentale', 'Aiuta a sostenere attenzione e lucidita nei periodi piu intensi.'],
      ['Vitalita', 'Supporta la risposta dell organismo alla stanchezza quotidiana.'],
      ['Adattamento allo stress', 'Puo affiancare strategie su sonno, alimentazione e recupero.'],
    ],
    notes: [
      'Prima di scegliere un tonico e utile distinguere stanchezza fisica, mentale o legata al sonno.',
      'In caso di insonnia o agitazione alcuni adattogeni possono non essere indicati.',
    ],
    seoTitle: 'Fitoterapia per energia e concentrazione | La Speziale Milano',
  },
  {
    title: 'Sonno e rilassamento',
    slug: 'sonno-rilassamento',
    excerpt:
      'Soluzioni fitoterapiche per favorire calma, addormentamento e riposo realmente ristoratore.',
    order: 4,
    tagLabel: 'Sonno',
    gridTitle: 'Fai fatica ad addormentarti o ti svegli spesso durante la notte?',
    gridButtonLabel: 'Ritrova un riposo sereno',
    heroPrimaryLabel: 'Ritrova un riposo sereno',
    productSlugs: ['melatospeziale-gocce-escolzia-valeriana-passiflora', 'ashwagandha-adattogena-ksm-66'],
    overviewTitle: 'Quando il riposo non e piu ristoratore',
    description:
      'Difficolta ad addormentarsi, risvegli notturni e tensioni serali possono compromettere benessere, fame, energia e umore. La fitoterapia puo aiutare a costruire una routine piu calma e regolare.',
    benefits: [
      ['Addormentamento', 'Supporta il passaggio verso il sonno quando la mente resta attiva.'],
      ['Calma serale', 'Aiuta a ridurre tensione e iperattivazione della giornata.'],
      ['Routine del riposo', 'Funziona meglio se integrata con abitudini serali coerenti.'],
    ],
    notes: [
      'Il prodotto cambia in base al problema principale: addormentamento, risvegli o ansia serale.',
      'Se l insonnia persiste va approfondita con il medico.',
    ],
    seoTitle: 'Fitoterapia per sonno e rilassamento | La Speziale Milano',
  },
  {
    title: 'Gonfiore e digestione lenta',
    slug: 'gonfiore-digestione-lenta',
    excerpt:
      'Estratti naturali e fermenti per pancia gonfia, pesantezza, digestione lenta e regolarita intestinale.',
    order: 5,
    tagLabel: 'Gonfiore',
    gridTitle: 'Soffri spesso di pancia gonfia, pesantezza o digestione lenta?',
    gridButtonLabel: 'Torna a sentirti leggera',
    heroPrimaryLabel: 'Torna a sentirti leggera',
    productSlugs: ['tisana-finocchio-melissa-bio', 'enzimi-digestivi-naturali-zenzero'],
    overviewTitle: 'Quando l intestino risente di stress e abitudini',
    description:
      'Pancia gonfia, pesantezza e digestione lenta possono dipendere da stress, pasti frettolosi, disbiosi o routine alimentari poco regolari. La scelta del supporto va orientata sul sintomo prevalente.',
    benefits: [
      ['Meno gonfiore', 'Aiuta a distinguere gonfiore da fermentazione, digestione lenta o stipsi.'],
      ['Regolarita', 'Supporta l equilibrio intestinale con fermenti o estratti mirati.'],
      ['Digestione', 'Accompagna pasti piu gestibili e una routine alimentare piu ordinata.'],
    ],
    notes: [
      'Gonfiore ricorrente, dolore o alterazioni importanti dell alvo meritano valutazione medica.',
      'Fermenti, enzimi e piante digestive hanno indicazioni diverse: non sono intercambiabili.',
    ],
    seoTitle: 'Fitoterapia per gonfiore e digestione lenta | La Speziale Milano',
  },
  {
    title: 'Antiage e longevita cellulare',
    slug: 'antiage-longevita-cellulare',
    excerpt:
      'Antiossidanti e supporti nutraceutici per contrastare stress ossidativo e sostenere vitalita nel tempo.',
    order: 6,
    tagLabel: 'Antiage',
    gridTitle: "Vuoi contrastare l'invecchiamento cellulare e mantenerti giovane dentro e fuori?",
    gridButtonLabel: 'Scopri i segreti della longevita cellulare',
    heroPrimaryLabel: 'Scopri i segreti della longevita cellulare',
    productSlugs: ['resveratrolo-puro-concentrato', 'coenzima-q10-vegetale-alto-dosaggio'],
    overviewTitle: 'Quando vuoi proteggere cellule e tessuti',
    description:
      'Il tempo passa per tutti, ma nutrizione, stile di vita e antiossidanti mirati possono aiutare a proteggere le cellule dai radicali liberi e sostenere elasticita, energia e vitalita.',
    benefits: [
      ['Stress ossidativo', 'Supporta la protezione cellulare nei periodi di maggiore esposizione o stress.'],
      ['Vitalita', 'Aiuta a sostenere energia e benessere nel tempo.'],
      ['Prevenzione', 'Si integra con alimentazione antinfiammatoria, sonno e movimento.'],
    ],
    notes: [
      'La scelta di antiossidanti e molecole di supporto va personalizzata.',
      'In caso di terapie farmacologiche o patologie e importante verificare compatibilita e dosaggi.',
    ],
    seoTitle: 'Fitoterapia antiage e longevita cellulare | La Speziale Milano',
  },
  {
    title: 'Gambe pesanti e microcircolo',
    slug: 'gambe-pesanti-microcircolo',
    excerpt:
      'Principi attivi naturali per gambe gonfie, pesanti, stanche e fragilita capillare.',
    order: 7,
    tagLabel: 'Gambe',
    gridTitle: 'Senti spesso le gambe gonfie, stanche, o soffri di fragilita capillare?',
    gridButtonLabel: 'Allevia la pesantezza alle gambe',
    heroPrimaryLabel: 'Allevia la pesantezza alle gambe',
    productSlugs: ['sollievogambe-gel-freddo-ippocastano', 'capsule-mirtillo-nero-concentrato'],
    overviewTitle: 'Quando circolazione e drenaggio rallentano',
    description:
      'Molte ore in piedi o seduti possono rallentare circolazione venosa e linfatica, aumentando pesantezza, gonfiore e fastidio. Il supporto naturale mira a microcircolo, vasi e drenaggio.',
    benefits: [
      ['Leggerezza', 'Aiuta a impostare una routine per gambe piu leggere.'],
      ['Microcircolo', 'Supporta il benessere dei capillari e della circolazione periferica.'],
      ['Drenaggio', 'Lavora meglio insieme a idratazione, movimento e pause attive.'],
    ],
    notes: [
      'Gonfiore improvviso, dolore o asimmetria tra le gambe richiedono valutazione medica.',
      'Alcune piante non sono indicate con anticoagulanti o specifiche terapie.',
    ],
    seoTitle: 'Fitoterapia per gambe pesanti e microcircolo | La Speziale Milano',
  },
  {
    title: 'Equilibrio femminile',
    slug: 'equilibrio-femminile',
    excerpt:
      'Rimedi fitoterapici per ciclo, sbalzi d umore, premenopausa, menopausa e benessere ormonale.',
    order: 8,
    tagLabel: 'Donne',
    gridTitle: 'Sbalzi d umore, fastidi legati al ciclo o i primi sintomi della menopausa?',
    gridButtonLabel: 'Sintonizzati con il tuo equilibrio',
    heroPrimaryLabel: 'Sintonizzati con il tuo equilibrio',
    productSlugs: ['agnocasto-estratto-secco', 'olio-enotera-spremuto-freddo'],
    overviewTitle: 'Quando il corpo femminile cambia ritmo',
    description:
      'Ciclo, sindrome premestruale, premenopausa e menopausa possono portare fastidi, vampate, tensione o sbalzi d umore. La fitoterapia puo aiutare a sostenere equilibrio e qualita della vita.',
    benefits: [
      ['Equilibrio ormonale', 'Supporta le fasi di cambiamento con un approccio delicato.'],
      ['Sintomi quotidiani', 'Aiuta a orientare il supporto tra ciclo, umore e vampate.'],
      ['Personalizzazione', 'Tiene conto di eta, storia personale, farmaci e obiettivi.'],
    ],
    notes: [
      'Alcuni fitoterapici non sono indicati in gravidanza, allattamento o patologie ormono-sensibili.',
      'Il supporto va scelto con attenzione se sono presenti farmaci o terapie ormonali.',
    ],
    seoTitle: 'Fitoterapia per equilibrio femminile | La Speziale Milano',
  },
  {
    title: 'Dolori articolari e muscolari',
    slug: 'dolori-articolari-muscolari',
    excerpt:
      'Antinfiammatori naturali per tensioni muscolari, fastidi articolari e supporto alla liberta di movimento.',
    order: 9,
    tagLabel: 'Dolori',
    gridTitle: 'Soffri di dolori articolari, tensioni muscolari o fastidi alla schiena?',
    gridButtonLabel: 'Scopri i rimedi per muscoli e articolazioni',
    heroPrimaryLabel: 'Scopri i rimedi per muscoli e articolazioni',
    productSlugs: [],
    overviewTitle: 'Quando infiammazione e tensioni limitano il movimento',
    description:
      'Posture scorrette, stress, allenamento o sforzi fisici possono infiammare muscoli e articolazioni. Un supporto naturale puo aiutare a lenire il fastidio e proteggere la mobilita quotidiana.',
    benefits: [
      ['Comfort articolare', 'Supporta mobilita e benessere delle articolazioni.'],
      ['Tensioni muscolari', 'Aiuta nei periodi di rigidita o affaticamento fisico.'],
      ['Approccio delicato', 'Puo essere valutato quando si cerca un supporto che non appesantisca lo stomaco.'],
    ],
    notes: [
      'Dolore persistente, trauma o limitazione importante vanno valutati dal medico.',
      'Attenzione a interazioni con anticoagulanti, antinfiammatori o terapie croniche.',
    ],
    seoTitle: 'Fitoterapia per dolori articolari e muscolari | La Speziale Milano',
  },
  {
    title: 'Difese immunitarie',
    slug: 'difese-immunitarie',
    excerpt:
      'Rimedi naturali per rinforzare e preparare lo scudo immunitario nei cambi di stagione e nei periodi piu delicati.',
    order: 10,
    tagLabel: 'Difese',
    gridTitle: "Vuoi sostenere le difese dell'organismo nei periodi piu delicati?",
    gridButtonLabel: 'Rinforza il tuo scudo naturale',
    heroPrimaryLabel: 'Rinforza il tuo scudo naturale',
    productSlugs: ['echinacea-rosa-canina-concentrata', 'estratto-sambuco-zinco'],
    overviewTitle: 'Quando le difese hanno bisogno di supporto',
    description:
      'Cambi di stagione, stress e periodi di maggiore esposizione possono mettere alla prova il sistema immunitario. La fitoterapia puo aiutare a sostenere le normali difese in modo ragionato.',
    benefits: [
      ['Supporto stagionale', 'Aiuta a preparare l organismo nei momenti piu delicati.'],
      ['Difese naturali', 'Sostiene il normale funzionamento del sistema immunitario.'],
      ['Routine preventiva', 'Si integra con sonno, alimentazione e gestione dello stress.'],
    ],
    notes: [
      'Il supporto immunitario va scelto considerando eta, terapie e storia clinica.',
      'In caso di sintomi persistenti o infezioni ricorrenti e opportuno confrontarsi con il medico.',
    ],
    seoTitle: 'Fitoterapia per difese immunitarie | La Speziale Milano',
  },
]

const therapies = await Promise.all(
  therapySeeds.map((therapy) =>
    upsertBySlug('therapy', therapy.title, {
      slug: {_type: 'slug', current: therapy.slug},
      excerpt: therapy.excerpt,
      tagLabel: therapy.tagLabel,
      gridTitle: therapy.gridTitle,
      gridButtonLabel: therapy.gridButtonLabel,
      category: 'Consiglio fitoterapico',
      isPublished: true,
      showInMenu: false,
      order: therapy.order,
      ctaLabel: 'Prenota una consulenza',
      ctaLink: '/contatti',
      heroPrimaryLabel: therapy.heroPrimaryLabel || 'Scopri i consigli',
      showAnchorNav: true,
      showOverview: true,
      showBenefits: true,
      showRecommendedProducts: therapy.productSlugs.length > 0,
      showFaqs: true,
      showFinalCta: true,
      overviewTitle: therapy.overviewTitle || 'Quando puo essere utile',
      description: [
        {
          _type: 'block',
          _key: `therapy-description-${therapy.order}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `therapy-description-span-${therapy.order}`,
              marks: [],
              text: therapy.description,
            },
          ],
        },
      ],
      notesTitle: 'Indicazioni importanti',
      notes: therapy.notes,
      benefitsTitle: 'I benefici del supporto',
      benefitCards: therapy.benefits.map(([title, description], index) => ({
        _type: 'programBenefit',
        _key: `therapy-benefit-${therapy.order}-${index + 1}`,
        icon: index === 0 ? 'leaf' : index === 1 ? 'heart' : 'activity',
        title,
        description,
      })),
      recommendedProductsTitle: 'Prodotti consigliati',
      recommendedProducts: therapy.productSlugs
        .map((slug) => productBySlug[slug])
        .filter(Boolean)
        .map((product) => ({_type: 'reference', _key: `recommended-${product._id.replace(/[^a-zA-Z0-9-]/g, '-')}`, _ref: product._id})),
      faqsTitle: 'Domande frequenti',
      faqs: [
        {_key: `therapy-faq-${therapy.order}-1`, question: 'Posso scegliere il prodotto da sola?', answer: 'Meglio usare la scheda come orientamento e chiedere conferma in consulenza, soprattutto in presenza di farmaci o condizioni specifiche.'},
        {_key: `therapy-faq-${therapy.order}-2`, question: 'La fitoterapia sostituisce il percorso nutrizionale?', answer: 'No. La fitoterapia e un supporto integrativo e funziona meglio quando e inserita in una strategia personalizzata.'},
      ],
      finalCtaTitle: `Vuoi approfondire ${therapy.title}?`,
      finalCtaText: 'Scrivici per capire quali prodotti o abitudini possono essere piu adatti alla tua situazione.',
      seo: {
        _type: 'seo',
        title: therapy.seoTitle,
        description: therapy.excerpt,
      },
    }),
  ),
)

const therapyBySlug = Object.fromEntries(therapies.map((therapy, index) => [therapySeeds[index].slug, therapy]))

await Promise.all(
  productSeeds.map((product) =>
    client
      .patch(productBySlug[product.slug]._id)
      .set({
        relatedTherapies: product.therapySlugs
          .map((slug) => therapyBySlug[slug])
          .filter(Boolean)
          .map((therapy) => ({_type: 'reference', _key: `therapy-${therapy._id.replace(/[^a-zA-Z0-9-]/g, '-')}`, _ref: therapy._id})),
      })
      .commit(),
  ),
)

const faqs = await Promise.all([
  upsertFaq('Come funziona la prima visita?', {
    answer:
      'La prima visita approfondisce stile di vita, storia clinica, abitudini alimentari e obiettivi. Quando utile viene integrata con analisi della composizione corporea.',
    category: 'Consulenze',
    order: 1,
    visible: true,
  }),
  upsertFaq('Ricevete solo su appuntamento?', {
    answer: 'Si, lo studio riceve solo su appuntamento dal martedi al sabato.',
    category: 'Contatti',
    order: 2,
    visible: true,
  }),
  upsertFaq('I programmi possono essere combinati?', {
    answer:
      'Si, i programmi possono essere seguiti singolarmente o combinati in base alle esigenze della persona.',
    category: 'Programmi',
    order: 3,
    visible: true,
  }),
])

const testimonials = await Promise.all([
  upsertByName('testimonial', 'Laura M.', {
    text: 'Ho trovato un percorso chiaro e realistico, finalmente compatibile con la mia vita quotidiana.',
    role: 'Percorso Nutrizione Integrata',
    visible: true,
    order: 1,
  }),
  upsertByName('testimonial', 'Elena R.', {
    text: 'Mi sono sentita ascoltata e accompagnata passo dopo passo, senza rigidita inutili.',
    role: 'Percorso Menopausa e Premenopausa',
    visible: true,
    order: 2,
  }),
  upsertByName('testimonial', 'Marco P.', {
    text: 'Il percorso mi ha aiutato a organizzare meglio alimentazione, allenamenti e recupero.',
    role: 'Nutrizione Sportiva',
    visible: true,
    order: 3,
  }),
])

await upsertSingleton('siteSettings', 'siteSettings', {
  siteTitle: 'Studio nutrizionista La Speziale Milano',
  email: 'laspeziale@laspeziale.it',
  phone: '+39 333 406 3401',
  address: 'Via San Giovanni Sul Muro 13, Milano',
  locationText:
    'Siamo nel centro di Milano, in un quartiere che unisce storia, cultura e dinamismo, a pochi passi da Largo Cairoli, dal Teatro Dal Verme e dal Castello Sforzesco.',
  openingHours: 'Martedi - Venerdi: 9:00 - 17:30\nSabato: 9:00 - 14:00\nOrario continuato',
  contactText:
    'Puoi scriverci o chiamarci. Ti ricontatteremo entro 24 ore per fornirti tutte le informazioni di cui hai bisogno e programmare un primo incontro personalizzato.',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  whatsapp: 'https://wa.me/393334063401',
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

await upsertSingleton('homepage', 'homepage', {
  heroTitle: 'Il Metodo La Speziale',
  heroSubtitle:
    'Nutrizione personalizzata, consiglio fitoterapico e supporto al cambiamento in un unico programma costruito intorno a te.',
  heroCtaLabel: 'Scopri il percorso',
  heroCtaLink: '/programmi',
  introEyebrow: 'Perche nasce il Metodo La Speziale',
  introTitle: 'La nutrizione cambia quando cambia il corpo.',
  introLead:
    'Nel corso degli anni abbiamo incontrato molte persone che, di fronte ai cambiamenti del proprio corpo, cercavano risposte diverse dai tradizionali schemi alimentari.',
  introBody:
    'Peso piu difficile da gestire, metabolismo che rallenta, variazioni ormonali, gonfiore e perdita di energia richiedono una valutazione piu ampia e competenze che lavorano insieme. Da questa esperienza nasce il Metodo La Speziale. Lavorare con tre professionisti non significa ricevere piu indicazioni o maggiore confusione: al contrario, la nostra sinergia costruisce un unico percorso, semplice da seguire e facilmente integrabile nella vita di tutti i giorni.',
  value1Title: 'La Dieta',
  value1Text: 'Un piano alimentare su misura, realistico e monitorabile, pensato per entrare nella quotidianita senza restrizioni insostenibili.',
  value2Title: 'La Fitoterapia',
  value2Text: 'Uso mirato di piante officinali e nutraceutici di alto livello per sostenere metabolismo, drenaggio ed equilibrio ormonale.',
  value3Title: 'Il Coaching',
  value3Text: 'Sostegno motivazionale e consapevolezza corporea per rendere il cambiamento piu stabile nel lungo termine.',
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
  featuredPrograms: programs.slice(0, 3).map((program) => ({_type: 'reference', _key: `featured-${program._id.replace(/[^a-zA-Z0-9-]/g, '-')}`, _ref: program._id})),
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
      'Nutrizione Integrata a Milano: alimentazione personalizzata, fitoterapia, programmi benessere e consapevolezza corporea.',
  },
})

await upsertSingleton('methodPage', 'methodPage', {
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
  coreItems: [
    'Conosciamo la persona',
    'Conosciamo il tuo corpo',
    'Integriamo le competenze',
    'Ti accompagniamo nel tempo',
  ],
  dietTitle: 'I tre pilastri del Metodo',
  dietText: "Tre competenze. Un'unica direzione.",
  phytoTitle: 'Il vero risultato',
  phytoText:
    'Il vero risultato e vivere meglio il proprio corpo, ogni giorno.',
  cta: {
    _type: 'pageCta',
    eyebrow: 'CTA',
    title: 'Il primo passo e conoscere cio di cui il tuo corpo ha davvero bisogno.',
    text: 'Ogni persona e diversa e ogni cambiamento merita un approccio capace di evolvere insieme a lei. Richiedi una consulenza e scopri come il Metodo La Speziale puo accompagnarti verso un cambiamento concreto, semplice e duraturo.',
    primaryLabel: 'Richiedi una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Il Metodo | La Speziale Milano',
    description:
      'Il Metodo La Speziale: nutrizione personalizzata, consiglio fitoterapico e consapevolezza del corpo in un unico programma.',
  },
})

await upsertSingleton('coachingPage', 'coachingPage', {
  heroEyebrow: 'Consulenza di Consapevolezza',
  heroTitle: 'Consulenza di Consapevolezza',
  heroText:
    'Un percorso con il Tutor del Benessere per imparare a leggere il linguaggio del proprio corpo, valorizzare la propria persona e vivere con maggiore serenita ogni fase della vita.',
  introTitle: 'Viviamo spesso rivolti verso cio che dobbiamo fare, dedicando poco tempo ad ascoltare noi stessi.',
  introText:
    'Questa consulenza nasce per aiutare la persona a fermarsi, osservare il modo in cui vive il proprio corpo e riscoprire un rapporto piu autentico con se stessa.',
  audienceTitle: 'A chi desidera dedicare tempo alla propria persona.',
  audienceItems: [
    'Conoscersi meglio',
    'Migliorare il rapporto con il proprio corpo',
    'Valorizzare la propria immagine',
    'Affrontare con maggiore serenita una nuova fase della vita',
    'Dedicare del tempo alla propria persona',
  ],
  methodTitle: 'Il Tutor del Benessere accompagna la persona in un percorso pratico di conoscenza di se.',
  methodSteps: [
    {_key: 'perche-nasce', _type: 'object', title: 'Perche nasce', text: 'Viviamo spesso rivolti verso cio che dobbiamo fare, dedicando poco tempo ad ascoltare noi stessi.'},
    {_key: 'tutor-benessere', _type: 'object', title: 'Il Tutor del Benessere', text: 'Accompagna la persona in un percorso pratico di conoscenza di se attraverso il linguaggio del corpo.'},
    {_key: 'come-si-svolge', _type: 'object', title: 'Come si svolge', text: 'Ogni incontro parte dalla persona e dalla fase della vita che sta vivendo.'},
  ],
  cta: {
    _type: 'pageCta',
    eyebrow: 'CTA',
    title: 'Ogni percorso inizia da una maggiore conoscenza di se.',
    text: 'Prenota la tua Consulenza di Consapevolezza e scopri il valore di un approccio che mette la persona al centro.',
    primaryLabel: 'Prenota una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Consulenza di Consapevolezza | La Speziale Milano',
    description:
      'Consulenza con il Tutor del Benessere per leggere il linguaggio del corpo, valorizzare la persona e vivere con maggiore serenita.',
  },
})

await upsertSingleton('programsPage', 'programsPage', {
  heroEyebrow: 'Cosa trattiamo',
  heroTitle: 'Percorsi clinici costruiti intorno alla persona',
  heroText:
    'Le aree di lavoro principali dello studio: peso, menopausa, anti-age e nutrizione sportiva, sempre con un metodo personalizzato.',
  listTitle: 'Le aree che trattiamo',
  listText: 'Scegli l esigenza piu vicina al tuo momento.',
  cardButtonLabel: 'Scopri di piu',
  methodEyebrow: 'Come scegliere',
  methodTitle: 'Il percorso completo parte dalla nutrizione, ma ogni bisogno ha la sua porta d ingresso.',
  methodText:
    'La Speziale distingue tra percorsi nutrizionali personalizzati e consulenze stand-alone: cosi ogni persona puo orientarsi verso la soluzione piu adatta al proprio momento.',
  methodCoreEyebrow: 'Il core del metodo',
  methodCoreText:
    'Il percorso completo unisce dieta personalizzata, consulenza, follow-up, eventuale fitoterapia e prodotti consigliati quando sono utili al risultato.',
  methodCoreLinkLabel: 'Approfondisci il metodo',
  methodDietLabel: 'Con dieta',
  methodDietTitle: 'Percorsi nutrizionali',
  methodDietText:
    'Per chi desidera un piano alimentare strutturato, controlli periodici e un accompagnamento completo.',
  methodPhytoLabel: 'Senza dieta',
  methodPhytoTitle: 'Consulenze indipendenti',
  methodPhytoText:
    'Per chi cerca fitoterapia, prodotti selezionati o consapevolezza alimentare senza avviare un percorso con dieta.',
  methodPhytoLinkLabel: 'Scopri le altre consulenze',
  cta: {_type: 'pageCta', eyebrow: 'Contatto diretto', title: 'Non sai quale percorso scegliere?', text: 'Contattaci per una prima consulenza.', primaryLabel: 'Scrivi su WhatsApp', secondaryLabel: 'Invia una email'},
})

await upsertSingleton('contactPage', 'contactPage', {
  heroEyebrow: 'Contatti',
  heroTitle: 'Contattaci',
  heroText:
    'Siamo nel centro di Milano, in un quartiere che unisce storia, cultura e dinamismo, a pochi passi da Largo Cairoli, dal Teatro Dal Verme e dal Castello Sforzesco.',
  locationTitle: 'Dove siamo', hoursTitle: 'Orari di apertura', hoursIntro: 'Riceviamo solo su appuntamento, nei seguenti orari:', contactTitle: 'Contattaci',
  formTitle: 'Scrivici', formText: 'Raccontaci di cosa hai bisogno e ti ricontatteremo.', nameLabel: 'Nome e cognome', namePlaceholder: 'Il tuo nome', emailLabel: 'Email', emailPlaceholder: 'nome@email.it', messageLabel: 'Messaggio', messagePlaceholder: 'Raccontaci di cosa hai bisogno', submitLabel: 'Invia richiesta',
  addressTitle: 'Indirizzo',
  contactsTitle: 'Contatti',
  mapLabel: 'Sede La Speziale, Milano',
  mapQuery: 'Via San Giovanni Sul Muro 13, Milano',
})

await upsertSingleton('testimonialsPage', 'testimonialsPage', {
  heroEyebrow: 'Dicono di noi', heroTitle: 'Esperienze di chi ha iniziato un nuovo percorso', heroText: 'Storie e testimonianze di chi ha scelto La Speziale.', sectionTitle: 'Storie e risultati',
  cta: {_type: 'pageCta', eyebrow: 'Contatto diretto', title: 'Inizia anche tu un percorso consapevole', text: 'Contattaci per una prima consulenza.', primaryLabel: 'Scrivi su WhatsApp', secondaryLabel: 'Invia una email'},
})

await upsertSingleton('productsPage', 'productsPage', {
  heroEyebrow: 'Prodotti consigliati', heroTitle: 'La tua lista della spesa naturale', heroText: 'I prodotti presenti in questa pagina sono solo consigliati da La Speziale e non sono venduti direttamente dallo studio: il sito non e un ecommerce, non gestisce carrelli, pagamenti, spedizioni o assistenza sugli ordini. Le informazioni non sostituiscono una consulenza medica, nutrizionale o sanitaria personalizzata.', contentTitle: 'Prodotti consigliati', contentText: 'Lista consultabile dei prodotti consigliati, senza vendita diretta sul sito.',
  gridTitle: 'Prodotti consigliati', gridText: 'Cerca il nome esatto del prodotto consigliato sul foglio oppure filtra per area di benessere.', searchLabel: 'Cerca un prodotto', searchPlaceholder: 'Digita il nome del prodotto consigliato sul foglio...', emptyText: 'Nessun prodotto corrisponde alla ricerca.', cardButtonLabel: 'Scopri il prodotto',
  cta: {_type: 'pageCta', eyebrow: 'Informazioni', title: 'Vuoi ricevere maggiori informazioni?', text: 'Contattaci direttamente.', primaryLabel: 'Scrivi su WhatsApp', secondaryLabel: 'Invia una email'},
})

await upsertSingleton('therapiesPage', 'therapiesPage', {
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
  cta: {
    _type: 'pageCta',
    eyebrow: 'CTA',
    title: 'Hai bisogno di un consiglio professionale?',
    text: 'Prenota una consulenza e confrontati con una Farmacista specializzata in Fitoterapia per individuare la soluzione piu adatta alle tue esigenze.',
    primaryLabel: 'Richiedi una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Consiglio Fitoterapico | La Speziale Milano',
    description:
      'Consulenza con Farmacista specializzata in Fitoterapia per scegliere piante officinali e nutraceutici adatti alla tua situazione.',
  },
})

console.log('Contenuti iniziali pronti per La Speziale.')
