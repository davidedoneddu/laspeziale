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

const googleReviewsUrl =
  'https://www.google.com/maps/place/Studio+Nutrizionista+La+Speziale+Milano/@45.467031,9.1948409,17z/data=!3m1!4b1!4m6!3m5!1s0x4786c6afe02fef15:0xe505ade915e2cc3c!8m2!3d45.467031!4d9.1948409!16s%2Fg%2F1tfjpl38'

const googleReviews = [
  {
    _type: 'googleReview',
    _key: 'google-review-laura-passarella',
    author: 'Laura Passarella',
    rating: 5,
    text: 'Mi trovo benissimo.',
    sourceUrl: googleReviewsUrl,
  },
  {
    _type: 'googleReview',
    _key: 'google-review-simona-secchi',
    author: 'Simona secchi',
    rating: 5,
    text: 'Si occupano di te come persona, non è solo un aiuto a dimagrire. Altamente consigliate.',
    sourceUrl: googleReviewsUrl,
  },
  {
    _type: 'googleReview',
    _key: 'google-review-nicole-pe',
    author: 'Nicole Pè',
    rating: 5,
    text: 'Grande professionalità, disponibilità e cordialità.',
    sourceUrl: googleReviewsUrl,
  },
]

await client.createIfNotExists({_id: 'testimonialsPage', _type: 'testimonialsPage'})
await client
  .patch('testimonialsPage')
  .set({
    showGoogleReviews: true,
    googleEyebrow: 'Recensioni Google',
    googleTitle: 'La voce di chi ci ha scelto',
    googleText: 'Una selezione di esperienze pubblicate sulla scheda Google di La Speziale.',
    googleBusinessName: 'Studio Nutrizionista La Speziale Milano',
    googleRating: 4.9,
    googleReviewCount: 22,
    googleReviewsUrl,
    googleButtonLabel: 'Vedi tutte le recensioni su Google',
    googleReviews,
  })
  .commit()

console.log('Recensioni Google verificate inserite nella pagina Dicono di noi.')
