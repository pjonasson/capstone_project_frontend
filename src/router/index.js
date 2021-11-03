import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import GenerateWorkout from "../views/GenerateWorkout.vue";
import Workout from "../views/Workout.vue";
import Signup from "../views/Signup.vue";
import Logout from "../views/Logout.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/generate_workout",
    name: "GenerateWorkout",
    component: GenerateWorkout,
  },
  {
    path: "/workout",
    name: "Workout",
    component: Workout,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
