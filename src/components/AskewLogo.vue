<template>
    
    <div class="logo noselect">
        <router-link to="/">
        <img class="monkey" alt="askew logo" src="./../assets/img/monkey_white.svg" @click="close"/>
        </router-link>
    </div>    
    
</template>

<script setup>

/*const { watch, onMounted }=require("@vue/runtime-core")

const props = defineProps(['open'])
const emit = defineEmits(['close'])
let ani = null
*/
/*onMounted(()=> {
    ani = gsap.timeline({paused:true, reversed: true})
            .to(".logo", {scale:8, y: '45vh',ease:"power1.out"})
            .to(".monkey", {scale:.8})
            .to(".link", {autoAlpha: 1,rotateY:0, stagger:{amount: .3}})

})*/

/*watch(() => props.open, () => {
    ani.reversed() ? ani.play() : ani.reverse()
})



function close() {
    emit('close')
}
  */  
</script>

<style scoped>
img {
    width: 100%;
}
.logo {
    background: transparent;
    width: 100%;
}


</style>