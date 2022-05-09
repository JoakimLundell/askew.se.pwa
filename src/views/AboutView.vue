<template>
  <div class="about">
    <h1>Just for testing..</h1>
    <pre style="color: white">{{positions}}</pre>
  </div>
</template>
<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore();

const positions = computed(() => store.getters['positions/all'])
</script>
