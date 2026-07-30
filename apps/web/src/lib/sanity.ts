const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "h5heqcpt";
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || "2025-01-01";

export type Seo = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export type PageCta = {
  eyebrow?: string;
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  imageUrl?: string;
};

export type Program = {
  title: string;
  slug: string;
  excerpt: string;
  order?: number;
  isPublished?: boolean;
  imageUrl?: string;
  heroImageUrl?: string;
  category?: string;
  duration?: string;
  programType?: string;
  deliveryMode?: string;
  personalizedNote?: string;
  price?: string;
  audience?: string[];
  descriptionTitle?: string;
  description?: unknown[];
  benefits?: string[];
  benefitCards?: {
    _key?: string;
    _type?: "programBenefit";
    icon?: string;
    title?: string;
    description?: string;
  }[];
  processSteps?: {
    _key?: string;
    title?: string;
    description?: string;
  }[];
  showAnchorNav?: boolean;
  showOverview?: boolean;
  showAudience?: boolean;
  showDescription?: boolean;
  showBenefits?: boolean;
  showProcess?: boolean;
  showFaqs?: boolean;
  showExtraContent?: boolean;
  showFinalCta?: boolean;
  showInMenu?: boolean;
  isFeatured?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
  finalCtaTitle?: string;
  finalCtaText?: string;
  finalCtaImageUrl?: string;
  heroPrimaryLabel?: string;
  audienceTitle?: string;
  benefitsTitle?: string;
  processTitle?: string;
  faqsTitle?: string;
  finalWhatsappLabel?: string;
  finalEmailLabel?: string;
  seo?: Seo;
  blocks?: unknown[];
  faqs?: { question?: string; answer?: string }[];
};

export type Testimonial = {
  name: string;
  text: string;
  role?: string;
  imageUrl?: string;
  visible?: boolean;
  order?: number;
};

export type SiteSettings = {
  siteTitle: string;
  logoUrl?: string;
  faviconUrl?: string;
  email: string;
  phone: string;
  address: string;
  locationText?: string;
  openingHours?: string;
  contactText?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  footerText?: string;
  globalCtaLabel?: string;
  globalCtaLink?: string;
  privacyPolicyLink?: string;
  cookiePolicyLink?: string;
  legalName?: string;
  vatNumber?: string;
  privacyEmail?: string;
  privacyUpdatedAt?: string;
  seo?: Seo;
};

export type Homepage = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  heroCtaLabel?: string;
  heroCtaLink?: string;
  introEyebrow?: string;
  introTitle?: string;
  introLead?: string;
  introBody?: string;
  approachImageUrl?: string;
  value1Title?: string;
  value1Text?: string;
  value2Title?: string;
  value2Text?: string;
  value3Title?: string;
  value3Text?: string;
  methodEyebrow?: string;
  methodTitle?: string;
  methodText?: string;
  methodCoreEyebrow?: string;
  methodCoreText?: string;
  methodCoreLinkLabel?: string;
  methodDietLabel?: string;
  methodDietTitle?: string;
  methodDietText?: string;
  methodDietItems?: string[];
  methodPhytoLabel?: string;
  methodPhytoTitle?: string;
  methodPhytoText?: string;
  methodPhytoItems?: string[];
  methodPhytoLinkLabel?: string;
  featuredProgramSlugs?: string[];
  finalCta?: PageCta;
  seo?: Seo;
};

export type MethodPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  introTitle?: string;
  introText?: string;
  coreEyebrow?: string;
  coreTitle?: string;
  coreText?: string;
  coreItems?: string[];
  dietTitle?: string;
  dietText?: string;
  phytoTitle?: string;
  phytoText?: string;
  cta?: PageCta;
  seo?: Seo;
};

export type CoachingPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  introTitle?: string;
  introText?: string;
  audienceTitle?: string;
  audienceItems?: string[];
  methodTitle?: string;
  methodSteps?: { _key?: string; title?: string; text?: string }[];
  cta?: PageCta;
  seo?: Seo;
};

export type ProgramsPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  listTitle?: string;
  listText?: string;
  cardButtonLabel?: string;
  methodEyebrow?: string;
  methodTitle?: string;
  methodText?: string;
  methodCoreEyebrow?: string;
  methodCoreText?: string;
  methodCoreLinkLabel?: string;
  methodDietLabel?: string;
  methodDietTitle?: string;
  methodDietText?: string;
  methodPhytoLabel?: string;
  methodPhytoTitle?: string;
  methodPhytoText?: string;
  methodPhytoLinkLabel?: string;
  cta?: PageCta;
  seo?: Seo;
};

export type ContactPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  locationTitle?: string;
  hoursTitle?: string;
  hoursIntro?: string;
  contactTitle?: string;
  formTitle?: string;
  formText?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  addressTitle?: string;
  contactsTitle?: string;
  mapLabel?: string;
  mapQuery?: string;
  mapUrl?: string;
  mapImageUrl?: string;
  cta?: PageCta;
  seo?: Seo;
};

export type TestimonialsPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  sectionTitle?: string;
  sectionText?: string;
  showGoogleReviews?: boolean;
  googleEyebrow?: string;
  googleTitle?: string;
  googleText?: string;
  googleBusinessName?: string;
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewsUrl?: string;
  googlePlaceId?: string;
  googleButtonLabel?: string;
  googleReviews?: {
    _key?: string;
    author: string;
    rating?: number;
    text: string;
    reviewDate?: string;
    avatarUrl?: string;
    avatarAlt?: string;
    sourceUrl?: string;
  }[];
  cta?: PageCta;
  seo?: Seo;
};

export type ProductsPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  contentTitle?: string;
  contentText?: string;
  gridTitle?: string;
  gridText?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  cardButtonLabel?: string;
  cta?: PageCta;
  seo?: Seo;
};

export type Product = {
  _id?: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  price?: string;
  purchaseUrl?: string;
  purchaseLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
  tags?: string[];
  descriptionTitle?: string;
  description?: unknown[];
  featuresTitle?: string;
  features?: string[];
  ctaLabel?: string;
  ctaLink?: string;
  relatedTherapies?: TherapyLink[];
  seo?: Seo;
};

export type TherapyLink = {
  title: string;
  slug: string;
};

export type TherapiesPage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroText?: string;
  heroImageUrl?: string;
  contentTitle?: string;
  contentText?: string;
  gridTitle?: string;
  gridText?: string;
  cardButtonLabel?: string;
  cta?: PageCta;
  seo?: Seo;
};

export type Therapy = {
  title: string;
  slug: string;
  excerpt?: string;
  tagLabel?: string;
  gridTitle?: string;
  gridButtonLabel?: string;
  order?: number;
  isPublished?: boolean;
  showInMenu?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  ctaLabel?: string;
  ctaLink?: string;
  heroPrimaryLabel?: string;
  showAnchorNav?: boolean;
  showOverview?: boolean;
  showBenefits?: boolean;
  showRecommendedProducts?: boolean;
  showFaqs?: boolean;
  showFinalCta?: boolean;
  overviewTitle?: string;
  description?: unknown[];
  notesTitle?: string;
  notes?: string[];
  benefitsTitle?: string;
  benefitCards?: {
    _key?: string;
    _type?: "programBenefit";
    icon?: string;
    title?: string;
    description?: string;
  }[];
  recommendedProductsTitle?: string;
  recommendedProducts?: Product[];
  faqsTitle?: string;
  faqs?: { question?: string; answer?: string }[];
  finalCtaTitle?: string;
  finalCtaText?: string;
  finalCtaImageUrl?: string;
  seo?: Seo;
};

export const fallbackSettings: SiteSettings = {
  siteTitle: "Studio nutrizionista La Speziale Milano",
  logoUrl: "/assets/old-site/logo.png",
  faviconUrl: "/assets/old-site/logo.png",
  email: "laspeziale@laspeziale.it",
  phone: "+39 333 406 3401",
  address: "Via San Giovanni sul Muro 13, 20121 Milano",
  locationText:
    "Ci trovi nel cuore di Milano, a pochi passi da Largo Cairoli, dal Castello Sforzesco e dal Teatro Dal Verme, in una zona facilmente raggiungibile con i mezzi pubblici.",
  openingHours: "Martedi - Venerdi: 9:00 - 17:30\nSabato: 9:00 - 14:00\nOrario continuato",
  contactText:
    "Puoi scriverci o chiamarci. Ti ricontatteremo entro 24 ore per fornirti tutte le informazioni di cui hai bisogno e programmare un primo incontro personalizzato.",
  whatsapp: "https://wa.me/393334063401",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  footerText: "Nutrizione integrata, fitoterapia e percorsi personalizzati nel cuore di Milano.",
  globalCtaLabel: "Richiedi una consulenza",
  globalCtaLink: "/contatti",
  privacyPolicyLink: "/privacy-policy",
  cookiePolicyLink: "/cookie-policy",
  legalName: "La Speziale",
  privacyUpdatedAt: "2026-06-22",
  seo: {
    title: "Studio nutrizionista La Speziale Milano",
    description:
      "Studio nutrizionista a Milano per nutrizione integrata, programmi personalizzati, menopausa, anti-age, sport e consapevolezza corporea.",
  },
};

export const fallbackHomepage: Homepage = {
  heroTitle: "Il Metodo La Speziale",
  heroSubtitle:
    "Nutrizione personalizzata, consiglio fitoterapico e supporto al cambiamento in un unico percorso costruito intorno a te.",
  heroImageUrl: "/assets/old-site/hero-movimento.png",
  heroCtaLabel: "Scopri il percorso",
  heroCtaLink: "/programmi",
  approachImageUrl: "/assets/old-site/nutrizione-integrata.jpg",
  introEyebrow: "Perche nasce il Metodo La Speziale",
  introTitle: "La nutrizione cambia quando cambia il corpo.",
  introLead:
    "Nel corso degli anni abbiamo incontrato molte persone che, di fronte ai cambiamenti del proprio corpo, cercavano risposte diverse dai tradizionali schemi alimentari.",
  introBody:
    "Peso piu difficile da gestire, metabolismo che rallenta, variazioni ormonali, gonfiore, perdita di energia o difficolta nel ritrovare il proprio equilibrio richiedono una valutazione piu ampia e competenze che lavorano insieme. Da questa esperienza nasce il Metodo La Speziale. Lavorare con tre professionisti non significa ricevere piu indicazioni o maggiore confusione. Significa avere un unico programma, costruito attraverso competenze diverse che condividono lo stesso obiettivo: aiutare la persona a raggiungere un risultato concreto, semplice da seguire e sostenibile nel tempo.",
  value1Title: "La Dieta",
  value1Text: "Un piano alimentare su misura, realistico e monitorabile, pensato per entrare nella quotidianita senza restrizioni insostenibili.",
  value2Title: "La Fitoterapia",
  value2Text: "Uso mirato di piante officinali e nutraceutici di alto livello per sostenere metabolismo, drenaggio ed equilibrio ormonale.",
  value3Title: "Il Coaching",
  value3Text: "Sostegno motivazionale e consapevolezza corporea per rendere il cambiamento piu stabile nel lungo termine.",
  methodEyebrow: "Il Metodo La Speziale",
  methodTitle: "Un metodo che mette ordine, non aggiunge complessita.",
  methodText:
    "Tre professionisti osservano la persona da prospettive diverse e costruiscono insieme un'unica strategia. Tu ricevi un programma coordinato, nel quale ogni scelta segue la stessa direzione, evitando indicazioni separate e rendendo il percorso piu semplice da vivere.",
  methodCoreEyebrow: "I tre pilastri",
  methodCoreText:
    "Tre professionalita. Un unico metodo.",
  methodCoreLinkLabel: "Scopri il metodo",
  methodDietLabel: "Percorsi dedicati",
  methodDietTitle: "Come possiamo aiutarti",
  methodDietText:
    "Ogni persona ha esigenze diverse. Per questo abbiamo sviluppato percorsi dedicati ai principali bisogni che incontriamo ogni giorno nel nostro studio.",
  methodDietItems: [
    "Gestione peso e ricomposizione",
    "Menopausa, anti-age e sport",
    "Piano, monitoraggio e adattamenti",
  ],
  methodPhytoLabel: "Consulenze",
  methodPhytoTitle: "Le stesse competenze, anche quando non serve l'intero Metodo.",
  methodPhytoText:
    "Non tutte le esigenze richiedono un percorso multidisciplinare. In alcuni casi puoi richiedere una consulenza dedicata con la Farmacista specializzata in Fitoterapia o con il Tutor del Benessere, quando rappresenta la risposta piu adatta alle tue esigenze.",
  methodPhytoItems: [
    "Fitoterapia mirata",
    "Coaching e consapevolezza",
    "Supporto pratico senza piano alimentare",
  ],
  methodPhytoLinkLabel: "Vai alla fitoterapia",
  finalCta: {
    eyebrow: "CTA finale",
    title: "Il tuo percorso inizia da qui.",
    text: "Ascolteremo la tua storia, valuteremo le tue esigenze e costruiremo il programma piu adatto al tuo corpo e ai tuoi obiettivi.",
    primaryLabel: "Richiedi una consulenza",
    primaryLink: "/contatti",
  },
  seo: fallbackSettings.seo,
};

