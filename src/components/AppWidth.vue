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
        padding: 0 var(--padding);
        
    }

    @media only screen and (min-width: 600px) {
        div.width {
            padding: 0 8vw;
        }
        
      }
</style>