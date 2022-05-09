<template>
    <div class="hello">
        
        <h2>{{ msg }}</h2>
        <p style="line-height: 1.8rem">Vi är Askew och det här är vår plats på nätet. Här håller vi kolla på vart
        och när sånt som vi bryr oss om sker. Surfa runt och lämna ett meddelande i 
        chatten om du känner för det.</p>
        
        <div class="spacing"></div>
        
        <div v-if="venue.length > 0">
            <h3 >Det finns en samlingsplats idag!</h3>
            <ul>
                <li v-for="(v, index) in venue" :key="index">
                    <router-link to="/map"> {{v.name}}</router-link>
                </li>
            </ul>
        
        </div>
        
        <div v-if="users.length > 0">
            <h3 >Just nu är {{users.length}} inloggade </h3>
            <p>
                <router-link to="/map">
                <span v-for="user in users" :key="user" style="padding-right: 10px;">
                    {{user}}
                </span>
                </router-link>
            </p>
        </div>
        
    
        <h3>Senaste chatt meddelande</h3>
        <router-link to="/chatt">

            <template v-if="chatt">
                <p style="text-overflow: ellipsis;max-width: 100%;white-space: nowrap;overflow: hidden;color: inherit;">
                    {{chatt.date}} {{chatt.namn}} skrev: {{chatt.meddelande}}</p>
            </template>
    
            <template v-else>
                <p>Hoppsan, hittar inget chatt meddelande..</p>
            </template>
        </router-link>
         
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    users: Array,
    venue: Array,
    chatt: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {max-width: 330px;}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px 5px 10px;
}
a {
  color: #42b983;
}

a p, p a {
    padding-left: 10px;
}

div.spacing { height: 18px;}
</style>
