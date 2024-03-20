<template>
    <div class="flex flex-col items-center text-neutral-600 pt-10">
        <div class="font-medium">EVOLUTION CHAIN:</div>
        <div v-if="evolutionChain.length > 0" class="w-full h-fit flex flex-col p-10 gap-10 md:flex-row md:flex-wrap md:justify-center md:items-center">
            <template v-for="evolution,index in evolutionChain" :key="index">
                <EvolutionCard @updatePokemonData="handleClick" v-if="typeof evolution == 'string'"  :name="evolution" :index="index" />
                <EvolutionCardSet @updatePokemonData="handleClick" v-else  :set="evolution" :index="index" />
            </template>
        </div>
        <div v-else class="w-full flex justify-center items-center animate-pulse">
            Loading...
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
