import { ref } from "vue";

export function useGetEvolutionChain(){
    
    const evolutionChain = ref([])

    const getData = async(url) => {
        try {
            const res = await fetch(url)

            if (!res.ok) {
                throw new Error('Not Ok');
            }

            const data = await res.json();

            await getEvolutionChain(data.evolution_chain.url)

        } catch (error) {
            
        }
    }

    const getEvolutionChain = async(url) => {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error('Not Ok');
        }

        const data = await res.json();

        let current = data.chain

        getNames(evolutionChain, current)
    }

    const getNames = (refArray, current) => {
        
        refArray.value.push(current.species.name)

        if(current.evolves_to.length == 0) return

        if(current.evolves_to.length == 1){
            current.evolves_to.forEach(evolution => {
                getNames(evolutionChain, evolution)
            })
        }
        else{
            const evoSet = ref([])

            current.evolves_to.forEach(evolution => {
                const temp = getNames(evoSet, evolution);
                if(temp) evoSet.value.push(temp)
            })

            refArray.value.push(evoSet)
        }
        
        
    }

    return {
        getData,
        evolutionChain
    }
}