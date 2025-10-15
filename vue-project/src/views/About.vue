<script setup>
import {useRouter} from "vue-router";
const router = useRouter();

</script>

<template>
<div>
  <h1>AboutPage</h1>
  <button @click="()=>{router.push('/')}">Home</button>
  <a href="javascript:void(0)">abc</a>
</div>
</template>

<style scoped>

</style>