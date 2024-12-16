import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'; // Importer Axios

const app = createApp(App);

// Ajouter Axios comme propriété globale
app.config.globalProperties.$axios = axios;

// Utiliser le store et le router, puis monter l'application
app.use(store).use(router).mount('#app');
