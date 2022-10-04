import router from '@/router/index.js'
import {auth, database} from '../../plugins/firebase.js'

export default {
    namespaced: true,
    
    state: () => ({
        open: false,
        user: null,
        loading: false,
        name: null,
        trainers: null,
        form: {
            username: '',
            password: 'hataaik'
        }
    }),

    getters: {
        open (state) {
            return state.open
        },

        isLoggedin (state) {
            return (state.user) ? true : false
        },

        loading (state) {
            return state.loading
        },

        content (state) {
            return state.user
        },

        form (state) {
            return state.form
        },

        name (state) {
            return (state.user) ? state.name : 'Gäst' 
        },

        trainers (state) {
            return (state.user) ? state.trainers : 'Default' 
        },

        uid (state) {
            return (state.user) ? state.user.uid : '123456789' 
        },

    },

    mutations: {

        CLOSE (state) {
            state.open = false
        },

        OPEN (state) {
            state.open = true
        },

        SET_USER (state, payload) {
            state.user = payload
        },

        SET_FORM_USERNAME (state, payload) {
            state.form.username = payload
        },

        SET_NAME (state, payload) {
            state.name = payload
        },

        SET_TRAINERS (state, payload) {
            state.trainers = payload
        },

        SET_LOADING (state, payload) {
            state.loading = payload
        },

         
    },

    actions: {
        init({commit, dispatch}) {

            let username = localStorage.getItem('askew_latest_login');
            commit('SET_FORM_USERNAME', username)
        
            auth.onAuthStateChanged((user) => {
                
                commit('SET_LOADING', true)
        
                if (user) {
                    commit('SET_USER', user)
                    dispatch('getUserinfo', user.uid);
                    commit('SET_LOADING', false)
                } else {
                    commit('SET_USER', null)
                    commit('SET_LOADING', false)
                }
            })
        },

        logout({commit, dispatch}) {
            auth.signOut()
                .then( () => {
                    
                    commit('CLOSE')
                    dispatch('flash/send', 'Du loggades ut ', { root: true })
                    router.push('/')

                })
                .catch( (error) => {
                    console.log("signOut: Error " + error)
                })
        },

        signIn({commit, getters}) {
            
            let form = getters['form'];
            let email = form.username;
            let password = form.password;
            
            auth.signInWithEmailAndPassword(email, password)
                .then( () => {
                    localStorage.setItem('askew_latest_login', email);              
                    commit('CLOSE')
                })
                .catch( (error) => {
                    console.log("signIn: Error " + error)
                })
        },

        getUserinfo({commit}, uid) {
            
            database.ref('users-info/' + uid ).once('value')
            .then(function(snapshot) {
                let userinfo = snapshot.val(); 
                commit('SET_NAME', userinfo.nic);
                commit('SET_TRAINERS', userinfo.trainers);
            })

        },

        changeTrainers({commit, getters, dispatch}, trainers) {

            console.log(trainers)
            let uid = getters['content'].uid;
            let nic = getters['name'];

            database.ref("users-info/" + uid).set({
                nic: nic,
                trainers: trainers
            })
            .then(()=> {
                commit('SET_TRAINERS', trainers)
                //dispatch('updateCurrentTrainersOnMap', trainers)
            })
            .catch((error) => {
                //dispatch('sendFlash', error.message);

            })
            
        },
    }
}