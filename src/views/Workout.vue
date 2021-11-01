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
  },
  methods: {
    currentLiftWorkout: function () {
      axios.get("http://localhost:3000/users/1").then((response) => {
        this.user = response.data;
        console.log(this.user);
      });
    },
  },
};
</script>
