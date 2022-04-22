export default {
    namespaced: true,
    
    state: () => ({
        config: {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			center: [59.3294, 18.0686], //Sthlm
			zoom: 15,
			maxZoom: 18,
        },
        tileProviders: [{
            name: 'Karta',
            visible: true,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: null
        },{
            name: 'Satellit',
            visible: false,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles &copy; Esri &mdash'
        }],
    }),

    getters: {
        config (state) {
            return state.config
        },

        tileProviders (state) {
            return state.tileProviders
        }
    },

    mutations: {

        SET_LOADING (state, payload) {
            state.loading = payload
        },

        SET_WATCHID (state, payload) {
            console.log('Setting new watch id = ' + payload)
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
                console.log('No watch id set')

                let options= {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }

                let id = navigator.geolocation.watchPosition( position => {
                    commit('SET_COORDS', position.coords)
                    commit('SET_WATCHID', id)

                    
                    // Save your position to db
                    //dispatch('savePosition', position.coords)
                    console.log("Spara din position i databasen")
                    
                    //commit('CLOSE_GEOLOCATION_SCREEN')
                    setTimeout(()=> {
                        commit('SET_LOADING' , false)
                    }, 1000)
                    

                }, (error) => {

                    console.dir(error)
                    //commit('SET_ERROR', error)
                    //dispatch('sendFlash', "Geolocation Error: " + error.message)
                    commit('SET_LOADING' , false)
            
                }, options )

            }
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