<template>
    <div class="geolocation">
        <h3>Geolocation</h3>
        <div class="row">
            <div class="information">
                <p>Loading: {{ loading }}</p>
                <p>Coords: <span v-if="coords">{{ coords.latitude }}, {{ coords.longitude}}</span></p>
                <p>Watch Id: {{ watchid }}</p>
                <p>Error: {{ error }}</p>        
            </div>
            <div class="buttons">
            <button :disabled="watchid > 0" @click="start">Starta</button>
            <button :disabled="watchid == null" @click="stop">Stoppa</button>
        </div>
        </div>
        
    </div>
</template>
<script setup>
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore();
    
    const loading = computed(() => store.getters['geolocation/loading'])
    const coords = computed(() => store.getters['geolocation/coords'])
    const watchid = computed(() => store.getters['geolocation/watchid'])
    const error = computed(() => store.getters['geolocation/error'])
    
    function start () {
        store.dispatch('geolocation/start')
    }

    function stop () {
        store.dispatch('geolocation/stop')
    }
</script>

<style scoped>
.geolocation {
    /*border: 1px solid var(--accent-color);*/
    width:  100%
}

.row {
    display: flex;
    justify-content: space-between;
    background: #041b24;
}

.information { padding: 0 5px}
.buttons {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.buttons > * {
    margin: 5px 0;
    width: 120px;
}
</style>
