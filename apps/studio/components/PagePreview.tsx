import type {SanityDocument} from 'sanity'

type PreviewProps = {
  document?: {
    displayed?: SanityDocument
    draft?: SanityDocument
    published?: SanityDocument
  }
}

type DraftDocument = SanityDocument & Record<string, any>

const previewOrigin = import.meta.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:4321'
const projectId = 'h5heqcpt'
const dataset = 'production'

function getSlug(doc: DraftDocument | undefined) {
  const slug = doc?.slug
  return slug && typeof slug === 'object' && typeof slug.current === 'string'
    ? slug.current.replace(/^\/+|\/+$/g, '')
    : undefined
}

function getPath(doc: DraftDocument | undefined) {
  if (!doc) return undefined
  if (doc._type === 'homepage') return '/'
  if (doc._type === 'methodPage') return '/il-metodo/'
  if (doc._type === 'coachingPage') return '/consapevolezza/'
  if (doc._type === 'programsPage') return '/programmi/'
  if (doc._type === 'productsPage') return '/prodotti/'
  if (doc._type === 'therapiesPage') return '/fitoterapia/'
  if (doc._type === 'contactPage') return '/contatti/'
  if (doc._type === 'testimonialsPage') return '/dicono-di-noi/'
  const slug = getSlug(doc)
  if (doc._type === 'program' && slug) return `/programmi/${slug}/`
  if (doc._type === 'product' && slug) return `/prodotti/${slug}/`
  if (doc._type === 'therapy' && slug) return `/fitoterapia/${slug}/`
  return undefined
}

