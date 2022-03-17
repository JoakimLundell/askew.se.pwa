<template>
    <header>
        <div class="page-width">
            <slot></slot>
        </div>
    </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: center;
    align-items: center;
    
    background: red;
    border-bottom: 4px solid black;
}
.page-width {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
}
</style>
