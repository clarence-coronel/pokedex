<template>
  <div class="w-full min-h-screen flex justify-start items-center flex-col gap-5 p-5">
    <div class="text-red-400 text-3xl font-bold font-K2D flex flex-col flex-nowrap gap-2 justify-center items-center sm:flex-row">
      <!-- <img class="animate-pulse  w-20" src="https://videogames.si.com/.image/t_share/MjAxNDY1NDMyNzIzNDMzMDEz/poke-ball.png" alt=""> -->
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"/></svg> -->
      <!-- <span>Pokédex</span> -->
      <img class="w-52" src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" alt="Pokedex Logo">
    </div>

    <div v-if="!isLoading" class="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-10 p-5">
       <Card  v-for="poke in pokemonList" :key="poke.name" :name="poke.name" :dataUrl="poke.url" /> 
    </div>
    <div v-else-if="delayFinished && isLoading" class="w-full min-h-[70vh] flex flex-col justify-center items-center p-5 rounded-lg bg-white">
        <svg class="text-red-400 animate-spin" xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"/></svg>
    </div>

    <div class="flex flex-col-reverse w-full gap-3 sm:flex-row sm:gap-5 justify-center items-center">
      <button class="hover:bg-green-400 disabled:bg-neutral-300 duration-200 bg-green-500 rounded-md p-2 text-white font-bold w-full sm:max-w-40" @click="prevPage" :disabled="counter === 1 || isLoading">Previous</button>
      <button class="hover:bg-green-400 disabled:bg-neutral-300 duration-200 bg-green-500 rounded-md p-2 text-white font-bold w-full sm:max-w-40" @click="nextPage" :disabled="!nextExist || isLoading">Next</button>
    </div>

    <span class="text-sm font-medium">Page {{ counter }}</span>
  </div>
</template>

<script setup>
import Card from './Card.vue'
import { onMounted, ref } from 'vue'
import { usePokemonPreviewList } from '@/composables/usePokemonPreviewList'

let counter = ref(1)
let offset = 0
let limit = 20
const { pokemonList, nextExist, isLoading, getData, delayFinished } = usePokemonPreviewList()

const prevPage = async() => {
  counter.value--
  offset-=20
  await getData(offset, limit)
}
const nextPage = async() => {
  scrollToTop()
  counter.value++
  offset+=20
  await getData(offset, limit)
}

onMounted(async () => {
  await getData(offset, limit)
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
}

</script>
