// @ts-nocheck
import Vue from "vue";
import App from "./App";

import router from "./router";
import store from "./store";

import "./plugins/element.js";
import "./plugins/lazyload.js";

import "./mock/mockServer";

import "./styles/reset.css";
import "./styles/iconfont.css";
import "swiper/swiper-bundle.min.css";

Vue.config.productionTip = false;

new Vue({
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");
