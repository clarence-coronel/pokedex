<template>
  <div class="max-w-[1400px] w-full min-h-screen flex justify-start items-center flex-col gap-5 p-5">
    <div class="w-full sm:px-5 flex justify-end gap-20">
      <!-- <span>Counter/Page: {{ counter }}</span>
      <span>Offset: {{ offset }}</span>
      <span>limit: {{ limit }}</span> -->
      <CustomSelect class="w-full sm:w-fit" @valueUpdated="valueUpdatedHandler" :selectedPropVal="limit" :selectedPropKey="limit" :options="options" />
    </div>
    <div v-if="!isLoading" class="w-full min-h-[70vh] grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-10 sm:p-5">
       <Card  v-for="poke in pokemonList" :key="poke.name" :name="poke.name" :dataUrl="poke.url" /> 
    </div>
    <div v-else-if="delayFinished && isLoading" class="w-full min-h-[70vh] flex flex-col justify-center items-center p-5 rounded-lg bg-white">
        <svg class="text-red-400 animate-spin" xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"/></svg>
    </div>

    <div class="flex flex-col-reverse w-full gap-3 sm:flex-row sm:gap-5 justify-center items-center">
      <button class="hover:bg-green-400 disabled:bg-neutral-300 duration-200 bg-green-500 rounded-md p-2 text-white font-bold w-full sm:max-w-40" @click="() => changePage(-1)" :disabled="counter <= 1 || isLoading">Previous</button>
      <button class="hover:bg-green-400 disabled:bg-neutral-300 duration-200 bg-green-500 rounded-md p-2 text-white font-bold w-full sm:max-w-40" @click="() => changePage(1)" :disabled="!nextExist || isLoading">Next</button>
    </div>

    <span class="text-sm font-medium">Page {{ counter }}</span>
  </div>
</template>

<script setup>
import Card from './Card.vue'
import CustomSelect from '@/components/CustomSelect'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { usePokemonPreviewList } from '@/composables/usePokemonPreviewList'
import { useRoute, useRouter } from 'vue-router';

const options = {
  "20": 20,
  "40": 40,
  "60": 60,
  "80": 80,
  "100": 100,
}

const route = useRoute()
const router = useRouter()

let counter = ref(1)
let offset = ref(0)
let limit = ref(20)

const { pokemonList, nextExist, isLoading, getData, delayFinished } = usePokemonPreviewList()

watchEffect(() => {
  router.replace({
    path: '/',
    query: { page: counter.value, limit: limit.value }
  })
})

// watch(limit, async () => {
//   offset.value = 1
//   counter.value = 1

//   await getData(offset.value, limit.value)
// })

// Problem is lagi to tinatawag kahit di naman need
// watch(limit, async (newVal, oldVal) => {
//   offset.value = 1
//   counter.value = 1
//   getData(offset.value, newVal);
// });

onMounted(async () => {
  if(!route.query.page || route.query.page < 1 || isNaN(route.query.page) ){
    router.replace({
      path: '/',
      query: { page: 1, limit: 20 }
    })
  }
  else{
    limit.value = Number(route.query.limit)
    // alert('limit val changed')
    offset.value = (Number(route.query.page) * Number(route.query.limit)) - limit.value
  }  

  counter.value = Number(route.query.page)

  await getData(offset.value , limit.value)
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
}

const valueUpdatedHandler = async (newVal) => {
  if(newVal == limit.value) return
  limit.value = newVal
  offset.value = 0
  counter.value = 1

  router.replace({
    path: '/',
    query: { page: counter.value, limit: limit.value }
  })

  await getData(offset.value, limit.value)
}

async function changePage(newVal) {
  
  if(newVal > 0) scrollToTop()
  
  counter.value = newVal > 0 ? ++counter.value : --counter.value

  offset.value =  newVal > 0 ? offset.value+=limit.value : offset.value-=limit.value

  await getData(offset.value, limit.value)
}
</script>
