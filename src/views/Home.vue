<template>
  <div class="w-full min-h-screen flex justify-start items-center flex-col gap-10">
    <div class="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 p-5">
      <Card v-if="pokemonList.length" v-for="poke, index in pokemonList" :key="poke.name" :name="poke.name" :dataUrl="poke.url" />
    </div>

    <div class="flex gap-5">
      <button class="hover:bg-neutral-200 disabled:bg-red-200 duration-200 bg-white rounded-md p-2 text-red-400 font-bold w-40" @click="prevPage" :disabled="counter === 1 || isLoading">Prev</button>
      <button class="hover:bg-neutral-200 disabled:bg-red-200 duration-200 bg-white rounded-md p-2 text-red-400 font-bold w-40" @click="nextPage" :disabled="!nextExist || isLoading">Next</button>
    </div>

    <span>Page {{ counter }}</span>
  </div>
</template>

<script setup>
import Card from './Card.vue'
import { onMounted, ref } from 'vue'
import { usePokemonPreviewList } from '@/composables/usePokemonPreviewList'

let counter = ref(1)
let offset = 0
let limit = 30
const { pokemonList, nextExist, isLoading, getData } = usePokemonPreviewList()

const prevPage = async() => {
  counter.value--
  offset-=20
  await getData(offset, limit)
}
const nextPage = async() => {
  counter.value++
  offset+=20
  await getData(offset, limit)
}
onMounted(async () => {
  await getData(offset, limit)
});

</script>
