import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import VueEllipseProgress from 'vue-ellipse-progress'
import VueSplide from '@splidejs/vue-splide'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import '@splidejs/splide/dist/css/splide.min.css'

Vue.use(VueCarousel)
Vue.use(VueEllipseProgress)
Vue.use(VueSplide)
Vue.component('dropdown-menu', DropdownMenu)
