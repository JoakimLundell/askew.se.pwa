<template>
    <div class="fullpage">
    
        <askew-text-sidebar></askew-text-sidebar>
        
        <div class="chatt">
        
            <!--div class="header" style="color: blue">
                <h1>Välkommen, {{userName}}</h1>
            </div-->
           
            <div class="content">
            
                <div class="scroll">
                    <div v-for="chatt in chatts" :key="chatt.key" class="message" :class="{'current': chatt.namn === userName }">
                        <div class="author">
                            <span class="name">{{chatt.namn}}</span> 
                            <span class="date" style="font-size:9px">{{chatt.date}}</span>
                        </div>
                        
                        <div class="text" @click="edit(chatt.key)">{{chatt.meddelande}}</div>
                        
                        <div class="buttons" :class="{'open':isOpen.includes(chatt.key)}">
                            <!--button>Ändra</button-->
                            <button @click="remove(chatt.key)" class="warning">Ta bort</button>
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
        <div style="background: var(--background); border-radius: var(--border-radius-snall);display: flex; flex-direction: column;align-items: flex-end;">
            <div style="padding: 6px;">
                <button @click="confirmDelete = false" class="invisible">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ffffff" class="blue"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>            
                </button>
            </div>
            <div style="padding: 0 24px 24px 24px;display: flex;align-items: center;flex-direction: column;">
                
                <h2>Ska vi radera den?</h2>
                
                <div class="buttons open">
                    <button @click="confirm(true)" class="green">Ja</button>
                    <button @click="confirm(false)" class="red">Nej</button>
                </div>
                    
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import AppWidth from '../components/AppWidth.vue'
import AskewTextSidebar from '@/components/AskewTextSidebar.vue'
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
    width: 100%;
    background: transparent;
    flex: 1;
    padding: var(--padding) var(--padding) var(--padding) 0
}
.chatt .header {
    padding: 0 var(--padding);
}
.chatt .content {
    padding: var(--padding);
    background: var(--content-background);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
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
    position: absolute;
    left:0;
    right: 0;
    bottom: 0;
}
.chatt .box input {
    border-radius: var(--border-radius-small);
    margin-right: 12px
}

.chatt .box button {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding);
}

.message .author {
    padding: 2px;
    color: var(--darkblue);
}

.message .author span.name{
    padding: 0px 6px;
    font-weight: bold;
    font-size: 1rem;
}

.message.current .author span.name{
    float: right;
}


.message.current .text {
    background: var(--darkblue);
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

@media only screen and (min-width: 800px) {

    /* pop out the type message box */
    .chatt .box {
        position: relative    
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

