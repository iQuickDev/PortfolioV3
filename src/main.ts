import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import router from './router/router'

library.add(faPlay, faPause, faForward, faBackward)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
