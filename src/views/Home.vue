<template>
    <div class="flex justify-center items-center flex-col gap-5 bg-red-400 h-screen overflow-y-auto">
      <div v-for="poke, index in pokemons" :key="index" class="font-semibold text-xl">
        {{ poke.name }}
      </div>
      
      <div class="flex gap-5">
        <button class="hover:bg-neutral-200 duration-200 bg-white rounded-md p-2 text-red-400 font-bold w-40" @click="() => fetchData(prev)">Prev</button>
        <button class="hover:bg-neutral-200 duration-200 bg-white rounded-md p-2 text-red-400 font-bold w-40" @click="() => fetchData(link)">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const pokemons = ref([]);
  const link = ref('https://pokeapi.co/api/v2/pokemon');
  const prev = ref('https://pokeapi.co/api/v2/pokemon');
  
  async function fetchData(url) {
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error('Not Ok');
      }
  
      const data = await res.json();
      
      pokemons.value = data.results;
      
      if(data.previous) prev.value = data.previous;
      link.value = data.next;

    } catch (error) {
      console.error(error);
    }
  }
  
  onMounted(() => {
    fetchData(link.value);
  });
  </script>
  