const homepageStrategyOverrides: Partial<Homepage> = {
  heroTitle: fallbackHomepage.heroTitle,
  heroSubtitle: fallbackHomepage.heroSubtitle,
  heroImageUrl: fallbackHomepage.heroImageUrl,
  introEyebrow: fallbackHomepage.introEyebrow,
  introTitle: fallbackHomepage.introTitle,
  introLead: fallbackHomepage.introLead,
  introBody: fallbackHomepage.introBody,
  value1Title: fallbackHomepage.value1Title,
  value1Text: fallbackHomepage.value1Text,
  value2Title: fallbackHomepage.value2Title,
  value2Text: fallbackHomepage.value2Text,
  value3Title: fallbackHomepage.value3Title,
  value3Text: fallbackHomepage.value3Text,
  methodEyebrow: fallbackHomepage.methodEyebrow,
  methodTitle: fallbackHomepage.methodTitle,
  methodText: fallbackHomepage.methodText,
  methodCoreEyebrow: fallbackHomepage.methodCoreEyebrow,
  methodCoreText: fallbackHomepage.methodCoreText,
  methodCoreLinkLabel: fallbackHomepage.methodCoreLinkLabel,
  methodDietLabel: fallbackHomepage.methodDietLabel,
  methodDietTitle: fallbackHomepage.methodDietTitle,
  methodDietText: fallbackHomepage.methodDietText,
  methodDietItems: fallbackHomepage.methodDietItems,
  methodPhytoLabel: fallbackHomepage.methodPhytoLabel,
  methodPhytoTitle: fallbackHomepage.methodPhytoTitle,
  methodPhytoText: fallbackHomepage.methodPhytoText,
  methodPhytoItems: fallbackHomepage.methodPhytoItems,
  methodPhytoLinkLabel: fallbackHomepage.methodPhytoLinkLabel,
  finalCta: fallbackHomepage.finalCta,
};

export const fallbackMethodPage: MethodPage = {
  heroEyebrow: "Il Metodo",
  heroTitle: "Il Metodo",
  heroText:
    "Tre competenze lavorano insieme per offrirti un unico programma, chiaro, coordinato e semplice da seguire.",
  heroImageUrl: "/assets/old-site/hero-movimento.png",
  introTitle: "La semplicita che vivi nasce dal lavoro che non vedi.",
  introText:
    "Il Metodo La Speziale nasce da un principio semplice: osservare la persona nel suo insieme. Biologa Nutrizionista, Farmacista specializzata in Fitoterapia e Tutor del Benessere condividono competenze, informazioni e obiettivi per costruire un'unica strategia. Questo permette di trasformare valutazioni diverse in un solo programma, coordinato, personalizzato e facile da seguire, senza dover gestire indicazioni separate.",
  coreEyebrow: "Come nasce il tuo programma",
  coreTitle: "Un metodo organizzato, costruito intorno alla persona.",
  coreText:
    "Per te questo significa un unico programma, coerente e facile da seguire, senza dover gestire indicazioni separate.",
  coreItems: [
    "Conosciamo la persona",
    "Conosciamo il tuo corpo",
    "Costruiamo la strategia",
    "Ti accompagniamo nel tempo",
  ],
  dietTitle: "I tre pilastri del Metodo",
  dietText:
    "Tre competenze. Un'unica direzione.",
  phytoTitle: "Il vero risultato",
  phytoText:
    "Il vero risultato e vivere meglio il proprio corpo, ogni giorno.",
  cta: {
    eyebrow: "CTA",
    title: "Il primo passo e conoscere cio di cui il tuo corpo ha davvero bisogno.",
    text: "Ogni persona e diversa e ogni cambiamento merita un programma costruito sulle proprie esigenze.",
    primaryLabel: "Richiedi una consulenza",
    primaryLink: "/contatti",
  },
  seo: {
    title: "Il Metodo | La Speziale Milano",
    description:
      "Il Metodo La Speziale a Milano: nutrizione personalizzata, consiglio fitoterapico e consapevolezza del corpo in un unico programma.",
  },
};

export const fallbackCoachingPage: CoachingPage = {
  heroEyebrow: "Consulenza di Consapevolezza",
  heroTitle: "Consulenza di Consapevolezza",
  heroText:
    "Un percorso con il Tutor del Benessere per imparare a leggere il linguaggio del proprio corpo, valorizzare la propria persona e vivere con maggiore serenita ogni fase della vita.",
  heroImageUrl: "/assets/old-site/consapevolezza.png",
  introTitle: "Ogni cambiamento del corpo porta con se qualcosa di piu di un cambiamento fisico.",
  introText:
    "Puo modificare il modo in cui ci percepiamo, il rapporto con la nostra immagine, la sicurezza con cui affrontiamo la quotidianita e la capacita di riconoscere il nostro valore. Questa consulenza nasce per aiutare la persona a comprendere questi cambiamenti, accoglierli e trasformarli in una nuova consapevolezza di se, affinche il benessere raggiunto possa diventare parte della propria vita.",
  audienceTitle: "A chi desidera:",
  audienceItems: [
    "conoscere meglio se stesso;",
    "migliorare il rapporto con il proprio corpo;",
    "valorizzare la propria immagine;",
    "affrontare con maggiore serenita una nuova fase della vita;",
    "accrescere la fiducia nelle proprie risorse;",
    "dedicare del tempo alla propria persona.",
  ],
  methodTitle: "Il Tutor del Benessere accompagna la persona in un percorso pratico di conoscenza di se.",
  methodSteps: [
    { title: "Perche nasce", text: "Ogni cambiamento del corpo porta con se qualcosa di piu di un cambiamento fisico." },
    { title: "Il Tutor del Benessere", text: "Accompagna la persona in un percorso pratico di conoscenza di se attraverso il linguaggio del corpo." },
    { title: "Come si svolge", text: "Ogni incontro parte dalla persona e dalla fase della vita che sta vivendo." },
  ],
  cta: {
    eyebrow: "CTA",
    title: "Ogni percorso inizia da una maggiore conoscenza di se.",
    text: "Prenota la tua Consulenza di Consapevolezza e scopri il valore di un percorso che ti aiuta a vivere con maggiore consapevolezza il rapporto con il tuo corpo e con te stesso.",
    primaryLabel: "Prenota una consulenza",
    primaryLink: "/contatti",
  },
  seo: {
    title: "Consulenza di Consapevolezza | La Speziale Milano",
    description:
      "Consulenza con il Tutor del Benessere per leggere il linguaggio del corpo, valorizzare la persona e vivere con maggiore serenita.",
  },
};

export const fallbackProgramsPage: ProgramsPage = {
  heroEyebrow: "Aree di intervento",
  heroTitle: "Percorsi clinici costruiti intorno alla persona",
  heroText: "Le aree di lavoro principali dello studio: peso e ricomposizione corporea, gonfiore e disturbi intestinali, salute femminile, anti-age e nutrizione sportiva.",
  heroImageUrl: "/assets/old-site/hero-header.jpg",
  listTitle: "Le aree che trattiamo",
  listText: "Scegli l'esigenza piu vicina al tuo momento e scopri come viene costruito il percorso.",
  cardButtonLabel: "Scopri di piu",
  methodEyebrow: "Come scegliere",
  methodTitle: "Il percorso completo parte dalla nutrizione, ma ogni bisogno ha la sua porta d'ingresso.",
  methodText:
    "La Speziale distingue tra percorsi nutrizionali personalizzati e consulenze stand-alone: cosi ogni persona puo orientarsi verso la soluzione piu adatta al proprio momento.",
  methodCoreEyebrow: "Il core del metodo",
  methodCoreText:
    "Il percorso completo unisce dieta personalizzata, consulenza, follow-up, eventuale fitoterapia e prodotti consigliati quando sono utili al risultato.",
  methodCoreLinkLabel: "Approfondisci il metodo",
  methodDietLabel: "Con dieta",
  methodDietTitle: "Percorsi nutrizionali",
  methodDietText:
    "Per chi desidera un piano alimentare strutturato, controlli periodici e un accompagnamento completo.",
  methodPhytoLabel: "Senza dieta",
  methodPhytoTitle: "Consulenze indipendenti",
  methodPhytoText:
    "Per chi cerca fitoterapia, prodotti selezionati o consapevolezza alimentare senza avviare un percorso con dieta.",
  methodPhytoLinkLabel: "Scopri le altre consulenze",
  cta: {
    eyebrow: "Contatto diretto",
    title: "Non sai quale percorso scegliere?",
    text: "Contattaci per una prima consulenza e ti aiuteremo a orientarti.",
    primaryLabel: "Scrivi su WhatsApp",
    secondaryLabel: "Invia una email",
  },
  seo: {
    title: "Aree di intervento | La Speziale Milano",
    description: "Percorsi per gestione del peso, gonfiore e disturbi intestinali, salute femminile, anti-age e nutrizione sportiva nello Studio La Speziale a Milano.",
  },
};

export const fallbackContactPage: ContactPage = {
  heroEyebrow: "Contatti",
  heroTitle: "Il primo passo e conoscerci.",
  heroText: "Ogni percorso inizia dall'ascolto. Se desideri maggiori informazioni o vuoi prenotare una consulenza, saremo lieti di accoglierti nel nostro studio.",
  locationTitle: "Dove siamo",
  hoursTitle: "Orari di apertura",
  hoursIntro: "Riceviamo solo su appuntamento, nei seguenti orari:",
  contactTitle: "Contattaci",
  formTitle: "Scrivici",
  formText: "Raccontaci di cosa hai bisogno e ti ricontatteremo.",
  nameLabel: "Nome e cognome",
  namePlaceholder: "Il tuo nome",
  emailLabel: "Email",
  emailPlaceholder: "nome@email.it",
  messageLabel: "Messaggio",
  messagePlaceholder: "Raccontaci di cosa hai bisogno",
  submitLabel: "Invia richiesta",
  addressTitle: "Indirizzo",
  contactsTitle: "Contatti",
  mapLabel: "Sede La Speziale, Milano",
  mapQuery: "Via San Giovanni sul Muro 13, 20121 Milano",
  seo: {
    title: "Contatti | Studio nutrizionista La Speziale Milano",
    description: "Contatta lo Studio nutrizionista La Speziale a Milano. Indirizzo, telefono, email e orari su appuntamento.",
  },
};

export const fallbackTestimonialsPage: TestimonialsPage = {
  heroEyebrow: "Dicono di noi",
  heroTitle: "Le esperienze di chi ha scelto il Metodo La Speziale",
  heroText: "Ogni persona arriva con una storia, esigenze e obiettivi diversi. Le testimonianze che trovi in questa pagina raccontano il percorso vissuto insieme a noi e il cambiamento che ciascuno ha costruito nel tempo.",
  sectionTitle: "Le loro esperienze",
  sectionText:
    "Ogni testimonianza racconta un'esperienza personale. Non esistono percorsi uguali, perche ogni programma viene costruito sulle esigenze della persona. Queste sono alcune delle storie di chi ha scelto di affidarsi al Metodo La Speziale.",
  showGoogleReviews: false,
  googleEyebrow: "Recensioni Google",
  googleTitle: "Le recensioni pubblicate su Google",
  googleText: "Le recensioni raccontano l'esperienza diretta di chi ha intrapreso un percorso con il Metodo La Speziale. Sono pubblicate spontaneamente dai nostri pazienti e rappresentano il valore piu autentico del lavoro che svolgiamo ogni giorno.",
  googleBusinessName: "La Speziale",
  googleButtonLabel: "Vedi tutte le recensioni su Google",
  cta: {
    eyebrow: "Contatto diretto",
    title: "Ogni percorso inizia dall'ascolto.",
    text: "Ogni persona e diversa e merita un percorso costruito sulle proprie esigenze. Raccontaci la tua storia: insieme individueremo il progetto piu adatto per aiutarti a raggiungere i tuoi obiettivi.",
    primaryLabel: "Scrivi su WhatsApp",
    secondaryLabel: "Invia una email",
  },
  seo: {
    title: "Dicono di noi | La Speziale Milano",
    description: "Testimonianze ed esperienze dei clienti dello Studio nutrizionista La Speziale a Milano.",
  },
};

export const fallbackProductsPage: ProductsPage = {
  heroEyebrow: "Prodotti consigliati",
  heroTitle: "La tua lista della spesa naturale",
  heroText:
    "I prodotti presenti in questa pagina sono solo consigliati da La Speziale e non sono venduti direttamente dallo studio: il sito non e un ecommerce, non gestisce carrelli, pagamenti, spedizioni o assistenza sugli ordini. Le informazioni non sostituiscono una consulenza medica, nutrizionale o sanitaria personalizzata.",
  heroImageUrl: "/assets/old-site/fitoterapia.jpg",
  contentTitle: "Prodotti consigliati",
  contentText:
    "Lista consultabile dei prodotti consigliati, senza vendita diretta sul sito.",
  gridTitle: "Prodotti consigliati",
  gridText: "Cerca il nome esatto del prodotto consigliato sul foglio oppure filtra per area di benessere.",
  searchLabel: "Cerca un prodotto",
  searchPlaceholder: "Digita il nome del prodotto consigliato sul foglio...",
  emptyText: "Nessun prodotto corrisponde alla ricerca.",
  cardButtonLabel: "Scopri il prodotto",
  cta: {
    eyebrow: "Informazioni",
    title: "Vuoi ricevere maggiori informazioni?",
    text: "Contattaci direttamente.",
    primaryLabel: "Scrivi su WhatsApp",
    secondaryLabel: "Invia una email",
  },
  seo: {title: "Prodotti consigliati | La Speziale", description: "Prodotti consigliati dallo Studio La Speziale a Milano."},
};

