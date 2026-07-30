import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/structure'
import {PagePreview} from './components/PagePreview'

export const singletonTypes = [
  'siteSettings',
  'homepage',
  'methodPage',
  'coachingPage',
  'programsPage',
  'contactPage',
  'testimonialsPage',
  'productsPage',
  'therapiesPage',
]

const singleton = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  documentId = typeName,
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(documentId).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('La Speziale - Gestione sito')
    .items([
      S.listItem()
        .title('Pagine Statiche')
        .child(
          S.list()
            .title('Pagine Statiche')
            .items([
              singleton(S, 'siteSettings', 'Impostazioni sito'),
              singleton(S, 'homepage', 'Homepage'),
              singleton(S, 'methodPage', 'Il Metodo'),
              singleton(S, 'coachingPage', 'Consapevolezza e Coaching'),
              S.listItem()
                .title('Dicono di noi')
                .child(
                  S.list()
                    .title('Dicono di noi')
                    .items([
                      singleton(S, 'testimonialsPage', 'Impostazioni pagina'),
                      S.documentTypeListItem('testimonial').title('Testimonianze'),
                    ]),
                ),
              singleton(S, 'contactPage', 'Contatti'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Programmi')
        .child(
          S.list()
            .title('Programmi')
            .items([
              singleton(S, 'programsPage', 'Impostazioni pagina Programmi'),
              S.documentTypeListItem('program').title('Elenco programmi'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Fitoterapie')
        .child(
          S.list()
            .title('Fitoterapie')
            .items([
              singleton(S, 'therapiesPage', 'Impostazioni pagina Fitoterapie'),
              S.documentTypeListItem('therapy').title('Elenco fitoterapie'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Prodotti')
        .child(
          S.list()
            .title('Prodotti')
            .items([
              singleton(S, 'productsPage', 'Impostazioni pagina Prodotti'),
              S.documentTypeListItem('product').title('Elenco prodotti'),
            ]),
        ),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (
    [
      'homepage',
      'methodPage',
      'coachingPage',
      'programsPage',
      'contactPage',
      'testimonialsPage',
      'productsPage',
      'therapiesPage',
      'program',
      'product',
      'therapy',
    ].includes(schemaType)
  ) {
    return S.document().views([
      S.view.form().title('Modifica'),
      S.view.component(PagePreview).title('Anteprima'),
    ])
  }

  return S.document().views([S.view.form().title('Modifica')])
}
