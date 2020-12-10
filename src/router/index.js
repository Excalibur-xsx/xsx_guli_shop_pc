// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const Home = () => import(/* webpackChunkName: "Home" */"../views/Home");
const Login = () => import(/* webpackChunkName: "Login" */"../views/Login");
const Register = () => import(/* webpackChunkName: "Register" */"../views/Register");
const Search = () => import(/* webpackChunkName: "Search" */"../views/Search");
const Detail = () => import(/* webpackChunkName: "Detail" */"../views/Detail");
const AddCartSuccess = () => import(/* webpackChunkName: "AddCartSuccess" */"../views/AddCartSuccess");
const ShopCart = () => import(/* webpackChunkName: "ShopCart" */"../views/ShopCart");
const Trade = () => import(/* webpackChunkName: "Trade" */"../views/Trade");
const Pay = () => import(/* webpackChunkName: "Pay" */"../views/Pay");
const PaySuccess = () => import(/* webpackChunkName: "PaySuccess" */"../views/PaySuccess");
const Center = () => import(/* webpackChunkName: "Center" */"../views/Center");

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

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
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

// 需要进行权限验证的地址
const permissionPaths = ["/trade", "/pay", "/center"];
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
	if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
		return next("/login");
	}
	next();
});

export default router;