export const fallbackProducts: Product[] = [
  {
    title: "DrenaSpeziale Tisana Betulla e Pilosella",
    slug: "drenaspeziale-tisana-betulla-pilosella",
    category: "Drenaggio e Liquidi",
    excerpt: "Tisana drenante per favorire la naturale eliminazione dei liquidi in eccesso.",
    price: "Marchio consigliato",
    tags: ["drenaggio", "liquidi", "betulla", "pilosella", "ritenzione"],
    descriptionTitle: "Descrizione",
    description: portableText("Una proposta fitoterapica per accompagnare la gestione dei liquidi e sostenere i naturali organi emuntori."),
    featuresTitle: "Caratteristiche",
    features: ["Supporto drenante", "Pensata per ritenzione e gonfiore diffuso", "Da integrare con idratazione e movimento"],
  },
  {
    title: "Estratto Idroalcolico Puro di Tarassaco",
    slug: "estratto-idroalcolico-puro-tarassaco",
    category: "Drenaggio e Liquidi",
    excerpt: "Gocce di tarassaco per supportare depurazione e drenaggio.",
    price: "Gocce 50 ml",
    tags: ["tarassaco", "depurazione", "drenaggio", "gocce"],
    description: portableText("Estratto utile nei protocolli in cui si desidera sostenere fisiologicamente depurazione e leggerezza."),
    features: ["Supporto depurativo", "Formato in gocce", "Da valutare in base alla situazione personale"],
  },
  {
    title: "SollievoGambe Gel Freddo all'Ippocastano",
    slug: "sollievogambe-gel-freddo-ippocastano",
    category: "Gambe e Microcircolo",
    excerpt: "Gel fresco per gambe pesanti, microcircolo e sensazione di gonfiore.",
    price: "Uso topico",
    tags: ["gambe", "microcircolo", "ippocastano", "gel", "pesantezza"],
    description: portableText("Una soluzione topica pensata per dare freschezza e accompagnare protocolli dedicati a pesantezza e microcircolo."),
    features: ["Effetto fresco", "Con ippocastano", "Ideale nei periodi caldi o dopo molte ore in piedi"],
  },
  {
    title: "Capsule di Mirtillo Nero Concentrato",
    slug: "capsule-mirtillo-nero-concentrato",
    category: "Gambe e Microcircolo",
    excerpt: "Supporto naturale al microcircolo con mirtillo nero concentrato.",
    price: "Capsule",
    tags: ["mirtillo", "microcircolo", "capillari", "gambe"],
    description: portableText("Il mirtillo nero viene spesso utilizzato come supporto nei protocolli dedicati a microcircolo e capillari."),
    features: ["Mirtillo nero concentrato", "Supporto ai capillari", "Utile in protocolli per gambe pesanti"],
  },
  {
    title: "MelatoSpeziale Gocce - Escolzia, Valeriana e Passiflora",
    slug: "melatospeziale-gocce-escolzia-valeriana-passiflora",
    category: "Stress e Sonno",
    excerpt: "Gocce con piante rilassanti per accompagnare riposo e rilassamento.",
    price: "Gocce",
    tags: ["sonno", "rilassamento", "valeriana", "passiflora", "escolzia"],
    description: portableText("Formula pensata per supportare il rilassamento serale e una routine piu regolare prima del sonno."),
    features: ["Con valeriana, passiflora ed escolzia", "Formato pratico in gocce", "Da inserire in una routine serale"],
  },
  {
    title: "Ashwagandha Adattogena KSM-66",
    slug: "ashwagandha-adattogena-ksm-66",
    category: "Stress e Sonno",
    excerpt: "Supporto adattogeno per stress, energia mentale e resilienza.",
    price: "Capsule",
    tags: ["ashwagandha", "stress", "energia", "adattogeno", "concentrazione"],
    description: portableText("Un adattogeno da valutare nei protocolli in cui stress, stanchezza e concentrazione richiedono un supporto mirato."),
    features: ["Estratto KSM-66", "Supporto adattogeno", "Utile per stress e concentrazione"],
  },
  {
    title: "Tisana Finocchio e Melissa BIO",
    slug: "tisana-finocchio-melissa-bio",
    category: "Digestione e Pancia",
    excerpt: "Tisana bio per gonfiore, digestione lenta e comfort addominale.",
    price: "Tisana BIO",
    tags: ["finocchio", "melissa", "gonfiore", "digestione", "pancia"],
    description: portableText("Una tisana delicata per accompagnare il comfort digestivo quotidiano."),
    features: ["Con finocchio e melissa", "Supporto al comfort addominale", "Ideale dopo i pasti"],
  },
  {
    title: "Enzimi Digestivi Naturali con Estratto di Zenzero",
    slug: "enzimi-digestivi-naturali-zenzero",
    category: "Digestione e Pancia",
    excerpt: "Supporto digestivo con enzimi naturali e zenzero.",
    price: "Compresse",
    tags: ["enzimi", "zenzero", "digestione", "gonfiore"],
    description: portableText("Un supporto da valutare quando digestione lenta e gonfiore richiedono un aiuto piu specifico."),
    features: ["Con enzimi digestivi", "Zenzero selezionato", "Supporto dopo pasti impegnativi"],
  },
  {
    title: "Agnocasto Estratto Secco",
    slug: "agnocasto-estratto-secco",
    category: "Benessere Ormonale",
    excerpt: "Supporto fitoterapico per equilibrio femminile e ciclicita.",
    price: "Estratto secco",
    tags: ["agnocasto", "donna", "ormoni", "equilibrio", "ciclo"],
    description: portableText("L'agnocasto puo essere valutato nei percorsi dedicati al benessere femminile e alla regolarita ciclica."),
    features: ["Estratto secco", "Supporto femminile", "Da valutare in consulenza"],
  },
  {
    title: "Perle di Olio di Enotera Spremuto a Freddo",
    slug: "olio-enotera-spremuto-freddo",
    category: "Benessere Ormonale",
    excerpt: "Olio di enotera in perle per pelle, ciclo ed equilibrio femminile.",
    price: "Perle",
    tags: ["enotera", "donna", "pelle", "equilibrio", "omega"],
    description: portableText("L'olio di enotera viene spesso inserito in protocolli di supporto per pelle e benessere femminile."),
    features: ["Spremuto a freddo", "Formato in perle", "Supporto a pelle ed equilibrio femminile"],
  },
  {
    title: "Tonico Ricostituente di Rodiola Rosea e Pappa Reale",
    slug: "tonico-rodiola-rosea-pappa-reale",
    category: "Energia e Vitalita",
    excerpt: "Tonico naturale per energia, concentrazione e periodi di stanchezza.",
    price: "Tonico",
    tags: ["rodiola", "pappa reale", "energia", "stanchezza", "vitalita"],
    description: portableText("Una proposta ricostituente per periodi di calo energetico e maggiore richiesta mentale."),
    features: ["Con rodiola rosea", "Pappa reale", "Per energia e vitalita"],
  },
  {
    title: "Tavolette di Spirulina BIO",
    slug: "tavolette-spirulina-bio",
    category: "Energia e Vitalita",
    excerpt: "Spirulina bio in tavolette per supporto nutrizionale quotidiano.",
    price: "Tavolette BIO",
    tags: ["spirulina", "energia", "nutrienti", "bio"],
    description: portableText("Una fonte vegetale da valutare come supporto nutrizionale in periodi di maggiore richiesta."),
    features: ["Spirulina BIO", "Formato in tavolette", "Supporto nutrizionale"],
  },
  {
    title: "Echinacea e Rosa Canina Concentrata",
    slug: "echinacea-rosa-canina-concentrata",
    category: "Difese Immunitarie",
    excerpt: "Supporto naturale per difese e benessere stagionale.",
    price: "Integratore",
    tags: ["echinacea", "rosa canina", "difese", "stagionale", "immunita"],
    description: portableText("Formula pensata per accompagnare il benessere stagionale e il supporto alle difese naturali."),
    features: ["Con echinacea", "Rosa canina", "Supporto stagionale"],
  },
  {
    title: "Estratto di Sambuco e Zinco",
    slug: "estratto-sambuco-zinco",
    category: "Difese Immunitarie",
    excerpt: "Sambuco e zinco per sostenere le difese nei cambi di stagione.",
    price: "Estratto",
    tags: ["sambuco", "zinco", "difese", "inverno", "stagione"],
    description: portableText("Un supporto da valutare nei protocolli dedicati ai cambi di stagione e alla protezione quotidiana."),
    features: ["Con sambuco", "Apporto di zinco", "Per cambi di stagione"],
  },
  {
    title: "Resveratrolo Puro Concentrato",
    slug: "resveratrolo-puro-concentrato",
    category: "Anti-Age e Cellule",
    excerpt: "Supporto antiossidante per protocolli anti-age e longevita cellulare.",
    price: "Capsule",
    tags: ["resveratrolo", "anti-age", "antiossidante", "cellule", "longevita"],
    description: portableText("Un attivo antiossidante da valutare in protocolli dedicati a prevenzione e longevita cellulare."),
    features: ["Resveratrolo concentrato", "Supporto antiossidante", "Per protocolli anti-age"],
  },
  {
    title: "Coenzima Q10 Vegetale ad Alto Dosaggio",
    slug: "coenzima-q10-vegetale-alto-dosaggio",
    category: "Anti-Age e Cellule",
    excerpt: "Coenzima Q10 vegetale per energia cellulare e supporto anti-age.",
    price: "Capsule",
    tags: ["q10", "coenzima", "anti-age", "energia", "cellule"],
    description: portableText("Supporto utile nei protocolli orientati a energia cellulare, prevenzione e vitalita."),
    features: ["Coenzima Q10 vegetale", "Alto dosaggio", "Supporto a energia cellulare"],
  },
];

export const fallbackTherapiesPage: TherapiesPage = {
  heroEyebrow: "Il Consiglio Fitoterapico",
  heroTitle: "Il Consiglio Fitoterapico",
  heroText:
    "Una consulenza con una Farmacista specializzata in Fitoterapia per individuare piante officinali e nutraceutici realmente adatti alla tua situazione.",
  heroImageUrl: "/assets/old-site/fitoterapia.jpg",
  contentTitle: "Perche richiedere un consiglio fitoterapico?",
  contentText:
    "La scelta dipende dalla persona, dalle sue esigenze, dalle eventuali terapie in corso e dall'obiettivo che desidera raggiungere.",
  gridTitle: "Molti prodotti naturali sembrano simili, ma non lo sono.",
  gridText: "Per questo il valore della consulenza non e il prodotto, ma la valutazione che porta a sceglierlo.",
  cardButtonLabel: "Richiedi una consulenza",
  cta: {
    eyebrow: "CTA",
    title: "Hai bisogno di un consiglio professionale?",
    text: "Prenota una consulenza e confrontati con una Farmacista specializzata in Fitoterapia per individuare la soluzione piu adatta alle tue esigenze.",
    primaryLabel: "Richiedi una consulenza",
    primaryLink: "/contatti",
  },
  seo: {
    title: "Consiglio Fitoterapico | La Speziale Milano",
    description:
      "Consulenza con Farmacista specializzata in Fitoterapia per scegliere piante officinali e nutraceutici adatti alla tua situazione.",
  },
};

