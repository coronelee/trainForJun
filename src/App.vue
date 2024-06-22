<template>
  <div id="app" class="w-screen h-screen flex flex-col overflow-x-hidden">
    <HeaderComponent :openHamburger="openHamburger" />
    <component :is="currentView" />
    <div v-if="hamburger"
      class="w-screen h-screen bg-green-100 fixed  left-0 bottom-0 right-0 flex justify-center items-center"
      @click="openHamburger">
    </div>
  </div>
</template>


<script setup>
import HeaderComponent from './components/global/HeaderComponent.vue'
import RegistrationComponent from './components/RegistrationComponent.vue'
import HomeComponent from './components/HomeComponent.vue'
import { ref, computed } from "vue";

const hamburger = ref(false);

const openHamburger = () => {
  hamburger.value = !hamburger.value;
}


const routes = {
  '/registration': RegistrationComponent,
  '/home': HomeComponent
}
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || RegistrationComponent
})
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
</script>
