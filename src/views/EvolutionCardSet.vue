<template>
    <template v-for="pokemonData, i in pokemonDataSet" :key="i">
        <div v-if="!isLoading && pokemonData" class="lg:hover:scale-110 min-w-60 md:aspect-[3/4] hover:cursor-pointer duration-200 gap-1 flex flex-col justify-start items-center p-5 rounded-lg bg-white shadow-center-sm">
            <span class="text-neutral-400 font-semibold text-sm p-1 border rounded-full w-10 h-10 flex justify-center items-center">{{ index + 1 }}{{ getLetter(i).toUpperCase() }}</span>
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
</template>

<script setup>
import { useGetPokemonData } from '@/composables/useGetPokemonData';
import { useGetTypeColors } from '@/composables/useGetTypeColors';
import { onMounted, ref } from 'vue';

const props = defineProps({
  set: {
    type: Object
  },
  index: {
    type: Number
  }
})

const url = `https://pokeapi.co/api/v2/pokemon/`
const pokemonDataSet = ref([])
const { getColorClass } = useGetTypeColors()

onMounted(async () => {
    props.set.value.forEach(async evolution => {
        const { pokemonData, isLoading, getData,  delayFinished } = useGetPokemonData()
        await getData(url+evolution)

        pokemonDataSet.value.push(pokemonData.value)
    })
})

function getLetter(index) {
    return String.fromCharCode(97 + index);
}
</script>
