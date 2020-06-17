import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import { routes } from './routes'

Vue.use(VueRouter)
Vue.use(VueLocalStorage)

const router = new VueRouter({
  routes,
  mode: 'history'
})

export const bus = new Vue({
  data: {
    selectedNote: null
  },

  methods: {
    setSelectedNote(note) {
      this.selectedNote = note
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
