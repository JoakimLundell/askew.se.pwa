<template>
    <div class="chatt">
        
        <div class="header">
            <h1>Välkommen, {{userName}}</h1>
        </div>
        
        <div class="content">

        <div class="scroll">
            <div v-for="chatt in chatts" :key="chatt.key" class="message" :class="{'current': chatt.namn === userName }">
                <div class="author">
                    <span class="name">{{chatt.namn}}</span> 
                    <span style="font-size:8px">{{chatt.date}}</span>
                </div>
                
                <div class="text" @click="edit(chatt.key)">{{chatt.meddelande}}</div>
                
                <div class="buttons" :class="{'open':isOpen.includes(chatt.key)}">
                    <button>Ändra</button>
                    <button @click="remove(chatt.key)">Ta bort</button>
                </div>
                
            </div>
        </div>


    </div>
        <div class="box">
            <input v-model="message" type="text" placeholder="Skriv meddelande.." tabindex="1">
            <button class="green" @click="send" :disabled="message == ''" tabindex="2">Skicka</button>
        </div>
    </div>

    <div class="overlay" :class="{'open': confirmDelete}">
        <div class="box">
            <div><button @click="confirmDelete = false">Close</button></div>
            <div>
                <h2>Ska vi radera den?</h2>
                    <button @click="confirm(true)">Ja</button>
                    <button @click="confirm(false)">Nej</button>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import AppWidth from '../components/AppWidth.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const chatts = computed(()=> store.getters['chatt/chatts'])
const userName = computed(()=> store.getters['user/name'])
const message = ref('')
const isOpen = ref([])
const deleteKey = ref('')
const confirmDelete = ref(false)

const store = useStore();

function send () {

    store.dispatch('chatt/send', message.value).then(() => {
        message.value = ''
    })
    
}

function edit(id) {
    isOpen.value = []
    isOpen.value.push(id)
}

function remove(id) {
    deleteKey.value = id;
    confirmDelete.value = true
}

function confirm(bool) {
    bool ? store.dispatch('chatt/remove', deleteKey.value):  deleteKey.value = null;
    confirmDelete.value = false
    // Close edit button
    isOpen.value = []
}

onMounted(() => {
    // Move to App
    //store.dispatch('chatt/init')
})
</script>

<style scoped>
.chatt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background: transparent;
}
.chatt .header {
     padding: 0 var(--padding);
}
.chatt .content {
    padding: var(--padding);
    background: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin: 0 var(--padding);
    overflow: hidden;
    flex-grow: 1;
}

.chatt .content .scroll {
    flex-grow: 1;
    background: transparent;
    overflow-y: auto;
    height: 100%;
}

h1 {
    color: white;
    padding: 0 var(--padding)
}

.chatt .box {
    display: flex;
    justify-content: center;
    padding: 35px 20px;
    background: var(--background);
    box-shadow: 2px -2px 10px var(--background);
}
.chatt .box input {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.chatt .box button {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.message {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    padding: 10px;
    /*-webkit-transition: all 1s linear;
    -moz-transition: all 1s linear;
    -o-transition: all 1s linear;
    transition: all 1s linear;*/
}

.message .author {
    padding: 2px;
    color: silver;
}

.message .author span.name{
    padding: 0px 6px;
    color: rgb(155, 149, 149);
}

.message.current .author span.name{
    float: right;
}


.message.current .text {
    background: rgb(68, 64, 80);
    color: white;
}

.message.current { 
    align-items: flex-end;
    /*-webkit-transition: all 1s linear;
    -moz-transition: all 1s linear;
    -o-transition: all 1s linear;
    transition: all 1s linear;*/
}

.message .text {
    background: rgb(233, 225, 225);
    display: flex;
    padding: 8px 12px;
    border-radius: 16px;
}

.buttons:not(.open) {
    display: none;
}

.buttons.open {
    padding: 2px;
    animation: appear .5s;
}

@keyframes appear {
    0% { opacity: 0; }
}

@media only screen and (min-width: 600px) {

    .chatt .header {
        margin: 0 auto;
    }
    .chatt .content {
        max-width: 600px;
        margin: 0 auto;
    }
    h1 {
        width: 600px;
    }
}

/* Overlay */
.overlay {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(1, 1, 12, 0.568);
    display: none;
}
.overlay.open {
    display: flex;
}
.overlay .box {
    background: var(--background);
    padding: var(--padding)
}

</style>

