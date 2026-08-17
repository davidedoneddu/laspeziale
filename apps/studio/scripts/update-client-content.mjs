import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'h5heqcpt'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

function reportSanityError(error) {
  const code = error?.code || error?.cause?.code
  const hostname = error?.hostname || error?.cause?.hostname || `${projectId}.api.sanity.io`
  const message = error?.message || 'Errore sconosciuto'

  console.error('Aggiornamento Sanity non completato.')

  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
    console.error(`Impossibile risolvere ${hostname}: controlla connessione, DNS, VPN/proxy/firewall e riprova.`)
  } else if (code) {
    console.error(`Errore ${code}: ${message}`)
  } else {
    console.error(message)
  }

  console.error('Per sicurezza il dettaglio tecnico completo non viene stampato, così il token non finisce nei log.')
  process.exit(1)
}

process.on('uncaughtException', reportSanityError)
process.on('unhandledRejection', reportSanityError)

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

  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt,
  }
}

function portableText(paragraphs, keyPrefix) {
  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `${keyPrefix}-${index + 1}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${keyPrefix}-${index + 1}-span`, marks: [], text}],
  }))
}

function richTextBlocks(sections) {
  return sections.map(([title, paragraphs], index) => ({
    _type: 'richTextBlock',
    _key: `program-editorial-${index + 1}`,
    title,
    content: portableText(paragraphs, `program-editorial-${index + 1}`),
  }))
}

const homepageApproachImage = await imageReference(
  'home-metodo-competenze.png',
  'Tre professioniste lavorano sul Metodo La Speziale',
)

const homepageHeroImage = await imageReference(
  'hero-home-flow-2026.jpg',
  'Segno verde astratto del Metodo La Speziale',
)

const homepagePhytoImage = await imageReference(
  'fitoterapia-consulenza-2026.jpg',
  'Piante officinali e preparazioni per il Consiglio Fitoterapico',
)

const homepageCoachingImage = await imageReference(
  'consapevolezza-2026.jpg',
  'Percorso verso una maggiore consapevolezza',
)

const programImageBySlug = {
  'gestione-peso-ricomposizione-corporea': 'gestione-peso-2026.jpg',
  'gonfiore-disturbi-intestinali': 'gonfiore-intestinale-2026.jpg',
  'menopausa-premenopausa': 'fasi-donna-2026.jpg',
  'programma-anti-age': 'vitalita-2026.jpg',
  'nutrizione-sportiva': 'sport-2026.jpg',
}

const homepageUpdate = {
  heroTitle: 'Il Metodo La Speziale',
  heroSubtitle:
    'Nutrizione personalizzata, consiglio fitoterapico e supporto al cambiamento in un unico percorso costruito intorno a te.',
  heroImage: homepageHeroImage,
  heroCtaLabel: '',
  heroCtaLink: '',
  introEyebrow: 'Perché un approccio diverso',
  introTitle: 'La nutrizione cambia quando cambia il corpo.',
  introLead:
    'Nel corso degli anni abbiamo incontrato molte persone che, di fronte ai cambiamenti del proprio corpo, cercavano risposte diverse dai tradizionali schemi alimentari.',
  introBody:
    "Peso più difficile da gestire, metabolismo che rallenta, variazioni ormonali, gonfiore e perdita di energia richiedono uno sguardo più ampio e competenze che lavorano insieme.\nDa questa esperienza nasce il Metodo La Speziale.\nLavorare con tre professionisti non significa ricevere più indicazioni o maggiore confusione. Al contrario, la loro collaborazione costruisce un unico percorso, semplice da seguire e facilmente integrabile nella vita di tutti i giorni.",
  approachImage: homepageApproachImage,
  value1Title: 'La Dieta',
  value1Text:
    'Un piano alimentare su misura, realistico e monitorabile, pensato per entrare nella quotidianita senza restrizioni insostenibili.',
  value2Title: 'La Fitoterapia',
  value2Text:
    'Uso mirato di piante officinali e nutraceutici di alto livello per sostenere metabolismo, drenaggio ed equilibrio ormonale.',
  value3Title: 'Il Coaching',
  value3Text:
    'Sostegno motivazionale e consapevolezza corporea per rendere il cambiamento più stabile nel lungo termine.',
  methodEyebrow: 'Un percorso, tre competenze',
  methodTitle: 'Un metodo che semplifica, non complica.',
  methodText:
    "Tre professionisti condividono informazioni, obiettivi e strategie per costruire un unico percorso, personalizzato e coerente.\nTu non devi coordinare figure diverse né interpretare indicazioni separate: ricevi un programma chiaro, pensato per accompagnare i cambiamenti del tuo corpo con semplicità.",
  methodCoreEyebrow: 'Lavorare insieme fa la differenza',
  methodCoreText: 'Tre professionalità. Un unico metodo.',
  methodCoreLinkLabel: 'Scopri il metodo',
  methodDietLabel: 'Percorsi dedicati',
  methodDietTitle: 'Come possiamo aiutarti',
  methodDietText:
    'Ogni persona ha esigenze diverse. Per questo abbiamo sviluppato percorsi dedicati ai principali bisogni che incontriamo ogni giorno nel nostro studio.',
  methodPhytoLabel: 'Consulenze',
  methodPhytoTitle: "Le stesse competenze, anche quando non serve l'intero Metodo.",
  methodPhytoText:
    'Non tutte le esigenze richiedono un percorso multidisciplinare.\nPer questo puoi richiedere anche una consulenza dedicata con la Farmacista specializzata in Fitoterapia o con il Tutor del Benessere, quando rappresenta la risposta più adatta alle tue necessità.',
  methodPhytoImage: homepagePhytoImage,
  methodCoachingImage: homepageCoachingImage,
  finalCta: {
    _type: 'pageCta',
    title: 'Il tuo percorso inizia da qui.',
    text: 'Ascolteremo la tua storia, valuteremo le tue esigenze e costruiremo il percorso più adatto a te.',
    primaryLabel: 'Richiedi una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Studio nutrizionista La Speziale Milano',
    description:
      'Nutrizione personalizzata, consiglio fitoterapico e supporto al cambiamento nel Metodo La Speziale a Milano.',
  },
}

