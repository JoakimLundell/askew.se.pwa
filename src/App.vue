<template>
    <app-width>
    <!--askew-header :class="{'thin' : !$route.matched.some(({ name }) => name === 'home')}">
        
        <askew-back v-if="!$route.matched.some(({ name }) => name === 'home')"></askew-back>
        
        <div class="logo-width logo">
            <askew-logo :open="menuOpen" @close="clickBurger"></askew-logo>
        </div>
        
        <askew-page-title v-if="currentRouteName != 'home'">
            {{ currentRouteName }}
        </askew-page-title>
        
        <div v-if="loading">Loading..</div>
        <askew-burger @clickBurger="clickBurger" :open="menuOpen">Menu</askew-burger>
        <askew-login-icon 
          @toggle="toggleUserMenu" 
          :auth="userIsLoggedin" 
          :name="userName"
          :loading=loading()
          :open="userOpen">
        </askew-login-icon>
        
    </askew-header-->
  
    <askew-content>
            <!--AppHeader>Logo</AppHeader-->
            <!--nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </nav-->
            <router-view />
            <!--askew-main-menu :open="menuOpe_" @close="clickBurger"></askew-main-menu-->
            
            <!--askew-greyout :open="menuOpen" @close="clickBurger"></askew-greyout-->
            
            <!--askew-login-form 
              v-if="uersOpen" 
              @close="closeUser"
              @logout="logoutUser" 
              @login="loginUser"
              @changeTrainers="changeTrainers" 
              :auth="userContent" 
              :form="userForm"
              :name="userName"
              
              :shoes="userTrainers"></askew-login-form-->
    </askew-content>

    <askew-flash :flash="flash" @close="closeFlash"></askew-flash>
</app-width>
</template>

<script setup>
    //import AppHeader from '@/components/remove/AppHeader.vue'
    import AskewHeader from './components/AskewHeader.vue'
    import AskewLogo from './components/AskewLogo.vue'
    import AskewContent from './components/AskewContent.vue'
    import AskewMainMenu from './components/AskewMainMenu.vue'
    import AskewBurger from './components/AskewBurger.vue'
    import AskewLoginIcon from './components/AskewLoginIcon.vue'
    //import AskewLoginForm from './components/AskewLoginForm.vue'
    import AskewGreyout from './components/AskewGreyout.vue'
    import AskewFlash from './components/AskewFlash.vue'
    import AskewBack from './components/AskewBack.vue'
    import AskewPageTitle from './components/AskewPageTitle.vue'
    import AppWidth from './components/AppWidth.vue'
    
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import {useRoute} from 'vue-router'
    

    const store = useStore();
    const menuOpen = computed(() => store.getters['menu/open'])
    const userOpen = computed(() => store.getters['user/open'])
    const userIsLoggedin = computed(() => store.getters['user/isLoggedin'])
    const userContent = computed(()=> store.getters['user/content'])
    const userForm = computed(()=> store.getters['user/form'])
    const userName = computed(()=> store.getters['user/name'])
    const userTrainers = computed(()=> store.getters['user/trainers'])
    const userLoading = computed(()=> store.getters['user/loading'])
    const flash = computed(() => store.getters['flash/flash']);


    const geolocationLoading = computed(()=> store.getters['geolocation/loading'])
    const currentRouteName = computed(() => useRoute().name)    

    function clickBurger() {
        (menuOpen.value) ? store.commit('menu/CLOSE_MENU') : store.commit('menu/OPEN_MENU')
        store.commit('user/CLOSE');
    }

    function toggleUserMenu() {
        userOpen.value ? store.commit('user/CLOSE') : store.commit('user/OPEN') 
        store.commit('menu/CLOSE_MENU')
    }

    function closeFlash (id) {
        store.commit('flash/REMOVE_FLASH' , id)
    }

    function loading () {
        return (userLoading.value || geolocationLoading.value)
    }


    onMounted(() => {
        store.dispatch('user/init')
        store.dispatch('positions/init')
        
        
        store.dispatch('venues/init')
        store.dispatch('chatt/init')

        store.dispatch('geolocation/start')

        //store.dispatch('flash/send', 'Hejsan')
    }) 
    
    
    
</script>

<style>
html, body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
}
</style>
