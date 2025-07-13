<template>
  <q-page class="q-mx-lg bg-black">
    <div class="flex flex-col md:flex-row justify-center">
      <banner-card :sections="_sections" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import client, { urlFor } from 'src/sanityClient'
import BannerCard from 'src/components/BannerCard.vue'

const _sections = ref([])

const query = `*[_type == "eventSection"]{
  title,
  artist,
  location,
  time,
  showName,
  description,
  img,
  purchaseLink
}`

async function fetchSections() {
  const data = await client.fetch(query)
  _sections.value = data.map(item => ({
    ...item,
    // converto l'immagine Sanity in URL normale
    img: urlFor(item.img).width(800).height(600).url()
  }))
}

onMounted(() => {
  fetchSections()
})
</script>