const programUpdates = [
  {
    slug: 'gestione-peso-ricomposizione-corporea',
    title: 'Gestione del Peso e Ricomposizione Corporea',
    excerpt:
      'Perdere peso, aumentare la massa muscolare o ritrovare la propria forma fisica significa seguire un progetto costruito sulla persona, dove ogni scelta lavora nella stessa direzione.',
    category: 'Gestione del peso e ricomposizione corporea',
    heroHighlight: 'Cambiare il proprio corpo richiede un progetto, non solo una dieta.',
    heroText: 'Perdere peso, aumentare la massa muscolare o ritrovare la propria forma fisica significa seguire un progetto costruito sulla persona, dove ogni scelta lavora nella stessa direzione.',
    descriptionTitle: 'Il progetto',
    projectHighlight: 'Ogni corpo cambia in modo diverso. Anche il progetto deve esserlo.',
    description: portableText([
      "Perdere peso è spesso l'obiettivo. Comprendere perché il corpo è cambiato è il punto di partenza.",
      'Metabolismo, composizione corporea, stile di vita, cambiamenti ormonali e abitudini influenzano il modo in cui ogni persona aumenta o perde peso.',
      'Per questo il nostro lavoro non inizia dalla dieta, ma dalla comprensione della persona e delle reali esigenze del suo corpo.',
    ], 'peso-description'),
    explanationTitle: 'Cosa significa progettare il cambiamento',
    explanationText: portableText([
      'Progettare il cambiamento significa costruire una strategia nella quale ogni scelta ha uno scopo preciso.',
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario può essere affiancata dal consiglio fitoterapico e da un supporto dedicato al cambiamento, affinché tutto lavori nella stessa direzione.",
      'Non sono interventi separati, ma parti di un unico progetto costruito sulla persona.',
      'È questa regia che rende il Metodo La Speziale diverso da un percorso nutrizionale tradizionale.',
    ], 'peso-explanation'),
    audienceTitle: 'Ti riconosci in una di queste situazioni?',
    audience: [
      'Hai provato diverse diete senza riuscire a mantenere i risultati.',
      'Fai fatica a perdere peso.',
      'Il metabolismo sembra rallentato.',
      'Desideri ridurre la massa grassa.',
      'Vuoi migliorare cellulite e ritenzione.',
      'Hai perso tono muscolare.',
      'Vorresti aumentare la massa muscolare in modo equilibrato.',
      'Cerchi un cambiamento stabile e non una soluzione temporanea.',
    ],
    processTitle: 'Come prende forma il progetto',
    processHighlight: 'Ogni risultato nasce da una strategia costruita sulla persona.',
    processSteps: [
      {_type: 'programStep', _key: 'peso-step-1', title: 'Conosciamo la persona', description: 'Partiamo dalla tua storia, dalle abitudini, dallo stile di vita e dagli obiettivi che desideri raggiungere.'},
      {_type: 'programStep', _key: 'peso-step-2', title: 'Conosciamo il tuo corpo', description: "L'esame BIA analizza massa grassa, massa muscolare, stato di idratazione e composizione corporea, offrendo informazioni che il peso, da solo, non può raccontare."},
      {_type: 'programStep', _key: 'peso-step-3', title: 'Costruiamo la strategia', description: 'Definiamo un progetto personalizzato che stabilisce priorità, strumenti e obiettivi, adattandosi alle caratteristiche della persona.'},
      {_type: 'programStep', _key: 'peso-step-4', title: 'Accompagniamo il cambiamento', description: "Monitoriamo l'evoluzione della composizione corporea e aggiorniamo il progetto affinché continui a seguire i cambiamenti del tuo corpo e i risultati raggiunti."},
    ],
    resultTitle: 'Il risultato',
    resultHighlight: 'Il risultato non è soltanto perdere peso. È ritrovare il proprio equilibrio.',
    resultText: portableText([
      "L'obiettivo è migliorare la composizione corporea, ridurre la massa grassa quando necessario, valorizzare la forma fisica e costruire abitudini che permettano di mantenere i risultati nel tempo.",
      'Perché il cambiamento più importante non è quello che si vede sulla bilancia, ma quello che il tuo corpo riesce a mantenere.',
    ], 'peso-result'),
    faqsTitle: 'Domande frequenti',
    faqs: [
      {_key: 'peso-faq-1', question: 'Perché il peso non racconta tutto?', answer: 'Perché il cambiamento riguarda soprattutto la composizione corporea, non solo i chili.'},
      {_key: 'peso-faq-2', question: 'Perché a volte una dieta non basta?', answer: 'Perché metabolismo, abitudini e cambiamenti del corpo possono richiedere una strategia più ampia.'},
      {_key: 'peso-faq-3', question: 'Come si fa a mantenere il risultato nel tempo?', answer: 'Costruendo un percorso che cambia insieme al corpo e diventa sostenibile nella quotidianità.'},
    ],
    benefitCards: [],
    blocks: [],
    showHeroCta: false,
    showFacts: false,
    showVisits: false,
    showExplanation: true,
    showBenefits: false,
    showExtraContent: false,
    showResult: true,
    showSecondaryCtas: false,
    finalCtaTitle: 'Ogni corpo ha una storia diversa. Anche il modo di raggiungere il risultato deve esserlo.',
    finalCtaText:
      'Raccontaci il cambiamento che desideri ottenere: costruiremo insieme un progetto personalizzato per aiutarti a raggiungerlo e mantenerlo nel tempo.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Gestione del peso e ricomposizione corporea | La Speziale Milano', description: 'Un progetto per perdere peso, aumentare massa muscolare, migliorare tono, cellulite, ritenzione e silhouette con il Metodo La Speziale.'},
    _fieldsToRemove: ['benefits', 'benefitsTitle', 'duration', 'programType', 'deliveryMode', 'personalizedNote', 'price'],
  },
  {
    slug: 'gonfiore-disturbi-intestinali',
    title: 'Gonfiore e disturbi intestinali',
    excerpt:
      'Un progetto dedicato a chi desidera ritrovare un intestino più equilibrato, una digestione serena e una migliore qualità di vita.',
    category: 'Gonfiore e disturbi intestinali',
    heroHighlight: 'Il gonfiore non è il punto di partenza. È il punto da cui iniziare a capire.',
    heroText: 'Un progetto dedicato a chi desidera ritrovare un intestino più equilibrato, una digestione serena e una migliore qualità di vita.',
    descriptionTitle: 'Il progetto',
    projectHighlight: 'Ogni intestino è un ecosistema. Anche il progetto deve esserlo.',
    description: portableText([
      "Il gonfiore è solo uno dei segnali che l'intestino può inviare.",
      'Digestione, microbiota, alimentazione, stile di vita e caratteristiche della persona sono strettamente collegati e si influenzano a vicenda.',
      "Per questo il nostro obiettivo non è intervenire su un singolo sintomo, ma sviluppare un progetto che riporti l'intestino verso un equilibrio più stabile e duraturo.",
    ], 'intestino-description'),
    audienceTitle: 'Ti riconosci in uno di questi problemi?',
    audience: [
      'Gonfiore addominale frequente.',
      'Pancia tesa anche mangiando poco.',
      'Digestione lenta o senso di pesantezza.',
      'Reflusso o acidità.',
      'Stitichezza, diarrea o intestino irregolare.',
      "Ti hanno parlato di disbiosi o di un'alterazione del microbiota intestinale.",
      'Hai già provato fermenti lattici o probiotici senza ottenere un miglioramento stabile.',
      'Vorresti ritrovare leggerezza e vivere i pasti con maggiore serenità.',
    ],
    processTitle: 'Come prende forma il progetto',
    processHighlight: 'Ogni intestino richiede una strategia diversa.',
    processSteps: [
      {_type: 'programStep', _key: 'intestino-step-1', title: 'Comprendiamo il problema', description: 'Partiamo dai sintomi, dalle abitudini e dalla tua storia per capire come il disturbo influisce sulla vita quotidiana.'},
      {_type: 'programStep', _key: 'intestino-step-2', title: "Individuiamo ciò che influenza l'equilibrio intestinale", description: 'Valutiamo alimentazione, digestione, microbiota, ritmo intestinale e tutti quei fattori che possono contribuire al problema.'},
      {_type: 'programStep', _key: 'intestino-step-3', title: 'Organizziamo la strategia', description: 'Ogni intervento viene inserito in un progetto coordinato, affinché alimentazione, eventuale supporto fitoterapico e indicazioni pratiche lavorino nella stessa direzione.'},
      {_type: 'programStep', _key: 'intestino-step-4', title: "Seguiamo l'evoluzione", description: "Monitoriamo i cambiamenti e adattiamo il progetto in base alla risposta dell'intestino e ai risultati ottenuti."},
    ],
    resultTitle: 'Il risultato',
    resultHighlight: "Quando l'intestino ritrova il suo equilibrio, cambia anche il modo di vivere ogni giornata.",
    resultText: portableText([
      'Mangiare con serenità, sentirsi più leggeri, ritrovare regolarità e benessere significa migliorare non solo la digestione, ma la qualità della vita.',
      "L'obiettivo è costruire un equilibrio che possa accompagnarti nel tempo.",
    ], 'intestino-result'),
    faqsTitle: 'Domande frequenti',
    faqs: [
      {_key: 'intestino-faq-1', question: 'Perché mi sento gonfio anche senza aver mangiato molto?', answer: "Può dipendere da fermentazione, transito intestinale o maggiore sensibilità dell'intestino."},
      {_key: 'intestino-faq-2', question: 'Perché il mio intestino reagisce in modo diverso agli stessi alimenti?', answer: "La risposta può cambiare in base a quantità, abbinamenti e condizioni dell'intestino."},
      {_key: 'intestino-faq-3', question: 'Gonfiore e aria nella pancia sono la stessa cosa?', answer: 'Non sempre. Il gonfiore può essere legato anche a motilità e sensibilità intestinale.'},
    ],
    benefitCards: [],
    blocks: [],
    showHeroCta: false,
    showFacts: false,
    showVisits: false,
    showExplanation: false,
    showBenefits: false,
    showExtraContent: false,
    showResult: true,
    showSecondaryCtas: false,
    finalCtaTitle: 'Ogni intestino ha una storia diversa. Iniziamo dalla tua.',
    finalCtaText:
      'Raccontaci i sintomi che stai vivendo: insieme costruiremo un progetto per aiutare il tuo intestino a ritrovare equilibrio, leggerezza e benessere.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Gonfiore e disturbi intestinali | La Speziale Milano', description: 'Un progetto per gonfiore addominale, digestione lenta, reflusso, acidità, microbiota e benessere intestinale.'},
    _fieldsToRemove: ['benefits', 'benefitsTitle', 'explanationTitle', 'explanationText', 'duration', 'programType', 'deliveryMode', 'personalizedNote', 'price'],
  },
  {
    slug: 'menopausa-premenopausa',
    title: 'Le Fasi della Donna',
    excerpt:
      'PCOS, endometriosi, ciclo irregolare, sindrome premestruale, fertilità, premenopausa e menopausa.',
    category: 'Le fasi della donna',
    heroHighlight: 'Il corpo della donna cambia molte volte nella vita. Ogni fase richiede un progetto diverso.',
    heroText: 'PCOS, endometriosi, ciclo irregolare, sindrome premestruale, fertilità, premenopausa e menopausa.',
    descriptionTitle: 'Il progetto',
    projectHighlight: 'Ogni fase porta nuove esigenze. Anche il progetto deve evolvere.',
    description: portableText([
      'Nel corso della vita il corpo della donna attraversa cambiamenti che possono influenzare metabolismo, peso, energia, digestione, composizione corporea e benessere generale.',
      'Per questo non proponiamo un programma uguale per tutte, ma un progetto che si adatta alla fase che stai vivendo, accompagnando il corpo nelle sue nuove esigenze.',
    ], 'donna-description'),
    explanationTitle: 'Cosa significa accompagnare il cambiamento',
    explanationText: portableText([
      'Ogni fase della vita presenta esigenze diverse e merita un approccio personalizzato.',
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario può essere affiancata dal consiglio fitoterapico, affinché ogni scelta lavori nella stessa direzione.",
      "L'obiettivo non è affrontare soltanto il sintomo o il cambiamento del momento, ma accompagnare il corpo nel ritrovare un nuovo equilibrio.",
    ], 'donna-explanation'),
    audienceTitle: 'Ti riconosci in una di queste situazioni?',
    audience: [
      "Sindrome dell'ovaio policistico (PCOS).",
      'Endometriosi.',
      'Ciclo irregolare o assente.',
      'Sindrome premestruale.',
      'Ricerca di una gravidanza.',
      'Premenopausa.',
      'Menopausa.',
      'Aumento di peso, gonfiore o difficoltà a ritrovare il proprio equilibrio.',
      'Cambiamenti della composizione corporea.',
      'Stanchezza, calo di energia o difficoltà ad adattarsi ai cambiamenti del corpo.',
    ],
    processTitle: 'Come prende forma il progetto',
    processHighlight: 'Ogni fase richiede una strategia diversa.',
    processSteps: [
      {_type: 'programStep', _key: 'donna-step-1', title: 'Comprendiamo il momento che stai vivendo', description: 'Ogni fase della vita ha caratteristiche e bisogni diversi. Partiamo dalla tua storia, dai cambiamenti che stai vivendo e dagli obiettivi che desideri raggiungere.'},
      {_type: 'programStep', _key: 'donna-step-2', title: 'Osserviamo il corpo nel suo insieme', description: 'Valutiamo alimentazione, composizione corporea, stile di vita e tutti gli elementi che possono influenzare il tuo benessere in questa fase della vita.'},
      {_type: 'programStep', _key: 'donna-step-3', title: 'Costruiamo la strategia', description: 'Ogni scelta viene inserita in un progetto che evolve insieme al tuo corpo, integrando alimentazione, eventuale consiglio fitoterapico e strumenti pratici quando possono offrire un reale beneficio.'},
      {_type: 'programStep', _key: 'donna-step-4', title: 'Accompagniamo il cambiamento', description: "Il progetto viene adattato nel tempo, seguendo l'evoluzione del corpo e delle sue nuove esigenze."},
    ],
    benefitsTitle: 'Ogni fase ha obiettivi diversi',
    benefitCards: [
      {_type: 'programBenefit', _key: 'donna-benefit-1', icon: 'heart', title: 'Adolescenza ed età fertile', description: "Favorire un'alimentazione che accompagni il corretto equilibrio del corpo e sostenga le diverse esigenze della donna."},
      {_type: 'programBenefit', _key: 'donna-benefit-2', icon: 'shield', title: 'PCOS, endometriosi e ciclo', description: 'Affrontare le difficoltà legate a queste condizioni con un progetto nutrizionale costruito sulla persona e sul momento che sta vivendo.'},
      {_type: 'programBenefit', _key: 'donna-benefit-3', icon: 'activity', title: 'Premenopausa e menopausa', description: 'Accompagnare il corpo nei cambiamenti che interessano metabolismo, composizione corporea, energia e qualità della vita.'},
    ],
    resultTitle: 'Il risultato',
    resultHighlight: 'Ogni fase può diventare un nuovo equilibrio, non un limite.',
    resultText: portableText([
      'Il nostro obiettivo è aiutarti a comprendere il tuo corpo, accompagnarne i cambiamenti e ritrovare benessere, energia e una forma fisica in sintonia con la fase della vita che stai vivendo.',
    ], 'donna-result'),
    faqsTitle: 'Domande frequenti',
    faqs: [
      {_key: 'donna-faq-1', question: 'Posso iniziare il percorso anche se sto già seguendo una terapia?', answer: 'Sì. Le terapie in corso vengono considerate nella costruzione del percorso.'},
      {_key: 'donna-faq-2', question: 'Se ho già esami recenti, devo rifarli?', answer: 'No. Gli esami disponibili vengono valutati e si considera solo ciò che può essere realmente utile.'},
      {_key: 'donna-faq-3', question: 'Posso rivolgermi a voi per un problema specifico come PCOS o endometriosi?', answer: 'Sì. Il percorso viene costruito considerando la condizione specifica e il momento della vita.'},
    ],
    blocks: [],
    showHeroCta: false,
    showFacts: false,
    showVisits: false,
    showExplanation: true,
    showBenefits: true,
    showExtraContent: false,
    showResult: true,
    showSecondaryCtas: false,
    finalCtaTitle: 'Ogni fase della vita merita di essere vissuta al meglio.',
    finalCtaText:
      'Raccontaci il momento che stai attraversando: insieme costruiremo un progetto capace di accompagnare il tuo corpo nelle sue nuove esigenze.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Le Fasi della Donna | La Speziale Milano', description: 'Percorso per PCOS, endometriosi, ciclo irregolare, fertilità, premenopausa, menopausa e cambiamenti del corpo femminile.'},
    _fieldsToRemove: ['benefits', 'duration', 'programType', 'deliveryMode', 'personalizedNote', 'price'],
  },
  {
    slug: 'programma-anti-age',
    title: 'Longevità e Vitalità',
    excerpt:
      'Un progetto dedicato a chi desidera preservare energia, tono muscolare, vitalità e qualità della vita attraverso la nutrizione e uno stile di vita orientato alla longevità.',
    category: 'Longevità e vitalità',
    heroHighlight: 'Gli anni passano. Il benessere può continuare a crescere.',
    heroText: 'Un progetto dedicato a chi desidera preservare energia, tono muscolare, vitalità e qualità della vita attraverso la nutrizione e uno stile di vita orientato alla longevità.',
    descriptionTitle: 'Il progetto',
    projectHighlight: 'La longevità significa preparare il corpo al futuro.',
    description: portableText([
      'Prendersi cura del proprio corpo non significa inseguire la giovinezza, ma aiutarlo a mantenere nel tempo ciò che lo fa stare bene.',
      'Energia, massa muscolare, metabolismo, composizione corporea e vitalità cambiano con gli anni.',
      'Per questo il nostro progetto nasce per accompagnare questi cambiamenti e aiutare il corpo a conservarne il potenziale più a lungo.',
    ], 'longevita-description'),
    explanationTitle: 'Cosa significa prendersi cura del futuro',
    explanationText: portableText([
      'Prendersi cura del proprio corpo significa fare oggi scelte che possano fare la differenza anche domani.',
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario può essere affiancata dal consiglio fitoterapico, affinché ogni scelta contribuisca a preservare energia, forza e qualità della vita.",
      "L'obiettivo non è fermare il tempo, ma aiutare il corpo a mantenere il proprio equilibrio il più a lungo possibile.",
    ], 'longevita-explanation'),
    audienceTitle: 'Ti riconosci in una di queste situazioni?',
    audience: [
      'Ti senti meno energico rispetto a qualche anno fa.',
      'Hai notato una perdita di tono muscolare.',
      'Il metabolismo è cambiato.',
      'Vuoi prenderti cura del tuo corpo in modo preventivo.',
      'Desideri mantenere forza, vitalità e autonomia nel tempo.',
      "Vorresti sostenere pelle, capelli e unghie anche attraverso l'alimentazione.",
      "Cerchi un approccio orientato alla prevenzione e alla qualità della vita.",
      'Vuoi invecchiare bene, non semplicemente invecchiare.',
    ],
    processTitle: 'Come prende forma il progetto',
    processHighlight: 'Ogni scelta di oggi costruisce il benessere di domani.',
    processSteps: [
      {_type: 'programStep', _key: 'longevita-step-1', title: 'Conosciamo il tuo punto di partenza', description: 'Valutiamo composizione corporea, abitudini e obiettivi per comprendere quali aspetti preservare e quali migliorare.'},
      {_type: 'programStep', _key: 'longevita-step-2', title: 'Individuiamo le priorità', description: 'Ogni persona ha esigenze diverse: energia, tono muscolare, metabolismo, prevenzione o qualità della vita.'},
      {_type: 'programStep', _key: 'longevita-step-3', title: 'Costruiamo la strategia', description: 'Ogni intervento viene inserito in un progetto orientato a sostenere il corpo nel tempo, favorendo un equilibrio duraturo.'},
      {_type: 'programStep', _key: 'longevita-step-4', title: "Accompagniamo l'evoluzione", description: 'Il progetto viene adattato nel tempo per accompagnare i cambiamenti naturali del corpo e mantenerne il benessere.'},
    ],
    resultTitle: 'Il risultato',
    resultHighlight: 'La longevità non si misura in anni. Si misura in come li vivi.',
    resultText: portableText([
      'Il nostro obiettivo è aiutarti a mantenere energia, forza, autonomia e benessere, affinché il tempo diventi un alleato e non un limite.',
    ], 'longevita-result'),
    faqsTitle: 'Domande frequenti',
    faqs: [
      {_key: 'longevita-faq-1', question: 'Cosa posso fare oggi per sentirmi forte anche negli anni?', answer: 'Proteggere il muscolo è una priorità: nutrizione mirata, movimento e sostegno nutraceutico possono lavorare nella stessa direzione.'},
      {_key: 'longevita-faq-2', question: "Si può sostenere la pelle anche dall'interno?", answer: 'Alimentazione e fitoterapia possono contribuire a mantenere la pelle più elastica, idratata e vitale nel tempo.'},
      {_key: 'longevita-faq-3', question: 'E quando il problema è soprattutto sentirsi meno energici?', answer: 'Cerchiamo prima cosa può sottrarre energia nella quotidianità e interveniamo su alimentazione, recupero, movimento e, quando indicato, supporto fitoterapico.'},
    ],
    benefitCards: [],
    blocks: [],
    showHeroCta: false,
    showFacts: false,
    showVisits: false,
    showExplanation: true,
    showBenefits: false,
    showExtraContent: false,
    showResult: true,
    showSecondaryCtas: false,
    finalCtaTitle: 'Prendersi cura del futuro del tuo corpo inizia dalle scelte di oggi.',
    finalCtaText:
      'Insieme costruiremo un progetto orientato a preservare vitalità, equilibrio e qualità della vita negli anni.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Longevità e Vitalità | La Speziale Milano', description: 'Un progetto per preservare energia, tono muscolare, vitalità, autonomia e qualità della vita nel tempo.'},
    _fieldsToRemove: ['benefits', 'benefitsTitle', 'duration', 'programType', 'deliveryMode', 'personalizedNote', 'price'],
  },
  {
    slug: 'nutrizione-sportiva',
    title: 'Nutrizione Sportiva',
    excerpt:
      "Un progetto dedicato a chi pratica attività fisica e desidera migliorare performance, recupero, composizione corporea ed energia attraverso una nutrizione realmente integrata.",
    category: 'Nutrizione sportiva',
    heroHighlight: 'Allenarsi meglio significa nutrire meglio il proprio corpo.',
    heroText: "Un progetto dedicato a chi pratica attività fisica e desidera migliorare performance, recupero, composizione corporea ed energia attraverso una nutrizione realmente integrata.",
    descriptionTitle: 'Il progetto',
    projectHighlight: 'Ogni allenamento stimola il corpo. Il nostro progetto lo aiuta a rispondere.',
    description: portableText([
      'Allenarsi non significa soltanto consumare energia.',
      'Ogni disciplina richiede strategie nutrizionali diverse per sostenere performance, recupero e adattamento fisico.',
      "Per questo sviluppiamo un progetto che accompagna il tuo allenamento, aiutando il corpo a utilizzare al meglio le proprie risorse prima, durante e dopo l'attività sportiva.",
    ], 'sport-description'),
    explanationTitle: 'Cosa significa nutrire la performance',
    explanationText: portableText([
      "Una buona alimentazione non serve soltanto a sostenere l'allenamento.",
      'Significa fornire al corpo ciò di cui ha bisogno per affrontare lo sforzo, recuperare in modo efficace e adattarsi progressivamente al lavoro svolto.',
      "Quando necessario, il progetto può essere affiancato dal consiglio fitoterapico, affinché ogni scelta contribuisca a sostenere gli obiettivi sportivi e il benessere dell'organismo.",
    ], 'sport-explanation'),
    audienceTitle: 'Ti riconosci in uno di questi obiettivi?',
    audience: [
      'Migliorare la performance sportiva.',
      "Ottimizzare il recupero dopo l'allenamento.",
      'Aumentare la massa muscolare.',
      'Ridurre la massa grassa mantenendo la performance.',
      'Preparare una gara o una competizione.',
      "Evitare cali di energia durante l'attività fisica.",
      'Alimentarti in modo corretto in base allo sport che pratichi.',
      'Ottenere risultati più efficaci dal tuo allenamento.',
    ],
    processTitle: 'Come prende forma il progetto',
    processHighlight: 'Ogni sport ha esigenze diverse.',
    processSteps: [
      {_type: 'programStep', _key: 'sport-step-1', title: 'Conosciamo il tuo sport', description: 'Partiamo dalla disciplina praticata, dalla frequenza degli allenamenti, dagli obiettivi e dalle caratteristiche del tuo corpo.'},
      {_type: 'programStep', _key: 'sport-step-2', title: 'Valutiamo il punto di partenza', description: 'Analizziamo composizione corporea, alimentazione, recupero e fabbisogni energetici.'},
      {_type: 'programStep', _key: 'sport-step-3', title: 'Organizziamo la strategia', description: 'Costruiamo un progetto nutrizionale che accompagna allenamenti, recupero e obiettivi sportivi, integrando eventuali supporti solo quando possono offrire un reale vantaggio.'},
      {_type: 'programStep', _key: 'sport-step-4', title: 'Adattiamo il programma', description: 'Il progetto evolve insieme alla preparazione atletica, ai risultati e ai nuovi obiettivi.'},
    ],
    resultTitle: 'Il risultato',
    resultHighlight: 'Allenarsi di più non sempre significa migliorare di più.',
    resultText: portableText([
      'Quando alimentazione, recupero e allenamento lavorano nella stessa direzione, il corpo può esprimere meglio il proprio potenziale.',
      "L'obiettivo non è soltanto ottenere una prestazione migliore, ma costruire un equilibrio che permetta di allenarsi con continuità, recuperare più efficacemente e raggiungere risultati duraturi.",
    ], 'sport-result'),
    faqsTitle: 'Domande frequenti',
    faqs: [
      {_key: 'sport-faq-1', question: 'Mi alleno, ma i risultati non arrivano. Perché?', answer: 'Individuiamo cosa può limitare i risultati e adeguiamo nutrizione e recupero al tuo allenamento.'},
      {_key: 'sport-faq-2', question: "Cosa mangiare prima e dopo l'allenamento?", answer: "Costruiamo scelte e combinazioni adatte al tuo sport, ai tuoi orari e all'obiettivo."},
      {_key: 'sport-faq-3', question: 'Serve un programma anche se faccio sport per hobby?', answer: 'Sì. Anche poche ore di attività possono beneficiare di una nutrizione costruita sul tipo di allenamento e sul risultato desiderato.'},
    ],
    benefitCards: [],
    blocks: [],
    showHeroCta: false,
    showFacts: false,
    showVisits: false,
    showExplanation: true,
    showBenefits: false,
    showExtraContent: false,
    showResult: true,
    showSecondaryCtas: true,
    finalCtaTitle: 'Ogni obiettivo sportivo merita una strategia costruita sulla persona.',
    finalCtaText:
      'Raccontaci lo sport che pratichi e il risultato che desideri raggiungere: costruiremo un progetto capace di accompagnare il tuo allenamento e valorizzare il lavoro che fai ogni giorno.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Nutrizione Sportiva | La Speziale Milano', description: 'Un progetto di nutrizione sportiva per performance, recupero, composizione corporea, energia e obiettivi atletici.'},
    _fieldsToRemove: ['benefits', 'benefitsTitle', 'duration', 'programType', 'deliveryMode', 'personalizedNote', 'price'],
  },
]