const recommendedFallbackProducts = (slugs: string[]) =>
  slugs
    .map((slug) => fallbackProducts.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

export const fallbackTherapies: Therapy[] = [
  {
    title: "Capelli e unghie fragili",
    slug: "capelli-unghie-fragili",
    order: 1,
    tagLabel: "Capelli",
    excerpt: "Consigli fitoterapici e nutraceutici per capelli piu forti, unghie resistenti e bellezza che nasce da dentro.",
    gridTitle: "Noti capelli piu deboli, spenti o unghie che si spezzano facilmente?",
    gridButtonLabel: "Nutri la tua bellezza da dentro",
    overviewTitle: "Quando capelli e unghie chiedono supporto",
    description: portableText("Stress, cambi di stagione, dieta incompleta e ritmi intensi possono indebolire il bulbo e la cheratina. Lozioni e shampoo lavorano in superficie, mentre un supporto nutraceutico mirato aiuta a nutrire capelli e unghie dall'interno."),
    notesTitle: "Indicazioni importanti",
    notes: ["Il ciclo va valutato in base a durata della caduta, abitudini alimentari e situazione personale.", "In caso di caduta intensa o improvvisa e opportuno confrontarsi con medico o dermatologo."],
  },
  {
    title: "Depurazione e controllo del peso",
    slug: "depurazione-controllo-peso",
    order: 2,
    tagLabel: "Peso",
    excerpt: "Supporti naturali per depurazione, drenaggio dei liquidi e percorso di remise en forme.",
    gridTitle: "Vuoi depurare l'organismo o cerchi un supporto per rimetterti in forma?",
    gridButtonLabel: "Scopri i miei consigli per la linea",
    overviewTitle: "Quando vuoi rimetterti in forma con gradualita",
    description: portableText("Per raggiungere un obiettivo di peso o leggerezza non servono promesse rapide, ma una strategia sostenibile. Drenanti e depurativi possono aiutare il corpo a gestire liquidi in eccesso e routine alimentari piu ordinate."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["drenaspeziale-tisana-betulla-pilosella", "estratto-idroalcolico-puro-tarassaco"]),
  },
  {
    title: "Energia e concentrazione",
    slug: "energia-concentrazione",
    order: 3,
    tagLabel: "Stanchezza",
    excerpt: "Adattogeni e rimedi naturali per periodi di stanchezza, calo di focus e ritmi quotidiani intensi.",
    gridTitle: "Ti senti spesso senza forze o fai fatica a mantenere la concentrazione?",
    gridButtonLabel: "Trova la tua ricarica naturale",
    overviewTitle: "Quando ti senti spesso senza forze",
    description: portableText("Lavoro intenso, studio, sonno irregolare e stress possono ridurre energia e concentrazione. Un supporto naturale ben scelto puo aiutare a recuperare vitalita rispettando i ritmi del corpo."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["ashwagandha-adattogena-ksm-66", "tonico-rodiola-rosea-pappa-reale", "tavolette-spirulina-bio"]),
  },
  {
    title: "Sonno e rilassamento",
    slug: "sonno-rilassamento",
    order: 4,
    tagLabel: "Sonno",
    excerpt: "Soluzioni fitoterapiche per favorire calma, addormentamento e riposo realmente ristoratore.",
    gridTitle: "Fai fatica ad addormentarti o ti svegli spesso durante la notte?",
    gridButtonLabel: "Ritrova un riposo sereno",
    overviewTitle: "Quando il riposo non e piu ristoratore",
    description: portableText("Difficolta ad addormentarsi, risvegli notturni e tensioni serali possono compromettere benessere, fame, energia e umore. La fitoterapia puo aiutare a costruire una routine piu calma e regolare."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["melatospeziale-gocce-escolzia-valeriana-passiflora", "ashwagandha-adattogena-ksm-66"]),
  },
  {
    title: "Gonfiore e digestione lenta",
    slug: "gonfiore-digestione-lenta",
    order: 5,
    tagLabel: "Gonfiore",
    excerpt: "Estratti naturali e fermenti per pancia gonfia, pesantezza, digestione lenta e regolarita intestinale.",
    gridTitle: "Soffri spesso di pancia gonfia, pesantezza o digestione lenta?",
    gridButtonLabel: "Torna a sentirti leggera",
    overviewTitle: "Quando l'intestino risente di stress e abitudini",
    description: portableText("Pancia gonfia, pesantezza e digestione lenta possono dipendere da stress, pasti frettolosi, disbiosi o routine alimentari poco regolari. La scelta del supporto va orientata sul sintomo prevalente."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["tisana-finocchio-melissa-bio", "enzimi-digestivi-naturali-zenzero"]),
  },
  {
    title: "Antiage e longevita cellulare",
    slug: "antiage-longevita-cellulare",
    order: 6,
    tagLabel: "Antiage",
    excerpt: "Antiossidanti e supporti nutraceutici per contrastare stress ossidativo e sostenere vitalita nel tempo.",
    gridTitle: "Vuoi contrastare l'invecchiamento cellulare e mantenerti giovane dentro e fuori?",
    gridButtonLabel: "Scopri i segreti della longevita cellulare",
    overviewTitle: "Quando vuoi proteggere cellule e tessuti",
    description: portableText("Il tempo passa per tutti, ma nutrizione, stile di vita e antiossidanti mirati possono aiutare a proteggere le cellule dai radicali liberi e sostenere elasticita, energia e vitalita."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["resveratrolo-puro-concentrato", "coenzima-q10-vegetale-alto-dosaggio"]),
  },
  {
    title: "Gambe pesanti e microcircolo",
    slug: "gambe-pesanti-microcircolo",
    order: 7,
    tagLabel: "Gambe",
    excerpt: "Principi attivi naturali per gambe gonfie, pesanti, stanche e fragilita capillare.",
    gridTitle: "Senti spesso le gambe gonfie, stanche, o soffri di fragilita capillare?",
    gridButtonLabel: "Allevia la pesantezza alle gambe",
    overviewTitle: "Quando circolazione e drenaggio rallentano",
    description: portableText("Molte ore in piedi o seduti possono rallentare circolazione venosa e linfatica, aumentando pesantezza, gonfiore e fastidio. Il supporto naturale mira a microcircolo, vasi e drenaggio."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["sollievogambe-gel-freddo-ippocastano", "capsule-mirtillo-nero-concentrato"]),
  },
  {
    title: "Equilibrio femminile",
    slug: "equilibrio-femminile",
    order: 8,
    tagLabel: "Donne",
    excerpt: "Rimedi fitoterapici per ciclo, sbalzi d'umore, premenopausa, menopausa e benessere ormonale.",
    gridTitle: "Sbalzi d'umore, fastidi legati al ciclo o i primi sintomi della menopausa?",
    gridButtonLabel: "Sintonizzati con il tuo equilibrio",
    overviewTitle: "Quando il corpo femminile cambia ritmo",
    description: portableText("Ciclo, sindrome premestruale, premenopausa e menopausa possono portare fastidi, vampate, tensione o sbalzi d'umore. La fitoterapia puo aiutare a sostenere equilibrio e qualita della vita."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["agnocasto-estratto-secco", "olio-enotera-spremuto-freddo"]),
  },
  {
    title: "Dolori articolari e muscolari",
    slug: "dolori-articolari-muscolari",
    order: 9,
    tagLabel: "Dolori",
    excerpt: "Antinfiammatori naturali per tensioni muscolari, fastidi articolari e supporto alla liberta di movimento.",
    gridTitle: "Soffri di dolori articolari, tensioni muscolari o fastidi alla schiena?",
    gridButtonLabel: "Scopri i rimedi per muscoli e articolazioni",
    overviewTitle: "Quando infiammazione e tensioni limitano il movimento",
    description: portableText("Posture scorrette, stress, allenamento o sforzi fisici possono infiammare muscoli e articolazioni. Un supporto naturale puo aiutare a lenire il fastidio e proteggere la mobilita quotidiana."),
  },
  {
    title: "Difese immunitarie",
    slug: "difese-immunitarie",
    order: 10,
    tagLabel: "Difese",
    excerpt: "Rimedi naturali per rinforzare e preparare lo scudo immunitario nei cambi di stagione e nei periodi piu delicati.",
    gridTitle: "Vuoi sostenere le difese dell'organismo nei periodi piu delicati?",
    gridButtonLabel: "Rinforza il tuo scudo naturale",
    overviewTitle: "Quando le difese hanno bisogno di supporto",
    description: portableText("Cambi di stagione, stress e periodi di maggiore esposizione possono mettere alla prova il sistema immunitario. La fitoterapia puo aiutare a sostenere le normali difese in modo ragionato."),
    recommendedProductsTitle: "Prodotti consigliati",
    recommendedProducts: recommendedFallbackProducts(["echinacea-rosa-canina-concentrata", "estratto-sambuco-zinco"]),
  },
].map((therapy) => ({
  category: "Consiglio fitoterapico",
  isPublished: true,
  showInMenu: false,
  showAnchorNav: true,
  showOverview: true,
  showBenefits: false,
  showRecommendedProducts: Boolean(therapy.recommendedProducts?.length),
  showFaqs: true,
  showFinalCta: true,
  faqsTitle: "Domande frequenti",
  faqs: [
    { question: "Posso scegliere il prodotto da sola?", answer: "Meglio usare la scheda come orientamento e chiedere conferma in consulenza, soprattutto in presenza di farmaci o condizioni specifiche." },
    { question: "La fitoterapia sostituisce il percorso nutrizionale?", answer: "No. La fitoterapia e un supporto integrativo e funziona meglio quando e inserita in una strategia personalizzata." },
  ],
  finalCtaTitle: `Vuoi approfondire ${therapy.title}?`,
  finalCtaText: "Scrivici per capire quali prodotti o abitudini possono essere piu adatti alla tua situazione.",
  ...therapy,
}));

export const fallbackPrograms: Program[] = [
  {
    title: "Nutrizione Integrata",
    slug: "nutrizione-integrata",
    order: 1,
    imageUrl: "/assets/old-site/nutrizione-integrata.jpg",
    heroImageUrl: "/assets/old-site/hero-header.jpg",
    excerpt:
      "Molto piu di una dieta: un metodo che integra alimentazione personalizzata, analisi della composizione corporea, fitoterapia e consapevolezza.",
    category: "Nutrizione e benessere",
    duration: "Percorso personalizzato con visite e controlli",
    programType: "Percorso su consulenza",
    deliveryMode: "In studio",
    personalizedNote: "Piano costruito sulle esigenze e sulle abitudini personali",
    price: "Su consulenza",
    audience: [
      "Chi vuole dimagrire senza diete drastiche",
      "Chi desidera migliorare energia e forma fisica",
      "Chi cerca un percorso sostenibile nel tempo",
    ],
    benefitCards: [
      { icon: "activity", title: "Analisi completa", description: "Valutazione della composizione corporea e delle abitudini." },
      { icon: "leaf", title: "Piano personalizzato", description: "Indicazioni alimentari costruite sulla tua quotidianita." },
      { icon: "heart", title: "Supporto continuo", description: "Monitoraggio e motivazione durante tutto il percorso." },
      { icon: "sparkles", title: "Approccio integrato", description: "Fitoterapia e consapevolezza quando sono utili." },
    ],
    processSteps: [
      { title: "Primo contatto", description: "Raccolta delle informazioni e definizione delle esigenze." },
      { title: "Piano personalizzato", description: "Creazione di un percorso nutrizionale su misura." },
      { title: "Monitoraggio e supporto", description: "Controlli e aggiornamenti per accompagnare i risultati." },
    ],
    ctaLabel: "Prenota una consulenza",
    ctaLink: "/contatti",
    blocks: [
      {
        _type: "richTextBlock",
        title: "Il Team di Esperti",
        content: [
          {
            _type: "block",
            children: [
              {
                text: "Il nostro approccio nasce dalla collaborazione di professionisti con competenze complementari: biologa nutrizionista, specialista in motivazione e farmacista fitoterapeuta.",
              },
            ],
          },
        ],
      },
      {
        _type: "richTextBlock",
        title: "Aree di Competenza",
        content: [
          {
            _type: "block",
            children: [
              {
                text: "I programmi si adattano a gestione del peso, malattie metaboliche e croniche, disturbi gastrointestinali, salute femminile, salute urinaria, intolleranze alimentari, cellulite, pelle e strategie anti-aging.",
              },
            ],
          },
        ],
      },
      {
        _type: "richTextBlock",
        title: "Pianificazione visite e controlli",
        content: [
          {
            _type: "block",
            children: [
              {
                text: "Il percorso prevede una prima visita di 60 minuti con valutazione completa e analisi bioimpedenziometrica BIA, seguita da controlli periodici di 30 minuti per monitorare i progressi.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Nutrizione Integrata a Milano | La Speziale",
      description:
        "Percorso di nutrizione integrata a Milano con alimentazione personalizzata, fitoterapia, analisi corporea e supporto motivazionale.",
    },
  },
  {
    title: "Fitoterapia Erbe officinali e Nutraceutici",
    slug: "fitoterapia-erbe-officinali-nutraceutici",
    order: 2,
    imageUrl: "/assets/old-site/fitoterapia.jpg",
    heroImageUrl: "/assets/old-site/fitoterapia.jpg",
    excerpt:
      "Un percorso naturale pensato per depurare, riequilibrare e mantenere il benessere, integrando erbe officinali e nutraceutici selezionati.",
    category: "Fitoterapia",
    benefitCards: [
      { icon: "leaf", title: "Supporto a energia e vitalita", description: "Un sostegno naturale costruito sulle esigenze personali." },
      { icon: "heart", title: "Approccio naturale e personalizzato", description: "Indicazioni selezionate in base al percorso individuale." },
      { icon: "activity", title: "Integrazione con il percorso alimentare", description: "Un lavoro coordinato con alimentazione e stile di vita." },
    ],
    ctaLabel: "Scopri di piu",
    ctaLink: "/contatti",
  },
  {
    title: "Gestione del peso, cellulite e ricomposizione corporea",
    slug: "gestione-peso-ricomposizione-corporea",
    order: 3,
    imageUrl: "/assets/old-site/gestione-peso.jpg",
    heroImageUrl: "/assets/old-site/gestione-peso.jpg",
    excerpt:
      "Un percorso personalizzato per ridurre la massa grassa, migliorare la composizione corporea e valorizzare la silhouette, senza rinunce e con risultati duraturi.",
    category: "Area clinica",
    duration: "Percorso personalizzato",
    programType: "Percorso con dieta e consulenza",
    deliveryMode: "Online o in studio",
    personalizedNote: "Piano alimentare e monitoraggio costruiti sulle tue esigenze",
    audience: [
      "Chi desidera perdere peso senza diete drastiche",
      "Chi vuole migliorare composizione corporea e tono",
      "Chi cerca un metodo sostenibile e monitorabile",
    ],
    descriptionTitle: "Il percorso",
    description: [
      {
        _type: "block",
        children: [
          {
            text: "Il percorso combina educazione alimentare, piano personalizzato, monitoraggio e lettura delle abitudini quotidiane per rendere il cambiamento concreto e sostenibile.",
          },
        ],
      },
    ],
    benefitCards: [
      { icon: "scale", title: "Gestione del peso", description: "Obiettivi realistici e progressivi, senza rigidita inutili." },
      { icon: "activity", title: "Ricomposizione corporea", description: "Lavoro su massa magra, energia e forma fisica." },
      { icon: "heart", title: "Abitudini sostenibili", description: "Strategie compatibili con routine, lavoro e vita sociale." },
      { icon: "target", title: "Monitoraggio", description: "Follow-up per leggere i progressi e aggiornare il piano." },
    ],
    processSteps: [
      { title: "Analisi iniziale", description: "Valutazione di abitudini, obiettivi e composizione corporea." },
      { title: "Piano personalizzato", description: "Costruzione di una strategia alimentare concreta e sostenibile." },
      { title: "Follow-up", description: "Controlli e aggiornamenti per consolidare i risultati." },
    ],
    ctaLabel: "Prenota una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Gestione del Peso e Ricomposizione Corporea | La Speziale Milano",
      description:
        "Percorso nutrizionale a Milano per gestione del peso, ricomposizione corporea e abitudini alimentari sostenibili.",
    },
  },
  {
    title: "Gonfiore e disturbi intestinali",
    slug: "gonfiore-disturbi-intestinali",
    order: 4,
    imageUrl: "/assets/old-site/gonfiore-intestinale.jpg",
    heroImageUrl: "/assets/old-site/gonfiore-intestinale.jpg",
    excerpt:
      "Un percorso dedicato a digestione, gonfiore e funzionalita intestinale per aiutare il tuo organismo a ritrovare regolarita e leggerezza.",
    category: "Area clinica",
    duration: "Percorso personalizzato",
    programType: "Percorso con dieta e consulenza",
    deliveryMode: "Online o in studio",
    personalizedNote: "Indicazioni costruite su abitudini, sintomi e stile di vita",
    audience: [
      "Chi convive con gonfiore addominale frequente",
      "Chi nota digestione lenta, tensione o fastidi dopo i pasti",
      "Chi vuole capire il rapporto tra alimentazione, intestino e benessere quotidiano",
    ],
    descriptionTitle: "Il percorso",
    description: [
      {
        _type: "block",
        children: [
          {
            text: "Il percorso aiuta a leggere i segnali intestinali, riconoscere abitudini e alimenti critici e costruire una strategia alimentare concreta per ridurre gonfiore, pesantezza e disagio digestivo.",
          },
        ],
      },
    ],
    benefitCards: [
      { icon: "leaf", title: "Meno gonfiore", description: "Indicazioni mirate per ridurre tensione addominale e pesantezza." },
      { icon: "activity", title: "Digestione piu leggera", description: "Strategie pratiche per pasti, ritmo alimentare e combinazioni." },
      { icon: "heart", title: "Benessere intestinale", description: "Un lavoro sulle abitudini che influenzano comfort e regolarita." },
      { icon: "target", title: "Maggiore chiarezza", description: "Monitoraggio per capire cosa sostiene davvero il tuo equilibrio." },
    ],
    processSteps: [
      { title: "Analisi dei sintomi", description: "Raccogliamo frequenza, contesto e andamento dei fastidi intestinali." },
      { title: "Lettura delle abitudini", description: "Valutiamo pasti, orari, idratazione, stress e stile di vita." },
      { title: "Piano personalizzato", description: "Costruiamo una strategia alimentare sostenibile e progressiva." },
      { title: "Monitoraggio", description: "Adattiamo il percorso in base alla risposta del corpo." },
    ],
    ctaLabel: "Richiedi una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Gonfiore e disturbi intestinali | La Speziale Milano",
      description:
        "Percorso nutrizionale a Milano per gonfiore, digestione lenta, irregolarita intestinale e benessere addominale.",
    },
  },
  {
    title: "Le fasi della donna",
    slug: "menopausa-premenopausa",
    order: 5,
    imageUrl: "/assets/old-site/menopausa-premenopausa.jpg",
    heroImageUrl: "/assets/old-site/menopausa-premenopausa.jpg",
    excerpt:
      "PCOS, endometriosi, ciclo irregolare, fertilita, premenopausa e menopausa: un progetto che accompagna il corpo nelle diverse fasi della vita, adattandosi ai suoi nuovi bisogni.",
    category: "Benessere femminile",
    duration: "Percorso personalizzato",
    programType: "Percorso su consulenza",
    deliveryMode: "Online o in studio",
    personalizedNote: "Piano su misura in base alle tue esigenze",
    audience: ["Donne in premenopausa", "Donne in menopausa", "Donne che vogliono prevenire disturbi legati ai cambiamenti ormonali"],
    descriptionTitle: "Il percorso",
    description: [
      {
        _type: "block",
        children: [{ text: "Ogni donna vive la menopausa in modo diverso. Questo percorso e pensato per affrontare il cambiamento con piu energia, equilibrio e serenita, riducendo i sintomi e migliorando il benessere generale." }],
      },
    ],
    benefitCards: [
      { icon: "leaf", title: "Sostegno metabolico", description: "Migliora energia e metabolismo in modo naturale." },
      { icon: "scale", title: "Gestione dei sintomi", description: "Riduce disturbi come vampate, gonfiore e insonnia." },
      { icon: "heart", title: "Equilibrio ormonale ed emotivo", description: "Favorisce benessere ormonale e stabilita emotiva." },
      { icon: "activity", title: "Abitudini sostenibili", description: "Costruisce pratiche quotidiane durature nel tempo." },
    ],
    processSteps: [
      { title: "Primo contatto", description: "Raccolta delle informazioni e analisi delle tue esigenze." },
      { title: "Piano personalizzato", description: "Creazione di un piano nutrizionale su misura per te." },
      { title: "Monitoraggio e supporto", description: "Ti accompagniamo passo dopo passo verso i tuoi obiettivi." },
    ],
    faqs: [
      { question: "Quanto dura il percorso?", answer: "La durata viene definita in base alle esigenze e agli obiettivi personali." },
      { question: "Il piano alimentare e rigido?", answer: "No. Il piano e costruito per adattarsi alla quotidianita e favorire abitudini sostenibili." },
      { question: "E incluso il supporto via WhatsApp?", answer: "Le modalita di supporto vengono concordate durante la consulenza." },
      { question: "Posso fare il percorso online?", answer: "Si, il percorso puo essere svolto online o in studio." },
    ],
    finalCtaTitle: "Vuoi iniziare il percorso Menopausa & Premenopausa?",
    finalCtaText: "Scrivimi su WhatsApp o inviami una email per ricevere maggiori informazioni e prenotare la tua consulenza.",
    ctaLabel: "Scopri di piu",
    ctaLink: "/contatti",
    seo: {
      title: "Menopausa e Premenopausa a Milano | La Speziale",
      description:
        "Percorso nutrizionale per menopausa e premenopausa con alimentazione mirata, prevenzione e benessere quotidiano.",
    },
  },
  {
    title: "Longevita e Vitalita",
    slug: "programma-anti-age",
    order: 6,
    imageUrl: "/assets/old-site/anti-age.png",
    heroImageUrl: "/assets/old-site/anti-age.png",
    excerpt:
      "Un percorso dedicato a mantenere energia, forza, tono muscolare e vitalita, per vivere ogni fase della vita con maggiore equilibrio.",
    category: "Anti-age",
    benefitCards: [
      { icon: "sparkles", title: "Prevenzione e vitalita", description: "Strategie orientate al benessere nel tempo." },
      { icon: "heart", title: "Routine alimentari sostenibili", description: "Abitudini concrete da integrare nella quotidianita." },
      { icon: "leaf", title: "Supporto antinfiammatorio", description: "Scelte alimentari coerenti con gli obiettivi personali." },
    ],
    ctaLabel: "Richiedi informazioni",
    ctaLink: "/contatti",
  },
  {
    title: "Nutrizione Sportiva",
    slug: "nutrizione-sportiva",
    order: 7,
    imageUrl: "/assets/old-site/sport.jpg",
    heroImageUrl: "/assets/old-site/sport.jpg",
    excerpt:
      "Un'alimentazione personalizzata per migliorare composizione corporea, recupero ed energia, sostenendo ogni obiettivo sportivo.",
    category: "Sport",
    benefitCards: [
      { icon: "dumbbell", title: "Energia per l'allenamento", description: "Nutrizione organizzata in funzione dell'attivita sportiva." },
      { icon: "activity", title: "Recupero migliore", description: "Indicazioni per sostenere recupero e composizione corporea." },
      { icon: "target", title: "Strategie pratiche", description: "Pasti e idratazione adattati a ritmi e obiettivi." },
    ],
    ctaLabel: "Prenota una consulenza",
    ctaLink: "/contatti",
  },
  {
    title: "Consapevolezza e Motivazione",
    slug: "consapevolezza-motivazione",
    order: 6,
    imageUrl: "/assets/old-site/consapevolezza.png",
    heroImageUrl: "/assets/old-site/consapevolezza.png",
    excerpt:
      "Supporto motivazionale e strumenti di consapevolezza corporea per trasformare le abitudini con gradualita.",
    category: "Coaching alimentare",
    benefitCards: [
      { icon: "target", title: "Obiettivi realistici", description: "Traguardi progressivi compatibili con la vita quotidiana." },
      { icon: "heart", title: "Maggiore consapevolezza", description: "Strumenti per riconoscere abitudini e segnali del corpo." },
      { icon: "activity", title: "Continuita nel tempo", description: "Un supporto pensato per rendere stabile il cambiamento." },
    ],
    ctaLabel: "Inizia il percorso",
    ctaLink: "/contatti",
  },
];

const legacyProgramSlugAliases: Record<string, string> = {
  "anti-age": "programma-anti-age",
  "menopausa-e-premenopausa": "menopausa-premenopausa",
  "gonfiore-digestione-lenta": "gonfiore-disturbi-intestinali",
};

const activeProgramSlugs = new Set([
  "gestione-peso-ricomposizione-corporea",
  "gonfiore-disturbi-intestinali",
  "menopausa-premenopausa",
  "programma-anti-age",
  "nutrizione-sportiva",
]);

function portableTextBlocks(paragraphs: string[], keyPrefix: string): unknown[] {
  return paragraphs.map((text, index) => ({
    _type: "block",
    _key: `${keyPrefix}-${index + 1}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${keyPrefix}-${index + 1}-span`, marks: [], text }],
  }));
}

function editorialBlocks(sections: [string, string[]][]): unknown[] {
  return sections.map(([title, paragraphs], index) => ({
    _type: "richTextBlock",
    _key: `program-editorial-${index + 1}`,
    title,
    content: portableTextBlocks(paragraphs, `program-editorial-${index + 1}`),
  }));
}

const clientProgramContentOverrides: Record<string, Partial<Program>> = {
  "gestione-peso-ricomposizione-corporea": {
    title: "Gestione del Peso e Ricomposizione Corporea",
    excerpt: "Perdere peso, aumentare la massa muscolare o ritrovare la propria forma fisica significa seguire un progetto costruito sulla persona, dove ogni scelta lavora nella stessa direzione.",
    category: "Gestione del peso e ricomposizione corporea",
    descriptionTitle: "Ogni corpo cambia in modo diverso. Anche il progetto deve esserlo.",
    description: portableTextBlocks([
      "Perdere peso e spesso l'obiettivo. Comprendere perche il corpo e cambiato e il punto di partenza.",
      "Metabolismo, composizione corporea, stile di vita, cambiamenti ormonali e abitudini influenzano il modo in cui ogni persona aumenta o perde peso.",
      "Per questo il nostro lavoro non inizia dalla dieta, ma dalla comprensione della persona e delle reali esigenze del suo corpo.",
    ], "peso-description"),
    audienceTitle: "Ti riconosci in una di queste situazioni?",
    audience: [
      "Hai provato diverse diete senza riuscire a mantenere i risultati.",
      "Fai fatica a perdere peso.",
      "Il metabolismo sembra rallentato.",
      "Desideri ridurre la massa grassa.",
      "Vuoi migliorare cellulite e ritenzione.",
      "Hai perso tono muscolare.",
      "Vorresti aumentare la massa muscolare in modo equilibrato.",
      "Cerchi un cambiamento stabile e non una soluzione temporanea.",
    ],
    processTitle: "Come prende forma il progetto",
    processSteps: [
      { _key: "peso-step-1", title: "Conosciamo la persona", description: "Partiamo dalla tua storia, dalle abitudini, dallo stile di vita e dagli obiettivi che desideri raggiungere." },
      { _key: "peso-step-2", title: "Conosciamo il tuo corpo", description: "L'esame BIA analizza massa grassa, massa muscolare, stato di idratazione e composizione corporea, offrendo informazioni che il peso, da solo, non puo raccontare." },
      { _key: "peso-step-3", title: "Costruiamo la strategia", description: "Definiamo un progetto personalizzato che stabilisce priorita, strumenti e obiettivi, adattandosi alle caratteristiche della persona." },
      { _key: "peso-step-4", title: "Accompagniamo il cambiamento", description: "Monitoriamo l'evoluzione della composizione corporea e aggiorniamo il progetto affinche continui a seguire i cambiamenti del tuo corpo e i risultati raggiunti." },
    ],
    benefitsTitle: "Il risultato",
    benefitCards: [
      { _key: "peso-benefit-1", icon: "scale", title: "Oltre il peso", description: "Il risultato non e soltanto perdere peso. E ritrovare il proprio equilibrio." },
      { _key: "peso-benefit-2", icon: "activity", title: "Composizione corporea", description: "L'obiettivo e migliorare la composizione corporea, ridurre la massa grassa quando necessario e valorizzare la forma fisica." },
      { _key: "peso-benefit-3", icon: "target", title: "Risultati mantenibili", description: "Costruiamo abitudini che permettano di mantenere i risultati nel tempo, oltre cio che si vede sulla bilancia." },
    ],
    blocks: editorialBlocks([
      ["Cosa significa progettare il cambiamento", [
        "Progettare il cambiamento significa costruire una strategia nella quale ogni scelta ha uno scopo preciso.",
        "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico e da un supporto dedicato al cambiamento, affinche tutto lavori nella stessa direzione.",
        "Non sono interventi separati, ma parti di un unico progetto costruito sulla persona.",
        "E questa regia che rende il Metodo La Speziale diverso da un percorso nutrizionale tradizionale.",
      ]],
    ]),
    finalCtaTitle: "Ogni corpo ha una storia diversa. Anche il modo di raggiungere il risultato deve esserlo.",
    finalCtaText: "Raccontaci il cambiamento che desideri ottenere: costruiremo insieme un progetto personalizzato per aiutarti a raggiungerlo e mantenerlo nel tempo.",
    ctaLabel: "Richiedi una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Gestione del peso e ricomposizione corporea | La Speziale Milano",
      description: "Un progetto per perdere peso, aumentare massa muscolare, migliorare tono, cellulite, ritenzione e silhouette con il Metodo La Speziale.",
    },
  },
  "gonfiore-disturbi-intestinali": {
    title: "Gonfiore e disturbi intestinali",
    excerpt: "Un progetto dedicato a chi desidera ritrovare un intestino piu equilibrato, una digestione serena e una migliore qualita di vita.",
    category: "Gonfiore e disturbi intestinali",
    descriptionTitle: "Ogni intestino e diverso. Anche il progetto deve esserlo.",
    description: portableTextBlocks([
      "Il gonfiore e solo uno dei segnali che l'intestino puo inviare.",
      "Digestione, alimentazione, stile di vita, microbiota e caratteristiche della persona sono strettamente collegati e si influenzano a vicenda.",
      "Per questo il nostro obiettivo non e intervenire sul singolo sintomo, ma costruire un progetto capace di aiutare l'intestino a ritrovare un equilibrio piu stabile e duraturo.",
    ], "intestino-description"),
    audienceTitle: "Ti riconosci in uno di questi problemi?",
    audience: [
      "Gonfiore addominale frequente.",
      "Pancia tesa anche mangiando poco.",
      "Digestione lenta o senso di pesantezza.",
      "Reflusso o acidita.",
      "Stitichezza, diarrea o intestino irregolare.",
      "Ti hanno parlato di disbiosi o di un'alterazione del microbiota intestinale.",
      "Hai gia provato fermenti lattici o probiotici senza ottenere un miglioramento stabile.",
      "Vorresti ritrovare leggerezza e vivere i pasti con maggiore serenita.",
    ],
    processTitle: "Come prende forma il progetto",
    processSteps: [
      { _key: "intestino-step-1", title: "Comprendiamo il problema", description: "Partiamo dai sintomi, dalle abitudini e dalla tua storia per capire come il disturbo influisce sulla vita quotidiana." },
      { _key: "intestino-step-2", title: "Individuiamo cio che influenza l'equilibrio intestinale", description: "Valutiamo alimentazione, digestione, microbiota, ritmo intestinale e tutti quei fattori che possono contribuire al problema." },
      { _key: "intestino-step-3", title: "Organizziamo la strategia", description: "Ogni intervento viene inserito in un progetto coordinato, affinche alimentazione, eventuale consiglio fitoterapico e indicazioni pratiche lavorino nella stessa direzione." },
      { _key: "intestino-step-4", title: "Seguiamo l'evoluzione", description: "Monitoriamo i cambiamenti e adattiamo il progetto in base alla risposta dell'intestino e ai risultati ottenuti." },
    ],
    benefitsTitle: "Il risultato",
    benefitCards: [
      { _key: "intestino-benefit-1", icon: "leaf", title: "Un equilibrio piu stabile", description: "Quando l'intestino ritrova il suo equilibrio, cambia anche il modo di vivere ogni giornata." },
      { _key: "intestino-benefit-2", icon: "heart", title: "Pasti piu sereni", description: "Mangiare con serenita, sentirsi piu leggeri, ritrovare regolarita e benessere significa migliorare non solo la digestione, ma la qualita della vita." },
      { _key: "intestino-benefit-3", icon: "target", title: "Benessere nel tempo", description: "L'obiettivo e costruire un equilibrio che possa accompagnarti nel tempo." },
    ],
    blocks: editorialBlocks([["Cosa significa riequilibrare l'intestino", [
      "Riequilibrare l'intestino non significa eliminare soltanto il gonfiore.",
      "Significa comprendere le cause che influenzano il suo funzionamento e costruire una strategia nella quale ogni scelta segue la stessa direzione.",
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico, affinche tutto il progetto lavori verso un unico obiettivo: favorire un intestino piu equilibrato e una migliore qualita della vita.",
    ]]]),
    finalCtaTitle: "Ogni intestino ha una storia diversa. Iniziamo dalla tua.",
    finalCtaText: "Raccontaci i sintomi che stai vivendo: insieme costruiremo un progetto per aiutare il tuo intestino a ritrovare equilibrio, leggerezza e benessere.",
    ctaLabel: "Richiedi una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Gonfiore e disturbi intestinali | La Speziale Milano",
      description: "Un progetto per gonfiore addominale, digestione lenta, reflusso, acidita, microbiota e benessere intestinale.",
    },
  },
  "menopausa-premenopausa": {
    title: "Le Fasi della Donna",
    excerpt: "PCOS, endometriosi, ciclo irregolare, sindrome premestruale, fertilita, premenopausa e menopausa.",
    category: "Le fasi della donna",
    descriptionTitle: "Ogni fase porta nuove esigenze. Anche il progetto deve evolvere.",
    description: portableTextBlocks([
      "Nel corso della vita il corpo della donna attraversa cambiamenti che possono influenzare metabolismo, peso, energia, digestione, composizione corporea e benessere generale.",
      "Per questo non proponiamo un programma uguale per tutte, ma un progetto che si adatta alla fase che stai vivendo, accompagnando il corpo nelle sue nuove esigenze.",
    ], "donna-description"),
    audienceTitle: "Ti riconosci in una di queste situazioni?",
    audience: [
      "Sindrome dell'ovaio policistico (PCOS).",
      "Endometriosi.",
      "Ciclo irregolare o assente.",
      "Sindrome premestruale.",
      "Ricerca di una gravidanza.",
      "Premenopausa.",
      "Menopausa.",
      "Aumento di peso, gonfiore o difficolta a ritrovare il proprio equilibrio.",
      "Cambiamenti della composizione corporea.",
      "Stanchezza, calo di energia o difficolta ad adattarsi ai cambiamenti del corpo.",
    ],
    processTitle: "Come prende forma il progetto",
    processSteps: [
      { _key: "donna-step-1", title: "Comprendiamo il momento che stai vivendo", description: "Ogni fase della vita ha caratteristiche e bisogni diversi. Partiamo dalla tua storia, dai cambiamenti che stai vivendo e dagli obiettivi che desideri raggiungere." },
      { _key: "donna-step-2", title: "Osserviamo il corpo nel suo insieme", description: "Valutiamo alimentazione, composizione corporea, stile di vita e tutti gli elementi che possono influenzare il tuo benessere in questa fase della vita." },
      { _key: "donna-step-3", title: "Costruiamo la strategia", description: "Ogni scelta viene inserita in un progetto che evolve insieme al tuo corpo, integrando alimentazione, eventuale consiglio fitoterapico e strumenti pratici quando possono offrire un reale beneficio." },
      { _key: "donna-step-4", title: "Accompagniamo il cambiamento", description: "Il progetto viene adattato nel tempo, seguendo l'evoluzione del corpo e delle sue nuove esigenze." },
    ],
    benefitsTitle: "Ogni fase ha obiettivi diversi",
    benefitCards: [
      { _key: "donna-benefit-1", icon: "heart", title: "Adolescenza ed eta fertile", description: "Favorire un'alimentazione che accompagni il corretto equilibrio del corpo e sostenga le diverse esigenze della donna." },
      { _key: "donna-benefit-2", icon: "shield", title: "PCOS, endometriosi e ciclo", description: "Affrontare le difficolta legate a queste condizioni con un progetto nutrizionale costruito sulla persona e sul momento che sta vivendo." },
      { _key: "donna-benefit-3", icon: "activity", title: "Premenopausa e menopausa", description: "Accompagnare il corpo nei cambiamenti che interessano metabolismo, composizione corporea, energia e qualita della vita." },
    ],
    blocks: editorialBlocks([
      ["Cosa significa accompagnare il cambiamento", [
        "Ogni fase della vita presenta esigenze diverse e merita un approccio personalizzato.",
        "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico, affinche ogni scelta lavori nella stessa direzione.",
        "L'obiettivo non e affrontare soltanto il sintomo o il cambiamento del momento, ma accompagnare il corpo nel ritrovare un nuovo equilibrio.",
      ]],
      ["Il risultato", [
        "Ogni fase puo diventare un nuovo equilibrio, non un limite.",
        "Il nostro obiettivo e aiutarti a comprendere il tuo corpo, accompagnarne i cambiamenti e ritrovare benessere, energia e una forma fisica in sintonia con la fase della vita che stai vivendo.",
      ]],
    ]),
    finalCtaTitle: "Ogni fase della vita merita di essere vissuta al meglio.",
    finalCtaText: "Raccontaci il momento che stai attraversando: insieme costruiremo un progetto capace di accompagnare il tuo corpo nelle sue nuove esigenze.",
    ctaLabel: "Richiedi una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Le Fasi della Donna | La Speziale Milano",
      description: "Percorso per PCOS, endometriosi, ciclo irregolare, fertilita, premenopausa, menopausa e cambiamenti del corpo femminile.",
    },
  },
  "programma-anti-age": {
    title: "Longevita e Vitalita",
    excerpt: "Un progetto dedicato a chi desidera preservare energia, tono muscolare, vitalita e qualita della vita attraverso la nutrizione e uno stile di vita orientato alla longevita.",
    category: "Longevita e vitalita",
    descriptionTitle: "La longevita significa preparare il corpo al futuro.",
    description: portableTextBlocks([
      "Prendersi cura del proprio corpo non significa inseguire la giovinezza, ma aiutarlo a mantenere nel tempo cio che lo fa stare bene.",
      "Energia, massa muscolare, metabolismo, composizione corporea e vitalita cambiano con gli anni.",
      "Per questo il nostro progetto nasce per accompagnare questi cambiamenti e aiutare il corpo a conservarne il potenziale piu a lungo.",
    ], "longevita-description"),
    audienceTitle: "Ti riconosci in una di queste situazioni?",
    audience: [
      "Ti senti meno energico rispetto a qualche anno fa.",
      "Hai notato una perdita di tono muscolare.",
      "Il metabolismo e cambiato.",
      "Vuoi prenderti cura del tuo corpo in modo preventivo.",
      "Desideri mantenere forza, vitalita e autonomia nel tempo.",
      "Vorresti sostenere pelle, capelli e unghie anche attraverso l'alimentazione.",
      "Cerchi un approccio orientato alla prevenzione e alla qualita della vita.",
      "Vuoi invecchiare bene, non semplicemente invecchiare.",
    ],
    processTitle: "Come prende forma il progetto",
    processSteps: [
      { _key: "longevita-step-1", title: "Conosciamo il tuo punto di partenza", description: "Valutiamo composizione corporea, abitudini e obiettivi per comprendere quali aspetti preservare e quali migliorare." },
      { _key: "longevita-step-2", title: "Individuiamo le priorita", description: "Ogni persona ha esigenze diverse: energia, tono muscolare, metabolismo, prevenzione o qualita della vita." },
      { _key: "longevita-step-3", title: "Costruiamo la strategia", description: "Ogni intervento viene inserito in un progetto orientato a sostenere il corpo nel tempo, favorendo un equilibrio duraturo." },
      { _key: "longevita-step-4", title: "Accompagniamo l'evoluzione", description: "Il progetto viene adattato nel tempo per accompagnare i cambiamenti naturali del corpo e mantenerne il benessere." },
    ],
    benefitsTitle: "Il risultato",
    benefitCards: [
      { _key: "longevita-benefit-1", icon: "sparkles", title: "Come vivi il tempo", description: "La longevita non si misura in anni. Si misura in come li vivi." },
      { _key: "longevita-benefit-2", icon: "heart", title: "Energia e autonomia", description: "Il nostro obiettivo e aiutarti a mantenere energia, forza, autonomia e benessere." },
      { _key: "longevita-benefit-3", icon: "target", title: "Il tempo come alleato", description: "Il progetto aiuta il corpo a mantenere il proprio equilibrio il piu a lungo possibile, affinche il tempo diventi un alleato e non un limite." },
    ],
    blocks: editorialBlocks([["Cosa significa prendersi cura del futuro", [
      "Prendersi cura del proprio corpo significa fare oggi scelte che possano fare la differenza anche domani.",
      "L'alimentazione rappresenta il punto di partenza, ma quando necessario puo essere affiancata dal consiglio fitoterapico, affinche ogni scelta contribuisca a preservare energia, forza e qualita della vita.",
      "L'obiettivo non e fermare il tempo, ma aiutare il corpo a mantenere il proprio equilibrio il piu a lungo possibile.",
    ]]]),
    finalCtaTitle: "Prendersi cura del futuro del tuo corpo inizia dalle scelte di oggi.",
    finalCtaText: "Insieme costruiremo un progetto orientato a preservare vitalita, equilibrio e qualita della vita negli anni.",
    ctaLabel: "Richiedi una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Longevita e Vitalita | La Speziale Milano",
      description: "Un progetto per preservare energia, tono muscolare, vitalita, autonomia e qualita della vita nel tempo.",
    },
  },
  "nutrizione-sportiva": {
    title: "Nutrizione Sportiva",
    excerpt: "Un progetto dedicato a chi pratica attivita fisica e desidera migliorare performance, recupero, composizione corporea ed energia attraverso una nutrizione realmente integrata.",
    category: "Nutrizione sportiva",
    descriptionTitle: "Ogni allenamento stimola il corpo. Il nostro progetto lo aiuta a rispondere.",
    description: portableTextBlocks([
      "Allenarsi non significa soltanto consumare energia.",
      "Ogni disciplina richiede strategie nutrizionali diverse per sostenere performance, recupero e adattamento fisico.",
      "Per questo sviluppiamo un progetto che accompagna il tuo allenamento, aiutando il corpo a utilizzare al meglio le proprie risorse prima, durante e dopo l'attivita sportiva.",
    ], "sport-description"),
    audienceTitle: "Ti riconosci in uno di questi obiettivi?",
    audience: [
      "Migliorare la performance sportiva.",
      "Ottimizzare il recupero dopo l'allenamento.",
      "Aumentare la massa muscolare.",
      "Ridurre la massa grassa mantenendo la performance.",
      "Preparare una gara o una competizione.",
      "Evitare cali di energia durante l'attivita fisica.",
      "Alimentarti in modo corretto in base allo sport che pratichi.",
      "Ottenere risultati piu efficaci dal tuo allenamento.",
    ],
    processTitle: "Come prende forma il progetto",
    processSteps: [
      { _key: "sport-step-1", title: "Conosciamo il tuo sport", description: "Partiamo dalla disciplina praticata, dalla frequenza degli allenamenti, dagli obiettivi e dalle caratteristiche del tuo corpo." },
      { _key: "sport-step-2", title: "Valutiamo il punto di partenza", description: "Analizziamo composizione corporea, alimentazione, recupero e fabbisogni energetici." },
      { _key: "sport-step-3", title: "Organizziamo la strategia", description: "Costruiamo un progetto nutrizionale che accompagna allenamenti, recupero e obiettivi sportivi, integrando eventuali supporti solo quando possono offrire un reale vantaggio." },
      { _key: "sport-step-4", title: "Adattiamo il programma", description: "Il progetto evolve insieme alla preparazione atletica, ai risultati e ai nuovi obiettivi." },
    ],
    benefitsTitle: "Il risultato",
    benefitCards: [
      { _key: "sport-benefit-1", icon: "dumbbell", title: "Performance e recupero", description: "Quando alimentazione, recupero e allenamento lavorano nella stessa direzione, il corpo puo esprimere meglio il proprio potenziale." },
      { _key: "sport-benefit-2", icon: "activity", title: "Continuita negli allenamenti", description: "L'obiettivo e costruire un equilibrio che permetta di allenarsi con continuita e recuperare piu efficacemente." },
      { _key: "sport-benefit-3", icon: "target", title: "Risultati duraturi", description: "Non soltanto ottenere una prestazione migliore, ma raggiungere risultati duraturi." },
    ],
    blocks: editorialBlocks([
      ["Cosa significa nutrire la performance", [
        "Una buona alimentazione non serve soltanto a sostenere l'allenamento.",
        "Significa fornire al corpo cio di cui ha bisogno per affrontare lo sforzo, recuperare in modo efficace e adattarsi progressivamente al lavoro svolto.",
        "Quando necessario, il progetto puo essere affiancato dal consiglio fitoterapico, affinche ogni scelta contribuisca a sostenere gli obiettivi sportivi e il benessere dell'organismo.",
      ]],
      ["Il risultato", [
        "Allenarsi di piu non sempre significa migliorare di piu.",
        "Quando alimentazione, recupero e allenamento lavorano nella stessa direzione, il corpo puo esprimere meglio il proprio potenziale.",
        "L'obiettivo non e soltanto ottenere una prestazione migliore, ma costruire un equilibrio che permetta di allenarsi con continuita, recuperare piu efficacemente e raggiungere risultati duraturi.",
      ]],
    ]),
    finalCtaTitle: "Ogni obiettivo sportivo merita una strategia costruita sulla persona.",
    finalCtaText: "Raccontaci lo sport che pratichi e il risultato che desideri raggiungere: costruiremo un progetto capace di accompagnare il tuo allenamento e valorizzare il lavoro che fai ogni giorno.",
    ctaLabel: "Richiedi una consulenza",
    ctaLink: "/contatti",
    seo: {
      title: "Nutrizione Sportiva | La Speziale Milano",
      description: "Un progetto di nutrizione sportiva per performance, recupero, composizione corporea, energia e obiettivi atletici.",
    },
  },
};

