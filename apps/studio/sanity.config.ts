import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {defaultDocumentNode, singletonTypes, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'La Speziale - Gestione sito',

  projectId: 'h5heqcpt',
  dataset: 'production',

  plugins: [structureTool({structure, defaultDocumentNode})],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((template) => !singletonTypes.includes(template.templateId)),
    actions: (prev, context) =>
      singletonTypes.includes(context.schemaType)
        ? prev.filter(({action}) => action && !['delete', 'duplicate'].includes(action))
        : prev,
  },
})
