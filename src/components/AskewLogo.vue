<template>
    
    <div class="logo" :class="{'open': props.open}" @click="clos_">
        <img class="monkey" alt="askew logo" src="./../assets/img/monkey_white.svg" />
        <router-link to="/" class="link hem">Hem</router-link>
        <router-link to="/map" class="link karta">Karta</router-link>
        <router-link to="/chatt" class="link chatt">Chatt</router-link>
        <router-link to="/about" class="link annat">Annat</router-link>
    </div>    
    
</template>

<script setup>

const { watch, onMounted }=require("@vue/runtime-core")

const props = defineProps(['open'])
const emit = defineEmits(['close'])
let ani = null

onMounted(()=> {
    ani = gsap.timeline({paused:true, reversed: true})
            .to(".logo", {scale:8, y: '45vh',ease:"power1.out"})
            .to(".monkey", {scale:.8})
            .to(".link", {autoAlpha: 1,rotateY:0, stagger:{amount: .3}})

})

watch(() => props.open, () => {
    ani.reversed() ? ani.play() : ani.reverse()
})



function close() {
    emit('close')
}
    
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    animation: all 2s ease;
}
.logo {
    position: relative;
    width: 48px;
    height: 48px;
    z-index: 1100;
    background: transparent;
    
}

.link {
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    opacity: 0;
    visibility: hidden;
    background: var(--accent-color);
    color: var(--white);
    transform: scale(.6) rotateY(-90deg);
    padding: 0 2px;
}
.link.hem {
    
}
.link.karta {
    bottom:10%;
    top: auto;
    left: -10%
}
.link.chatt {
    bottom: 5%;
    top: auto;
    left: auto;
    right: -10%;
    transform: scale(.6) rotate(-10deg);
}
.link.annat {
    bottom:-20%;
    top: auto;
    left: 5px;
    transform: scale(.6) rotate(5deg);
}

.link:hover,
.link:focus,
.link:active {
    color: var(--white);
    background: var(--accent-hover);
    transition: all 0.5 ease
}

/*.logo.open {
    position: absolute;
    
    top: 0;
    right: 0;
    bottom: 0;
    left:0;
    background: red;
    z-index: 2000;
    
}
.logo.open img {
    width: 100%;
    height: 100%;
    animation: all 2s ease;
}*/
</style>