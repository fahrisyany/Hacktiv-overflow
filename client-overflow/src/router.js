import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "./components/RegisterForm.vue";
import Login from "./components/LoginForm.vue";
// import MainTile from "./components/MainTile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
     
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/question/:id",
      name:"questionPage",

      component: () => import("./views/QuestionPage.vue"),
    },
    {
      path: "/account",
      name: "acount",

      component: () =>
        import("./views/Account.vue")
    }
  ]
});
