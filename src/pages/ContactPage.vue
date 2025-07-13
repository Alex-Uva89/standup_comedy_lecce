<template>
  <q-page class="q-pa-md q-px-xl bg-black">
    <!-- Header -->
    <div class="text-center q-mb-xl">
      <LogoHeader />
      <h1 class="text-h4 text-primary">Contattaci</h1>
      <p class="text-h6 text-bold text-white-8">Resta connesso con la nostra community!</p>
    </div>
    <!-- WhatsApp People Group -->
    <q-card
      flat
      bordered
      class="q-mb-xl bg-yellow text-black shadow-8"
      style="max-width: 600px; margin-left: auto; margin-right: auto; border-radius: 12px;"
    >
      <q-card-section class="text-center">
        <div class="text-h3 q-mb-md font-weight-bold">People - Gruppo WhatsApp</div>
        <div class="text-body1 q-mb-lg">
          Il nostro gruppo WhatsApp <strong>People</strong> è uno spazio dove puoi rimanere aggiornato su eventi,
          open mic, spettacoli e iniziative LGBTQIA+ nel Salento.
        </div>
        <q-btn
          color="green"
          label="Iscriviti al gruppo"
          :href="whatsapp.url"
          target="_blank"
          size="lg"
          rounded
        />
      </q-card-section>
    </q-card>

    {{ console.log(socials) }}

    <!-- Social -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Seguici sui social</div>
        <div class="row q-gutter-md justify-center">
          <template v-if="socialIcons && socials.length">
            <q-btn
              v-for="social in socials"
              :key="social.name"
              type="a"
              :href="social.link"
              target="_blank"
              round
              color="yellow"
              size="lg"
            >
              <img
                :src="socialIcons[social.icon]"
                :alt="social.imgAlt"
                class="q-mx-xs"
                style="max-width: 32px; max-height: 32px"
              />
            </q-btn>
          </template>
        </div>
      </q-card-section>
    </q-card>

    <!-- Contatti diretti -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Contatti diretti</div>
        <q-list bordered separator>
          <q-item v-for="(contact, index) in contacts" :key="index">
            <q-item-section avatar>
              <q-icon :name="contact.type === 'email' ? 'email' : 'phone'" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ contact.label }}</q-item-label>
              <q-item-label caption>{{ contact.value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Locali partner -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-md">Locali che accolgono la Stand-Up Comedy in Salento</div>
        <div class="row q-col-gutter-md q-row-gutter-md">
          <div
            v-for="locale in locali"
            :key="locale.name"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card
              class="my-card"
              flat
              bordered
              square
              style="cursor:pointer;"
              @click="() => window.open(`https://maps.google.com/?q=${encodeURIComponent(locale.name + ' ' + locale.city)}`, '_blank')"
            >
              <q-img
                src="https://source.unsplash.com/400x200/?theater,comedy"
                ratio="16/9"
                class="rounded-top"
              />
              <q-card-section>
                <div class="text-h6 q-mb-xs">{{ locale.name }}</div>
                <div class="text-subtitle2 text-grey-6">{{ locale.city }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import client from 'src/sanityClient'
import LogoHeader from 'src/components/LogoHeader.vue'

const whatsapp = ref({})
const socials = ref([])
const contacts = ref([])
const locali = ref([])

onMounted(async () => {
  const data = await client.fetch(`*[_type == "contacts"][0]{
    whatsappUrl,
    socials,
    contacts,
    locali
  }`)

  whatsapp.value = {
    title: data.whatsappTitle,
    description: data.whatsappDescription,
    url: data.whatsappUrl
  }

  socials.value = data.socials || []
  contacts.value = data.contacts || []
  locali.value = data.locali || []
})

const socialIcons = {
  Instagram: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
  Facebook:  'https://cdn-icons-png.flaticon.com/512/733/733547.png',
  Tiktok:    'https://cdn-icons-png.flaticon.com/512/3046/3046122.png',
  Youtube:   'https://cdn-icons-png.flaticon.com/512/1384/1384060.png'
}
</script>


<style scoped>
.my-card {
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: none;
}

.my-card:hover {
  box-shadow: 0 12px 24px rgba(0,0,0,0.25);
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
