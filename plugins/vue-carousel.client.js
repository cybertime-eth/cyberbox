import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import VueEllipseProgress from 'vue-ellipse-progress'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import '@splidejs/splide/dist/css/splide.min.css'

Vue.use(VueCarousel)
Vue.use(VueEllipseProgress)
Vue.component('dropdown-menu', DropdownMenu)
