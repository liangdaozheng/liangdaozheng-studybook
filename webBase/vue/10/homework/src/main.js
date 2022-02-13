// import { createApp } from 'vue'
import { createApp } from './runtime-canvas'
import App from './App.vue'

import {getRootConstainer} from './game'


createApp(App).mount(getRootConstainer())
