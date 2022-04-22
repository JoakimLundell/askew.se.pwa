<template>
    
   <div class="greyout" @click="close" :class="{'open': open}">
        
   </div>
    
</template>

<script setup>
import { defineProps, defineEmits, onMounted, watch } from 'vue'
    
    
    const props = defineProps(['open'])
    const emit = defineEmits(['close'])
    
    let animation = null; 

    onMounted(() => {
        
        animation = gsap.timeline({paused: true, reversed: true})
        .to(".greyout", {autoAlpha:0})
        .progress(1) 
        
    })

    watch( () => props.open, () => {
        props.open ? animation.reverse() : animation.play() 
    })

    function close () {
        emit('close')
    }
</script>

<style scoped>
    
    div.greyout {
        position: absolute;
        top: var(--header);
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000; 
        background: rgba(7,45,60,0.8);
        background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 90%, transparent 100%);
    }


    
    

    @media only screen and (min-width: 600px) {
        a {
            padding: 50px 8vw;
            font-size: 8rem
        }
        
    }

    @keyframes animateIn {
        0% {
            transform: perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(90deg);
        }
        
        100% {
            transform: perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(0deg);
        }
    }
</style>