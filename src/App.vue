<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configura il client Sanity
const sanity = createClient({
  projectId: '6uh4ygin', 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01'
})

// Costruttore URL immagini
const builder = imageUrlBuilder(sanity)
function urlFor(source) {
  return builder.image(source).url()
}

// Al montaggio, carica lo sfondo e applicalo al body
onMounted(async () => {
  try {
    const siteSettings = await sanity.fetch(`*[_type == "sito"][0]{ immagineSfondo }`)

    if (siteSettings?.immagineSfondo) {
      const url = urlFor(siteSettings.immagineSfondo)
      document.body.style.backgroundImage = `url(${url})`
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.minHeight = '100vh'
    }
  } catch (error) {
    console.error('Errore nel caricamento dello sfondo da Sanity:', error)
  }
})
</script>

<style>
body {
  margin: 0;
}
</style>
