<template>
  <div class="app">
    <NavBar/>
    <RouterView />
  </div>
  
</template>

<script setup>
import NavBar from './components/NavBar.vue'

</script>

<style >
* {
  margin: 0; padding: 0;
}
</style>