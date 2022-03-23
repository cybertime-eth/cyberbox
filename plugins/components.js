import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'

Vue.use(VueClipboard)
Vue.use(VueMeta,  { ssrAppId: 1 })