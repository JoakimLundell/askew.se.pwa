import { database } from '../../plugins/firebase.js'

/* Venue works together with Heroes */

export default {
    namespaced: true, 

    state: () => ({
        venues: [],
        heroes: []
    }),

    getters: {
        all (state) {
            return state.venues
        },
        
        heroes (state) {
            return state.heroes
        },
        
        active (state) {
            const isToday = (someDate) => {
                const today = new Date()
                return someDate.getDate() == today.getDate() &&
                  someDate.getMonth() == today.getMonth() &&
                  someDate.getFullYear() == today.getFullYear()
            }
            
            return state.venues.filter(item => isToday(new Date(item.datetime)) );
        },

        currentHeroes (state, getters) {
            
            const isInCurrentVenues = (key) => {
                return getters.currentVenue.find(venue => venue.key === key)
            }
            
            return state.heroes.filter(item => isInCurrentVenues(item.key))
        },

        heroPoints (state) {
            let array = []
            let unique = []
            let final = []
            
            state.heroes.forEach(element => {
                array = array.concat(element.heroes)        
            });

            /* Count uniques */
            array.forEach((item) => {
                unique[item] = 1 + (unique[item] || 0);
            })
            
            /* Create array from unique */
            for(let key in unique){
                final.push({name: key, points: unique[key]});
            }
            
            /* Sort and reverse */
            final.sort((a,b) => {return a.points - b.points}).reverse()

            return final
        }
    },

    mutations: {
        SET_VENUES (state, payload) {
            state.venues = payload
        },
        SET_HEROES (state, payload) {
            state.heroes = payload
        },
    },

    actions: {
        init({commit, dispatch}) {
            
            let ref = database.ref("venues");    
            ref.on("value", function(snapshot) {
               
                //console.log(snapshot.val());
                //let json = snapshot.val();
                let v = [];
                snapshot.forEach((snapshotChild) => {
                    v.push(snapshotChild.val())
                })

                v.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.datetime) - new Date(a.datetime);
                });
                  
                commit('SET_VENUES', v );

                dispatch('initHeroes')
                
        
            });

        },

        save({commit, dispatch, rootGetters}, venue){
            
            if(venue.key == null) {
                // Get key for new a venue .
                venue.key = database.ref().child('venues').push().key;
            }

           
            let data = {
                key: venue.key,
                name: venue.name,
                datetime: venue.datetime,
                coords: venue.coords,
                user: rootGetters['user/name'],
                timestamp: Date(),

            };
    
            let updates = {};
            updates['/venues/' + venue.key] = data;
                
            database.ref().update(updates).catch((error) => {
                dispatch('flash/send', error, {root: true});
            });
           
        },

        

        removeVenue({dispatch}, id){
             
            if(store.getters['authenticated']) {
                let venue = database.ref('venues/' + id );
                venue.remove();
                dispatch('sendFlash', 'Ok, plockar bort det samlingstället');
            } else {
                dispatch('sendFlash', 'Du måste vara inloggad för att kunna ta bort en samlingsplats', { root: true });
            }
        },

        async addHeroToVenue({rootGetters}, key) {
            
            let heroes = [];
            let name = rootGetters['user'].name;
            let ref = database.ref("heroes/" + key + '/heroes');
            
            await ref.once('value').then((snapshot) => {
                
                heroes = (snapshot.val()) ? snapshot.val() : []
                
                let includes = heroes.includes( name )
                if(!includes) {

                    heroes.push( name )
                }
            })
            // Update Heroes for current venue
            return database.ref('heroes/' + key).update({key: key, heroes: heroes})

        },

        initHeroes({commit, dispatch}) {
            
            
        
            let ref = database.ref("heroes");    

            ref.on("value", function(snapshot) {
                
                let response = [];

                snapshot.forEach((snapshotChild) => {
                    response.push(snapshotChild.val())
                })

                commit('SET_HEROES', response );
        
            });

        }
        

    }
}