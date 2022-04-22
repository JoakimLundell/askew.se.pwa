<template>
    
   <nav @click="close" class="mainLinks">
        <div class="links" >
            <router-link class="mainLink" to="/">Home</router-link>
            <router-link class="mainLink" to="/map">Kartan</router-link>
            <router-link class="mainLink" to="/chatt">Chatt</router-link>
            <router-link class="mainLink" to="/about">Skidresan  </router-link>
       </div>
   </nav>
    
</template>

<script setup>
import { defineProps, defineEmits, onMounted, watch } from 'vue'
    
    
    const props = defineProps(['open'])
    const emit = defineEmits(['close'])
    let animation = null; 

    onMounted(() => {
        /*animation = gsap.to(".mainLink", {
            duration: .8,
            scale: 0.1,
            
            rotationY:-90,
            perspective: 1200,
            ease: "power1.inOut",
            stagger: {
                from: "end",
                amount: 0.4
            },
            paused: true
        }).progress(1);*/
        
        /*animation = gsap.timeline({paused: true, reversed: true})
            
            .to(".mainLink",{
                duration: 0.4,
                scale: 0.1,
                rotationY: -90,
                perspective: 1200,
                ease: "power1.out",
                stagger: {
                    from: "end",
                    amount: 0.4
                }})
            .to("nav.mainLinks", {display:'none'})
            .progress(1)*/

        //gsap.to("nav", {autoAlpha:0})
        //animation.play();
        
        animation = gsap.timeline({paused: true, reversed: true})
        //.from("nav", {autoAlpha:0})
        //.from(".mainLink", {rotationY:90}, 0)
        .to(".mainLink", {rotationY:90, stagger:{from: "end",amount:0.3}}, 0)
        .to("nav", {autoAlpha:0}, 1).progress(1) 
        
    })

    watch( () => props.open, () => {
        
        !props.open ? animation.play() : animation.reverse() 
    })

    function close () {
        emit('close')
    }
</script>

<style scoped>
    
    nav {
        position: absolute;
        top: var(--header);
        bottom: 0;
        left: 0;
        right: 0;
        z-index: var(--z-top); 
        background: transparent;

    }

    .links {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        background: transparent;
        height: 100%;
    }

    a {
        color: white;
        font-weight: 900;
        font-size: 5rem;
        width: auto;
        background: var(--background);
        padding: calc(var(--padding) * 3) var(--padding);
        transform-origin: left;
        
        /*transition: all 0.5s ease-in-out;
        transform: perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(90deg);*/
        /*box-shadow: 2px 2px 4px black;*/
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