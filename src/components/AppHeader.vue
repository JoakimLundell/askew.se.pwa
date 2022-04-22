<template>
    <div class="shadow">
        <div class="page-width">
            
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
div.shadow {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    background: linear-gradient(180deg, rgb(107, 104, 129) 0%, rgba(173, 157, 157, 0) 100%);
    height:6px;

    /*animation-name: pulse;
    animation-duration: 2.0s;
    animation-timing-function:linear;
    animation-direction:alternate;
    animation-iteration-count: infinite;
    animation-play-state: running;*/
}
.page-width {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
}
@keyframes pulse {
    0% {
        opacity: 0; 
    }
        
    100% {
        opacity: 1 
    }
}
</style>