const activeProductSlugs = new Set([
  "drenaspeziale-tisana-betulla-pilosella",
  "estratto-idroalcolico-puro-tarassaco",
  "sollievogambe-gel-freddo-ippocastano",
  "capsule-mirtillo-nero-concentrato",
  "melatospeziale-gocce-escolzia-valeriana-passiflora",
  "ashwagandha-adattogena-ksm-66",
  "tisana-finocchio-melissa-bio",
  "enzimi-digestivi-naturali-zenzero",
  "agnocasto-estratto-secco",
  "olio-enotera-spremuto-freddo",
  "tonico-rodiola-rosea-pappa-reale",
  "tavolette-spirulina-bio",
  "echinacea-rosa-canina-concentrata",
  "estratto-sambuco-zinco",
  "resveratrolo-puro-concentrato",
  "coenzima-q10-vegetale-alto-dosaggio",
]);

const flowHeroUrl = "/assets/old-site/hero-movimento.png";
const retiredHeroImageFragments = [
  "hero-bright-wellbeing.png",
  "9e5a84ac52e56e73b4a8473edc2b321972b8f28e",
];

function canonicalProgramSlug(slug: string) {
  return legacyProgramSlugAliases[slug] || slug;
}

function mergeDefined<T extends object>(fallback: T, content: Partial<T>): T {
  const definedContent = Object.fromEntries(
    Object.entries(content).filter(([, value]) => value !== null && value !== undefined),
  ) as Partial<T>;

  return {...fallback, ...definedContent};
}

