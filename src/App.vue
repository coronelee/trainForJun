<template>
  <div id="app" class="w-screen h-screen flex flex-col">
    <HeaderComponent :openHamburger="openHamburger"/>
    <RegistrationComponent/>
    <div v-if="hamburger" class="w-screen h-[calc(100vh-75px)] bg-green-100 fixed  left-0 bottom-0 right-0 flex justify-center items-center" @click="openHamburger">

    </div>
  </div>
</template>


<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import RegistrationComponent from './components/RegistrationComponent.vue'

import { ref } from "vue";

const hamburger = ref(false);

const openHamburger = () => {
    hamburger.value = !hamburger.value;
}

</script>
