<template>
    <a @click="$router.back()" :class="{'override': isMap}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        <span>Tillbaka</span>
    </a>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const isMap = computed(() => useRoute().matched.some(({ name }) => name === 'map'))
</script>

<style scoped>

a {
    display: flex;
    flex-direction: row; /* find better solution to break on small */
    justify-content: center;
    align-items: center;
    
    background: transparent;
    font-size: 1rem;
    font-weight: bold;
    animation: pulse;
    animation-duration: 1s;
    color: var(--white);
    text-align: center;

    writing-mode: vertical-rl;     
}

.override {
    writing-mode: horizontal-tb;
}

a:hover {
    color: var(--focus-color)
}

svg {
    transform: rotate(90deg);
    fill: white;
}

a:hover svg {
    fill: var(--focus-color)
}

@keyframes pulse {
    0% {
        opacity: 0;
        transform: translateX(-200px); 
    }
        
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@media only screen and (min-width: 500px) {

    a {
        flex-direction: row;
        writing-mode: horizontal-tb;
    }


}
</style>
