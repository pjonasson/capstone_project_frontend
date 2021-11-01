import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import GenerateWorkout from "../views/GenerateWorkout.vue";
import Workout from "../views/Workout.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