const siteSettingsUpdate = {
  address: 'Via San Giovanni sul Muro 13, 20121 Milano',
  instagram: 'https://www.instagram.com/laspezialemilano/',
  facebook: 'https://www.facebook.com/laspeziale.it/',
  locationText:
    'Ci trovi nel cuore di Milano, a pochi passi da Largo Cairoli, dal Castello Sforzesco e dal Teatro Dal Verme, in una zona facilmente raggiungibile con i mezzi pubblici.',
}

const contactPageUpdate = {
  heroEyebrow: 'Contatti',
  heroTitle: 'Il primo passo è conoscerci.',
  heroText:
    "Ogni percorso inizia dall'ascolto. Se desideri maggiori informazioni o vuoi prenotare una consulenza, saremo lieti di accoglierti nel nostro studio.",
  locationTitle: 'Dove siamo',
  mapLabel: 'Sede La Speziale, Milano',
  mapQuery: 'Studio Nutrizionista La Speziale Milano, Via San Giovanni sul Muro 13, Milano',
  mapUrl: 'https://www.google.com/maps/place/Studio+Nutrizionista+La+Speziale+Milano/@45.4664571,9.1809463,20z/data=!4m6!3m5!1s0x4786c6afe02fef15:0xe505ade915e2cc3c!8m2!3d45.4665897!4d9.1813446!16s%2Fg%2F1tfjpl38?hl=it&entry=ttu',
}

