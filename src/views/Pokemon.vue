<template>
  <div v-if="!isLoading && pokemonData" class="flex flex-col gap-5">
    <img class="w-40" :src="pokemonData.sprites.front_default" alt="">
    <div>
      National #: {{ pokemonData.id }}
    </div>

    <div>
      name: {{ pokemonData.name }}
    </div>

    <div>
      type: {{ pokemonData.types }}
    </div>

    <div>
      height: {{ pokemonData.height/10 }}m
    </div>

    <div>
      weight: {{ pokemonData.weight/10 }}kg
    </div>

    <div>
      abilities: {{ pokemonData.abilities }}
    </div>

    <div>
      stats: {{ pokemonData.stats }}
    </div>
  </div>
</template>

<script setup>
import { useGetPokemonData } from '@/composables/useGetPokemonData';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const params = ref(route.params.id)


const { pokemonData, isLoading, getData,  delayFinished } = useGetPokemonData()

onMounted(async() => {
  await getData(`https://pokeapi.co/api/v2/pokemon/${params.value}`)
  console.log(pokemonData.value)
})

</script>

<style>

</style>