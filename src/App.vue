<template>
  <div class="w-full min-h-screen flex flex-col items-center">
    <div class="w-full max-w-[1400px]">
      <router-view/>
    </div>
    <MyFooter />
  </div>
  
</template>

<script setup>
import MyFooter from '@/components/Footer'

</script>