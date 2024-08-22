import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import plugin from './plugin/index'
import { createPinia } from 'pinia';
import icons from "v-svg-icons";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import VueLazyLoad from 'vue3-lazyload'


import './axios';

const app = createApp(App);

const baseUrl='http://localhost/loyelapi/public/api';


app.provide('$baseUrl', baseUrl);

app.component("icon", icons);
const pinia = createPinia();
app.component('QuillEditor', QuillEditor)
app.use(plugin);
app.use(pinia);
app.use(Toast); 
app.use(router);
app.use(VueLazyLoad);
app.mount('#app');
