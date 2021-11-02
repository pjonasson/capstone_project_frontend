<template>
  <div class="home">
    <h1>Here is your workout, {{ user.first_name }}.</h1>
    <div v-for="lift_workout in user.workouts[0].lift_workouts" v-bind:key="lift_workout.id">
      <p>{{ lift_workout }}</p>
      <div v-for="lift in lift_workout" v-bind:key="lift.id"></div>
      <!-- <p>{{ lift_workouts }}</p> -->
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      userId: localStorage.getItem("userId"),
      user: [],
      workouts: [],
      lift_workouts: [],
    };
  },
  created: function () {
    this.currentUser();
  },
  methods: {
    currentUser: function () {
      axios.get("http://localhost:3000/users/" + this.userId).then((response) => {
        this.user = response.data;
        console.log(this.user);
      });
    },
  },
};
</script>
