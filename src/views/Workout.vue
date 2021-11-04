<template>
  <div class="app">
    <h1>Here is your workout, {{ user.first_name }}.</h1>
    <div v-for="lift_workout in user.workouts[0].lift_workouts" v-bind:key="lift_workout.id">
      <h2>Exercise: {{ lift_workout.lift.name }}</h2>
      <p>1st Set: {{ lift_workout.set1_reps }} reps</p>
      <p>Weight: {{ lift_workout.weight1 }}</p>
      <p>2nd Set: {{ lift_workout.set2_reps }} reps</p>
      <p>Weight: {{ lift_workout.weight2 }}</p>
      <p>3rd Set: {{ lift_workout.set3_reps }} reps</p>
      <p>Weight: {{ lift_workout.weight3 }}</p>
      <p>Comments: {{ lift_workout.comments }}</p>
      <a href="">{{ lift_workout.lift.video_url }}</a>
      <br />
      <div>
        <button v-on:click="showLiftWorkout(lift_workout)">Update Exercise Stats</button>
      </div>
      <div v-for="lift in lift_workout" v-bind:key="lift.id"></div>
    </div>
    <img src="https://qrtag.net/api/qr_4.png?url=http://localhost:8080/workout" alt="qrtag" />

    <router-link to="/profile">Finish Workout</router-link>

    <div>
      <dialog id="liftworkout-details">
        <form method="dialog">
          <h1>Workout info</h1>
          <p>
            1st Set Reps:
            <input type="number" v-model="currentLiftWorkout.set1_reps" />
          </p>
          <p>
            Weight:
            <input type="number" v-model="currentLiftWorkout.weight1" />
          </p>
          <p>
            2nd Set Reps:
            <input type="number" v-model="currentLiftWorkout.set2_reps" />
          </p>
          <p>
            Weight:
            <input type="number" v-model="currentLiftWorkout.weight2" />
          </p>
          <p>
            3rd Set Reps:
            <input type="number" v-model="currentLiftWorkout.set3_reps" />
          </p>
          <p>
            Weight:
            <input type="number" v-model="currentLiftWorkout.weight3" />
          </p>
          <p>
            Comments:
            <input type="text" v-model="currentLiftWorkout.comments" />
          </p>
          <button v-on:click="updateLiftWorkout(currentLiftWorkout)">Update</button>
          <!-- <button v-on:click="destroyProduct(currentLiftWorkout)">Delete</button> -->
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
      currentLiftWorkout: {},
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
    showLiftWorkout: function (lift_workout) {
      console.log(lift_workout);
      this.currentLiftWorkout = lift_workout;
      document.querySelector("#liftworkout-details").showModal();
    },
    updateLiftWorkout: function (lift_workout) {
      var editLiftWorkoutParams = {
        set1_reps: lift_workout.set1_reps,
        weight1: lift_workout.weight1,
        set2_reps: lift_workout.set2_reps,
        weight2: lift_workout.weight2,
        set3_reps: lift_workout.set3_reps,
        weight3: lift_workout.weight3,
        comments: lift_workout.comments,
      };
      axios
        .patch("http://localhost:3000/lift_workouts/" + lift_workout.id, editLiftWorkoutParams)
        .then((response) => {
          console.log("Success", response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
