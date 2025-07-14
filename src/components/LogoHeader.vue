<template>
  <div class="q-pa-md flex flex-center">
    <q-img
      v-if="logoUrl"
      :src="logoUrl"
      alt="Logo"
      style="max-width: 200px; max-height: 100px"
      spinner-color="yellow"
      fit="contain"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import client, { urlFor } from 'src/sanityClient'

const logoUrl = ref(null)

onMounted(async () => {
  const data = await client.fetch(`*[_type == "sito"][0]{
    logo
  }`)
  if (data?.logo) {
    logoUrl.value = urlFor(data.logo).width(200).url()
  }
})
</script>

