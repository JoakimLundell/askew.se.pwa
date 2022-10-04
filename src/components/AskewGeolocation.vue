<template>
    <div class="geolocation">
        
        <h3>Din position GPS/Geolocation</h3>
        <div class="row">
            <div class="information">
                <p>Loading: {{ loading }}</p>
                <p>Coords: <span v-if="coords">{{ coords.latitude }}, {{ coords.longitude}}</span></p>
                <p>Watch Id: {{ watchid }}</p>
                <p>Error: {{ error }}</p>        
            </div>
            <div class="column">
                <button :disabled="watchid > 0" @click="start" class="green">Starta</button>
                <button :disabled="watchid == null" @click="stop" class="red">Stoppa</button>
            </div>
        </div>
        
    </div>
</template>
<script setup>
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore();
    
    const loading = computed(() => store.getters['geolocation/loading'])
    const coords  = computed(() => store.getters['geolocation/coords'])
    const watchid = computed(() => store.getters['geolocation/watchid'])
    const error   = computed(() => store.getters['geolocation/error'])
    
    function start () {
        store.dispatch('geolocation/start')
    }

    function stop () {
        store.dispatch('geolocation/stop')
    }
</script>

<style scoped>
.geolocation {
    width:  100%
}

p { color: var(--background)}
.row {
    display: flex;
    justify-content: space-between;
    background: rgba(36,36,36,0.1);
    padding: 0 var(--padding)
}

p.information { padding: 0 5px; margin: 2px}

.column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
</style>
