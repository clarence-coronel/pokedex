
export function useGetTypeColors(){
    const typeColorMap = {
        normal: 'bg-yellow-300',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        electric: 'bg-yellow-400',
        grass: 'bg-green-500',
        ice: 'bg-blue-200',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-600',
        flying: 'bg-blue-300',
        psychic: 'bg-pink-500',
        bug: 'bg-green-400',
        rock: 'bg-yellow-800',
        ghost: 'bg-purple-700',
        dragon: 'bg-indigo-600',
        dark: 'bg-gray-800',
        steel: 'bg-gray-400',
        fairy: 'bg-pink-300',
        unknown: 'bg-green-400', // Closest match, but may not perfectly represent 'unknown'
        shadow: 'bg-gray-800', // Closest match, but may not perfectly represent 'shadow'
        glitch: 'bg-pink-500', // Closest match, but may not perfectly represent 'glitch'
        bird: 'bg-yellow-400' // Closest match, but may not perfectly represent 'bird'
    };

    const getColorClass = (name) => {
        return typeColorMap[name]
    }

    return {
        getColorClass
    }
}
