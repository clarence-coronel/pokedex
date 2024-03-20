<template>
    <div class="flex flex-col items-center text-neutral-600 pt-10">
        <div class="font-medium">EVOLUTION CHAIN:</div>
        <div v-if="evolutionChain.length > 0" class="w-full h-fit flex flex-col p-10 gap-10 md:flex-row md:flex-wrap md:justify-center md:items-center">
            <template v-for="evolution,index in evolutionChain" :key="index">
                <EvolutionCard @updatePokemonData="handleClick" v-if="typeof evolution == 'string'"  :name="evolution" :index="index" />
                <EvolutionCardSet @updatePokemonData="handleClick" v-else  :set="evolution" :index="index" />
            </template>
        </div>
        <div v-else class="w-full">
            <svg class="text-red-400 animate-spin" xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"/></svg>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import EvolutionCard from "./EvolutionCard.vue";
import EvolutionCardSet from './EvolutionCardSet.vue'
import { useGetEvolutionChain } from "@/composables/useGetEvolutionChain";

const { evolutionChain, getData } = useGetEvolutionChain()
const props = defineProps({
    url: {
        type: String,
        default: null
    }
})
const emit = defineEmits(['updatePokemonData']);

onMounted(async () => {
    await getData(props.url)
})

function handleClick(name) {
  emit('updatePokemonData', name);
}
</script>
