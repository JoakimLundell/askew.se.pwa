<template>
    <div class="wrapper">
        
        <h1>Samlingar</h1>
            
        <div style="height:36px"></div>

        <h2 style="position: relative">Lägg till ny samling<span v-if="edit" style="position: absolute; left:4px;transform: rotate(-4deg); background: white; color: var(--accent-color); padding: 2px 12px">Ändra</span></h2>

        
        <div class="venue" id="venue">
            <p>1. Skriv namn samlingen
               2. Välj sedan datum och tid.
               3. Klicka på kartan för att få koordinaterna
            </p>
            <div class="row">
                <label for="name">Mötesplatsens namn</label>
                <input type="text" name="name" v-model="venue.name" />
            </div>

            <div class="row">
                <label for="date">Mötesplatsens datum</label>
                <input type="datetime-local" name="date" v-model="venue.datetime"/>
            </div>
            
            <div>
                <l-map :center="map.center" :zoom="map.zoom" style="height: 250px;" @click="clickMap($event)">
		            <l-tile-layer :url="map.url"></l-tile-layer>
                   <l-marker v-if="venue.coords.lat && venue.coords.lng" :lat-lng="[venue.coords.lat,venue.coords.lng]">
			            <l-tooltip v-if="venue.name != ''" :options="{permanent: true}">{{venue.name}}</l-tooltip>
	  	            </l-marker>
                </l-map>
            </div>

            <div class="row">
                <label>Longitid / Latitud</label>
                <input type="text" name="lat" v-model="venue.coords.lat" style="width: 50%" disabled>
                <input type="text" name="lng" v-model="venue.coords.lng" style="width: 50%; margin-left: 12px" disabled>
                <input type="hidden" v-model="venue.key" />
            </div>
            
            <div class="row" style="display: flex; justify-content: space-between; flex-direction: row-reverse;">
                <button @click="save" class="green">{{ saveButtonText }}</button>
                <button v-if="edit" class="red" @click="clickDelete">Ta bort</button>
                <button v-if="edit" @click="resetVenue">Reset - Skapa ny möteplats</button>
            </div>
        </div>

        
        
            
            <h2>Alla samlingar</h2>
            
            <div v-for="venue in venues" :key="venue.key" @click="editVenue(venue.key)" class="venue-item">
                {{venue.datetime}} <b>{{venue.name}} </b>
            </div>
            
        
        
    </div>
    <!--hr />
    <h1>Alla Samlingar med hjältar</h1>
    <div>
        <div v-for="venue in venues" :key="venue.key" @click="editVenue(venue.key)" class="all__venue">
                {{venue.datetime}} {{venue.name}} 

                <template v-for="hero in heroes" :key="hero.key">
						<span v-if="hero.key === venue.key"> - {{hero.heroes}}</span>
					
				</template>
        </div>
    </div>
    <hr />
    <h1>Hjälte poäng!</h1>
    <div>
        <h2 v-for="person in points" :key="person.name">{{person.name}} = {{person.points}} poäng</h2>
    </div-->

</template>

<script setup>
</script>
<script>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle } from "@vue-leaflet/vue-leaflet";

import { mapGetters, mapActions } from 'vuex'

export default {

    components: {
		LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle
	},


    data() {
        return {
            venue: {
                key:null,
                name: null,
                datetime: null,
                coords: {
                    lat: null,
                    lng: null
                },
            },
            edit: false,
            map: {
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			    center: [59.3294, 18.0686], //Sthlm
			    zoom: 12,
            }
        }
    },

    computed: {
        ...mapGetters("venues", {
            venues: 'all'
        }),

        saveButtonText: function() {
            return (!this.edit) ? 'Spara ny plats' : 'Spara Ändring'
        },

        /*mergedHeroes: function() {
            let array = []
            console.log("hereos array size = " + this.heroes.length)
            this.heroes.forEach(element => {
                console.log(element.heroes)
                array = array.concat(element.heroes)
                console.log(array)
            });
            return array
        }*/
    },

    methods: {
        ...mapActions({
            //initVenue: 'initVenue',
            saveVenue: 'venues/save',
            removeVenue: 'removeVenue',
            sendFlash: 'sendFlash'
        }),

        save() {
            if(this.isValid()) {
                this.saveVenue(this.venue)
                this.resetVenue();
            } else {
                // Flash warning
                this.sendFlash('Alla fält måste vara ifyllda')
            }
            
        },

        editVenue(key) {
            this.edit = true;
            //console.log(key)
            this.venue = this.venues.find((v) => v.key === key)
            //console.log(this.venue.coords)
            
            // Center map on the current venue coords
            this.map.center = this.venue.coords

            document.querySelector('#venue').scrollIntoView({ 
                behavior: 'smooth' 
            });
        },

        resetVenue() {
            this.venue = {
                key:null,
                name: null,
                datetime: null,
                coords: {
                    lat: null,
                    lng: null
                }
            }
            this.edit = false;
        },

        clickMap(event) {
            
            if(event.latlng != undefined) {
                this.venue.coords.lat = event.latlng.lat
                this.venue.coords.lng = event.latlng.lng
            }
                
        },

        clickDelete() {
            this.removeVenue(this.venue.key)
            this.resetVenue
        },

        isValid() {
            return (this.venue.name != null && this.venue.coords.lat != null && this.venue.coords.lng != null && this.venue.datetime != null)
        }
    },

    mounted() {
        //this.initVenue();
    }
    
}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 var(--width)
}
.venue, 
.venues {
    width: 100%;
}

.venues {
    margin-right: 0;
}

.venue-item {
    border: 1px solid var(--lightgreen);
    color: var(--lightgreen);
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 6px;
}

.venue-item:hover {
    background: var(--accent-color);
    color: var(--white)
}

.row {
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--padding) 0;
}
.row > input {
    flex:1;
}
.row > label {
    color: white;
}

label {
    margin-right: 12px
}

@media only screen and (min-width: 600px) {
    .wrapper {
        
    }
    
    .venues {
        width: 50%;
        max-width: 400px;
    }

    .venue {
        width: 100%;
    }

    .venues {
        margin-right: var(--padding);
    }
            
}
</style>