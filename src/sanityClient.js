import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: '6uh4ygin', // metti il tuo projectId
  dataset: 'production', // o altro dataset
  useCdn: true,
  apiVersion: '2023-01-01', // scegli la versione API
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export default client
