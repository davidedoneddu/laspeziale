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

const homepageUpdate = {
  heroTitle: 'Il Metodo La Speziale',
  heroSubtitle:
    'Nutrizione personalizzata, consiglio fitoterapico e supporto al cambiamento in un unico percorso costruito intorno a te.',
  heroCtaLabel: '',
  heroCtaLink: '',
  introEyebrow: 'Perche nasce il Metodo La Speziale',
  introTitle: 'La nutrizione cambia quando cambia il corpo.',
  introLead:
    'Nel corso degli anni abbiamo incontrato molte persone che, di fronte ai cambiamenti del proprio corpo, cercavano risposte diverse dai tradizionali schemi alimentari.',
  introBody:
    "Peso piu difficile da gestire, metabolismo che rallenta, variazioni ormonali, gonfiore, perdita di energia o difficolta nel ritrovare il proprio equilibrio richiedono una valutazione piu ampia e competenze che lavorano insieme. Da questa esperienza nasce il Metodo La Speziale. Lavorare con tre professionisti non significa ricevere piu indicazioni o maggiore confusione. Significa avere un unico programma, costruito attraverso competenze diverse che condividono lo stesso obiettivo: aiutare la persona a raggiungere un risultato concreto, semplice da seguire e sostenibile nel tempo.",
  methodEyebrow: 'Il Metodo La Speziale',
  methodTitle: 'Un metodo che mette ordine, non aggiunge complessita.',
  methodText:
    "Tre professionisti osservano la persona da prospettive diverse e costruiscono insieme un'unica strategia. Tu ricevi un programma coordinato, nel quale ogni scelta segue la stessa direzione, evitando indicazioni separate e rendendo il percorso piu semplice da vivere.",
  methodCoreEyebrow: 'I tre pilastri',
  methodCoreText: 'Tre professionalita. Un unico metodo.',
  methodCoreLinkLabel: 'Scopri il metodo',
  methodDietLabel: 'Percorsi dedicati',
  methodDietTitle: 'Come possiamo aiutarti',
  methodDietText:
    'Ogni persona ha esigenze diverse. Per questo abbiamo sviluppato percorsi dedicati ai principali bisogni che incontriamo ogni giorno nel nostro studio.',
  methodPhytoLabel: 'Consulenze',
  methodPhytoTitle: "Le stesse competenze, anche quando non serve l'intero Metodo.",
  methodPhytoText:
    'Non tutte le esigenze richiedono un percorso multidisciplinare. In alcuni casi puoi richiedere una consulenza dedicata con la Farmacista specializzata in Fitoterapia o con il Tutor del Benessere, quando rappresenta la risposta piu adatta alle tue esigenze.',
  finalCta: {
    _type: 'pageCta',
    eyebrow: 'CTA finale',
    title: 'Il tuo percorso inizia da qui.',
    text: 'Ascolteremo la tua storia, valuteremo le tue esigenze e costruiremo il programma piu adatto al tuo corpo e ai tuoi obiettivi.',
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
    descriptionTitle: 'Ogni corpo cambia in modo diverso. Anche il progetto deve esserlo.',
    description: portableText([
      "Perdere peso e spesso l'obiettivo. Comprendere perche il corpo e cambiato e il punto di partenza.",
      'Metabolismo, composizione corporea, stile di vita, cambiamenti ormonali e abitudini influenzano il modo in cui ogni persona aumenta o perde peso.',
      'Per questo il nostro lavoro non inizia dalla dieta, ma dalla comprensione della persona e delle reali esigenze del suo corpo.',
    ], 'peso-description'),
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
    processSteps: [
      {_type: 'programStep', _key: 'peso-step-1', title: 'Conosciamo la persona', description: 'Partiamo dalla tua storia, dalle abitudini, dallo stile di vita e dagli obiettivi che desideri raggiungere.'},
      {_type: 'programStep', _key: 'peso-step-2', title: 'Conosciamo il tuo corpo', description: "L'esame BIA analizza massa grassa, massa muscolare, stato di idratazione e composizione corporea, offrendo informazioni che il peso, da solo, non puo raccontare."},
      {_type: 'programStep', _key: 'peso-step-3', title: 'Costruiamo la strategia', description: 'Definiamo un progetto personalizzato che stabilisce priorita, strumenti e obiettivi, adattandosi alle caratteristiche della persona.'},
      {_type: 'programStep', _key: 'peso-step-4', title: 'Accompagniamo il cambiamento', description: "Monitoriamo l'evoluzione della composizione corporea e aggiorniamo il progetto affinche continui a seguire i cambiamenti del tuo corpo e i risultati raggiunti."},
    ],
    benefitsTitle: 'Il risultato',
    benefitCards: [
      {_type: 'programBenefit', _key: 'peso-benefit-1', icon: 'scale', title: 'Oltre il peso', description: 'Il risultato non e soltanto perdere peso. E ritrovare il proprio equilibrio.'},
      {_type: 'programBenefit', _key: 'peso-benefit-2', icon: 'activity', title: 'Composizione corporea', description: "L'obiettivo e migliorare la composizione corporea, ridurre la massa grassa quando necessario e valorizzare la forma fisica."},
      {_type: 'programBenefit', _key: 'peso-benefit-3', icon: 'target', title: 'Risultati mantenibili', description: 'Costruiamo abitudini che permettano di mantenere i risultati nel tempo, oltre cio che si vede sulla bilancia.'},
    ],
    blocks: richTextBlocks([
      ['Cosa significa progettare il cambiamento', [
        'Progettare il cambiamento significa costruire una strategia nella quale ogni scelta ha uno scopo preciso.',
        "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico e da un supporto dedicato al cambiamento, affinche tutto lavori nella stessa direzione.",
        'Non sono interventi separati, ma parti di un unico progetto costruito sulla persona.',
        'E questa regia che rende il Metodo La Speziale diverso da un percorso nutrizionale tradizionale.',
      ]],
    ]),
    finalCtaTitle: 'Ogni corpo ha una storia diversa. Anche il modo di raggiungere il risultato deve esserlo.',
    finalCtaText:
      'Raccontaci il cambiamento che desideri ottenere: costruiremo insieme un progetto personalizzato per aiutarti a raggiungerlo e mantenerlo nel tempo.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Gestione del peso e ricomposizione corporea | La Speziale Milano', description: 'Un progetto per perdere peso, aumentare massa muscolare, migliorare tono, cellulite, ritenzione e silhouette con il Metodo La Speziale.'},
  },
  {
    slug: 'gonfiore-disturbi-intestinali',
    title: 'Gonfiore e disturbi intestinali',
    excerpt:
      'Un progetto dedicato a chi desidera ritrovare un intestino piu equilibrato, una digestione serena e una migliore qualita di vita.',
    category: 'Gonfiore e disturbi intestinali',
    descriptionTitle: 'Ogni intestino e diverso. Anche il progetto deve esserlo.',
    description: portableText([
      "Il gonfiore e solo uno dei segnali che l'intestino puo inviare.",
      'Digestione, alimentazione, stile di vita, microbiota e caratteristiche della persona sono strettamente collegati e si influenzano a vicenda.',
      "Per questo il nostro obiettivo non e intervenire sul singolo sintomo, ma costruire un progetto capace di aiutare l'intestino a ritrovare un equilibrio piu stabile e duraturo.",
    ], 'intestino-description'),
    audienceTitle: 'Ti riconosci in uno di questi problemi?',
    audience: [
      'Gonfiore addominale frequente.',
      'Pancia tesa anche mangiando poco.',
      'Digestione lenta o senso di pesantezza.',
      'Reflusso o acidita.',
      'Stitichezza, diarrea o intestino irregolare.',
      "Ti hanno parlato di disbiosi o di un'alterazione del microbiota intestinale.",
      'Hai gia provato fermenti lattici o probiotici senza ottenere un miglioramento stabile.',
      'Vorresti ritrovare leggerezza e vivere i pasti con maggiore serenita.',
    ],
    processTitle: 'Come prende forma il progetto',
    processSteps: [
      {_type: 'programStep', _key: 'intestino-step-1', title: 'Comprendiamo il problema', description: 'Partiamo dai sintomi, dalle abitudini e dalla tua storia per capire come il disturbo influisce sulla vita quotidiana.'},
      {_type: 'programStep', _key: 'intestino-step-2', title: "Individuiamo cio che influenza l'equilibrio intestinale", description: 'Valutiamo alimentazione, digestione, microbiota, ritmo intestinale e tutti quei fattori che possono contribuire al problema.'},
      {_type: 'programStep', _key: 'intestino-step-3', title: 'Organizziamo la strategia', description: 'Ogni intervento viene inserito in un progetto coordinato, affinche alimentazione, eventuale consiglio fitoterapico e indicazioni pratiche lavorino nella stessa direzione.'},
      {_type: 'programStep', _key: 'intestino-step-4', title: "Seguiamo l'evoluzione", description: "Monitoriamo i cambiamenti e adattiamo il progetto in base alla risposta dell'intestino e ai risultati ottenuti."},
    ],
    benefitsTitle: 'Il risultato',
    benefitCards: [
      {_type: 'programBenefit', _key: 'intestino-benefit-1', icon: 'leaf', title: 'Un equilibrio piu stabile', description: "Quando l'intestino ritrova il suo equilibrio, cambia anche il modo di vivere ogni giornata."},
      {_type: 'programBenefit', _key: 'intestino-benefit-2', icon: 'heart', title: 'Pasti piu sereni', description: 'Mangiare con serenita, sentirsi piu leggeri, ritrovare regolarita e benessere significa migliorare non solo la digestione, ma la qualita della vita.'},
      {_type: 'programBenefit', _key: 'intestino-benefit-3', icon: 'target', title: 'Benessere nel tempo', description: "L'obiettivo e costruire un equilibrio che possa accompagnarti nel tempo."},
    ],
    blocks: richTextBlocks([["Cosa significa riequilibrare l'intestino", [
      "Riequilibrare l'intestino non significa eliminare soltanto il gonfiore.",
      'Significa comprendere le cause che influenzano il suo funzionamento e costruire una strategia nella quale ogni scelta segue la stessa direzione.',
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico, affinche tutto il progetto lavori verso un unico obiettivo: favorire un intestino piu equilibrato e una migliore qualita della vita.",
    ]]]),
    finalCtaTitle: 'Ogni intestino ha una storia diversa. Iniziamo dalla tua.',
    finalCtaText:
      'Raccontaci i sintomi che stai vivendo: insieme costruiremo un progetto per aiutare il tuo intestino a ritrovare equilibrio, leggerezza e benessere.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Gonfiore e disturbi intestinali | La Speziale Milano', description: 'Un progetto per gonfiore addominale, digestione lenta, reflusso, acidita, microbiota e benessere intestinale.'},
  },
  {
    slug: 'menopausa-premenopausa',
    title: 'Le Fasi della Donna',
    excerpt:
      'PCOS, endometriosi, ciclo irregolare, sindrome premestruale, fertilita, premenopausa e menopausa.',
    category: 'Le fasi della donna',
    descriptionTitle: 'Ogni fase porta nuove esigenze. Anche il progetto deve evolvere.',
    description: portableText([
      'Nel corso della vita il corpo della donna attraversa cambiamenti che possono influenzare metabolismo, peso, energia, digestione, composizione corporea e benessere generale.',
      'Per questo non proponiamo un programma uguale per tutte, ma un progetto che si adatta alla fase che stai vivendo, accompagnando il corpo nelle sue nuove esigenze.',
    ], 'donna-description'),
    audienceTitle: 'Ti riconosci in una di queste situazioni?',
    audience: [
      "Sindrome dell'ovaio policistico (PCOS).",
      'Endometriosi.',
      'Ciclo irregolare o assente.',
      'Sindrome premestruale.',
      'Ricerca di una gravidanza.',
      'Premenopausa.',
      'Menopausa.',
      'Aumento di peso, gonfiore o difficolta a ritrovare il proprio equilibrio.',
      'Cambiamenti della composizione corporea.',
      'Stanchezza, calo di energia o difficolta ad adattarsi ai cambiamenti del corpo.',
    ],
    processTitle: 'Come prende forma il progetto',
    processSteps: [
      {_type: 'programStep', _key: 'donna-step-1', title: 'Comprendiamo il momento che stai vivendo', description: 'Ogni fase della vita ha caratteristiche e bisogni diversi. Partiamo dalla tua storia, dai cambiamenti che stai vivendo e dagli obiettivi che desideri raggiungere.'},
      {_type: 'programStep', _key: 'donna-step-2', title: 'Osserviamo il corpo nel suo insieme', description: 'Valutiamo alimentazione, composizione corporea, stile di vita e tutti gli elementi che possono influenzare il tuo benessere in questa fase della vita.'},
      {_type: 'programStep', _key: 'donna-step-3', title: 'Costruiamo la strategia', description: 'Ogni scelta viene inserita in un progetto che evolve insieme al tuo corpo, integrando alimentazione, eventuale consiglio fitoterapico e strumenti pratici quando possono offrire un reale beneficio.'},
      {_type: 'programStep', _key: 'donna-step-4', title: 'Accompagniamo il cambiamento', description: "Il progetto viene adattato nel tempo, seguendo l'evoluzione del corpo e delle sue nuove esigenze."},
    ],
    benefitsTitle: 'Ogni fase ha obiettivi diversi',
    benefitCards: [
      {_type: 'programBenefit', _key: 'donna-benefit-1', icon: 'heart', title: 'Adolescenza ed eta fertile', description: "Favorire un'alimentazione che accompagni il corretto equilibrio del corpo e sostenga le diverse esigenze della donna."},
      {_type: 'programBenefit', _key: 'donna-benefit-2', icon: 'shield', title: 'PCOS, endometriosi e ciclo', description: 'Affrontare le difficolta legate a queste condizioni con un progetto nutrizionale costruito sulla persona e sul momento che sta vivendo.'},
      {_type: 'programBenefit', _key: 'donna-benefit-3', icon: 'activity', title: 'Premenopausa e menopausa', description: 'Accompagnare il corpo nei cambiamenti che interessano metabolismo, composizione corporea, energia e qualita della vita.'},
    ],
    blocks: richTextBlocks([
      ['Cosa significa accompagnare il cambiamento', [
        'Ogni fase della vita presenta esigenze diverse e merita un approccio personalizzato.',
        "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico, affinche ogni scelta lavori nella stessa direzione.",
        "L'obiettivo non e affrontare soltanto il sintomo o il cambiamento del momento, ma accompagnare il corpo nel ritrovare un nuovo equilibrio.",
      ]],
      ['Il risultato', [
        'Ogni fase puo diventare un nuovo equilibrio, non un limite.',
        'Il nostro obiettivo e aiutarti a comprendere il tuo corpo, accompagnarne i cambiamenti e ritrovare benessere, energia e una forma fisica in sintonia con la fase della vita che stai vivendo.',
      ]],
    ]),
    finalCtaTitle: 'Ogni fase della vita merita di essere vissuta al meglio.',
    finalCtaText:
      'Raccontaci il momento che stai attraversando: insieme costruiremo un progetto capace di accompagnare il tuo corpo nelle sue nuove esigenze.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Le Fasi della Donna | La Speziale Milano', description: 'Percorso per PCOS, endometriosi, ciclo irregolare, fertilita, premenopausa, menopausa e cambiamenti del corpo femminile.'},
  },
  {
    slug: 'programma-anti-age',
    title: 'Longevita e Vitalita',
    excerpt:
      'Un percorso dedicato a mantenere energia, forza, tono muscolare e vitalita, per vivere ogni fase della vita con maggiore equilibrio.',
    category: 'Longevita e vitalita',
    descriptionTitle: 'La longevita significa preparare il corpo al futuro.',
    description: portableText([
      'Prendersi cura del proprio corpo non significa inseguire la giovinezza, ma aiutarlo a mantenere nel tempo cio che lo fa stare bene.',
      'Energia, massa muscolare, metabolismo, composizione corporea e vitalita cambiano con gli anni.',
      'Per questo il nostro progetto nasce per accompagnare questi cambiamenti e aiutare il corpo a conservarne il potenziale piu a lungo.',
    ], 'longevita-description'),
    audienceTitle: 'Ti riconosci in una di queste situazioni?',
    audience: [
      'Ti senti meno energico rispetto a qualche anno fa.',
      'Hai notato una perdita di tono muscolare.',
      'Il metabolismo e cambiato.',
      'Vuoi prenderti cura del tuo corpo in modo preventivo.',
      'Desideri mantenere forza, vitalita e autonomia nel tempo.',
      "Vorresti sostenere pelle, capelli e unghie anche attraverso l'alimentazione.",
      "Cerchi un approccio orientato alla prevenzione e alla qualita della vita.",
      'Vuoi invecchiare bene, non semplicemente invecchiare.',
    ],
    processTitle: 'Come prende forma il progetto',
    processSteps: [
      {_type: 'programStep', _key: 'longevita-step-1', title: 'Conosciamo il tuo punto di partenza', description: 'Valutiamo composizione corporea, abitudini e obiettivi per comprendere quali aspetti preservare e quali migliorare.'},
      {_type: 'programStep', _key: 'longevita-step-2', title: 'Individuiamo le priorita', description: 'Ogni persona ha esigenze diverse: energia, tono muscolare, metabolismo, prevenzione o qualita della vita.'},
      {_type: 'programStep', _key: 'longevita-step-3', title: 'Costruiamo la strategia', description: 'Ogni intervento viene inserito in un progetto orientato a sostenere il corpo nel tempo, favorendo un equilibrio duraturo.'},
      {_type: 'programStep', _key: 'longevita-step-4', title: "Accompagniamo l'evoluzione", description: 'Il progetto viene adattato nel tempo per accompagnare i cambiamenti naturali del corpo e mantenerne il benessere.'},
    ],
    benefitsTitle: 'Il risultato',
    benefitCards: [
      {_type: 'programBenefit', _key: 'longevita-benefit-1', icon: 'sparkles', title: 'Come vivi il tempo', description: 'La longevita non si misura in anni. Si misura in come li vivi.'},
      {_type: 'programBenefit', _key: 'longevita-benefit-2', icon: 'heart', title: 'Energia e autonomia', description: 'Il nostro obiettivo e aiutarti a mantenere energia, forza, autonomia e benessere.'},
      {_type: 'programBenefit', _key: 'longevita-benefit-3', icon: 'target', title: 'Il tempo come alleato', description: 'Il progetto aiuta il corpo a mantenere il proprio equilibrio il piu a lungo possibile, affinche il tempo diventi un alleato e non un limite.'},
    ],
    blocks: richTextBlocks([['Cosa significa prendersi cura del futuro', [
      'Prendersi cura del proprio corpo significa fare oggi scelte che possano fare la differenza anche domani.',
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico, affinche ogni scelta contribuisca a preservare energia, forza e qualita della vita.",
      "L'obiettivo non e fermare il tempo, ma aiutare il corpo a mantenere il proprio equilibrio il piu a lungo possibile.",
    ]]]),
    finalCtaTitle: 'Prendersi cura del futuro del tuo corpo inizia dalle scelte di oggi.',
    finalCtaText:
      'Insieme costruiremo un progetto orientato a preservare vitalita, equilibrio e qualita della vita negli anni.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Longevita e Vitalita | La Speziale Milano', description: 'Un progetto per preservare energia, tono muscolare, vitalita, autonomia e qualita della vita nel tempo.'},
  },
  {
    slug: 'nutrizione-sportiva',
    title: 'Nutrizione Sportiva',
    excerpt:
      "Un progetto dedicato a chi pratica attivita fisica e desidera migliorare performance, recupero, composizione corporea ed energia attraverso una nutrizione realmente integrata.",
    category: 'Nutrizione sportiva',
    descriptionTitle: 'Ogni allenamento stimola il corpo. Il nostro progetto lo aiuta a rispondere.',
    description: portableText([
      'Allenarsi non significa soltanto consumare energia.',
      'Ogni disciplina richiede strategie nutrizionali diverse per sostenere performance, recupero e adattamento fisico.',
      "Per questo sviluppiamo un progetto che accompagna il tuo allenamento, aiutando il corpo a utilizzare al meglio le proprie risorse prima, durante e dopo l'attivita sportiva.",
    ], 'sport-description'),
    audienceTitle: 'Ti riconosci in uno di questi obiettivi?',
    audience: [
      'Migliorare la performance sportiva.',
      "Ottimizzare il recupero dopo l'allenamento.",
      'Aumentare la massa muscolare.',
      'Ridurre la massa grassa mantenendo la performance.',
      'Preparare una gara o una competizione.',
      "Evitare cali di energia durante l'attivita fisica.",
      'Alimentarti in modo corretto in base allo sport che pratichi.',
      'Ottenere risultati piu efficaci dal tuo allenamento.',
    ],
    processTitle: 'Come prende forma il progetto',
    processSteps: [
      {_type: 'programStep', _key: 'sport-step-1', title: 'Conosciamo il tuo sport', description: 'Partiamo dalla disciplina praticata, dalla frequenza degli allenamenti, dagli obiettivi e dalle caratteristiche del tuo corpo.'},
      {_type: 'programStep', _key: 'sport-step-2', title: 'Valutiamo il punto di partenza', description: 'Analizziamo composizione corporea, alimentazione, recupero e fabbisogni energetici.'},
      {_type: 'programStep', _key: 'sport-step-3', title: 'Organizziamo la strategia', description: 'Costruiamo un progetto nutrizionale che accompagna allenamenti, recupero e obiettivi sportivi, integrando eventuali supporti solo quando possono offrire un reale vantaggio.'},
      {_type: 'programStep', _key: 'sport-step-4', title: 'Adattiamo il programma', description: 'Il progetto evolve insieme alla preparazione atletica, ai risultati e ai nuovi obiettivi.'},
    ],
    benefitsTitle: 'Il risultato',
    benefitCards: [
      {_type: 'programBenefit', _key: 'sport-benefit-1', icon: 'dumbbell', title: 'Performance e recupero', description: 'Quando alimentazione, recupero e allenamento lavorano nella stessa direzione, il corpo puo esprimere meglio il proprio potenziale.'},
      {_type: 'programBenefit', _key: 'sport-benefit-2', icon: 'activity', title: 'Continuita negli allenamenti', description: "L'obiettivo e costruire un equilibrio che permetta di allenarsi con continuita e recuperare piu efficacemente."},
      {_type: 'programBenefit', _key: 'sport-benefit-3', icon: 'target', title: 'Risultati duraturi', description: 'Non soltanto ottenere una prestazione migliore, ma raggiungere risultati duraturi.'},
    ],
    blocks: richTextBlocks([
      ['Cosa significa nutrire la performance', [
        "Una buona alimentazione non serve soltanto a sostenere l'allenamento.",
        'Significa fornire al corpo cio di cui ha bisogno per affrontare lo sforzo, recuperare in modo efficace e adattarsi progressivamente al lavoro svolto.',
        "Quando necessario, il progetto puo essere affiancato dal consiglio fitoterapico, affinche ogni scelta contribuisca a sostenere gli obiettivi sportivi e il benessere dell'organismo.",
      ]],
      ['Il risultato', [
        'Allenarsi di piu non sempre significa migliorare di piu.',
        'Quando alimentazione, recupero e allenamento lavorano nella stessa direzione, il corpo puo esprimere meglio il proprio potenziale.',
        "L'obiettivo non e soltanto ottenere una prestazione migliore, ma costruire un equilibrio che permetta di allenarsi con continuita, recuperare piu efficacemente e raggiungere risultati duraturi.",
      ]],
    ]),
    finalCtaTitle: 'Ogni obiettivo sportivo merita una strategia costruita sulla persona.',
    finalCtaText:
      'Raccontaci lo sport che pratichi e il risultato che desideri raggiungere: costruiremo un progetto capace di accompagnare il tuo allenamento e valorizzare il lavoro che fai ogni giorno.',
    ctaLabel: 'Richiedi una consulenza',
    ctaLink: '/contatti',
    seo: {_type: 'seo', title: 'Nutrizione Sportiva | La Speziale Milano', description: 'Un progetto di nutrizione sportiva per performance, recupero, composizione corporea, energia e obiettivi atletici.'},
  },
]

