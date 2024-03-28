<template>
    <div class="px-5 max-w-[1400px] z-50 backdrop-blur-md sticky top-0 w-full border-b py-5 text-3xl font-bold flex flex-nowrap gap-5 justify-around items-center sm:justify-between sm:flex-row flex-col">
        <router-link class="" to="/">
            <img class="w-32" src="./../assets/logo.png" alt="Pokedex Logo">
        </router-link>

        <form @submit.prevent="redirect" class="w-full sm:w-fit bg-white border h-10 border-neutral-300 rounded-lg flex flex-nowrap gap-1 items-center justify-between">
            <input ref="searchInputEl" v-model.trim="pokemonName" type="text" class="px-2 py-1 text-base font-medium rounded-lg focus:outline-none" placeholder="Search...">
            <button class="hover:bg-sky-600 bg-sky-500 duration-200 text-white border-neutral-300 rounded-r-lg border-l px-2 py-1 h-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const pokemonName = ref("")
const searchInputEl = ref(null)
const router = useRouter()

const redirect = () => {
    if(pokemonName.value == "") return
    router.push(`/pokemon/${pokemonName.value}`)
    pokemonName.value = ""
    
    searchInputEl.value.blur()
}
</script>

<style>

</style>