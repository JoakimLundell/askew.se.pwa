<template>
    
    <div class="login" @click="clickOutsid_">
        
        
        <div class="box" v-focus>
            
            <template v-if="auth">
                
                <h2 style="color: var(--background)">Användare: {{ name }}</h2>
                <h3> Här kan du byta trainers</h3>
                <div class="trainers">
                    <img 
                        v-for="trainer in trainers" 
                        :key="trainer.id"
                        :alt="trainer.name" 
                        :src='trainer.url'
                        :class="{'active': trainer.name == shoes}"
                        @click="changeTrainers(trainer.name)"
                        class="item"/>
                </div>

                <div class="spacing"></div>
                
                <askew-geolocation></askew-geolocation>
                
                <div class="spacing"></div>
                
                <button type="submit" @click="logout" class="red">Logout</button>

            </template>
            
            <template v-else>

                <h2>Logga in</h2>
                <form @submit.prevent>
                <label for="username">E-post</label>
                <input id="username" type="text" v-model="form.username">
                <label for="password">Lösenord</label>
                <input id="password" type="password" v-model="form.password">
                <button class="green" @click="login">Login</button>
                </form>
            </template>
            
            <!--div class="close" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                <span>Stäng</span>
            </div-->
        </div>
        
    </div>
  
</template>

<script setup>
    import AskewGeolocation from './AskewGeolocation.vue'
    import { onMounted, ref } from '@vue/runtime-core'  
    const props = defineProps(['auth', 'form', 'name', 'shoes'])
    const emit = defineEmits(['close', 'logout', 'login', 'changeTrainers'])

    /* Move this to App and send as props from vuex? */
    const trainers = ref([])
    trainers.value.push({id: 1, name: 'trainers1.png', url: '/img/trainers/trainers1.png'})
    trainers.value.push({id: 2, name: 'trainers2.png', url: '/img/trainers/trainers2.png'})
    trainers.value.push({id: 3, name: 'trainers3.png', url: '/img/trainers/trainers3.png'})
    trainers.value.push({id: 4, name: 'trainers4.png', url: '/img/trainers/trainers4.png'})
    trainers.value.push({id: 5, name: 'trainers5.png', url: '/img/trainers/trainers5.png'})
    trainers.value.push({id: 6, name: 'trainers6.png', url: '/img/trainers/trainers6.png'})
    trainers.value.push({id: 7, name: 'trainers7.png', url: '/img/trainers/trainers7.png'})
    trainers.value.push({id: 8, name: 'trainers8.png', url: '/img/trainers/trainers8.png'})
    trainers.value.push({id: 9, name: 'trainers9.png', url: '/img/trainers/trainers9.png'})
    trainers.value.push({id: 10, name: 'trainers10.png', url: '/img/trainers/trainers10.png'})
            

    function clickOutside () {
        console.log("Klickar utanför rutan")
    }

    function close () {
        emit('close')
    }

    function logout () {
        emit('logout')
    }

    function login () {
        emit('login')
    }

    const vFocus = {
        mounted: (el, binding, vnode) => {
    
            el.clickOutsideEvent = function(event) {
                if (!(el === event.target || el.contains(event.target))) {
                    
                    if(event.target.parentElement.nodeName == "SECTION") {
                       close();
                    }
                    
                } 
                
            };

           document.body.addEventListener('click', el.clickOutsideEvent);
            
        }, 
        unmounted: (el) => {
            document.body.removeEventListener('click', el.clickOutsideEvent);
        }

    }

    function changeTrainers (name) {
        emit('changeTrainers', name)
    }

    

</script>

<style scoped>
.login {
    position: absolute;
    top: var(--header);
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    /*background: rgba(0,0,0,0.5);*/
     /*animation: 1s appear;*/
    z-index: var(--z-top); 
    box-sizing: border-box;
    
}

h2 { color: var(--background)}

.box {
    background: #3e445a;
    background: snow;
    
    /*transform: translateY(90)*/
    transform-origin: right;
    animation: 1s appear;
    box-shadow: -2px 4px 4px #08374ba6;
    border-left: 6px solid var(--background);
    border-right: 6px solid var(--background);
    border-bottom: 6px solid var(--background);

}
.box,
.box form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    /*background: var(--background);*/
    padding: var(--padding);
    
}
.box > h2, .box > label {color: var(--background)}

.box input{
    border: 1px solid var(--background);
    margin-bottom: 20px;
}
.box button {
    margin-top: 20px;
}
/*.box h2 {
    margin-bottom: 30px;
    margin-top: 0;
} */

/*.close {
    position: absolute;
    right: var(--padding);
    top: var(--padding);
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 10px;
}
.close svg {
    fill: var(--white)
}

.close:hover {
    color: var(--accent-color);
}

.close:hover svg {
    fill: var(--accent-color);
}*/

.trainers {
    padding: 6px;
    background: rgba(127, 127, 127, 0.1);
}
.trainers > * {
    padding: 12px;
}

.trainers > *.active {
    background: #aae0cb;
    /*border: 1px solid var(--background)*/
}

@keyframes appear {
    0% {
        opacity: 0;
        transform: perspective(1200px) rotateY(-90deg);
    }
}

@media only screen and (min-width: 600px) {
        .box,
        .box form {
            padding: 30px 8vw 30px 30px;
        }
        
    }
div.spacing {
    height: 24px;
}
</style>