<template>
    <div class="fullpage">
    
        <askew-text-sidebar></askew-text-sidebar>
        
        <div class="right-content login-view">
        
            <askew-login 
                :open="true"
                @close="closeUser"
                @logout="logoutUser" 
                @login="loginUser"
                @changeTrainers="changeTrainers" 
                :auth="userContent" 
                :form="userForm"
                :name="userName"        
                :shoes="userTrainers">
            </askew-login>
            
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import AskewTextSidebar from '@/components/AskewTextSidebar.vue'
import AskewLogin from '@/components/AskewLogin.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const userContent = computed(()=> store.getters['user/content'])
const userName = computed(()=> store.getters['user/name'])
const userForm = computed(()=> store.getters['user/form'])
const userTrainers = computed(()=> store.getters['user/trainers'])


function closeUser () {
        store.commit('user/CLOSE'); 
}

function logoutUser () {
    store.dispatch('user/logout'); 
}

function loginUser () {
    store.dispatch('user/signIn'); 
}

function changeTrainers (name) {
    store.dispatch('user/changeTrainers', name); 
}
//const message = ref('')
//const isOpen = ref([])
//const deleteKey = ref('')
//const confirmDelete = ref(false)



/*function send () {

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
} */

onMounted(() => {
    // Move to App
    //store.dispatch('chatt/init')
})
</script>

<style scoped>
    .login-view {
        background: var(--content-background); 
        border-radius: var(--border-radius);
        margin: var(--padding) var(--padding) var(--padding) 0;
    }

.chatt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background: transparent;
    flex: 1;
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
        
    }
    .chatt .content {
        
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

