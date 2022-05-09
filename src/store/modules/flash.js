export default {
    namespaced: true,

    state: () => ({
        flash: [],
        flashTimeout: 5000
    }),

    getters: {
        flash (state) {
            return state.flash
        },
        flashTimeout (state) {
            return state.flashTimeout
        }
    },

    mutations: {
        ADD_FLASH (state, payload) {
            state.flash.push(payload)
        },
        REMOVE_FLASH (state, id) {
            state.flash = state.flash.filter(item=>item.id != id );
        }
    },

    actions: {
        send({commit, getters}, data) {
            let id = getters['flash'].length;
            let timeout = getters['flashTimeout']; 
            
            commit('ADD_FLASH', {'id': id, 'message': data, timeout: timeout})
            
            setTimeout( function () { 
                commit('REMOVE_FLASH', id);
            }, timeout);
        }
    }
}