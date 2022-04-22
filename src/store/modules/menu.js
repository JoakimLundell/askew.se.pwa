export default {
    namespaced: true,
    
    state: () => ({
        open: false
    }),

    getters: {
        open (state) {
            return state.open
        }
    },

    mutations: {

        CLOSE_MENU (state) {
            state.open = false
        },

        OPEN_MENU (state) {
            state.open = true
        }
         
    },

    actions: {
        
    }
}