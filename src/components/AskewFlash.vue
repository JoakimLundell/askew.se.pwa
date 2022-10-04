<template>
    <div class="flash-messages">
        
        <div v-for="msg in flash" :key="msg.id" class="flash-message">
            <div class="flash-line">
                <div style="padding: 0 12px">{{msg.message}}</div>
                <button class="invisible" style="cursor: hand; padding:2px;" @click="close(msg.id, $event)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                </button>
            </div>
            <div class="flash-timeout">
                <div class="loader__element"></div>
            </div>
        </div>

    </div>
</template>


<script>
export default
   {
    props: {
        flash: {
            requried: true,
            default: []
        }
    },
    methods: {
        close(id, e) {
            e.stopPropagation();
            this.$emit('close', id)
        }
    }  
}
</script>

<style scoped>

.flash-messages {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
    background: transparent;
}
.flash-message {
    background: var(--accent-color);
    color: var(--white);
    animation: appear 1s;
    overflow: hidden;
    box-shadow: 2px 2px 6px black;
    margin: 0 0 6px 0;
}
.flash-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    color: white;
    padding: 12px 12px 6px 12px;
}

.flash-timeout {
    height: 3px;
    background: rgba(136, 1, 1, 0.65);
    background: transparent;
}

.loader__element {
	height: 3px;
	width: 100%;
	background: transparent;
}

.loader__element:before {
	content: '';
	display: block;
	background-color: rgba(255, 255, 255, 0.685);
	height: 3px;
	width: 0;
    animation: loader 5s linear;
}

@keyframes appear {
    0% { opacity: 0; }
}

@keyframes loader {
	100% { width: 100%; }
}

@media only screen and (min-width: 600px) {
	.flash-messages {
        
    }
    .flash-message {
        width: 100%;
    }
}
</style>