import { createStore } from 'vuex'
import menu from './modules/menu.js'
import user from './modules/user.js'
import chatt from './modules/chatt.js'
import geolocation from './modules/geolocation.js'
import map from './modules/map.js'
import positions from './modules/positions.js'
import venues from './modules/venues.js'
import flash from './modules/flash.js'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    menu, user, chatt, geolocation, map, positions, venues, flash
  }
})
