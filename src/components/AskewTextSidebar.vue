<template>
    <div class="logo-width sidebar">
        
        <askew-back v-if="!isHome"></askew-back>

        <askew-logo></askew-logo>
        
        <div class="askew-text">askew</div>

    </div>
</template>

<script setup>
    import AskewLogo from './AskewLogo.vue'
    import AskewBack from './AskewBack.vue';
    import { computed } from 'vue'
    import {useRoute} from 'vue-router'

    const isHome = computed(() => useRoute().matched.some(({ name }) => name === 'home'))
    
</script>

<style scoped>
    .sidebar {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: flex-start;
        padding: var(--padding) 0;
    }
    .back {
        background: green;
        height: 100px;
    }
   .askew-text {
        flex: 1;
    
        display:flex;
        justify-content: flex-start;
        align-items: center;
        font-size: min( 20vw, 12rem);
        /*font-size: 20vw;*/
        color: white;
        writing-mode: vertical-rl;
        
        overflow: hidden;
        text-transform: uppercas_;
    }
</style>