function imageUrl(image: any) {
  const ref = image?.asset?._ref
  const match = typeof ref === 'string' ? ref.match(/^image-([^-]+)-(\d+x\d+)-([a-z0-9]+)$/i) : null
  return match
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${match[1]}-${match[2]}.${match[3]}`
    : undefined
}

function portableText(body: any[] = []) {
  return body
    .filter((block) => block?._type === 'block')
    .map((block) => (block.children || []).map((child: any) => child.text || '').join(''))
    .filter(Boolean)
}

const colors = {
  ink: '#26332c',
  muted: '#647066',
  sage: '#5d785f',
  ivory: '#fbf7ee',
  white: '#fffefa',
}

function HeroPreview({eyebrow, title, text, image}: {eyebrow?: string; title?: string; text?: string; image?: string}) {
  return (
    <section
      style={{
        display: 'flex',
        minHeight: 360,
        alignItems: 'flex-end',
        backgroundColor: colors.ink,
        backgroundImage: image
          ? `linear-gradient(90deg, rgba(20,29,25,.76), rgba(20,29,25,.2)), url(${image})`
          : 'linear-gradient(135deg, #52675a, #aab8a7)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: 'white',
        padding: '48px 7%',
      }}
    >
      <div style={{maxWidth: 680}}>
        <p style={{margin: '0 0 10px', fontSize: 12, fontWeight: 800, textTransform: 'uppercase'}}>{eyebrow}</p>
        <h1 style={{margin: '0 0 16px', fontFamily: 'Georgia, serif', fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 500, lineHeight: 1.05}}>
          {title || 'Titolo pagina'}
        </h1>
        {text && <p style={{maxWidth: 610, margin: 0, color: 'rgba(255,255,255,.9)', fontSize: 18, lineHeight: 1.6}}>{text}</p>}
      </div>
    </section>
  )
}

function CtaPreview({cta}: {cta?: Record<string, any>}) {
  if (!cta?.title) return null
  const image = imageUrl(cta.image)
  return (
    <section style={{padding: '42px 7%', background: colors.white}}>
      <div style={{borderRadius: 16, backgroundImage: image ? `linear-gradient(90deg, rgba(236,239,231,.98), rgba(236,239,231,.72)), url(${image})` : undefined, backgroundColor: '#ecefe7', backgroundPosition: 'center', backgroundSize: 'cover', padding: 36}}>
        <small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{cta.eyebrow}</small>
        <h2 style={{margin: '8px 0 12px', fontFamily: 'Georgia, serif', fontSize: 34, color: colors.ink}}>{cta.title}</h2>
        <p style={{maxWidth: 640, color: colors.muted}}>{cta.text}</p>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
          {cta.primaryLabel && <span style={{borderRadius: 999, background: colors.sage, color: 'white', padding: '10px 16px', fontWeight: 700}}>{cta.primaryLabel}</span>}
          {cta.secondaryLabel && <span style={{border: '1px solid #ccd3ca', borderRadius: 999, background: 'white', padding: '10px 16px', fontWeight: 700}}>{cta.secondaryLabel}</span>}
        </div>
      </div>
    </section>
  )
}

function ProgramPreview({doc}: {doc: DraftDocument}) {
  const benefits = Array.isArray(doc.benefitCards) && doc.benefitCards.length
    ? doc.benefitCards
    : Array.isArray(doc.benefits)
      ? doc.benefits
      : []
  const steps = Array.isArray(doc.processSteps) ? doc.processSteps : []
  const faqs = Array.isArray(doc.faqs) ? doc.faqs : []
  return (
    <>
      <HeroPreview eyebrow={doc.category || 'Percorso personalizzato'} title={doc.title} text={doc.excerpt} image={imageUrl(doc.coverImage)} />
      {(doc.showOverview !== false || doc.showAudience !== false || doc.showDescription !== false) && (
        <section style={{display: 'grid', gridTemplateColumns: 'minmax(220px,.75fr) minmax(0,1.4fr)', gap: 32, padding: '44px 7%', background: colors.white}}>
          {doc.showOverview !== false && <div style={{borderRadius: 14, background: colors.ivory, padding: 24}}><strong>Durata</strong><p>{doc.duration}</p><strong>Tipologia</strong><p>{doc.programType}</p><strong>Modalita</strong><p>{doc.deliveryMode}</p></div>}
          <div>
            {doc.showAudience !== false && <><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.audienceTitle || 'A chi si rivolge'}</h2><ul>{(doc.audience || []).map((item: string) => <li key={item}>{item}</li>)}</ul></>}
            {doc.showDescription !== false && <><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.descriptionTitle || 'Il percorso'}</h2>{portableText(doc.description).map((text) => <p key={text}>{text}</p>)}</>}
          </div>
        </section>
      )}
      {doc.showBenefits !== false && benefits.length > 0 && <section style={{padding: '44px 7%', background: colors.ivory}}><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.benefitsTitle || 'Benefici'}</h2><div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14}}>{benefits.map((item: any, index: number) => <div key={item._key || index} style={{border: '1px solid #e0e4dc', borderRadius: 12, background: 'white', padding: 20}}><strong>{typeof item === 'string' ? item : item.title}</strong>{typeof item !== 'string' && <p>{item.description}</p>}</div>)}</div></section>}
      {doc.showProcess !== false && steps.length > 0 && <section style={{padding: '44px 7%', background: colors.white}}><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.processTitle || 'Come funziona'}</h2><div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 20}}>{steps.map((step: any, index: number) => <div key={step._key || index}><b style={{display: 'inline-grid', width: 30, height: 30, placeItems: 'center', borderRadius: '50%', background: colors.sage, color: 'white'}}>{index + 1}</b><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></section>}
      {doc.showFaqs !== false && faqs.length > 0 && <section style={{padding: '44px 7%', background: colors.ivory}}><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.faqsTitle || 'Domande frequenti'}</h2>{faqs.map((faq: any, index: number) => <div key={faq._key || index} style={{borderBottom: '1px solid #dfe3db', background: 'white', padding: '14px 18px'}}><strong>{faq.question}</strong><p>{faq.answer}</p></div>)}</section>}
      {doc.showFinalCta !== false && <CtaPreview cta={{title: doc.finalCtaTitle, text: doc.finalCtaText, primaryLabel: doc.finalWhatsappLabel, secondaryLabel: doc.finalEmailLabel, image: doc.finalCtaImage}} />}
    </>
  )
}

function ProductPreview({doc}: {doc: DraftDocument}) {
  const paragraphs = portableText(doc.description)
  return (
    <>
      <section style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,.9fr)', gap: 38, alignItems: 'center', padding: '48px 7%', background: colors.white}}>
        <div style={{overflow: 'hidden', aspectRatio: '4 / 3', borderRadius: 14, background: colors.ivory}}>
          {imageUrl(doc.coverImage) && <img src={imageUrl(doc.coverImage)} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
        </div>
        <div>
          <small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{doc.category}</small>
          <h1 style={{margin: '10px 0 16px', fontFamily: 'Georgia, serif', fontSize: 48, color: colors.ink}}>{doc.title || 'Nome prodotto'}</h1>
          <p style={{color: colors.muted, fontSize: 18, lineHeight: 1.6}}>{doc.excerpt}</p>
          {doc.price && <strong style={{display: 'block', margin: '18px 0', fontSize: 20}}>{doc.price}</strong>}
          <span style={{display: 'inline-block', borderRadius: 999, background: colors.sage, color: 'white', padding: '11px 17px', fontWeight: 700}}>{doc.ctaLabel || 'Richiedi informazioni'}</span>
          {Array.isArray(doc.relatedTherapies) && doc.relatedTherapies.length > 0 && <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, borderTop: '1px solid #dfe4dc', marginTop: 18, paddingTop: 16}}>{doc.relatedTherapies.map((therapy: any, index: number) => <span key={therapy._key || therapy._ref || index} style={{borderRadius: 999, background: '#eef3ec', padding: '8px 12px', fontSize: 13, fontWeight: 700}}>Vai alla terapia {index + 1}</span>)}</div>}
        </div>
      </section>
      {(paragraphs.length > 0 || doc.features?.length > 0) && <section style={{display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 38, padding: '44px 7%', background: colors.ivory}}><div><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.descriptionTitle || 'Descrizione'}</h2>{paragraphs.map((text) => <p key={text}>{text}</p>)}</div><div><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.featuresTitle || 'Caratteristiche'}</h2><ul>{(doc.features || []).map((item: string) => <li key={item}>{item}</li>)}</ul></div></section>}
    </>
  )
}

function TherapyPreview({doc}: {doc: DraftDocument}) {
  const paragraphs = portableText(doc.description)
  const benefits = Array.isArray(doc.benefitCards) ? doc.benefitCards : []
  const faqs = Array.isArray(doc.faqs) ? doc.faqs : []
  const products = Array.isArray(doc.recommendedProducts) ? doc.recommendedProducts : []
  return (
    <>
      <HeroPreview eyebrow={doc.category || 'Consiglio fitoterapico'} title={doc.title} text={doc.excerpt} image={imageUrl(doc.coverImage)} />
      {doc.showOverview !== false && (
        <section style={{display: 'grid', gridTemplateColumns: 'minmax(0,1.25fr) minmax(240px,.75fr)', gap: 34, padding: '44px 7%', background: colors.white}}>
          <div>
            <h2 style={{fontFamily: 'Georgia, serif'}}>{doc.overviewTitle || 'Quando puo essere utile'}</h2>
            {(paragraphs.length ? paragraphs : [doc.excerpt]).filter(Boolean).map((text) => <p key={text}>{text}</p>)}
          </div>
          {Array.isArray(doc.notes) && doc.notes.length > 0 && <aside style={{borderRadius: 14, background: colors.ivory, padding: 24}}><h3>{doc.notesTitle || 'Indicazioni importanti'}</h3><ul>{doc.notes.map((item: string) => <li key={item}>{item}</li>)}</ul></aside>}
        </section>
      )}
      {doc.showBenefits !== false && benefits.length > 0 && <section style={{padding: '44px 7%', background: colors.ivory}}><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.benefitsTitle || 'Benefici'}</h2><div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14}}>{benefits.map((item: any, index: number) => <div key={item._key || index} style={{border: '1px solid #e0e4dc', borderRadius: 12, background: 'white', padding: 20}}><strong>{item.title}</strong><p>{item.description}</p></div>)}</div></section>}
      {doc.showRecommendedProducts !== false && products.length > 0 && <section style={{padding: '44px 7%', background: colors.white}}><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.recommendedProductsTitle || 'Prodotti consigliati'}</h2><div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14}}>{products.map((product: any, index: number) => <div key={product._key || product._ref || index} style={{border: '1px solid #e1e4de', borderRadius: 12, padding: 20}}>Prodotto consigliato {index + 1}</div>)}</div></section>}
      {doc.showFaqs !== false && faqs.length > 0 && <section style={{padding: '44px 7%', background: colors.ivory}}><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.faqsTitle || 'Domande frequenti'}</h2>{faqs.map((faq: any, index: number) => <div key={faq._key || index} style={{borderBottom: '1px solid #dfe3db', background: 'white', padding: '14px 18px'}}><strong>{faq.question}</strong><p>{faq.answer}</p></div>)}</section>}
      {doc.showFinalCta !== false && <CtaPreview cta={{title: doc.finalCtaTitle, text: doc.finalCtaText, primaryLabel: 'Scrivi su WhatsApp', secondaryLabel: 'Invia una email', image: doc.finalCtaImage}} />}
    </>
  )
}

function FixedPagePreview({doc}: {doc: DraftDocument}) {
  const heroImage = imageUrl(doc.heroImage)
  return (
    <>
      <HeroPreview eyebrow={doc.heroEyebrow} title={doc.heroTitle} text={doc.heroText} image={heroImage} />
      <section style={{padding: '44px 7%', background: colors.white, color: colors.ink}}>
        {doc._type === 'programsPage' && <><small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{doc.methodEyebrow || 'Come scegliere'}</small><h2 style={{maxWidth: 820, fontFamily: 'Georgia, serif', fontSize: 38}}>{doc.methodTitle}</h2><p style={{maxWidth: 720}}>{doc.methodText}</p><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '24px 0 36px'}}><div style={{gridColumn: '1 / -1', border: '1px solid #dfe4dc', borderRadius: 12, background: colors.ivory, padding: 22}}><small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{doc.methodCoreEyebrow}</small><h3 style={{fontFamily: 'Georgia, serif'}}>{doc.methodCoreLinkLabel || 'Nutrizione Integrata'}</h3><p>{doc.methodCoreText}</p></div><div style={{border: '1px solid #dfe4dc', borderRadius: 12, padding: 20}}><b>{doc.methodDietLabel}</b><h3>{doc.methodDietTitle}</h3><p>{doc.methodDietText}</p></div><div style={{border: '1px solid #dfe4dc', borderRadius: 12, padding: 20}}><b>{doc.methodPhytoLabel}</b><h3>{doc.methodPhytoTitle}</h3><p>{doc.methodPhytoText}</p></div></div><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.listTitle}</h2><p>{doc.listText}</p><div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14}}>{[1,2,3,4].map((number) => <div key={number} style={{minHeight: 120, borderRadius: 12, background: colors.ivory, padding: 18}}>Anteprima card programma {number}</div>)}</div></>}
        {doc._type === 'methodPage' && <><h2 style={{maxWidth: 820, fontFamily: 'Georgia, serif', fontSize: 38}}>{doc.introTitle}</h2><p style={{maxWidth: 760}}>{doc.introText}</p><div style={{margin: '28px 0', border: '1px solid #dfe4dc', borderRadius: 12, background: colors.ivory, padding: 24}}><small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{doc.coreEyebrow}</small><h3 style={{fontFamily: 'Georgia, serif', fontSize: 30}}>{doc.coreTitle}</h3><p>{doc.coreText}</p><ul>{(doc.coreItems || []).map((item: string) => <li key={item}>{item}</li>)}</ul></div><div style={{display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14}}><div style={{border: '1px solid #dfe4dc', borderRadius: 12, padding: 20}}><b>Con dieta</b><h3>{doc.dietTitle}</h3><p>{doc.dietText}</p></div><div style={{border: '1px solid #dfe4dc', borderRadius: 12, padding: 20}}><b>Senza dieta</b><h3>{doc.phytoTitle}</h3><p>{doc.phytoText}</p></div></div></>}
        {doc._type === 'coachingPage' && <><h2 style={{maxWidth: 820, fontFamily: 'Georgia, serif', fontSize: 38}}>{doc.introTitle}</h2><p style={{maxWidth: 760}}>{doc.introText}</p><div style={{display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1.2fr)', gap: 18, marginTop: 28}}><aside style={{border: '1px solid #dfe4dc', borderRadius: 12, background: colors.ivory, padding: 22}}><h3>{doc.audienceTitle || 'A chi puo essere utile'}</h3><ul>{(doc.audienceItems || []).map((item: string) => <li key={item}>{item}</li>)}</ul></aside><section><h3 style={{fontFamily: 'Georgia, serif', fontSize: 30}}>{doc.methodTitle || 'Come si lavora'}</h3><div style={{display: 'grid', gap: 12}}>{(doc.methodSteps || []).map((step: any, index: number) => <article key={step._key || index} style={{border: '1px solid #dfe4dc', borderRadius: 12, padding: 18}}><strong>{step.title}</strong><p>{step.text}</p></article>)}</div></section></div></>}
        {doc._type === 'contactPage' && <><h2>{doc.locationTitle}</h2><p>{doc.hoursIntro}</p><h2>{doc.formTitle}</h2><p>{doc.formText}</p><div style={{border: '1px solid #e1e4de', borderRadius: 12, padding: 20}}>{doc.nameLabel}<hr />{doc.emailLabel}<hr />{doc.messageLabel}</div></>}
        {doc._type === 'testimonialsPage' && <><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.sectionTitle}</h2><div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14}}>{[1,2,3].map((number) => <div key={number} style={{border: '1px solid #e1e4de', borderRadius: 12, padding: 20}}>Testimonianza {number}</div>)}</div></>}
        {doc._type === 'testimonialsPage' && doc.showGoogleReviews === true && <section style={{margin: '42px -7vw -44px', background: '#edf2ec', padding: '38px 7vw'}}><small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{doc.googleEyebrow || 'Recensioni Google'}</small><h2 style={{fontFamily: 'Georgia, serif', fontSize: 34}}>{doc.googleTitle || 'La voce di chi ci ha scelto'}</h2><p>{doc.googleText}</p><p><strong style={{fontSize: 28}}>{doc.googleRating || 0} / 5</strong>{doc.googleReviewCount ? ` - ${doc.googleReviewCount} recensioni` : ''}</p><div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14}}>{(doc.googleReviews || []).map((review: any, index: number) => <article key={review._key || index} style={{border: '1px solid #d8ded6', borderRadius: 8, background: 'white', padding: 20}}><strong>{review.rating || 5} / 5</strong><p>{review.text}</p><b>{review.author}</b></article>)}</div></section>}
        {doc._type === 'productsPage' && <><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.contentTitle}</h2><p>{doc.contentText}</p><hr style={{border: 0, borderTop: '1px solid #e1e4de', margin: '28px 0'}}/><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.gridTitle || 'I nostri prodotti'}</h2><p>{doc.gridText}</p><div style={{border: '1px solid #dce1da', borderRadius: 12, padding: 14}}>{doc.searchPlaceholder || 'Cerca un prodotto...'}</div></>}
        {doc._type === 'therapiesPage' && <><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.contentTitle}</h2><p>{doc.contentText}</p><hr style={{border: 0, borderTop: '1px solid #e1e4de', margin: '28px 0'}}/><h2 style={{fontFamily: 'Georgia, serif'}}>{doc.gridTitle || 'Consigli di fitoterapia'}</h2><p>{doc.gridText}</p><div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14}}>{[1,2,3,4].map((number) => <div key={number} style={{minHeight: 120, borderRadius: 12, background: colors.ivory, padding: 18}}>Anteprima terapia {number}</div>)}</div></>}
        {doc._type === 'homepage' && (
          <>
            <small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>
              {doc.introEyebrow || 'La Speziale'}
            </small>
            <h2 style={{maxWidth: 760, fontFamily: 'Georgia, serif', fontSize: 42}}>
              {doc.introTitle || 'Competenze diverse, un’unica visione'}
            </h2>
            <p style={{maxWidth: 760, color: colors.ink, fontFamily: 'Georgia, serif', fontSize: 20}}>
              {doc.introLead}
            </p>
            <p style={{maxWidth: 760}}>{doc.introBody}</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 1, marginTop: 32, background: '#dfe4dc'}}>
              {[1, 2, 3].map((number) => (
                <div key={number} style={{background: colors.white, padding: 20}}>
                  <strong>{doc[`value${number}Title`]}</strong>
                  <p>{doc[`value${number}Text`]}</p>
                </div>
              ))}
            </div>
            <div style={{marginTop: 36, border: '1px solid #dfe4dc', borderRadius: 14, background: colors.ivory, padding: 26}}>
              <small style={{color: colors.sage, fontWeight: 800, textTransform: 'uppercase'}}>{doc.methodEyebrow || 'Metodo e percorsi'}</small>
              <h2 style={{maxWidth: 760, fontFamily: 'Georgia, serif', fontSize: 34}}>{doc.methodTitle}</h2>
              <p style={{maxWidth: 760}}>{doc.methodText}</p>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14, marginTop: 18}}>
                <div style={{border: '1px solid #dfe4dc', borderRadius: 12, background: colors.white, padding: 18}}>
                  <b>{doc.methodDietLabel}</b>
                  <h3>{doc.methodDietTitle}</h3>
                  <p>{doc.methodDietText}</p>
                </div>
                <div style={{border: '1px solid #dfe4dc', borderRadius: 12, background: colors.white, padding: 18}}>
                  <b>{doc.methodPhytoLabel}</b>
                  <h3>{doc.methodPhytoTitle}</h3>
                  <p>{doc.methodPhytoText}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <CtaPreview cta={doc.cta || doc.finalCta} />
    </>
  )
}

export function PagePreview(props: PreviewProps) {
  const doc = (props.document?.displayed || props.document?.draft || props.document?.published) as DraftDocument | undefined
  if (!doc) return <div style={{padding: 24}}>Documento non disponibile.</div>
  const path = getPath(doc)
  const publishedUrl = path ? new URL(path, previewOrigin).href : undefined

  return (
    <div style={{height: '100%', minHeight: '75vh', overflow: 'auto', background: '#dde2dc', fontFamily: 'Arial, sans-serif'}}>
      <div style={{position: 'sticky', zIndex: 10, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid #d6dcd4', background: '#fbf7ee', padding: '10px 14px'}}>
        <div><strong>Anteprima bozza</strong><span style={{display: 'block', color: colors.muted, fontSize: 12}}>Si aggiorna con le modifiche non ancora pubblicate</span></div>
        {publishedUrl && <a href={publishedUrl} target="_blank" rel="noreferrer" style={{borderRadius: 999, background: colors.ink, color: 'white', padding: '8px 12px', textDecoration: 'none', fontSize: 13, fontWeight: 700}}>Apri sito pubblico</a>}
      </div>
      <div style={{maxWidth: 1180, margin: '20px auto', overflow: 'hidden', background: colors.white, boxShadow: '0 18px 50px rgba(38,51,44,.16)'}}>
        {doc._type === 'program' ? <ProgramPreview doc={doc} /> : doc._type === 'product' ? <ProductPreview doc={doc} /> : doc._type === 'therapy' ? <TherapyPreview doc={doc} /> : <FixedPagePreview doc={doc} />}
      </div>
    </div>
  )
}
