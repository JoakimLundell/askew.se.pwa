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
        justify-content:space-between;
        align-items: center;
        height: var(--header);
        color: var(--white);
        padding: 0 var(--padding);
        background: var(--header-background);
        transition: height 1s ease;
        padding: 0 10px;
    }
    
    header a {
        border: 1px solid pink;
        color: var(--dark-red)
    }

    header.thin {
        --header: 50px;
        transition: height 1s ease;
    }

    @media only screen and (min-width: 600px) {
        header {
            /*padding: 0 8vw;*/
        }    
    }

    /*:slotted(*) {
    width: 100px !important;
    } */   
</style>