function mergeProgramsPage(page: ProgramsPage | null): ProgramsPage {
  if (!page) return fallbackProgramsPage;

  const merged = mergeDefined(fallbackProgramsPage, page);
  return {
    ...merged,
    heroImageUrl: replaceRetiredHeroImage(merged.heroImageUrl),
    cta: page.cta
      ? mergeDefined(fallbackProgramsPage.cta || {}, page.cta)
      : fallbackProgramsPage.cta,
    seo: page.seo
      ? replaceRetiredSeoImage(mergeDefined(fallbackProgramsPage.seo || {}, page.seo))
      : fallbackProgramsPage.seo,
  };
}

function applyProgramContentOverride(program: Program): Program {
  const override = clientProgramContentOverrides[program.slug];
  if (!override) return program;

  return {
    ...program,
    ...override,
    slug: program.slug,
    imageUrl: override.imageUrl || program.imageUrl,
    heroImageUrl: override.heroImageUrl || program.heroImageUrl,
    seo: mergeSeo(program.seo, override.seo),
  };
}

function mergePrograms(contentPrograms: Program[] | null): Program[] {
  if (contentPrograms === null) {
    return fallbackPrograms.map(applyProgramContentOverride).filter((program) => activeProgramSlugs.has(program.slug));
  }

  const mergedPrograms = contentPrograms
    .filter((program) => program.slug)
    .map((program) => {
      const canonicalSlug = canonicalProgramSlug(program.slug);
      const fallback = fallbackPrograms.find((item) => item.slug === canonicalSlug);

      if (!fallback) return applyProgramContentOverride(program);

      return applyProgramContentOverride(
        mergeDefined(fallback, {
          ...program,
          imageUrl: replaceRetiredHeroImage(program.imageUrl),
          heroImageUrl: replaceRetiredHeroImage(program.heroImageUrl),
          seo: replaceRetiredSeoImage(program.seo),
          slug: fallback.slug,
          order: program.slug === fallback.slug ? program.order : fallback.order,
        }),
      );
    });

  const requiredFallbackSlugs = [
    "gestione-peso-ricomposizione-corporea",
    "gonfiore-disturbi-intestinali",
    "menopausa-premenopausa",
    "programma-anti-age",
    "nutrizione-sportiva",
  ];
  const missingRequiredFallbacks = requiredFallbackSlugs
    .filter((slug) => !mergedPrograms.some((program) => program.slug === slug))
    .map((slug) => fallbackPrograms.find((program) => program.slug === slug))
    .filter(Boolean)
    .map((program) => applyProgramContentOverride(program as Program)) as Program[];

  return [...mergedPrograms, ...missingRequiredFallbacks]
    .filter((program) => activeProgramSlugs.has(program.slug))
    .filter((program) => program.isPublished !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title, "it"));
}

