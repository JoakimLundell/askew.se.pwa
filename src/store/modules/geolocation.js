export default {
    namespaced: true,
    
    state: () => ({
        loading: false,
        coords: null,
        watchid: null,
        error: []
    }),

    getters: {
        loading (state) {
            return state.loading
        },
        coords (state) {
            return state.coords
        },
        
        watchid (state) {
            return state.watchid
        },
        
        error (state) {
            return state.error
        },

        /*status () {
            let status = []
            if (navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(function(position) {
                    status.push("Geolocation OK by user");
                },
                function(error) {
                    if (error.code == error.PERMISSION_DENIED)
                        status.push("Geolocation denied by user");
                });

            } else {
                status.push("Geolocation is not supported by this browser.");
            }
            return status
        }*/

    },

    mutations: {

        SET_LOADING (state, payload) {
            state.loading = payload
        },

        SET_WATCHID (state, payload) {
            state.watchid = payload
        },

        SET_COORDS (state, payload) {
            state.coords = payload
        }
    },

    actions: {
        start({commit, getters}) {
            
            commit('SET_LOADING', true)
            
            let id = getters['watchid'];
            
            if(!id) {
                
                let options= {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }

                if (navigator.geolocation) {
                
                    let id = navigator.geolocation.watchPosition( position => {
                        commit('SET_COORDS', position.coords)
                        commit('SET_WATCHID', id)
                        // Save your position to db
                        //dispatch('savePosition', position.coords)
                    }, (error) => {
                        console.dir(error)
                        //commit('SET_ERROR', error)
                        //dispatch('sendFlash', "Geolocation Error: " + error.message)
                        commit('SET_LOADING' , false)
                    }, options )

                } else {
                    error.push("Geolocation is not supported by this browser.");
                }
            }
            commit('SET_LOADING' , false)
        },

        stop({commit, dispatch, getters}) {
            navigator.geolocation.clearWatch(getters['watchid']);
            commit("SET_WATCHID", null);
            commit("SET_COORDS", null);
            //dispatch('removePosition')
            //dispatch('sendFlash', "Geolocation stoppad");
        },
    }
}