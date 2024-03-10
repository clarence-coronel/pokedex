import { ref } from "vue";

export function useGetPokemonData (){
    const pokemonData = ref(null)
    const isLoading = ref(false)

    const getData = async (url) => {
        isLoading.value = true
        try {
            const res = await fetch(url);
        
            if (!res.ok) {
                throw new Error('Not Ok');
            }

            const data = await res.json();
            pokemonData.value = data;
            
        } catch (error) {
            console.error(error);
        } finally{
            isLoading.value = false
        }
    }
    
    return { pokemonData, isLoading, getData }
}
