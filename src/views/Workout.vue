<template>
  <div class="home">
    <h1>Here is your workout, {{ user.first_name }}.</h1>
    <div v-for="workout in user.workouts" v-bind:key="workout.id">
      <div v-for="lift_workout in workout" v-bind:key="lift_workout.id">
        <div v-for="exercise in lift_workout" v-bind:key="exercise.id">
          <div v-for="lift in exercise" v-bind:key="lift.id">
            <p>{{ lift.name }}</p>
          </div>
        </div>
      </div>
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
    currentWorkout: function () {
      axios.get("http://localhost:3000/");
    },
  },
};
</script>
