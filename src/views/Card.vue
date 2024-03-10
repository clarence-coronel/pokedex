<template>
    <div v-if="pokemonData" class="lg:hover:scale-110 hover:cursor-pointer duration-200 flex flex-col justify-start items-center aspect-square p-3 rounded-lg bg-white shadow-center-sm">
        <div class="w-full aspect-square flex items-center justify-center">
            <img class="w-full h-full object-center object-cover" :src="pokemonData.sprites.front_default" :alt="`${pokemonData.name}'s default front`">
        </div>
        <div class="text-center w-full h-1/5 flex justify-center items-center text-xl font-medium">
            {{ pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)}}
        </div>
    </div>
</template>

<script setup>
import { useGetPokemonData } from '@/composables/useGetPokemonData';
import { onMounted, ref } from 'vue';

const { pokemonData, isLoading, getData } = useGetPokemonData()
const imageUrl = ref()

const props = defineProps({
    name: {
        type: String
    },
    dataUrl: {
        type: String
    },
})

onMounted(async() => {
    await getData(props.dataUrl)
    console.log(pokemonData.value)
})
</script>