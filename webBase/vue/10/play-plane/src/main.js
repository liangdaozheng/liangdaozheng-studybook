// import { createApp } from 'vue'
import {createApp} from './runtime-canvas'
import App from './App.vue'
import {getRootContainer} from './game'

console.warn=()=>{}

createApp(App).mount(getRootContainer())
