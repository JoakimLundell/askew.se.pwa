<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>
      We are Askew and this is our place on the world wide web. Feel free to browse around. Have a look at the map or drop a chatt in the chattbox. But please don't contacts us if you don't know us. We contact you.
    </p>
    <h3 v-if="venue">Det finns en samlingsplats idag!</h3>
    <ul>
      <li v-for="(v, index) in venue" :key="index">
        <router-link to="/map"> {{v.name}}</router-link>
      </li>
    </ul>
    
    <h3>Online rigth now </h3>
    <ul>
      <li v-for="user in users" :key="user">
        <router-link to="/map"> {{user}}</router-link>
      </li>
    </ul>
    <h3>Latest post in chatt</h3>
    <ul>
      <li>
        <router-link to="/chatt">2022-04-12 Joqe wrote: Hej allihop..</router-link>
      </li>
    </ul>
    <!--h3>Your GPS / Geolocation</h3>
    <ul>
      <li v-for="(status, index) in geolocation" :key="index">
        <a href="" @click.prevent="">{{status}}</a>
      </li>
    </ul-->
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    users: Array,
    venue: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {max-width: 330px;}
h3 {
  margin: 40px 0 0;
}
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
</style>
