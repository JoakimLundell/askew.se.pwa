<template>
    <section>
        <slot></slot>
    </section>
</template>

<script>
export default {
      
}
</script>

<style scoped>
    section {
        padding: var(--padding-width);
        overflow: hidden;
        background: linear-gradient(342deg, rgba(7,45,60,1) 20%, rgba(20,112,151,1) 100%);;
        height: calc(100vh - var(--header));
        overflow-y: auto;
    }

     @media only screen and (min-width: 600px) {
        section {
            padding: var(--padding-width);
        }
      }
</style>