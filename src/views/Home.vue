<template>
  <div class="w-full h-screen flex justify-center items-center flex-col gap-10 bg-red-400 overflow-y-auto">
    <div class="w-full h-4/5 flex flex-col gap-3 justify-center items-center">
      <div v-for="poke, index in pokemons" :key="index" class="font-semibold text-xl">
        {{ poke.name }}
      </div>
    </div>

    <div class="flex gap-5">
      <button class="hover:bg-neutral-200 disabled:bg-red-200 duration-200 bg-white rounded-md p-2 text-red-400 font-bold w-40" @click="prevPage" :disabled="counter === 1 || isLoading">Prev</button>
      <button class="hover:bg-neutral-200 disabled:bg-red-200 duration-200 bg-white rounded-md p-2 text-red-400 font-bold w-40" @click="nextPage" :disabled="!nextExist">Next</button>
    </div>

    <span>Page {{ counter }}</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const counter = ref(1)
const pokemons = ref([])

const limit = 20
let offset = 0
const isLoading = ref(true)

const nextExist = ref(true)

async function fetchData() {
  isLoading.value = true;

  try {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Not Ok');
    }

    const data = await res.json();
    pokemons.value = data.results;

    isLoading.value = false;
    if(data.next) nextExist.value = true
    else nextExist.value = false

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function nextPage() {

    counter.value++;
    offset+=20
    await fetchData()
}

async function prevPage() {

    counter.value--;
    offset-=20
    await fetchData();
  
}

onMounted(() => {
  fetchData();
});

</script>
