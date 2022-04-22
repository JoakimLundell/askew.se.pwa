import { database } from '../../plugins/firebase.js'

export default {
    namespaced: true,

    state: () => ({
        loading: false,
        chatts: []
    }),

    getters: {
        chatts (state) {
            return state.chatts
        },

        loading (state) {
            return state.loading
        }
    },

    mutations: {
        SET_CHATTS (state, payload) {
            state.chatts = payload
        }
    },

    actions: {
        init({commit, dispatch}) {
            
            var ref = database.ref("posts");    
            ref.on("value", function(snapshot) {
               
                let json = snapshot.val();
                let items = [];
                for (let index in json) {
                    let o = json[index];
                    // Adding key for futher reference
                    o.key = index
                    items.push(o)
                }
                commit('SET_CHATTS', items.reverse() );
                //console.log(snapshot.val())
        
            });

        },

        send({commit, dispatch, rootGetters}, message){

            let name =  rootGetters['user/name'];

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var HH = today.getHours();
            var MM = today.getMinutes();
            var ss = today.getMinutes();

            today = yyyy + '-' + mm + '-' + dd + ' ' + HH + ":" + MM + ":" + ss;
            
            
            var postData = {
                namn: name,
                uid: null,
                meddelande: message,
                starCount: 0,
                date: today,
                timestamp: Date()
            };
            console.dir(postData)
            // Get key for new chatt message.
            let newKey = database.ref().child('posts').push().key;
            let updates = {};
            updates['/posts/' + newKey] = postData;
            
            database.ref().update(updates);
        },

        remove({dispatch, rootGetters}, id){

            console.log(id)
             
            if(rootGetters['user/isLoggedin']) {
                let message = database.ref('posts/' + id );
                message.remove();
                //dispatch('sendFlash', 'Ok, bort med den');
            } else {
                //dispatch('sendFlash', 'Du måste vara inloggad för att kunna ta bort inlägg', { root: true });
            }
        },

        

    }
}