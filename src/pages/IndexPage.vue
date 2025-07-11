<template>
  <q-page class="q-mx-lg bg-black">
    <div class="flex flex-col md:flex-row justify-center">
      <banner-card :sections="_sections" />
    </div>
  </q-page>
</template>

<script setup>
import BannerCard from 'src/components/BannerCard.vue';

const _sections = [
  {
    title: 'Concerto d’estate',
    artist: 'Giovanni Truppi',
    location: 'Teatro Koreja, Lecce',
    time: '21:00',
    showName: 'Poesia e Rivoluzione',
    description: 'Uno spettacolo emozionante tra parole e musica.',
    img: { asset: { _ref: 'image-abc123-800x600-png' } }
  },
  {
    title: 'Notte Acustica',
    artist: 'Chiara Civello',
    location: 'Chiostro dei Carmelitani, Nardò',
    time: '20:30',
    showName: 'Voce e Pianoforte',
    description: 'Un viaggio musicale tra jazz, bossa nova e cantautorato.',
    img: { asset: { _ref: 'image-def456-800x600-jpg' } }
  },
  {
    title: 'Teatro al Tramonto',
    artist: 'Compagnia Salentina',
    location: 'Castello Carlo V, Lecce',
    time: '19:00',
    showName: 'Le Voci della Terra',
    description: 'Spettacolo teatrale che racconta storie del sud tra mito e realtà.',
    img: { asset: { _ref: 'image-ghi789-800x600-webp' } }
  },
  {
    title: 'Electro Night',
    artist: 'Populous',
    location: 'Manifatture Knos, Lecce',
    time: '22:30',
    showName: 'Ritmi Urbani',
    description: 'DJ set tra elettronica e world music, per una notte indimenticabile.',
    img: { asset: { _ref: 'image-jkl012-800x600-png' } }
  }
]

</script>

