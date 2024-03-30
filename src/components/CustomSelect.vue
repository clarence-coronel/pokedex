<template>
  <div
    @click.stop="toggleSelect"
    class="w-fit text-neutral-700 select-none z-20 hover:cursor-pointer min-w-16 relative border-neutral-200 border px-2 py-1 rounded-md flex justify-between items-center gap-2"
  >
    <div class="w-full text-left">
      {{ selectedPropKey ? selectedPropKey : selectedKey }}
    </div>
    <svg
      :class="{ 'rotate-180': selectOpen }"
      class="duration-500"
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"
      />
    </svg>
    <div
      :class="{ 'opacity-100 max-h-none': selectOpen }"
      class="max-h-0 flex overflow-hidden shadow-md flex-col rounded-md border bg-white border-neutral-200 opacity-0 duration-500 absolute w-full h-fit top-9 left-0"
    >
      <button
        :disabled="!selectOpen"
        class="hover:bg-neutral-200 duration-200 px-2 py-1 w-full text-left"
        v-for="(value, key) in options"
        @click.stop="() => updateValue(key, value)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps(["options", "selectedPropKey", "selectedPropVal"]);

const emit = defineEmits(["valueUpdated"]);

const selectOpen = ref(false);

const selectedVal = ref(props.selectedPropVal);
const selectedKey = ref(props.selectedPropKey);

watch(selectedVal, () => {
  emit("valueUpdated", selectedVal.value);
});

const toggleSelect = () => (selectOpen.value = !selectOpen.value);

const updateValue = (key, val) => {
  selectedKey.value = key;
  selectedVal.value = val;
  toggleSelect();
};

onMounted(() => {
  window.addEventListener("click", () => {
    if (selectOpen.value) toggleSelect();
  });
});
</script>

<style lang="scss" scoped></style>
