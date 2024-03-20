<template>
  <div class="w-full min-h-screen flex flex-col items-center">
    <div class="w-full flex flex-col items-center">
      <Header />
      <router-view/>
    </div>
    <MyFooter />
  </div>
  
</template>

<script setup>
import MyFooter from '@/components/Footer'
import Header from '@/components/Header'
</script>