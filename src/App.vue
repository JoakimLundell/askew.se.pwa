<template>
    <askew-header>
        <askew-burger @clickBurger="clickBurger" :open="menuOpen">Menu</askew-burger>
        <askew-logo :open="menuOpen" @close="clickBurger"></askew-logo>
<!--
{{userLoading}} {{geolocationLoading}}
-->
        <askew-login-icon 
          @toggle="toggleUserMenu" 
          :auth="userIsLoggedin" 
          :name="userName"
          :loading=loading()
          :open="userOpen">
        </askew-login-icon>
        
    </askew-header>
    <askew-content>
            <!--AppHeader>Logo</AppHeader-->
            <!--nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </nav-->
            <router-view/>
            <!--askew-main-menu :open="menuOpe_" @close="clickBurger"></askew-main-menu-->
            <askew-greyout :open="menuOpen" @close="clickBurger"></askew-greyout>
            
            <askew-login-form 
              v-if="userOpen" 
              @close="closeUser"
              @logout="logoutUser" 
              @login="loginUser"
              @changeTrainers="changeTrainers" 
              :auth="userContent" 
              :form="userForm"
              :name="userName"
              
              :shoes="userTrainers"></askew-login-form>
    </askew-content>
</template>
<script setup>
    import AppHeader from '@/components/AppHeader.vue'
    import AskewHeader from './components/AskewHeader.vue'
    import AskewLogo from './components/AskewLogo.vue'
    import AskewContent from './components/AskewContent.vue'
    import AskewMainMenu from './components/AskewMainMenu.vue'
    import AskewBurger from './components/AskewBurger.vue'
    import AskewLoginIcon from './components/AskewLoginIcon.vue'
    import AskewLoginForm from './components/AskewLoginForm.vue'
    import AskewGreyout from './components/AskewGreyout.vue'

    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
    

    const store = useStore();
    const menuOpen = computed(() => store.getters['menu/open'])
    const userOpen = computed(() => store.getters['user/open'])
    const userIsLoggedin = computed(() => store.getters['user/isLoggedin'])
    const userContent = computed(()=> store.getters['user/content'])
    const userForm = computed(()=> store.getters['user/form'])
    const userName = computed(()=> store.getters['user/name'])
    const userTrainers = computed(()=> store.getters['user/trainers'])
    const userLoading = computed(()=> store.getters['user/loading'])

    const geolocationLoading = computed(()=> store.getters['geolocation/loading'])
    

    function clickBurger() {
        (menuOpen.value) ? store.commit('menu/CLOSE_MENU') : store.commit('menu/OPEN_MENU')
        store.commit('user/CLOSE');
    }

    function toggleUserMenu() {
        userOpen.value ? store.commit('user/CLOSE') : store.commit('user/OPEN') 
        store.commit('menu/CLOSE_MENU')
    }

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

    function loading () {
        return (userLoading.value || geolocationLoading.value)
    }


    onMounted(() => {
        store.dispatch('user/init')
        store.dispatch('positions/init')
        store.dispatch('venues/init')
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

/*nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
