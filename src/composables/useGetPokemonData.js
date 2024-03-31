import { ref } from "vue";

export function useGetPokemonData() {
  const pokemonData = ref(null);
  const isLoading = ref(true);
  const delayFinished = ref(false);

  setTimeout(() => {
    delayFinished.value = true;
  }, 100);

  const getData = async (url) => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 20000));

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Not Ok");
      }

      const data = await res.json();

      // console.log(data);

      pokemonData.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { pokemonData, isLoading, getData, delayFinished };
}