const methodPageUpdate = {
  introHeading: 'Il Metodo La Speziale',
  introTitle: 'La semplicità che vivi nasce dal lavoro che non vedi.',
  introText:
    "Il Metodo La Speziale nasce da un principio semplice: osservare la persona nel suo insieme.\nBiologa Nutrizionista, Farmacista specializzata in Fitoterapia e Tutor del Benessere condividono competenze, informazioni e obiettivi per costruire un'unica strategia.\nQuesto permette di trasformare valutazioni diverse in un solo programma, coordinato, personalizzato e facile da seguire, senza dover gestire indicazioni separate.",
  introImage: homepageApproachImage,
  coreEyebrow: 'Come nasce il tuo programma',
  coreTitle: 'Un metodo organizzato, costruito intorno alla persona.',
  workSteps: [
    {_type: 'object', _key: 'metodo-step-1', number: '01', title: 'Conosciamo la persona', text: "Ogni programma inizia dall'ascolto della tua storia, delle tue abitudini, dei tuoi obiettivi e delle difficoltà che incontri nella vita quotidiana."},
    {_type: 'object', _key: 'metodo-step-2', number: '02', title: 'Conosciamo il tuo corpo', text: "L'esame BIA analizza composizione corporea, massa muscolare, massa grassa e stato di idratazione, offrendo informazioni che il peso da solo non può raccontare."},
    {_type: 'object', _key: 'metodo-step-3', number: '03', title: 'Costruiamo la strategia', text: 'Le informazioni raccolte vengono condivise tra i professionisti del Metodo, così ogni decisione nasce da una visione completa della persona e non da un singolo elemento.'},
    {_type: 'object', _key: 'metodo-step-4', number: '04', title: 'Accompagniamo il cambiamento', text: 'Ricevi un programma semplice da mettere in pratica, che evolve insieme ai risultati raggiunti e ai cambiamenti del tuo corpo.'},
  ],
  dietTitle: "Tre competenze, un'unica strategia",
  dietText: "Tre competenze. Un'unica direzione.",
  pillars: [
    {_type: 'object', _key: 'metodo-pillar-1', title: 'Nutrizione personalizzata', role: 'La Biologa Nutrizionista', text: 'Elabora il piano alimentare partendo dalla composizione corporea, dal metabolismo, dallo stile di vita e dagli obiettivi della persona, trasformando la valutazione in indicazioni concrete e sostenibili.'},
    {_type: 'object', _key: 'metodo-pillar-2', title: 'Il Consiglio Fitoterapico', role: 'La Farmacista specializzata in Fitoterapia', text: 'Quando è utile, integra il programma con piante officinali e nutraceutici selezionati in base alle esigenze della persona, valutando eventuali terapie farmacologiche e possibili interazioni.'},
    {_type: 'object', _key: 'metodo-pillar-3', title: 'Consapevolezza del corpo', role: 'Il Tutor del Benessere', text: 'Attraverso il linguaggio del corpo aiuta la persona a riconoscere i cambiamenti, valorizzare i progressi e trasformare il percorso in nuove abitudini da mantenere nel tempo.'},
  ],
  visitBoxes: [
    {_type: 'object', _key: 'metodo-visit-1', title: 'Prima visita', items: ['Colloquio approfondito', 'Analisi dello stile di vita', 'Esame BIA', 'Definizione degli obiettivi', 'Piano alimentare personalizzato']},
    {_type: 'object', _key: 'metodo-visit-2', title: 'Controlli periodici', items: ['Monitoraggio della composizione corporea', 'Verifica dei risultati', 'Aggiornamento del programma', 'Adattamento alle nuove esigenze']},
  ],
  journeyTitle: 'Il percorso',
  journeyHighlight:
    'Un unico percorso, senza visite separate: le tre competenze lavorano in modo coordinato e confluiscono nello stesso programma.',
  phytoTitle: 'Il vero risultato',
  resultHighlight: 'Il vero risultato è vivere meglio il proprio corpo, ogni giorno.',
  phytoText: 'Più energia, maggiore consapevolezza e un modo nuovo di affrontare i cambiamenti.\nPerché il benessere non nasce da una soluzione momentanea, ma da un metodo che cresce insieme alla persona e diventa parte della sua quotidianità.',
  cta: {
    _type: 'pageCta',
    title: 'Il primo passo è conoscere ciò di cui il tuo corpo ha davvero bisogno.',
    text: 'Ogni persona è diversa e ogni cambiamento merita un programma costruito sulle proprie esigenze.',
    primaryLabel: 'Richiedi una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Il Metodo | La Speziale Milano',
    description:
      'Il Metodo La Speziale: nutrizione personalizzata, consiglio fitoterapico e consapevolezza del corpo in un unico programma.',
  },
}
const therapiesPageUpdate = {
  heroEyebrow: 'Il Consiglio Fitoterapico',
  heroTitle: 'Il Consiglio Fitoterapico',
  heroSubtitle: 'Un buon rimedio naturale inizia sempre da una buona valutazione.',
  heroText:
    'Una consulenza con una Farmacista specializzata in Fitoterapia per individuare piante officinali e nutraceutici realmente adatti alla tua situazione.',
  heroImage: homepagePhytoImage,
  contentTitle: 'Perché richiedere un consiglio fitoterapico?',
  contentText:
    "La scelta dipende dalla persona, dalle sue esigenze, dalle eventuali terapie in corso e dall'obiettivo che desidera raggiungere.",
  gridTitle: 'Molti prodotti naturali sembrano simili, ma non lo sono.',
  gridText: 'Per questo il valore della consulenza non è il prodotto, ma la valutazione professionale che porta a scegliere la soluzione più adatta.',
  usefulTitle: 'Quando può essere utile?',
  usefulSubtitle: 'Una consulenza mirata quando vuoi scegliere con metodo.',
  usefulItems: [
    "Vuoi un supporto naturale per un'esigenza specifica.",
    'Assumi farmaci e desideri verificare eventuali interazioni.',
    'Hai già provato diversi prodotti senza ottenere i risultati sperati.',
    'Ti è stato consigliato un integratore e desideri un parere professionale.',
    'Cerchi una scelta personalizzata, evitando il "fai da te".',
  ],
  includedTitle: 'Cosa comprende',
  includedItems: [
    'Analisi delle tue esigenze.',
    'Valutazione di eventuali farmaci e integratori già utilizzati.',
    'Selezione di piante officinali e nutraceutici realmente indicati.',
    'Indicazioni su modalità di utilizzo e durata.',
    'Risposta ai tuoi dubbi e alle tue domande.',
  ],
  expertiseTitle: 'Perché affidarsi a una Farmacista specializzata?',
  expertiseSubtitle: 'La fitoterapia richiede competenze specifiche.',
  expertiseText:
    'Conoscere le proprietà delle piante officinali significa anche saperne valutare qualità, possibili interazioni, controindicazioni e reale utilità.\nOgni consiglio nasce dalla persona, dalle sue caratteristiche e dai suoi obiettivi, mai da una scelta standardizzata.',
  cardButtonLabel: 'Richiedi una consulenza',
  faqsTitle: 'Domande frequenti',
  faqs: [
    {
      _type: 'object',
      _key: 'fitoterapia-faq-documenti',
      question: 'Devo portare esami o documentazione alla consulenza?',
      answer: 'Se disponibili e pertinenti, possono essere utili per avere un quadro più completo della situazione.',
    },
    {
      _type: 'object',
      _key: 'fitoterapia-faq-prevenzione',
      question: 'Posso fare una consulenza anche per prevenzione e benessere generale?',
      answer: 'Sì. Non è necessario avere un problema specifico: la consulenza può essere richiesta anche per sostenere il proprio benessere.',
    },
    {
      _type: 'object',
      _key: 'fitoterapia-faq-controllo',
      question: 'È previsto un controllo dopo la consulenza?',
      answer: "Quando utile, può essere programmato un controllo per valutare l'andamento e l'eventuale necessità di modificare le indicazioni.",
    },
  ],
  cta: {
    _type: 'pageCta',
    title: 'Hai bisogno di un consiglio professionale?',
    text: 'Prenota una consulenza e confrontati con una Farmacista specializzata in Fitoterapia per individuare la soluzione più adatta alle tue esigenze.',
    primaryLabel: 'Richiedi una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Consiglio Fitoterapico | La Speziale Milano',
    description:
      'Consulenza con Farmacista specializzata in Fitoterapia per scegliere piante officinali e nutraceutici adatti alla tua situazione.',
  },
}
const coachingPageUpdate = {
  heroEyebrow: 'Consulenza di Consapevolezza',
  heroTitle: 'Consulenza di Consapevolezza',
  heroSubtitle: 'Riconoscersi è il primo passo per stare bene con sé stessi.',
  heroText:
    'Un percorso con il Tutor del Benessere per imparare a leggere il linguaggio del proprio corpo, valorizzare la propria persona e vivere con maggiore serenità ogni fase della vita.',
  introTitle: 'Ogni cambiamento del corpo porta con sé qualcosa di più di un cambiamento fisico.',
  introText:
    'Può modificare il modo in cui ci percepiamo, il rapporto con la nostra immagine, la sicurezza con cui affrontiamo la quotidianità e la capacità di riconoscere il nostro valore. Questa consulenza nasce per aiutare la persona a comprendere questi cambiamenti, accoglierli e trasformarli in una nuova consapevolezza di sé, affinché il benessere raggiunto possa diventare parte della propria vita.',
  audienceTitle: 'A chi è rivolta',
  audienceItems: [
    'conoscere meglio sé stesso;',
    'migliorare il rapporto con il proprio corpo;',
    'valorizzare la propria immagine;',
    'affrontare con maggiore serenità una nuova fase della vita;',
    'accrescere la fiducia nelle proprie risorse;',
    'dedicare del tempo alla propria persona.',
  ],
  methodTitle: 'Il Tutor del Benessere accompagna la persona in un percorso pratico di conoscenza di sé.',
  methodSteps: [
    {
      _key: 'perche-nasce',
      _type: 'object',
      title: 'Perché nasce',
      text: 'Ogni cambiamento del corpo porta con sé qualcosa di più di un cambiamento fisico.',
    },
    {
      _key: 'tutor-benessere',
      _type: 'object',
      title: 'Il Tutor del Benessere',
      text: "Attraverso il linguaggio del corpo aiuta a riconoscere il modo in cui ci si esprime, ci si percepisce e ci si relaziona con gli altri, favorendo una maggiore armonia tra ciò che si vive interiormente e ciò che si comunica. L'obiettivo non è cambiare la persona, ma aiutarla a valorizzare le proprie risorse, affrontare con maggiore serenità i cambiamenti e consolidare nel tempo un nuovo equilibrio.",
    },
    {
      _key: 'come-si-svolge',
      _type: 'object',
      title: 'Come si svolge',
      text: 'Ogni incontro parte dalla persona e dalla fase della vita che sta vivendo. Il linguaggio del corpo diventa uno strumento per osservare il modo in cui affrontiamo i cambiamenti, riconoscere ciò che ci limita e sviluppare nuove modalità di vivere noi stessi. Il percorso offre spunti pratici da applicare nella quotidianità, affinché la consapevolezza possa trasformarsi in un cambiamento concreto e duraturo.',
    },
  ],
  cta: {
    _type: 'pageCta',
    title: 'Ogni percorso inizia da una maggiore conoscenza di sé.',
    text: 'Prenota la tua Consulenza di Consapevolezza e scopri il valore di un percorso che ti aiuta a vivere con maggiore consapevolezza il rapporto con il tuo corpo e con te stesso.',
    primaryLabel: 'Prenota una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Consulenza di Consapevolezza | La Speziale Milano',
    description:
      'Consulenza con il Tutor del Benessere per leggere il linguaggio del corpo, valorizzare la persona e vivere con maggiore serenità.',
  },
}
const testimonialsPageUpdate = {
  heroEyebrow: 'Dicono di noi',
  heroTitle: 'Le esperienze di chi ha scelto il Metodo La Speziale',
  heroText:
    'Ogni persona arriva con una storia, esigenze e obiettivi diversi. Le testimonianze che trovi in questa pagina raccontano il percorso vissuto insieme a noi e il cambiamento che ciascuno ha costruito nel tempo.',
  sectionTitle: 'Le loro esperienze',
  sectionText:
    "Ogni testimonianza racconta un'esperienza personale. Non esistono percorsi uguali, perché ogni programma viene costruito sulle esigenze della persona. Queste sono alcune delle storie di chi ha scelto di affidarsi al Metodo La Speziale.",
  googleEyebrow: 'Recensioni Google',
  googleTitle: 'Le recensioni pubblicate su Google',
  googleText:
    "Le recensioni raccontano l'esperienza diretta di chi ha intrapreso un percorso con il Metodo La Speziale. Sono pubblicate spontaneamente dai nostri pazienti e rappresentano il valore più autentico del lavoro che svolgiamo ogni giorno.",
  cta: {
    _type: 'pageCta',
    eyebrow: 'Contatto diretto',
    title: "Ogni percorso inizia dall'ascolto.",
    text: 'Ogni persona è diversa e merita un percorso costruito sulle proprie esigenze. Raccontaci la tua storia: insieme individueremo il progetto più adatto per aiutarti a raggiungere i tuoi obiettivi.',
    primaryLabel: 'Scrivici su WhatsApp',
    secondaryLabel: "Invia un'email",
  },
  seo: {
    _type: 'seo',
    title: 'Dicono di noi | La Speziale Milano',
    description:
      'Testimonianze, recensioni ed esperienze di chi ha scelto il Metodo La Speziale a Milano.',
  },
}

