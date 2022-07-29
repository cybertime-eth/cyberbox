import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import VueEllipseProgress from 'vue-ellipse-progress'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

Vue.use(VueCarousel)
Vue.use(VueEllipseProgress)
Vue.use(VueGlide)
Vue.component('dropdown-menu', DropdownMenu)
