<template>
    <div class="width">
        <slot></slot>
    </div>
</template>

<script>
export default {
      
}
</script>

<style scoped>
    div.width {
        margin: 0 auto;
        max-width: 1200px;
        
    }

    /*@media only screen and (min-width: 600px) {
        div.width > * {
            max-width: 800px;
        }
        
    } */
</style>