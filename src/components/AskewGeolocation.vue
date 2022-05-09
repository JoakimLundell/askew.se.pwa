<template>
    <div class="geolocation">
        <h3>GPS / Geolocation</h3>
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
    width:  100%
}

p { color: var(--background)}
.row {
    display: flex;
    justify-content: space-between;
    background: rgba(127,127,127,0.1);
}

.information { padding: 0 5px}
.buttons {
    /*flex-grow: 1;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.buttons > * {
    margin: 5px;
    width: 120px;
    text-align: center;
    border: 1px solid var(--background);
    justify-content: center;
}

.buttons > *:disabled {
    border: 1px solid silver;
    cursor: not-allowed;
}
</style>