const programsPageUpdate = {
  heroEyebrow: 'Cosa trattiamo',
  heroTitle: 'Cosa trattiamo',
  heroText:
    "Peso, intestino, cambiamenti ormonali, vitalitÃ  e attivitÃ  fisica possono richiedere attenzioni diverse. Per questo il Metodo La Speziale si adatta all'obiettivo e alla fase che stai vivendo.",
  listTitle: 'Trova il percorso piÃ¹ vicino a ciÃ² che vuoi migliorare',
  listText: 'Cinque aree di intervento, costruite intorno a esigenze e obiettivi diversi.',
  cardButtonLabel: 'Scopri di piÃ¹',
  cta: {
    _type: 'pageCta',
    eyebrow: 'Contatto diretto',
    title: 'Non sai quale percorso scegliere?',
    text: 'Raccontaci cosa vorresti migliorare: ti aiuteremo a individuare il percorso da cui partire.',
    primaryLabel: 'Scrivi su WhatsApp',
    secondaryLabel: "Invia un'email",
  },
  seo: {
    _type: 'seo',
    title: 'Cosa trattiamo | La Speziale Milano',
    description:
      'Programmi per gestione del peso, gonfiore e disturbi intestinali, fasi della donna, longevitÃ  e nutrizione sportiva nello Studio La Speziale a Milano.',
  },
}

