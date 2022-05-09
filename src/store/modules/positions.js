import { database } from '../../plugins/firebase.js'
const { DateTime } = require("luxon");

export default {
    namespaced: true,

    state: () => ({
        loading: false,
        positions: []
    }),

    getters: {
        loading(state) {
            return state.loading
        },

        all(state) {
            return state.positions
        },

        users(state) {
            return state.positions.map(element => { return element.name})
            //return []
        }
    },

    mutations: {

        SET_LOADING(state, payload) {
            state.loading = payload
        },

        SET_POSITIONS(state, payload) {
            //console.log("Sparar positioner..")
            //console.dir(payload)
            state.positions = payload
        }
    },

    actions: {
        init({ commit, dispatch, getters }) {

            commit('SET_LOADING', true)

            let ref = database.ref("positions");

            ref.on("value", function (snapshot) {
                //let positions = snapshot.val();
                let positions = []
                //dispatch('flash/send', 'Fick nya positioner', { root: true })
                // Remove old positions
                //console.log(snapshot.val())

                //let TWO_DAYS_AGO = DateTime.local().plus({ days: -2 })
                let ONE_HOUR_AGO = DateTime.local().plus({ hours: -1 })
            
                snapshot.forEach((snapshotChild) => {

                // position
                let item = snapshotChild.val()

                item['active'] = true 
                
                //let position = snapshotChild.val()
                if(item.updated) {
                    
                    let lastupdated = DateTime.fromISO(item.updated)
                    let active = (lastupdated > ONE_HOUR_AGO)
                        
                    
                    
                    item['active'] = active 
                
                    /*if(!item['keep']) {
                        dispatch('flash/send', 'Ready to delete ' + item.name + ' because keep=' + item['keep'], {root:true})
                    }*/
                    

                }

                /*if(!item['keep']) {
                    dispatch('flash/send', 'ready to delete' + item.uid, {root:true})
                    dispatch('removePosition', item.uid )
                }*/

                // trail
                //let id = snapshotChild.val().uid;
                //let trail = rootGetters['trail'](id) ;

                //item['trail'] = trail;
                //console.dir(item)

                positions.push(item)


                })
                commit('SET_POSITIONS', positions)

            });

            setTimeout(() => {
                commit('SET_LOADING', false)
            }, 1000)




        },

        async removePosition({ dispatch}, payload) {
            let p = database.ref('positions/' + payload);
            p.remove();
        },

        /* Save position to database */
        save({ dispatch, getters, rootGetters }, coords) {
            
            


            
           if (rootGetters['user/isLoggedin']) {
                console.log("spara position - Du är inloggad")

                var post = {
                    uid: rootGetters['user/uid'],
                    name: rootGetters['user/name'],
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                    speed: coords.speed,
                    accuracy: coords.accuracy,
                    updated: DateTime.now().toISO(),
                    icon: rootGetters['user/trainers']
                }

                // Save position in positions database
                let key = post.uid;
                database.ref('positions/' + key).update(post);

                // Only add trail if venues are active today 
                // console.log(rootGetters['currentVenue'].length)
                //if(rootGetters['currentVenue'].length > 0) {
                //    dispatch("addTrailNew", coords)    
                //}


            } else {
                /*setTimeout(() => {
                    dispatch('flash/send', 'Du är inte inloggad, vem är du?', { root: true })
                
                }, 1000)*/
                //console.log("spara position - Du är INTE inloggad")
                // Don't save position if user not signed in
                //console.log("Your are not signed in")
            }

            /* This is a mess */

            let positions = getters['all']
            let TWO_DAYS_AGO = DateTime.local().plus({ days: -2 })
            
            positions.forEach( position => {
                
                let lastupdated = DateTime.fromISO(position.updated)
                let keep = (lastupdated > TWO_DAYS_AGO)
                
                if(!keep) {
                    dispatch('flash/send', 'Avslutad position, plockar bort ' + position.name, { root: true })
                    dispatch('removePosition', position.uid)
                } 
                
            })



        },


    }
}