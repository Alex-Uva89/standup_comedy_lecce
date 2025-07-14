<template>
  <q-card
    v-for="(section, index) in sections"
    :key="index"
    :class="[getCardClass(index), 'card-bg-image', 'margin', 'text-white']"
    @click="changeClass(index)"
    :style="{ backgroundImage: `url(${section.img})` }"
  >
    <div class="q-pa-md gradient-overlay">
      <!-- Titolo sempre visibile -->
      <div class="text-h5 text-weight-bold text-shadow">{{ section.title }}</div>

      <!-- Mini descrizione visibile solo se non attiva -->
      <div v-if="activeIndex !== index" class="text-subtitle2 q-my-sm text-shadow">
        <q-icon name="info" size="xs" class="q-mr-xs" />
        Clicca per scoprire di più
      </div>

      <!-- Contenuto dettagliato se attiva -->
      <div v-if="activeIndex === index" class="q-my-md">
        <div class="flex q-gutter-sm">
          <div class="row items-center q-mb-xs text-shadow">
            <q-icon name="account_circle" size="sm" class="q-mr-sm" />
            <span class="text-subtitle1">Artista: <strong>{{ section.artist }}</strong></span>
          </div>
  
          <div class="row items-center q-mb-xs text-shadow">
            <q-icon name="place" size="sm" class="q-mr-sm" />
            <span class="text-subtitle1">Luogo: <strong>{{ section.location }}</strong></span>
          </div>
  
          <div class="row items-center q-mb-xs text-shadow">
            <q-icon name="schedule" size="sm" class="q-mr-sm" />
            <span class="text-subtitle1">Orario: <strong>{{ section.time }}</strong></span>
          </div>
        </div>

        <div v-if="section.showName" class="q-mt-sm text-shadow">
          <q-chip color="deep-purple-8" text-color="white" icon="theater_comedy">
            {{ section.showName }}
          </q-chip>
        </div>

        <div class="q-mt-sm text-body2 text-shadow">
          {{ section.description }}
        </div>
      </div>

      <!-- Bottone Acquista Ora, -->
      <q-btn
        v-if="section.purchaseLink"
        :href="section.purchaseLink"
        target="_blank"
        rel="noopener noreferrer"
        class="q-btn--flat q-btn--rounded text-white btn-small q-my-5"
        style="background-color: rgba(128, 0, 128, 0.7); max-width: fit-content; padding: 4px 10px;"
        @click.stop
      >
        Acquista ora!
    </q-btn>
    </div>
  </q-card>
</template>




<script setup>
import { ref } from 'vue'

defineProps({
  label: String,
  sections: Array
})

const activeIndex = ref(null)

function changeClass(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}

function getCardClass(index) {
  if (activeIndex.value === null) return 'card-no-full'
  return activeIndex.value === index ? 'card-full' : 'card-hidden'
}


</script>

<style scoped>

.card-bg-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-no-full {
  width: 100%;
  height: 200px;
  cursor: pointer;
  transition: all 0.5s ease;
  overflow: hidden;
}

.card-full {
  width: 100%;
  height: 100vh; /* Card espansa in altezza */
  cursor: pointer;
  transition: all 0.5s ease;
  z-index: 1;
  overflow: auto;
}

.card-hidden {
  width: 100%;
  height: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
  overflow: hidden;
}

.margin{
    margin-bottom: 2rem;
}

.card-hidden.margin{
    margin-bottom: 0;
}

.gradient-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1));
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: inherit;
}

.text-shadow {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

@media (min-width: 768px) {


    .card-no-full {
        width: calc(100% / 4 - 5px);
        height: calc(100vh - 250px);
        cursor: pointer;
        transition: all 0.5s ease;
      }
      
      .card-full {
        width: 100%;
        height: calc(100vh - 250px);
        cursor: pointer;
        transition: all 0.5s ease;
        z-index: 1;
        position: relative;
      }

    .card-no-full {
      margin-right: 5px;
    }

    .card-no-full:last-of-type {
      margin-right: 0;
    }

    .card-hidden {
      width: 0;
      opacity: 0;
      height: 0;
      pointer-events: none;
      transition: all 0.5s ease;
    }
}
</style>