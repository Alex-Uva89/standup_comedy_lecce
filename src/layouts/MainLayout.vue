<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-header elevated>
        <LogoHeader />
        <main-navbar class="q-mb-md md:q-mb-xs" />
      </q-header>
      
      <div class="page-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="slide-over" mode="in-out">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LogoHeader from 'src/components/LogoHeader.vue';
import MainNavbar from 'src/components/MainNavbar.vue'; 
</script>

<style scoped>

.q-layout__section--marginal {
  background-color: black; /* default: smartphone */
}

.page-wrapper {
  position: relative;
  overflow: hidden;
}

.slide-over-enter-active,
.slide-over-leave-active {
  transition: transform 0.4s ease-out;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.slide-over-enter-from {
  transform: translateX(100%);
}
.slide-over-enter-to {
  transform: translateX(0%);
}

.slide-over-leave-from {
  width: 0%;
  transform: translateX(0%);
}
.slide-over-leave-to {
  width: 0%;
  transform: translateX(0%);
}

@media (min-width: 600px) {
  .q-layout__section--marginal {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
