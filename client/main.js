import Vue from 'vue'
import App from "./App.vue";
import router from './router';

// Setup
Vue.config.productionTip = false;

// Initialize Vue
window.onload = function () {
	new Vue({
		router,
		render: h => h(App)
	}).$mount('#root')
};