<template>
    <div class="page-title">
        <slot></slot>
    </div>
</template>

<script setup>
const { onMounted }=require("@vue/runtime-core");

onMounted(() => {
    let timeline1 = gsap.timeline();
    timeline1.fromTo('.page-title', {x: '200px'},{ x: 0, duration: 1})
})

</script>

<style scoped>

.page-title {
    background: transparent;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--white);
    text-align: right;
    text-transform: capitalize;
    width: 100px
}

</style>
