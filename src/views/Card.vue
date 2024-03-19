<template>
    <router-link v-if="!isLoading && pokemonData"  :to="{name: 'pokemon', params: {id: pokemonData.id}}">
        <div class="lg:hover:scale-110 min-w-48 hover:cursor-pointer duration-200 gap-1 flex flex-col justify-start items-center p-5 rounded-lg bg-white shadow-center-sm">
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
    </router-link>
    <div v-else-if="delayFinished && isLoading" class="gap-3 animate-pulse aspect-square flex flex-col justify-center items-center p-5 rounded-lg bg-white shadow-center-sm">
        <div class="w-full h-40 bg-neutral-200 rounded-md flex items-center justify-center">
        </div>

        <div class="w-full h-7 bg-neutral-200 rounded-md text-center flex justify-center items-center text-xl font-medium">
        </div>

        <div class="w-full h-fit flex flex-wrap gap-3 justify-center">
            <span class="w-16 h-7 bg-neutral-200 px-2 py-1 text-white rounded-md"></span>
            <span class="w-16 h-7 bg-neutral-200 px-2 py-1 text-white rounded-md"></span>
        </div>
    </div>
</template>

<script setup>
import { useGetPokemonData } from '@/composables/useGetPokemonData';
import { onMounted, ref } from 'vue';
import { useGetTypeColors } from '@/composables/useGetTypeColors';

const { pokemonData, isLoading, getData, delayFinished } = useGetPokemonData()
const { getColorClass } = useGetTypeColors()
const imageUrl = ref()



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