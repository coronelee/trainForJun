<template>
  <div id="app" class="w-screen h-screen flex flex-col overflow-x-hidden font-nunito_regular">
    <HeaderComponent :openHamburger="openHamburger" />
    <component :is="currentView" />
    <div v-if="hamburger" class="w-screen h-screen bg-[#fffce] gap-9 backdrop-blur fixed left-0 bottom-0 right-0 flex flex-col justify-center items-center
      [&>a]:text-[#6d6d6d] [&>a]:text-2xl [&>a]:font-bold [&>a]:transition-all [&>a]:duration-300">
      <a href="">Контакты</a><a href="">Поддержка</a><a href="">О нас</a>
    </div>
  </div>
</template>


<script setup>
import HeaderComponent from './components/global/HeaderComponent.vue'
import RegistrationComponent from './components/RegistrationComponent.vue'
import HomeComponent from './components/HomeComponent.vue'
import CodeTaskComponent from './components/taskComponents/CodeTaskComponent.vue'
import { ref, computed } from "vue";
import CodeTaskComponentVue from './components/taskComponents/CodeTaskComponent.vue';

const hamburger = ref(false);

const openHamburger = () => {
  hamburger.value = !hamburger.value;
  document.body.classList.toggle('overflow-hidden');
}


const routes = {
  '/registration': RegistrationComponent,
  '/home': HomeComponent,
  '/code': CodeTaskComponent
}
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || RegistrationComponent
})
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
</script>
