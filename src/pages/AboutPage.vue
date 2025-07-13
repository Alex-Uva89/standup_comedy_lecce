<template>
  <q-page class="q-pa-md q-px-xl bg-black">
    <div class="text-center q-mb-xl">
      <LogoHeader />
      <h1 class="text-h4 text-primary">Chi siamo</h1>
      <p class="text-subtitle1 text-grey-8">
        Scopri di più su di noi, la nostra missione e il nostro team.
      </p>
    </div>

    <!-- Missione -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6">La nostra missione</div>
        <div class="text-body2">{{ missione }}</div>
      </q-card-section>
    </q-card>

    <!-- Team -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">Il nostro team</div>
        <div class="row q-col-gutter-md">
          <div
            v-for="member in team"
            :key="member.name"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          >
            <q-card class="bg-grey-1 q-pa-md q-hoverable">
              <q-card-section class="text-center">
                <q-avatar size="90px" class="q-mb-sm">
                  <img :src="member.photo" :alt="member.name" />
                </q-avatar>
                <div class="text-subtitle1 text-black text-bold">{{ member.name }}</div>
                <div class="text-caption text-red">{{ member.role }}</div>
                <q-separator class="q-my-sm" />
                <div class="text-body2 text-black">{{ member.bio }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Valori -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-md">I nostri valori</div>
        <q-list dense>
          <q-item v-for="valore in valori" :key="valore">
            <q-item-section avatar>
              <q-icon name="check_circle" color="positive" />
            </q-item-section>
            <q-item-section>{{ valore }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import LogoHeader from 'src/components/LogoHeader.vue'
import client  from 'src/sanityClient'

// stato reattivo per i dati
const missione = ref('')
const valori = ref([])
const team = ref([])

// query GROQ per prendere un singolo documento about (modifica se serve)
const query = `*[_type == "about"][0]{
  missione,
  valori,
  team[]{
    name,
    role,
    bio,
    "photo": photo.asset->url
  }
}`

onMounted(async () => {
  try {
    const data = await client.fetch(query)
    if (data) {
      missione.value = data.missione || ''
      valori.value = data.valori || []
      team.value = data.team || []
    }
  } catch (error) {
    console.error('Errore caricando dati da Sanity:', error)
  }
})
</script>
