<template>
  <div class="home">
    <h1>Here is your workout, {{ user.first_name }}.</h1>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: [],
    };
  },
  created: function () {
    this.currentLiftWorkout();
    this.currentUserWorkout();
  },
  methods: {
    currentLiftWorkout: function () {
      axios.get("http://localhost:3000/users/").then((response) => {
        this.user = response.data;
        console.log(this.user);
      });
    },
    currentUserWorkout: function () {
      axios.get("http://localhost:3000/current_workout").then((response) => {
        this.user = response.data;
        console.log(this.user);
      });
    },
  },
};
</script>