async function patchSingleton(_id, _type, update, fieldsToRemove = []) {
  await client.createIfNotExists({_id, _type})
  let publishedPatch = client.patch(_id).set(update)
  if (fieldsToRemove.length) publishedPatch = publishedPatch.unset(fieldsToRemove)
  await publishedPatch.commit()

  const draftId = `drafts.${_id}`
  const draftExists = await client.fetch('defined(*[_id == $draftId][0]._id)', {draftId})
  if (draftExists) {
    let draftPatch = client.patch(draftId).set(update)
    if (fieldsToRemove.length) draftPatch = draftPatch.unset(fieldsToRemove)
    await draftPatch.commit()
  }
}

async function patchProgramBySlug({slug, _fieldsToRemove = [], ...update}, index) {
  const documents = await client.fetch('*[_type == "program" && slug.current == $slug]{_id}', {slug})
  const imageFilename = programImageBySlug[slug]
  const coverImage = imageFilename ? await imageReference(imageFilename, update.title) : undefined
  const fullUpdate = {
    ...(coverImage ? {coverImage} : {}),
    duration: 'Percorso personalizzato',
    programType: 'Percorso su consulenza',
    deliveryMode: 'Online o in studio',
    personalizedNote: 'Piano su misura in base alle tue esigenze',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    heroPrimaryLabel: 'Scopri di più',
    finalWhatsappLabel: 'Scrivi su WhatsApp',
    finalEmailLabel: "Invia un'email",
    isPublished: true,
    showInMenu: true,
    isFeatured: true,
    order: index + 1,
    showAnchorNav: true,
    showOverview: true,
    showAudience: true,
    showDescription: true,
    showBenefits: true,
    showProcess: true,
    showFaqs: true,
    showExtraContent: true,
    showFinalCta: true,
    ...update,
  }

  if (!documents.length) {
    await client.create({
      _type: 'program',
      slug: {_type: 'slug', current: slug},
      ...fullUpdate,
    })
    console.log(`Programma creato: ${slug}`)
    return
  }

  await Promise.all(
    documents.map((document) => {
      let patch = client.patch(document._id).set({slug: {_type: 'slug', current: slug}, ...fullUpdate})
      if (_fieldsToRemove.length) patch = patch.unset(_fieldsToRemove)
      return patch.commit()
    }),
  )
}

await patchSingleton('homepage', 'homepage', homepageUpdate)
for (const [index, program] of programUpdates.entries()) await patchProgramBySlug(program, index)
await patchSingleton('siteSettings', 'siteSettings', siteSettingsUpdate)
await patchSingleton('contactPage', 'contactPage', contactPageUpdate)
await patchSingleton('methodPage', 'methodPage', methodPageUpdate, [
  'heroEyebrow',
  'heroTitle',
  'heroSubtitle',
  'heroText',
  'heroImage',
  'coreText',
  'coreItems',
])
await patchSingleton('therapiesPage', 'therapiesPage', therapiesPageUpdate)
await patchSingleton('coachingPage', 'coachingPage', coachingPageUpdate)
await patchSingleton('testimonialsPage', 'testimonialsPage', testimonialsPageUpdate)
await patchSingleton('programsPage', 'programsPage', programsPageUpdate)

console.log('Aggiornamento contenuti cliente applicato: homepage, contatti, metodo, cosa trattiamo, fitoterapia, consapevolezza, dicono di noi e 5 programmi.')