const siteSettingsUpdate = {
  address: 'Via San Giovanni sul Muro 13, 20121 Milano',
  locationText:
    'Ci trovi nel cuore di Milano, a pochi passi da Largo Cairoli, dal Castello Sforzesco e dal Teatro Dal Verme, in una zona facilmente raggiungibile con i mezzi pubblici.',
}

const contactPageUpdate = {
  heroEyebrow: 'Contatti',
  heroTitle: 'Il primo passo e conoscerci.',
  heroText:
    "Ogni percorso inizia dall'ascolto. Se desideri maggiori informazioni o vuoi prenotare una consulenza, saremo lieti di accoglierti nel nostro studio.",
  locationTitle: 'Dove siamo',
  mapLabel: 'Sede La Speziale, Milano',
  mapQuery: 'Via San Giovanni sul Muro 13, 20121 Milano',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Via+San+Giovanni+sul+Muro+13+20121+Milano',
}

const methodPageUpdate = {
  heroEyebrow: 'Il Metodo',
  heroTitle: 'Il Metodo',
  heroText:
    'Tre competenze lavorano insieme per offrirti un unico programma, chiaro, coordinato e semplice da seguire.',
  introTitle: 'La semplicita che vivi nasce dal lavoro che non vedi.',
  introText:
    "Il Metodo La Speziale nasce da un principio semplice: osservare la persona nel suo insieme. Biologa Nutrizionista, Farmacista specializzata in Fitoterapia e Tutor del Benessere condividono competenze, informazioni e obiettivi per costruire un'unica strategia. Questo permette di trasformare valutazioni diverse in un solo programma, coordinato, personalizzato e facile da seguire, senza dover gestire indicazioni separate.",
  coreEyebrow: 'Come nasce il tuo programma',
  coreTitle: 'Un metodo organizzato, costruito intorno alla persona.',
  coreText:
    'Per te questo significa un unico programma, coerente e facile da seguire, senza dover gestire indicazioni separate.',
  coreItems: [
    'Conosciamo la persona',
    'Conosciamo il tuo corpo',
    'Costruiamo la strategia',
    'Ti accompagniamo nel tempo',
  ],
  dietTitle: 'I tre pilastri del Metodo',
  dietText: "Tre competenze. Un'unica direzione.",
  phytoTitle: 'Il vero risultato',
  phytoText: 'Il vero risultato e vivere meglio il proprio corpo, ogni giorno.',
  cta: {
    _type: 'pageCta',
    eyebrow: 'CTA',
    title: 'Il primo passo e conoscere cio di cui il tuo corpo ha davvero bisogno.',
    text: 'Ogni persona e diversa e ogni cambiamento merita un programma costruito sulle proprie esigenze.',
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
  heroText:
    'Una consulenza con una Farmacista specializzata in Fitoterapia per individuare piante officinali e nutraceutici realmente adatti alla tua situazione.',
  contentTitle: 'Perche richiedere un consiglio fitoterapico?',
  contentText:
    "La scelta dipende dalla persona, dalle sue esigenze, dalle eventuali terapie in corso e dall'obiettivo che desidera raggiungere.",
  gridTitle: 'Molti prodotti naturali sembrano simili, ma non lo sono.',
  gridText: 'Per questo il valore della consulenza non e il prodotto, ma la valutazione professionale che porta a scegliere la soluzione piu adatta.',
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
}

const coachingPageUpdate = {
  heroEyebrow: 'Consulenza di Consapevolezza',
  heroTitle: 'Consulenza di Consapevolezza',
  heroText:
    'Un percorso con il Tutor del Benessere per imparare a leggere il linguaggio del proprio corpo, valorizzare la propria persona e vivere con maggiore serenita ogni fase della vita.',
  introTitle: 'Ogni cambiamento del corpo porta con se qualcosa di piu di un cambiamento fisico.',
  introText:
    'Puo modificare il modo in cui ci percepiamo, il rapporto con la nostra immagine, la sicurezza con cui affrontiamo la quotidianita e la capacita di riconoscere il nostro valore. Questa consulenza nasce per aiutare la persona a comprendere questi cambiamenti, accoglierli e trasformarli in una nuova consapevolezza di se, affinche il benessere raggiunto possa diventare parte della propria vita.',
  audienceTitle: 'A chi desidera:',
  audienceItems: [
    'conoscere meglio se stesso;',
    'migliorare il rapporto con il proprio corpo;',
    'valorizzare la propria immagine;',
    'affrontare con maggiore serenita una nuova fase della vita;',
    'accrescere la fiducia nelle proprie risorse;',
    'dedicare del tempo alla propria persona.',
  ],
  methodTitle: 'Il Tutor del Benessere accompagna la persona in un percorso pratico di conoscenza di se.',
  methodSteps: [
    {
      _key: 'perche-nasce',
      _type: 'object',
      title: 'Perche nasce',
      text: 'Ogni cambiamento del corpo porta con se qualcosa di piu di un cambiamento fisico.',
    },
    {
      _key: 'tutor-benessere',
      _type: 'object',
      title: 'Il Tutor del Benessere',
      text: "Accompagna la persona in un percorso pratico di conoscenza di se attraverso il linguaggio del corpo. L'obiettivo non e cambiare la persona, ma aiutarla a valorizzare le proprie risorse, affrontare con maggiore serenita i cambiamenti e consolidare nel tempo un nuovo equilibrio.",
    },
    {
      _key: 'come-si-svolge',
      _type: 'object',
      title: 'Come si svolge',
      text: 'Ogni incontro parte dalla persona e dalla fase della vita che sta vivendo. Il percorso offre spunti pratici da applicare nella quotidianita, affinche la consapevolezza possa trasformarsi in un cambiamento concreto e duraturo.',
    },
  ],
  cta: {
    _type: 'pageCta',
    eyebrow: 'CTA',
    title: 'Ogni percorso inizia da una maggiore conoscenza di se.',
    text: 'Prenota la tua Consulenza di Consapevolezza e scopri il valore di un percorso che ti aiuta a vivere con maggiore consapevolezza il rapporto con il tuo corpo e con te stesso.',
    primaryLabel: 'Prenota una consulenza',
    primaryLink: '/contatti',
  },
  seo: {
    _type: 'seo',
    title: 'Consulenza di Consapevolezza | La Speziale Milano',
    description:
      'Consulenza con il Tutor del Benessere per leggere il linguaggio del corpo, valorizzare la persona e vivere con maggiore serenita.',
  },
}

const testimonialsPageUpdate = {
  heroEyebrow: 'Dicono di noi',
  heroTitle: 'Le esperienze di chi ha scelto il Metodo La Speziale',
  heroText:
    'Ogni persona arriva con una storia, esigenze e obiettivi diversi. Le testimonianze che trovi in questa pagina raccontano il percorso vissuto insieme a noi e il cambiamento che ciascuno ha costruito nel tempo.',
  sectionTitle: 'Le loro esperienze',
  sectionText:
    "Ogni testimonianza racconta un'esperienza personale. Non esistono percorsi uguali, perche ogni programma viene costruito sulle esigenze della persona. Queste sono alcune delle storie di chi ha scelto di affidarsi al Metodo La Speziale.",
  googleEyebrow: 'Recensioni Google',
  googleTitle: 'Le recensioni pubblicate su Google',
  googleText:
    "Le recensioni raccontano l'esperienza diretta di chi ha intrapreso un percorso con il Metodo La Speziale. Sono pubblicate spontaneamente dai nostri pazienti e rappresentano il valore piu autentico del lavoro che svolgiamo ogni giorno.",
  cta: {
    _type: 'pageCta',
    eyebrow: 'Contatto diretto',
    title: "Ogni percorso inizia dall'ascolto.",
    text: 'Ogni persona e diversa e merita un percorso costruito sulle proprie esigenze. Raccontaci la tua storia: insieme individueremo il progetto piu adatto per aiutarti a raggiungere i tuoi obiettivi.',
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

async function patchSingleton(_id, _type, update) {
  await client.createIfNotExists({_id, _type})
  await client.patch(_id).set(update).commit()

  const draftId = `drafts.${_id}`
  const draftExists = await client.fetch('defined(*[_id == $draftId][0]._id)', {draftId})
  if (draftExists) await client.patch(draftId).set(update).commit()
}

async function patchProgramBySlug({slug, ...update}) {
  const documents = await client.fetch('*[_type == "program" && slug.current == $slug]{_id}', {slug})
  if (!documents.length) {
    console.warn(`Programma non trovato: ${slug}`)
    return
  }

  await Promise.all(documents.map((document) => client.patch(document._id).set(update).commit()))
}

await patchSingleton('homepage', 'homepage', homepageUpdate)
for (const program of programUpdates) await patchProgramBySlug(program)
await patchSingleton('siteSettings', 'siteSettings', siteSettingsUpdate)
await patchSingleton('contactPage', 'contactPage', contactPageUpdate)
await patchSingleton('methodPage', 'methodPage', methodPageUpdate)
await patchSingleton('therapiesPage', 'therapiesPage', therapiesPageUpdate)
await patchSingleton('coachingPage', 'coachingPage', coachingPageUpdate)
await patchSingleton('testimonialsPage', 'testimonialsPage', testimonialsPageUpdate)

console.log('Aggiornamento contenuti cliente applicato: homepage, contatti, metodo, fitoterapia, consapevolezza, dicono di noi e 5 programmi.')
