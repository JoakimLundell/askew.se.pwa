<template>
    <div class="mainline">
        <slot></slot>
    </div>
</template>


<style scoped>
    div.mainline {
        /* padding: var(--padding-width);
        overflow: hidden;*/
        /*background: linear-gradient(342deg, rgba(7,45,60,1) 20%, rgba(20,112,151,1) 100%);*/
        /*background: #7cb9d4;
        height: calc(100vh - var(--header));
        overflow-y: auto;
        color: red;*/
        /*border-top: 1px solid #a3b6a3;*/
        border-bottom: 5px solid #c7dfc7;
        padding: var(--padding);
        font-size: 10vw;
        color:black;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        font-weight: bold;
    }

    
    
    /*@media only screen and (min-width: 600px) {
        section {
            padding: var(--padding-width);
        }
    }*/

    @media only screen and (min-width: 600px) {
        div.mainline {
            padding: 0 8vw;
        }    
    }
</style>