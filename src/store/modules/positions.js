import { database } from '../../plugins/firebase.js'

export default {
    namespaced: true,
    
    state: () => ({
        loading: false,
        positions: []
    }),

    getters: {
        loading (state) {
            return state.loading
        },

        all (state) {
            return state.positions
        },

        users (state) {
            return state.positions.map(element => { return element.name})
        }
    },

    mutations: {

        SET_LOADING (state, payload) {
            state.loading = payload
        },

        SET_POSITIONS (state, payload) {
            state.positions = payload
        }
    },

    actions: {
        init({commit, dispatch, getters}) {
         
            commit('SET_LOADING', true)
            
            let ref = database.ref("positions");
            
            ref.on("value", function(snapshot) {
                //let positions = snapshot.val();
                let positions = []

                // Remove old positions
                //console.log(snapshot.val())
                
                snapshot.forEach((snapshotChild) => {
                    // position
                    let item = snapshotChild.val()
                    
                    // Remove old
                    var ONE_HOUR = 60 * 60 * 1000; /* ms */
                    var TWO_DAYS = 2 * 24 * 60 * 60 * 1000; /* ms */

                    let position = snapshotChild.val()
                    if(position.updated) {
                        
                        let lastupdated = new Date(position.updated)
                        
                        let active = ((new Date) - lastupdated) < ONE_HOUR
                    
                        item['active'] = active 
                        
                        let keep = ((new Date) - lastupdated) < TWO_DAYS
                        
                        item['keep'] = keep

                    }
                    if(!item['keep']) {
                        dispatch('removePosition', snapshotChild.val().uid )
                    }

                    // trail
                    let id = snapshotChild.val().uid;
                    //let trail = rootGetters['trail'](id) ;

                    //item['trail'] = trail;
                    //console.dir(item)
                        
                    positions.push(item)
                    
                
                })
                commit('SET_POSITIONS', positions)
               
            });
            
            setTimeout(()=> {
                commit('SET_LOADING' , false)
            }, 1000)
                    

            
            
        },

        removePosition({}, payload) {
            let position = database.ref('positions/' + payload );
            position.remove();
        }

        
    }
}