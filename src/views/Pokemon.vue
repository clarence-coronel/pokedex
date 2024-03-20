<template>
  <div v-if="!isLoading && pokemonData" class="flex flex-col gap-5">
    <div class="w-full max-w-[900px] mx-auto text-neutral-600 flex gap-5 flex-col items-center p-5 md:flex-row md:items-start md:gap-16 md:pt-10 md:pb-5 md:px-10">
        <div class="shadow-center-sm w-64 md:w-[40rem] aspect-square rounded-lg flex items-center justify-center ">    
          <img class="w-full max-w-56" :src="pokemonData.sprites.front_default" alt="">
        </div>

        <div class="w-full flex flex-col items-center gap-5 md:gap-10 max-w-[30rem]">
          <h1 class="flex flex-col font-medium w-full text-center md:flex-row md:items-end md:justify-center md:gap-3">
            <span class="w-full md:w-fit text-3xl truncate" :title="pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)">{{ pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1) }}</span>
            <span class="w-full md:w-fit text-xl text-neutral-400 truncate"> #{{ pokemonData.id }}</span>
          </h1>

          <div class="w-full flex flex-col gap-5">
            <Stat v-for="stat, index in pokemonData.stats" :key="index" :statName="stat.stat.name" :statVal="stat.base_stat" />
          </div>

          <div class="w-full flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10">
              <div class="w-full flex flex-col gap-1 items-start">
                <div class="font-semibold">TYPE: </div>
                <div class="w-full flex flex-wrap gap-2">
                  <span v-for="type,index in pokemonData.types" :key="index" :class="getColorClass(type.type.name)" class="px-2 py-1 text-white rounded-md">
                    {{ type.type.name[0].toUpperCase() + type.type.name.substring(1) }}
                  </span>
                </div>
              </div>

              <div class="w-full flex flex-col gap-1 items-start">
                <div class="font-semibold">ABILITIES: </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="ability, index in pokemonData.abilities" :key="index" class="bg-neutral-100 px-2 py-1 rounded-md">
                    {{ ability.ability.name[0].toUpperCase() + ability.ability.name.substring(1)}}
                  </span>
                </div>
              </div>

              <div class="w-full flex flex-col gap-1 items-start">
                <div class="font-semibold">WEIGHT: </div>
                <div class="">{{ pokemonData.weight/10 }} kg</div>
              </div>

              <div class="w-full flex flex-col gap-1 items-start">
                <div class="font-semibold">HEIGHT: </div>
                <div class="">{{ pokemonData.height/10 }} m</div>
              </div>
          </div>  
        </div>
    </div>

    <Evolution @updatePokemonData="handleClick" :url="pokemonData.species.url" />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup>
import Stat from '@/components/Stat.vue'
import Evolution from './Evolution.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useGetEvolutionChain } from '@/composables/useGetEvolutionChain'
import { useGetPokemonData } from '@/composables/useGetPokemonData'
import { useGetTypeColors } from '@/composables/useGetTypeColors'


const route = useRoute()
const router = useRouter()
const params = ref(route.params.id)
const { getColorClass } = useGetTypeColors()

const { getData: getChainData, evolutionChain } = useGetEvolutionChain()
const { pokemonData, isLoading, getData,  delayFinished } = useGetPokemonData()

onMounted(async() => {
  await getData(`https://pokeapi.co/api/v2/pokemon/${params.value}`)
  
  await getChainData(pokemonData.value.species.url)
})

async function handleClick(name){
  await getData(`https://pokeapi.co/api/v2/pokemon/${name}`)

  router.replace({
    path: `/pokemon/${pokemonData.value.id}`
  })

}
</script>

<style>

</style>