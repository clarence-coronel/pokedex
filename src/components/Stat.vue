<template>
    <div class="w-full font-medium flex items-start gap-1 flex-col">
        <span class="text-sm flex w-fit text-nowrap gap-1">{{statName.toUpperCase()}}: <span class="text-blue-300">{{statVal}}</span></span>
        <div class="w-full h-3 bg-neutral-200 rounded-sm">
            <div ref="bar" class="h-full bg-blue-300 text-green p-1 rounded-sm"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

    const bar = ref()
    const percentage = ref(0)
    
    const props = defineProps(['statName', 'statVal'])

    percentage.value = (props.statVal / 255) * 100

    onMounted(() => {
        bar.value.style.width = percentage.value + '%'
    })
</script>