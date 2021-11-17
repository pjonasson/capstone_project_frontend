<template>
  <div class="app">
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Here is your workout, {{ user.first_name }}</h2>
        </div>

        <div class="row" v-for="lift_workout in user.workouts[0].lift_workouts" v-bind:key="lift_workout.id">
          <div class="col-lg-4">
            <iframe
              v-bind:key="lift_workout.id"
              width="400"
              height="420"
              v-bind:src="`https://www.youtube.com/embed/${lift_workout.lift.video_url.split('=')[1]}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col-lg-8 pt-4 pt-lg-0 content">
            <h3>Exercise: {{ lift_workout.lift.name }}</h3>

            <div class="row">
              <div class="col-lg-6">
                <ul>
                  <li>
                    <i class="bi bi-rounded-right"></i>
                    <strong>1st Set:</strong>
                    {{ lift_workout.set1_reps }}
                  </li>

                  <li>
                    <i class="bi bi-rounded-right"></i>
                    <strong>2nd Set:</strong>
                    {{ lift_workout.set2_reps }}
                  </li>
                  <li>
                    <i class="bi bi-rounded-right"></i>
                    <strong>3rd Set:</strong>
                    {{ lift_workout.set3_reps }}
                  </li>
                </ul>
              </div>
              <div class="col-lg-6">
                <ul>
                  <li>
                    <i class="bi bi-rounded-right"></i>
                    <strong>Weight:</strong>
                    {{ lift_workout.weight1 }} lbs/kgs
                  </li>
                  <li>
                    <i class="bi bi-rounded-right"></i>
                    <strong>Weight:</strong>
                    {{ lift_workout.weight2 }} lbs/kgs
                  </li>
                  <li>
                    <i class="bi bi-rounded-right"></i>
                    <strong>Weight:</strong>
                    {{ lift_workout.weight3 }} lbs/kgs
                  </li>
                </ul>
              </div>
            </div>
            <p>Comments: {{ lift_workout.comments }}</p>
            <button type="button" class="btn btn-danger" v-on:click="showLiftWorkout(lift_workout)">
              Log Exercise Stats
            </button>
            <div>
              <p></p>
              <button type="button" class="btn btn-secondary" v-on:click="showLift(lift_workout)">Change Lift</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <h1>Here is your workout, {{ user.first_name }}.</h1>
    <div v-for="lift_workout in user.workouts[0].lift_workouts" v-bind:key="lift_workout.id">
      <h2>Exercise: {{ lift_workout.lift.name }}</h2>
      <p>1st Set: {{ lift_workout.set1_reps }} reps</p>
      <p>Weight: {{ lift_workout.weight1 }}</p>
      <p>2nd Set: {{ lift_workout.set2_reps }} reps</p>
      <p>Weight: {{ lift_workout.weight2 }}</p>
      <p>3rd Set: {{ lift_workout.set3_reps }} reps</p>
      <p>Weight: {{ lift_workout.weight3 }}</p>
      <p>Comments: {{ lift_workout.comments }}</p>
      <iframe
        v-bind:key="lift_workout.id"
        width="25vh"
        height="25vh"
        v-bind:src="`https://www.youtube.com/embed/${lift_workout.lift.video_url.split('=')[1]}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <br />
      <div>
        <button v-on:click="showLiftWorkout(lift_workout)">Update Exercise Stats</button>
        <button v-on:click="showLift(lift_workout)">Change Lift</button>
      </div>
      <div v-for="lift in lift_workout" v-bind:key="lift.id"></div>
    </div>
    <img src="https://qrtag.net/api/qr_4.png?url=https://www.linkedin.com/in/percy-jonasson/" alt="qrtag" /> -->
    <div class="container2">
      <div class="center">
        <button type="button" class="btn btn-success" position="absolute" v-on:click="routeToProfile">
          Finish Workout
        </button>
      </div>
    </div>
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
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" v-on:click="updateLiftWorkout(currentLiftWorkout)">Update</button>
            <!-- <button v-on:click="destroyProduct(currentLiftWorkout)">Delete</button> -->
            <button class="btn btn-secondary">Close</button>
          </div>
        </form>
      </dialog>
    </div>

    <div>
      <dialog id="lift-details">
        <form method="dialog">
          <h1>Current Lift:</h1>
          <h2>{{ currentLiftWorkout.lift.name }}</h2>
          <input type="text" v-model="searchFilter" />

          <div v-for="lift in filterBy(lifts, searchFilter, 'name')" v-bind:key="lift.id">
            <p v-on:click="changeLift(currentLiftWorkout, lift)">{{ lift.name }}</p>
          </div>

          <button>Close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style>
.container2 {
  height: 200px;
  position: relative;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      currentWorkout: [],
      updatedLift: {},
      userId: localStorage.getItem("userId"),
      user: { workouts: [{}] },
      workouts: [],
      lift_workouts: [],
      currentLiftWorkout: {
        lift: {
          name: "",
        },
      },
      lifts: {},
      searchFilter: "",
    };
  },
  created: function () {
    this.currentUser();
    this.liftIndex();
  },
  methods: {
    currentUser: function () {
      axios.get("https://arcane-tor-51371.herokuapp.com/users/" + this.userId).then((response) => {
        this.user = response.data;
        console.log(this.user);
      });
    },
    liftIndex: function () {
      axios.get("https://arcane-tor-51371.herokuapp.com/lifts").then((response) => {
        this.lifts = response.data;
        console.log("All lifts", response.data);
      });
    },
    showLiftWorkout: function (lift_workout) {
      console.log(lift_workout);
      this.currentLiftWorkout = lift_workout;
      document.querySelector("#liftworkout-details").showModal();
    },
    showLift: function (lift_workout) {
      console.log(lift_workout);
      this.currentLiftWorkout = lift_workout;
      document.querySelector("#lift-details").showModal();
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
        .patch("https://arcane-tor-51371.herokuapp.com/lift_workouts/" + lift_workout.id, editLiftWorkoutParams)
        .then((response) => {
          console.log("Success", response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    changeLift: function (lift_workout, clickedLift) {
      var changeLiftWorkoutParams = {
        lift_id: clickedLift.id,
        set1_reps: 10,
        weight1: 0,
        set2_reps: 10,
        weight2: 0,
        set3_reps: 10,
        weight3: 0,
        comments: "",
      };
      axios
        .patch("https://arcane-tor-51371.herokuapp.com/lift_workouts/" + lift_workout.id, changeLiftWorkoutParams)
        .then((response) => {
          console.log("lift_workout updated", response.data);
          this.$router.go();
          // var index = this.user.workouts[0].lift_workouts.indexOf(lift_workout);
          // this.user.workouts[0].lift_workouts.splice(index, 1, response.data);
        });
      // var index = this.user.workouts[0].lift_workouts.indexOf(lift_workout);

      // axios.delete("http://localhost:3000/lift_workouts/" + lift_workout.id).then((response) => {
      //   console.log(index);
      //   console.log("lift_workout deleted", response.data);
      //   console.log(this.user.workouts[0]);
      //   var editLiftParams = {
      //     lift_id: clickedLift.id,
      //     workout_id: this.user.workouts[0].id,
      //   };

      //   axios.post("http://localhost:3000/lift_workouts/", editLiftParams).then((response) => {
      //     console.log("New Lift_workout added", response.data);
      //     this.$parent.flashMessage = "Lift changed and workout updated.";
      //     this.user.workouts[0].lift_workouts.splice(index, 1, response.data);
      //     console.log(this.user.workouts[0], index);
      //   });
      // });
    },
    routeToProfile: function () {
      this.$router.push("/profile");
    },
  },
};
</script>
