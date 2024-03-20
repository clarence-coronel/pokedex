<template>
  <div v-if="!isLoading && pokemonData" class="lg:hover:scale-110 min-w-48 md:aspect-[3/4] hover:cursor-pointer duration-200 gap-1 flex flex-col justify-start items-center p-5 rounded-lg bg-white shadow-center-sm">
    <span class="text-neutral-400 font-semibold text-sm p-1 border rounded-full w-10 h-10 flex justify-center items-center">{{ index + 1 }}</span>
    <div class="w-full flex items-center justify-center">
        <img draggable="false" class="w-full max-w-[150px] aspect-square object-center object-cover" :src="pokemonData.sprites.front_default" :alt="`${pokemonData.name}'s default front`">
    </div>
    <div class="text-center w-full flex justify-center items-center text-xl font-medium">
        {{ pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)}}
    </div>
    <div class="flex flex-wrap gap-2">
        <span :class="getColorClass(type.type.name)" class="px-2 py-1 text-white rounded-md" v-for="type, index in pokemonData.types" :key="index">
            {{ type.type.name[0].toUpperCase() + type.type.name.substring(1) }}
        </span>
    </div>
  </div>
</template>

<script setup>
import { useGetPokemonData } from '@/composables/useGetPokemonData';
import { useGetTypeColors } from '@/composables/useGetTypeColors';
import { onMounted } from 'vue';
const props = defineProps({
  name: {
    type: String
  },
  index: {
    type: Number
  }
})

const emit = defineEmits(['updatePokemonData']);

const { getColorClass } = useGetTypeColors()
const url = `https://pokeapi.co/api/v2/pokemon/${props.name}`

const { pokemonData, isLoading, getData,  delayFinished } = useGetPokemonData()

onMounted(async () => {

  await getData(url)
})

</script>

<style>

</style>