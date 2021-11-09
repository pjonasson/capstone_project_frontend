<template>
  <div class="app">
    <section id="generate" class="d-flex">
      <div class="container flex-column align-items-left" data-aos="zoom-in" data-aos-delay="100">
        <p></p>
        <p></p>
        <p></p>
        <h1>
          To the right are the muscles groups to choose from. Select the quantity for each muscle group and add each to
          your workout.
        </h1>
        <p></p>
        <div class="align-items-left">
          <h2>Chest:</h2>
          <input type="number" v-model="chestLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(1, chestLifts)">Add to Workout</button>
          <h2>Legs:</h2>
          <input type="number" v-model="legLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(2, legLifts)">Add to Workout</button>
          <h2>Biceps:</h2>
          <input type="number" v-model="bicepLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(3, bicepLifts)">Add to Workout</button>
          <h2>Triceps:</h2>
          <input type="number" v-model="tricepLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(4, tricepLifts)">Add to Workout</button>
          <h2>Shoulders:</h2>
          <input type="number" v-model="shoulderLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(5, shoulderLifts)">Add to Workout</button>
          <h2>Back:</h2>
          <input type="number" v-model="backLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(6, backLifts)">Add to Workout</button>
          <h2>Core:</h2>
          <input type="number" v-model="coreLifts" />
          <button class="btn btn-secondary btn-sm" v-on:click="addToWorkout(7, coreLifts)">Add to Workout</button>
          <h2>Total Lifts: {{ totalLifts() }}</h2>
          <button class="btn btn-success btn-lg" v-on:click="updateWorkout">Time to Workout!</button>
        </div>
      </div>
    </section>
    <!-- End Hero -->

    <!-- <div class="container" text-align: center>
      <p>
        Chest:
        <input type="number" v-model="chestLifts" />
        <button v-on:click="addToWorkout(1, chestLifts)">Add to Workout</button>
      </p>
      <p>
        Legs:
        <input type="number" v-model="legLifts" />
        <button v-on:click="addToWorkout(2, legLifts)">Add to Workout</button>
      </p>
      <p>
        Biceps:
        <input type="number" v-model="bicepLifts" />
        <button v-on:click="addToWorkout(3, bicepLifts)">Add to Workout</button>
      </p>
      <p>
        Triceps:
        <input type="number" v-model="tricepLifts" />
        <button v-on:click="addToWorkout(4, tricepLifts)">Add to Workout</button>
      </p>
      <p>
        Shoulders:
        <input type="number" v-model="shoulderLifts" />
        <button v-on:click="addToWorkout(5, shoulderLifts)">Add to Workout</button>
      </p>
      <p>
        Back:
        <input type="number" v-model="backLifts" />
        <button v-on:click="addToWorkout(6, backLifts)">Add to Workout</button>
      </p>
      <p>
        Core:
        <input type="number" v-model="coreLifts" />
        <button v-on:click="addToWorkout(7, coreLifts)">Add to Workout</button>
      </p>
      <p>Total Lifts: {{ totalLifts() }}</p>
      <button v-on:click="updateWorkout">Time to Workout!</button>
    </div> -->
    <!-- <router-link to="/workout">Time to Workout!</router-link> -->
  </div>
</template>

<style>
#generate {
  height: 84vh !important;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      primarymuscles: [],
      liftParams: {},
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
    this.generateWorkout();
  },
  methods: {
    indexPrimaryMuscles() {
      axios.get("http://localhost:3000/primary_muscles").then((response) => {
        this.primarymuscles = response.data;
        console.log("All primary muscles", this.primarymuscles);
      });
    },
    totalLifts: function () {
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
      var workoutParams = { number_of_lifts: 0 };
      axios.post("http://localhost:3000/workouts", workoutParams).then((response) => {
        this.workout = response.data;
        console.log("Workout generated", this.workout);
      });
    },

    addToWorkout: function (primary_muscle_id, x) {
      for (let quantity = 0; quantity < x; quantity++) {
        var liftWorkoutParams = {
          primary_muscle_id: primary_muscle_id,
          workout_id: this.workout.id,
        };
        axios.post("http://localhost:3000/lift_workouts", liftWorkoutParams).then((response) => {
          console.log("Test", response.data);
          this.$parent.flashMessage = "Your lifts have been added to the workout";
        });
      }
    },
    updateWorkout: function () {
      var workoutParams = { number_of_lifts: this.sum };
      axios.patch("http://localhost:3000/workouts/" + this.workout.id, workoutParams).then((response) => {
        console.log("Workout updated", response.data);
        this.$router.push("/workout");
      });
    },
  },
};
</script>
