import { ref } from "vue";

export function usePokemonPreviewList (){
    const pokemonList = ref([])
    const nextExist = ref(true)
    const isLoading = ref(false)

    const getData = async (offset, limit) => {
        isLoading.value = true

        try {
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
            const res = await fetch(url);
        
            if (!res.ok) {
            throw new Error('Not Ok');
            }
        
            const data = await res.json();
            pokemonList.value = data.results;
    
            if(data.next) nextExist.value = true
            else nextExist.value = false
        } catch (error) {
            console.error(error);
        } finally{
            isLoading.value = false
        }
    }

    return { pokemonList, nextExist, isLoading, getData }
}
