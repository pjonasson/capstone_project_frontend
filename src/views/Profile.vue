<template>
  <div class="app">
    <h1>User profile page for {{ user.username }}.</h1>
    <div class="row">
      <div class="col-sm-4" v-for="workout in user.workouts" v-bind:key="workout.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ workout.created_at }}</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a v-on:click="showWorkoutSummary(workout)" class="btn btn-primary">Workout Summary</a>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-for="workout in user.workouts" v-bind:key="workout.id">
      <p>{{ workout.created_at }}</p>
      <div>
        <button v-on:click="showWorkoutSummary(workout)">Workout Summary</button>
      </div>
    </div> -->

    <div>
      <dialog id="workoutsummary-details">
        <form method="dialog">
          <h1>Workout Summary</h1>
          <div v-for="lift_workout in currentWorkout.lift_workouts" v-bind:key="lift_workout.id">
            <p>Exercise: {{ lift_workout.lift.name }}</p>
            <p>1st Set: {{ lift_workout.set1_reps }}</p>
            <p>Weight: {{ lift_workout.weight1 }}</p>
            <p>2nd Set: {{ lift_workout.set2_reps }}</p>
            <p>Weight: {{ lift_workout.weight2 }}</p>
            <p>3rd Set: {{ lift_workout.set3_reps }}</p>
            <p>Weight: {{ lift_workout.weight3 }}</p>
            <p>Comments: {{ lift_workout.comments }}</p>
          </div>
          <button v-on:click="repeatWorkout">Repeat Workout</button>
          <button>Close</button>
        </form>
      </dialog>
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
      user: { workouts: [{}] },
      workouts: [],
      lift_workouts: [],
      currentWorkout: {},
      workout: {},
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
    showWorkoutSummary: function (workout) {
      console.log(workout);
      this.currentWorkout = workout;
      document.querySelector("#workoutsummary-details").showModal();
    },
    repeatWorkout: function () {
      var repeatWorkoutParams = { workout_id: this.currentWorkout.id };
      axios.post("http://localhost:3000/workouts", repeatWorkoutParams).then((response) => {
        console.log("Workout cloned", response.data);
        this.$router.push("/workout");
      });
    },
  },
};
</script>