function mergePageCta(fallback?: PageCta, content?: PageCta): PageCta | undefined {
  if (!content) return fallback;
  return mergeDefined(fallback || {}, content);
}

function mergeSeo(fallback?: Seo, content?: Seo): Seo | undefined {
  if (!content) return fallback;
  return mergeDefined(fallback || {}, content);
}

function portableText(text: string): unknown[] {
  const key = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);

  return [
    {
      _type: "block",
      _key: key || "paragraph",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `${key || "paragraph"}-text`, marks: [], text }],
    },
  ];
}

function replaceRetiredHeroImage(imageUrl?: string): string | undefined {
  if (!imageUrl) return imageUrl;
  return retiredHeroImageFragments.some((fragment) => imageUrl.includes(fragment)) ? flowHeroUrl : imageUrl;
}

function replaceRetiredSeoImage(seo?: Seo): Seo | undefined {
  if (!seo) return seo;
  return {
    ...seo,
    imageUrl: replaceRetiredHeroImage(seo.imageUrl),
  };
}

function mergeTestimonials(contentTestimonials: Testimonial[] | null): Testimonial[] {
  if (contentTestimonials === null) return fallbackTestimonials;

  const merged = contentTestimonials.map((item) => {
    const fallback = fallbackTestimonials.find((candidate) => candidate.name === item.name);
    return fallback ? mergeDefined(fallback, item) : item;
  });

  return merged
    .filter((item) => item.visible !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name, "it"));
}

function isActiveProduct(product: Product): boolean {
  return Boolean(product.slug && activeProductSlugs.has(product.slug));
}

function filterTherapyProducts<T extends Therapy>(therapy: T): T {
  return {
    ...therapy,
    recommendedProducts: therapy.recommendedProducts?.filter(isActiveProduct),
  };
}

export const fallbackTestimonials: Testimonial[] = [
  {
    name: "Laura M.",
    role: "Percorso Nutrizione Integrata",
    text: "Ho trovato un percorso chiaro e realistico. Non una dieta da seguire per qualche settimana, ma un metodo piu adatto alla mia vita quotidiana.",
  },
  {
    name: "Elena R.",
    role: "Percorso Menopausa e Premenopausa",
    text: "Mi sono sentita ascoltata e accompagnata passo dopo passo, con indicazioni semplici e sostenibili.",
  },
  {
    name: "Marco P.",
    role: "Nutrizione Sportiva",
    text: "Il percorso mi ha aiutato a organizzare meglio alimentazione, allenamenti e recupero senza complicare le giornate.",
  },
];

const hasSanityConfig = Boolean(projectId && dataset && apiVersion);

async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!hasSanityConfig) {
    return null;
  }

  const params = new URLSearchParams({ query });
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    return json.result as T;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings>(
    `*[_type == "siteSettings"][0] {
      siteTitle,
      "logoUrl": logo.asset->url,
      "faviconUrl": favicon.asset->url,
      email,
      phone,
      address,
      locationText,
      openingHours,
      contactText,
      whatsapp,
      instagram,
      facebook,
      footerText,
      globalCtaLabel,
      globalCtaLink,
      privacyPolicyLink,
      cookiePolicyLink,
      legalName,
      vatNumber,
      privacyEmail,
      privacyUpdatedAt,
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );

  if (!settings) return fallbackSettings;
  return {
    ...mergeDefined(fallbackSettings, settings),
    seo: mergeSeo(fallbackSettings.seo, settings.seo),
  };
}

export async function getHomepage(): Promise<Homepage> {
  const homepage = await sanityFetch<Homepage>(
    `*[_type == "homepage"][0] {
      heroTitle,
      heroSubtitle,
      "heroImageUrl": heroImage.asset->url,
      heroCtaLabel,
      heroCtaLink,
      introEyebrow,
      introTitle,
      introLead,
      introBody,
      "approachImageUrl": approachImage.asset->url,
      value1Title,
      value1Text,
      value2Title,
      value2Text,
      value3Title,
      value3Text,
      methodEyebrow,
      methodTitle,
      methodText,
      methodCoreEyebrow,
      methodCoreText,
      methodCoreLinkLabel,
      methodDietLabel,
      methodDietTitle,
      methodDietText,
      methodDietItems,
      methodPhytoLabel,
      methodPhytoTitle,
      methodPhytoText,
      methodPhytoItems,
      methodPhytoLinkLabel,
      "featuredProgramSlugs": featuredPrograms[]->slug.current,
      finalCta {
        eyebrow,
        title,
        text,
        primaryLabel,
        primaryLink,
        secondaryLabel,
        secondaryLink,
        "imageUrl": image.asset->url
      },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );

  if (!homepage) return fallbackHomepage;
  return {
    ...mergeDefined(fallbackHomepage, homepage),
    ...homepageStrategyOverrides,
    heroImageUrl: homepageStrategyOverrides.heroImageUrl || replaceRetiredHeroImage(homepage.heroImageUrl || fallbackHomepage.heroImageUrl),
    finalCta: homepageStrategyOverrides.finalCta || mergePageCta(fallbackHomepage.finalCta, homepage.finalCta),
    seo: replaceRetiredSeoImage(mergeSeo(fallbackHomepage.seo, homepage.seo)),
  };
}

