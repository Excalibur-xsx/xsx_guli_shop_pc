// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "../views/Detail";
import AddCartSuccess from "../views/AddCartSuccess";
import ShopCart from "../views/ShopCart";
import Trade from "../views/Trade";
import Pay from "../views/Pay";
import PaySuccess from "../views/PaySuccess";
import Center from "../views/Center";

const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, onComplete, onAbort) {
	if (onComplete && onAbort) {
		return push.call(this, location, onComplete, onAbort);
	}
	return push.call(this, location, onComplete, () => { });
};

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
	if (onComplete && onAbort) {
		return replace.call(this, location, onComplete, onAbort);
	}
	return replace.call(this, location, onComplete, () => { });
};

// 安装插件
Vue.use(VueRouter);

export default new VueRouter({
	// 路由配置
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/login",
			component: Login,
			meta: {
				isFooterHide: true,
			},
		},
		{
			path: "/register",
			component: Register,
			meta: {
				isFooterHide: true,
			},
		},
		{
			name: "search",
			path: "/search/:searchText?",
			component: Search,
		},
		{
			name: "detail",
			path: "/detail/:id",
			component: Detail,
		},
		{
			name: "addcartsuccess",
			path: "/addcartsuccess",
			component: AddCartSuccess,
		},
		{
			name: "shopcart",
			path: "/shopcart",
			component: ShopCart,
		},
		{
			name: "trade",
			path: "/trade",
			component: Trade,
		},
		{
			name: "pay",
			path: "/pay",
			component: Pay,
		},
		{
			name: "paysuccess",
			path: "/paysuccess",
			component: PaySuccess,
		},
		{
			name: "center",
			path: "/center/myorder",
			component: Center,
		},
	],
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});
