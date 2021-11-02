<template>
  <div class="GenerateWorkout">
    <h1>Below are the primary muscles.</h1>
    <h3>How many lifts would you like to do for each muscle?</h3>
    <div>
      <p>
        Chest:
        <input type="number" v-model="chestLifts" />
      </p>
      <p>
        Leg:
        <input type="number" v-model="legLifts" />
      </p>
      <p>
        Bicep:
        <input type="number" v-model="bicepLifts" />
      </p>
      <p>
        Tricep:
        <input type="number" v-model="tricepLifts" />
      </p>
      <p>
        Shoulder:
        <input type="number" v-model="shoulderLifts" />
      </p>
      <p>
        Back:
        <input type="number" v-model="backLifts" />
      </p>
      <p>
        Core:
        <input type="number" v-model="coreLifts" />
      </p>
      <p>Total Lifts: {{ totalLifts() }}</p>
    </div>
    <button v-on:click="generateWorkout()">Time to Workout!</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      primarymuscles: [],
      legLifts: 0,
      bicepLifts: 0,
      tricepLifts: 0,
      shoulderLifts: 0,
      backLifts: 0,
      coreLifts: 0,
      chestLifts: 0,
      sum: 0,
      chestId: 1,
    };
  },
  created: function () {
    this.indexPrimaryMuscles();
  },
  methods: {
    indexPrimaryMuscles() {
      axios.get("http://localhost:3000/primary_muscles").then((response) => {
        this.primarymuscles = response.data;
        console.log("All primary muscles", this.primarymuscles);
      });
    },
    totalLifts: function () {
      console.log("hello");
      this.sum =
        parseInt(this.chestLifts) +
        parseInt(this.legLifts) +
        parseInt(this.bicepLifts) +
        parseInt(this.tricepLifts) +
        parseInt(this.shoulderLifts) +
        parseInt(this.backLifts) +
        parseInt(this.coreLifts);
      return this.sum;
    },
    generateWorkout: function () {
      var workoutParams = { number_of_lifts: this.sum };
      axios.post("http://localhost:3000/workouts", workoutParams).then((response) => {
        this.workout = response.data;
        console.log("hello", this.workout);
        var liftWorkoutParams = {
          primary_muscle_id: 1,
          workout_id: this.workout.id,
        };
        axios.post("http://localhost:3000/lift_workouts", liftWorkoutParams).then((response) => {
          console.log("Test", response.data);
          this.$router.push("/workout");
        });
      });
    },
  },
};
</script>