export async function getMethodPage(): Promise<MethodPage> {
  const page = await sanityFetch<MethodPage>(
    `*[_type == "methodPage"][0] {
      heroEyebrow,
      heroTitle,
      heroText,
      "heroImageUrl": heroImage.asset->url,
      introTitle,
      introText,
      coreEyebrow,
      coreTitle,
      coreText,
      coreItems,
      dietTitle,
      dietText,
      phytoTitle,
      phytoText,
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (!page) return fallbackMethodPage;
  return {
    ...mergeDefined(fallbackMethodPage, page),
    heroImageUrl: replaceRetiredHeroImage(page.heroImageUrl || fallbackMethodPage.heroImageUrl),
    cta: mergePageCta(fallbackMethodPage.cta, page.cta),
    seo: replaceRetiredSeoImage(mergeSeo(fallbackMethodPage.seo, page.seo)),
  };
}

export async function getCoachingPage(): Promise<CoachingPage> {
  const page = await sanityFetch<CoachingPage>(
    `*[_type == "coachingPage"][0] {
      heroEyebrow,
      heroTitle,
      heroText,
      "heroImageUrl": heroImage.asset->url,
      introTitle,
      introText,
      audienceTitle,
      audienceItems,
      methodTitle,
      methodSteps,
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (!page) return fallbackCoachingPage;
  return {
    ...mergeDefined(fallbackCoachingPage, page),
    cta: mergePageCta(fallbackCoachingPage.cta, page.cta),
    seo: mergeSeo(fallbackCoachingPage.seo, page.seo),
  };
}

export async function getPrograms(): Promise<Program[]> {
  const programs = await sanityFetch<Program[]>(
    `*[_type == "program"] | order(order asc, title asc) {
      title,
      "slug": slug.current,
      order,
      isPublished,
      excerpt,
      "imageUrl": coverImage.asset->url,
      "heroImageUrl": coverImage.asset->url,
      category,
      duration,
      programType,
      deliveryMode,
      personalizedNote,
      price,
      purchaseUrl,
      purchaseLabel,
      audience,
      descriptionTitle,
      description,
      benefits,
      benefitCards,
      processSteps,
      showAnchorNav,
      showOverview,
      showAudience,
      showDescription,
      showBenefits,
      showProcess,
      showFaqs,
      showExtraContent,
      showFinalCta,
      showInMenu,
      isFeatured,
      ctaLabel,
      ctaLink,
      heroPrimaryLabel,
      audienceTitle,
      benefitsTitle,
      processTitle,
      faqsTitle,
      finalCtaTitle,
      finalCtaText,
      finalWhatsappLabel,
      finalEmailLabel,
      "finalCtaImageUrl": finalCtaImage.asset->url,
      seo { title, description, "imageUrl": image.asset->url },
      blocks,
      faqs
    }`,
  );

  return mergePrograms(programs);
}

export async function getProgram(slug: string): Promise<Program | undefined> {
  const canonicalSlug = canonicalProgramSlug(slug);
  const programs = await getPrograms();
  return programs.find((program) => program.slug === canonicalSlug);
}

export async function getProgramsPage(): Promise<ProgramsPage> {
  const page = await sanityFetch<ProgramsPage>(
    `*[_type == "programsPage"][0] {
      heroEyebrow,
      heroTitle,
      heroText,
      "heroImageUrl": heroImage.asset->url,
      listTitle,
      listText,
      cardButtonLabel,
      methodEyebrow,
      methodTitle,
      methodText,
      methodCoreEyebrow,
      methodCoreText,
      methodCoreLinkLabel,
      methodDietLabel,
      methodDietTitle,
      methodDietText,
      methodPhytoLabel,
      methodPhytoTitle,
      methodPhytoText,
      methodPhytoLinkLabel,
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  return mergeProgramsPage(page);
}

export async function getContactPage(): Promise<ContactPage> {
  const page = await sanityFetch<ContactPage>(
    `*[_type == "contactPage"][0] {
      heroEyebrow, heroTitle, heroText, "heroImageUrl": heroImage.asset->url,
      locationTitle, hoursTitle, hoursIntro, contactTitle,
      formTitle, formText, nameLabel, namePlaceholder, emailLabel, emailPlaceholder,
      messageLabel, messagePlaceholder, submitLabel, addressTitle, contactsTitle,
      mapLabel, mapQuery, mapUrl, "mapImageUrl": mapImage.asset->url,
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (!page) return fallbackContactPage;
  return {
    ...mergeDefined(fallbackContactPage, page),
    cta: mergePageCta(fallbackContactPage.cta, page.cta),
    seo: mergeSeo(fallbackContactPage.seo, page.seo),
  };
}

export async function getTestimonialsPage(): Promise<TestimonialsPage> {
  const page = await sanityFetch<TestimonialsPage>(
    `*[_type == "testimonialsPage"][0] {
      heroEyebrow, heroTitle, heroText, "heroImageUrl": heroImage.asset->url, sectionTitle,
      sectionText,
      showGoogleReviews, googleEyebrow, googleTitle, googleText, googleBusinessName,
      googleRating, googleReviewCount, googleReviewsUrl, googlePlaceId, googleButtonLabel,
      googleReviews[] {
        _key,
        author,
        rating,
        text,
        reviewDate,
        sourceUrl,
        "avatarUrl": avatar.asset->url,
        "avatarAlt": avatar.alt
      },
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (!page) return fallbackTestimonialsPage;
  return {
    ...mergeDefined(fallbackTestimonialsPage, page),
    cta: mergePageCta(fallbackTestimonialsPage.cta, page.cta),
    seo: mergeSeo(fallbackTestimonialsPage.seo, page.seo),
  };
}

export async function getProductsPage(): Promise<ProductsPage> {
  const page = await sanityFetch<ProductsPage>(
    `*[_type == "productsPage"][0] {
      heroEyebrow, heroTitle, heroText, "heroImageUrl": heroImage.asset->url,
      contentTitle, contentText, gridTitle, gridText, searchLabel, searchPlaceholder, emptyText, cardButtonLabel,
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (!page) return fallbackProductsPage;
  return {
    ...mergeDefined(fallbackProductsPage, page),
    cta: mergePageCta(fallbackProductsPage.cta, page.cta),
    seo: mergeSeo(fallbackProductsPage.seo, page.seo),
  };
}

export async function getTherapiesPage(): Promise<TherapiesPage> {
  const page = await sanityFetch<TherapiesPage>(
    `*[_type == "therapiesPage"][0] {
      heroEyebrow, heroTitle, heroText, "heroImageUrl": heroImage.asset->url,
      contentTitle, contentText, gridTitle, gridText, cardButtonLabel,
      cta { eyebrow, title, text, primaryLabel, primaryLink, secondaryLabel, secondaryLink, "imageUrl": image.asset->url },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (!page) return fallbackTherapiesPage;
  return {
    ...mergeDefined(fallbackTherapiesPage, page),
    cta: mergePageCta(fallbackTherapiesPage.cta, page.cta),
    seo: mergeSeo(fallbackTherapiesPage.seo, page.seo),
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await sanityFetch<Product[]>(
    `*[_type == "product" && isPublished != false] | order(order asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      price,
      purchaseUrl,
      purchaseLabel,
      "imageUrl": coverImage.asset->url,
      "imageAlt": coverImage.alt,
      tags,
      descriptionTitle,
      description,
      featuresTitle,
      features,
      ctaLabel,
      ctaLink,
      "relatedTherapies": *[_type == "therapy" && isPublished != false && (^._id in recommendedProducts[]._ref || _id in ^.relatedTherapies[]._ref)] | order(order asc, title asc) {
        title,
        "slug": slug.current
      },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  const activeProducts = (products || []).filter(isActiveProduct);
  return activeProducts.length > 0 ? activeProducts : fallbackProducts;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!activeProductSlugs.has(slug)) return undefined;

  const safeSlug = JSON.stringify(slug);
  const product = await sanityFetch<Product>(
    `*[_type == "product" && slug.current == ${safeSlug} && isPublished != false][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      price,
      "imageUrl": coverImage.asset->url,
      "imageAlt": coverImage.alt,
      tags,
      descriptionTitle,
      description,
      featuresTitle,
      features,
      ctaLabel,
      ctaLink,
      purchaseUrl,
      purchaseLabel,
      "relatedTherapies": *[_type == "therapy" && isPublished != false && (^._id in recommendedProducts[]._ref || _id in ^.relatedTherapies[]._ref)] | order(order asc, title asc) {
        title,
        "slug": slug.current
      },
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  if (product && isActiveProduct(product)) return product;
  return fallbackProducts.find((fallbackProduct) => fallbackProduct.slug === slug);
}

export async function getTherapies(): Promise<Therapy[]> {
  const therapies = await sanityFetch<Therapy[]>(
    `*[_type == "therapy" && isPublished != false] | order(order asc, title asc) {
      title,
      "slug": slug.current,
      order,
      isPublished,
      showInMenu,
      excerpt,
      tagLabel,
      gridTitle,
      gridButtonLabel,
      "imageUrl": coverImage.asset->url,
      "imageAlt": coverImage.alt,
      category,
      ctaLabel,
      ctaLink,
      heroPrimaryLabel,
      showAnchorNav,
      showOverview,
      showBenefits,
      showRecommendedProducts,
      showFaqs,
      showFinalCta,
      overviewTitle,
      description,
      notesTitle,
      notes,
      benefitsTitle,
      benefitCards,
      recommendedProductsTitle,
      recommendedProducts[]->{
        _id,
        title,
        "slug": slug.current,
        category,
        excerpt,
        price,
        purchaseUrl,
        purchaseLabel,
        "imageUrl": coverImage.asset->url,
        "imageAlt": coverImage.alt,
        tags
      },
      faqsTitle,
      faqs,
      finalCtaTitle,
      finalCtaText,
      "finalCtaImageUrl": finalCtaImage.asset->url,
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  const activeTherapies = therapies?.length ? therapies : fallbackTherapies;
  return activeTherapies.map(filterTherapyProducts);
}

export async function getTherapy(slug: string): Promise<Therapy | undefined> {
  const safeSlug = JSON.stringify(slug);
  const therapy = await sanityFetch<Therapy>(
    `*[_type == "therapy" && slug.current == ${safeSlug} && isPublished != false][0] {
      title,
      "slug": slug.current,
      order,
      isPublished,
      showInMenu,
      excerpt,
      tagLabel,
      gridTitle,
      gridButtonLabel,
      "imageUrl": coverImage.asset->url,
      "imageAlt": coverImage.alt,
      category,
      ctaLabel,
      ctaLink,
      heroPrimaryLabel,
      showAnchorNav,
      showOverview,
      showBenefits,
      showRecommendedProducts,
      showFaqs,
      showFinalCta,
      overviewTitle,
      description,
      notesTitle,
      notes,
      benefitsTitle,
      benefitCards,
      recommendedProductsTitle,
      recommendedProducts[]->{
        _id,
        title,
        "slug": slug.current,
        category,
        excerpt,
        price,
        purchaseUrl,
        purchaseLabel,
        "imageUrl": coverImage.asset->url,
        "imageAlt": coverImage.alt,
        tags
      },
      faqsTitle,
      faqs,
      finalCtaTitle,
      finalCtaText,
      "finalCtaImageUrl": finalCtaImage.asset->url,
      seo { title, description, "imageUrl": image.asset->url }
    }`,
  );
  const fallbackTherapy = fallbackTherapies.find((item) => item.slug === slug);
  return therapy ? filterTherapyProducts(therapy) : fallbackTherapy ? filterTherapyProducts(fallbackTherapy) : undefined;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await sanityFetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(order asc, name asc) {
      name,
      text,
      role,
      visible,
      order,
      "imageUrl": image.asset->url
    }`,
  );

  return mergeTestimonials(testimonials);
}

export function blocksToText(body: unknown[] = []): string[] {
  return body
    .filter((block): block is { children?: { text?: string }[] } => {
      return typeof block === "object" && block !== null && "children" in block;
    })
    .map((block) => block.children?.map((child) => child.text || "").join("") || "")
    .filter(Boolean);
}
