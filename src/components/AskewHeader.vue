<template>
    <header>
        <slot></slot>
    </header>
</template>

<script>
export default {
      
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: var(--header);
        color: var(--white);
        padding: 0 var(--padding);
        background: var(--background);
    }
    
    header a {
        border: 1px solid pink;
        color: var(--dark-red)
    }

    @media only screen and (min-width: 600px) {
        header {
            padding: 0 8vw;
        }
        
      }
</style>