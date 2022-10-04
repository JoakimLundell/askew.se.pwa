<template>
    <div class="map">

        <div class="controls">

            <div class="control-buttons" >

                <askew-back></askew-back>
            
                <button v-for="venue in venueActive" :key="venue.key" @click="flyTo(venue.coords)" class="blue">Dagens samling! {{venue.name}}</button>
 
            </div>
            <!--div class="accordion" @click="showVenueInfo =!showVenueInfo" >
                <span v-if="venueActive.length > 0">
                    <span>Dagens samling: </span>
                    
                        <span v-for="venue in venueActive" :key="venue.id">
                        {{venue.name}}
                        </span>

                    
                </span>
                <span v-else>Samlingar </span>
                <span class="arrow">

                    <span v-if="showVenueInfo">Minimera</span>
                    <span v-else>Visa mer</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff" :class="{'open' : showVenueInfo}"><path d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"/></svg>

                </span>    
            </div-->

            <!--div class="venueInfo" :class="{'open': showVenueInfo}">
               <div v-for="venue in venueActive" :key="venue.key" @click="flyTo(venue.coords)">
                   <p>Namn:  {{venue.name}}</p>
                   <p>Plats: {{venue.coords}}</p>
                   <p>Tid: {{venue.datetime}}</p>
               </div
               >
               <div class="links" :class="{'no-venue': venueActive.length == 0}" style="margin-left: 20px;">
                    <router-link class="link" to="/venue">Visa alla samlingar</router-link>
                    <router-link class="link" to="/venue">Lägg till samling</router-link>
               </div>
                
            </div-->
            

            <hr />
            
            <div class="accordion" @click="showUserLinks = !showUserLinks">
                <span>Personer online ({{positions.length}}):</span>
                <span class="arrow"> 
                    <span v-if="showUserLinks">Minimera</span>
                    <span v-else>Visa mer</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff" :class="{'open':showUserLinks}"><path d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"/></svg>
                </span>       
                
                <!--button v-else class="invisible" @click="showUserLinks = true"> 
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff"><path d="M10 12.812 5 7.812 6.229 6.583 10 10.354 13.771 6.583 15 7.812Z"/></svg>
                </button-->       
            
            </div>
     
            <div class="userLinks" :class="{'open': showUserLinks}"> 
                <!--div style="width: 100%; color:white;">Grön ram = aktiv senaste timmen. Grå ram = inaktiv. Efter 2 dagar plockas man bort.</div-->   
                <a 
                    href=""
                    v-for="position in positions" 
                    :key="position.key"
                    class="user"
                    :class="{'inactive' : !position.active}"
                    @click.prevent="flyTo([position.latitude, position.longitude])">
                    {{position.name}}
                </a>
                <!--a href="" class="frame"  @click.prevent="fitBounds()">Centrera över positioner</a>
                <a href="" class="frame" v-for="venue in venueActive" :key="venue.key" @click.prevent="flyTo(venue.coords)" > Visa samling</a-->

                
                <!--pre style="overflow: scroll">
                    {{positions}}
                </pre-->
                
                    <router-link class="button small blue" to="/venue" style="margin-right: 10px;">Visa alla samlingar</router-link>

                    <router-link class="button small blue" to="/venue"> + Lägg till ny samling</router-link>  

                
            </div>
            <!--div>{{config}}</div-->

            <!--div style="color: yellow">Positions: Loading: {{positionsLoading}} | Content: {{positions}}</div-->
        </div>
        <div id="map">
            <l-map
                ref="myMap"
                :center="config.center" 
			    :zoom="config.zoom"
                :maxZoom="19"
                @ready="mapReady"
                style="border-radius: var(--border-radius)"
                :options="{ zoomControl: false}"
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
				@ready="circleReady">

            </l-circle>
            <l-marker 
                v-for="cv in venueActive"
                :key="cv.key"
                :lat-lng="[cv.coords.lat, cv.coords.lng]">

                
                <l-tooltip :options="{ permanent: true, interactive: true }">{{cv.datetime}} {{cv.name}} </l-tooltip>
            </l-marker>



                <!-- Custom controls -->
                

                <l-control
                    :position="'bottomleft'"
                    class="custom-control-watermark">
                    Vue2Leaflet Watermark Control
                </l-control>

                <l-control-zoom position="bottomright"></l-control-zoom>
            
            </l-map>
            <div style="position: absolute; top: 12px; left: 12px; right: 100px; z-index: 400; display: flex; flex-wrap: wrap;">

                <a href="" class="button small blue shadow" style="margin-right: 12px;" @click.prevent="fitBounds()">Centrera över positioner</a>
                <a href="" class="button small blue shadow" v-for="venue in venueActive" :key="venue.key" @click.prevent="flyTo(venue.coords)" > Visa samling</a>

            </div>
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
import AskewBack from '../components/AskewBack.vue'
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
    fitBounds();
}
function circleReady () {
    
} 
function flyTo (coords) {
    map.flyTo(coords, 17)
}

function fitBounds () {
    if(positions.value.length > 0) {
        const bounds = latLngBounds(positions.value.map(o => latLng(parseFloat(o.latitude), parseFloat(o.longitude))));
        bounds._northEast.lat += 0.000000000001;
        bounds._northEast.lng += 0.000000000001;
        map.fitBounds(bounds, { padding: [50, 50] } )
    }
}

function initGeolocation () {
    // Init Geolocation
    //store.dispatch('geolocation/start')
    // Init positions move to App

}



onMounted(() => {
    initGeolocation()
    tunnelInUserLinks()

    
})

function tunnelInUserLinks() {
    showUserLinks.value = false
    /*setTimeout(() => {
        showUserLinks.value = false
    }, 5000)*/
}
</script>

<style scoped>
.map {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: var(--padding)
}
.controls {
    /*padding: 0 var(--width)*/
}

#map {
    flex: 1; 
    background: transparent;
    position: relative;
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

.userLinks > * {
    padding: 6px 12px; 
    margin: 0 6px 10px 6px;
    
}

.userLinks > a.button {
    background: transparent;
    color: snow;
    border: 1px solid snow;
}

.userLinks > a.button:hover {
    background: transparent;
    color: var(--focus-color);
    border: 1px solid var(--focus-color);
}

.userLinks .user {
    cursor: pointer;
    color: var(--lightgreen); 
    border: 1px solid var(--lightgreen);
    border-radius: 6px;
    transition: all 1.5s ease;
}

.userLinks .user:hover,
.userLinks .user:active {
    color: var(--white); 
    border: 1px solid var(--white);
    transition: all .5s ease;
    
}

.userLinks .user.inactive {
    color: rgba(192, 192, 192, 0.7); 
    border: 1px solid rgba(192, 192, 192, 0.7);
    transition: all .5s ease;    
}
.userLinks .user.inactive:hover {
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
div.links.no-venue {
    flex-direction: row
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

a.frame {
    background: var(--accent-color);
    cursor: pointer;
    color: var(--white); 
    padding: 4px 12px; 
    margin: 0 8px 16px 8px;
    border: 1px solid var(--accent-color);
    border-radius: 2px;
    transition: all 1.5s ease;
}


.control-buttons {
    display: flex;
    justify-content: space-between; 
    flex-wrap: wrap;
}

.control-buttons > * {
    margin-bottom: 6px;
}

</style>
