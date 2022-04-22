<template>
    <div class="map">
        <div class="controls">
            
            <div class="accordion" @click="showVenueInfo =!showVenueInfo">
                <span v-if="venueActive">
                    <span>Dagen samling: </span> 
                    <span v-for="venue in venueActive" :key="venue.id">
                        {{venue.name}}
                    </span>
                </span>
                <span v-else>Samlingar </span>
                <span class="arrow">

                    <span v-if="showVenueInfo">Dölj</span>
                    <span v-else>Visa</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff" :class="{'open' : showVenueInfo}"><path d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"/></svg>

                </span>    
            </div>

            <div class="venueInfo" :class="{'open': showVenueInfo}">
               <div v-for="venue in venueActive" :key="venue.key" @click="flyTo(venue.coords)">
                   <p>Namn:  {{venue.name}}</p>
                   <p>Plats: {{venue.coords}}</p>
                   <p>Tid: {{venue.datetime}}</p>
               </div
               >
               <div class="links">
                    <router-link class="link" to="/venue">Visa alla samlingar</router-link>
                    <router-link class="link" to="/venue">Lägg till samling</router-link>
               </div>
                
            </div>
            

            <hr />
            
            <div class="accordion" @click="showUserLinks = !showUserLinks">
                <span>Personer online ({{positions.length}}):</span>
                <span class="arrow"> 
                    <span v-if="showUserLinks">Dölj</span>
                    <span v-else>Visa</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff" :class="{'open':showUserLinks}"><path d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"/></svg>
                </span>       
                
                <!--button v-else class="invisible" @click="showUserLinks = true"> 
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff"><path d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"/></svg>
                </button-->       
            
            </div>
     
            <div class="userLinks" :class="{'open': showUserLinks}"> 
                <span 
                    v-for="position in positions" 
                    :key="position.key"
                    class="link"
                    :class="{'inactive' : !position.active}"
                    @click="flyTo([position.latitude, position.longitude])">
                    {{position.name}}
                </span>
                
            </div>
            <!--div>{{config}}</div-->

            <!--div style="color: yellow">Positions: Loading: {{positionsLoading}} | Content: {{positions}}</div-->
        </div>
        <div id="map" style="padding: 0 var(--width);">
            <l-map
                ref="myMap"
                :center="config.center" 
			    :zoom="config.zoom"
                @ready="mapReady"
                style="border-top-left-radius: 12px;border-top-right-radius: 12px;"
                >
                <l-control-layers
			    position="topright"
			    :collapsed="false"
			    ></l-control-layers>

                <l-tile-layer
                v-for="tile in tiles"
                :key="tile.name"
                :name="tile.name"
                :visible="tile.visible"
                :url="tile.url"
                :attribution="tile.attribution"
                layer-type="base"
                ></l-tile-layer>

                <!-- Markers and Trails -->
                <template v-for="marker in positions" :key="marker.id">

                    <l-marker :lat-lng="[marker.latitude, marker.longitude]">

                        <l-icon 
						:icon-url="'/img/trainers/'+ marker.icon"
						:icon-size="[30, 30]">
					    </l-icon>

                        <l-tooltip>{{marker.name}}</l-tooltip>
                    </l-marker>
                    
                </template>

                <!-- Current active venues -->
			<l-circle
				v-for="cv in venueActive"
				:name="cv.key"
				:key="cv.key"
      			:lat-lng="[cv.coords.lat, cv.coords.lng]"
      			:radius=130
      			color='transparent'
				:fill="true"
        		:fillOpacity="0.5"
        		fillColor='346d92'
				@ready="circleReady" />

            
            </l-map>
        </div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css"
//import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle, LCircleMarker, LControlZoom, LPolyline, LLayerGroup, LControl, LControlLayers } from "@vue-leaflet/vue-leaflet";
import { latLngBounds, latLng } from "leaflet/dist/leaflet-src.esm";

import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const { onMounted }=require("@vue/runtime-core");

const store = useStore();
let myMap = ref(null)
let map = null
const showUserLinks = ref(false)
const showVenueInfo = ref(false)
const config = computed(()=> store.getters['map/config'])
const tiles = computed(()=> store.getters['map/tileProviders']) 

/*Positions */
const positionsLoading = computed(() => store.getters['positions/loading'])
const positions = computed(() => store.getters['positions/all'])

/*Venues*/
const venueActive = computed(() => store.getters['venues/active'])


function mapReady () {
    map = myMap.value.leafletObject
} 
function flyTo (coords) {
    map.flyTo(coords, 17)
}

function initGeolocation () {
    // Init Geolocation
    store.dispatch('geolocation/start')
    // Init positions move to App

}



onMounted(() => {
    initGeolocation()
    tunnelInUserLinks()
})

function tunnelInUserLinks() {
    showUserLinks.value = true
    setTimeout(() => {
        showUserLinks.value = false
    }, 5000)
}
</script>

<style scoped>
.map {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.controls {
    padding: 0 var(--width)
}

#map {
    flex: 1; 
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: transparent;
}

.userLinks {
    display:flex; 
    flex-wrap: wrap; 
    justify-content: flex-start; 
    align-items: center;
    max-height: 0;
    overflow: hidden;
    transition: all 1s ease;
}

.venueInfo {
    display:flex; 
    justify-content: space-between; 
    align-items: center;
    max-height: 0;
    overflow: hidden;
    transition: all 1s ease;
}

.userLinks.open,
.venueInfo.open {
    max-height: 150px;
    transition: all 1s ease;
}

.userLinks .link {
    cursor: pointer;
    color: var(--lightgreen); 
    padding: 4px 12px; 
    margin: 0 8px 16px 8px;
    border: 1px solid var(--lightgreen);
    border-radius: 2px;
    transition: all 1.5s ease;
}

.userLinks .link:hover,
.userLinks .link:active {
    color: var(--white); 
    border: 1px solid var(--white);
    transition: all .5s ease;
    
}

.userLinks .link.inactive {
    color: rgba(192, 192, 192, 0.7); 
    border: 1px solid rgba(192, 192, 192, 0.7);
    transition: all .5s ease;    
}
.userLinks .link.inactive:hover {
    color: rgba(192, 192, 192, 1); 
    border: 1px solid rgba(192, 192, 192, 1);
    transition: all .5s ease;
}

hr {
    border: none;
    height: 1px;
    color: #333; /* old IE */
    background-color: #333; /* Modern Browsers */
    margin:0;
}

.accordion {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    height: 40px;
    color: white;
    cursor: pointer;
}
.arrow {
    display: flex;
    align-items: center;
}
svg { transition: 1s ease;}
svg.open {
    transform: rotate(180deg);
    transition: 1s ease;
}

div.links {
    display: flex;
    flex-direction: column;
}
a.link {
    display: inline-block;
    background: var(--accent-color);
    color: var(--white);
    padding: 6px 12px;
    transform: rotate(-4deg);
    margin: 20px 10px;
}
a.link:nth-child(2) {
    transform: rotate(4deg) translateX(-30px);
}

a.link:hover {
    background: var(--accent-hover);
}
</style>
