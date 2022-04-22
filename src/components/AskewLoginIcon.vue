<template>
    <template v-if="props.loading"> Loading.. </template>
    <template v-else>
        <template v-if="props.open">
            <button @click="click" style="background: silver">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                
            </button>
            
        </template>
        <template v-else>
    <button v-if="!props.auth" @click="click">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="18px" viewBox="0 0 20 20" width="18px" fill="#FFFFFF"><g><rect fill="none" height="20" width="20" x="0"/></g><g><path d="M17.5,8.5h-6.75C10.11,6.48,8.24,5,6,5c-2.76,0-5,2.24-5,5s2.24,5,5,5c2.24,0,4.11-1.48,4.75-3.5h0.75L13,13l1.5-1.5L16,13 l3-3L17.5,8.5z M6,12.5c-1.38,0-2.5-1.12-2.5-2.5S4.62,7.5,6,7.5S8.5,8.62,8.5,10S7.38,12.5,6,12.5z"/></g></svg>
        <span>Login</span>
    </button>
    <button v-else @click="click">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        <span>{{name}}</span>
    </button>
        </template>
    </template>
    
</template>

<script setup>

    import {defineEmits} from 'vue'
    
    const props = defineProps(['auth', 'name', 'loading', 'open'])
    const emit = defineEmits(['toggle'])

    function click () {
        emit('toggle')
    }
</script>

<style scoped>

button {
    width: 48px;
    height: 48px;
    border: none;
    background: transparent;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
}

svg { fill: white;}
</style>