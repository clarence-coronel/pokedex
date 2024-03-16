<template>
    <router-link v-if="!isLoading && pokemonData"  :to="{name: 'pokemon', params: {id: pokemonData.id}}">
        <div class="lg:hover:scale-110 hover:cursor-pointer duration-200 gap-1 flex flex-col justify-start items-center p-5 rounded-lg bg-white shadow-center-sm">
            <div class="w-full flex items-center justify-center">
                <img draggable="false" class="w-full max-w-[150px] aspect-square object-center object-cover" :src="pokemonData.sprites.front_default" :alt="`${pokemonData.name}'s default front`">
            </div>
            <div class="text-center w-full flex justify-center items-center text-xl font-medium">
                {{ pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)}}
            </div>
            <div class="flex flex-wrap gap-2">
                <span :class="getTypeColor(type.type.name)" class="bg-[#78C850] px-2 py-1 text-white rounded-md" v-for="type, index in pokemonData.types" :key="index">
                    {{ type.type.name[0].toUpperCase() + type.type.name.substring(1) }}
                </span>
            </div>
        </div>
    </router-link>
    <div v-else-if="delayFinished && isLoading" class="aspect-square flex flex-col justify-center items-center p-5 rounded-lg bg-white shadow-center-sm">
        <svg class="text-red-400 animate-spin" xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"/></svg>
    </div>
</template>

<script setup>
import { useGetPokemonData } from '@/composables/useGetPokemonData';
import { onMounted, ref } from 'vue';

const { pokemonData, isLoading, getData, delayFinished } = useGetPokemonData()
const imageUrl = ref()
const typeColorMap = {
  normal: 'bg-yellow-300',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-blue-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
  unknown: 'bg-green-400', // Closest match, but may not perfectly represent 'unknown'
  shadow: 'bg-gray-800', // Closest match, but may not perfectly represent 'shadow'
  glitch: 'bg-pink-500', // Closest match, but may not perfectly represent 'glitch'
  bird: 'bg-yellow-400' // Closest match, but may not perfectly represent 'bird'
};


const getTypeColor = (type) => typeColorMap[type]


const props = defineProps({
    name: {
        type: String
    },
    dataUrl: {
        type: String
    }
})

onMounted(async() => {
    await getData(props.dataUrl)
})
</script>