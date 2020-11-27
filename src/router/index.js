import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/Register"
import Search from "../views/Search"

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/Login",
            component: Login,
        },
        {
            path: "/Register",
            component: Register,
        },
        {
            path: "/Search",
            component: Search,
        },
    ],
})