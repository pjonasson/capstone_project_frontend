<template>
  <div class="app">
    <div class="text-center section">
      <h2 class="h2">Workout Progress Calendar</h2>

      <v-calendar is-expanded :attributes="attributes" />
      <br />
      <section id="portfolio" class="portfolio">
        <div class="container" data-aos="fade-up" padding="100px">
          <div class="section-title">
            <h2>Logged Workouts</h2>
          </div>

          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-12 d-flex justify-content-center"></div>
          </div>

          <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
            <div
              class="col-lg-4 col-md-6 portfolio-item filter-app"
              v-for="workout in user.workouts"
              v-bind:key="workout.id"
            >
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/portfolio-1.jpg" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <h4>{{ workout.friendly_created_at }}</h4>
                  <p>{{ workout.friendly_time_created_at }}</p>
                  <div class="portfolio-links">
                    <a class="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details">
                      <!-- Button trigger modal -->
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        v-on:click="showWorkoutSummary(workout)"
                      >
                        Workout Summary
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <v-calendar class="custom-calendar max-w-full" :masks="masks" disable-page-swipe is-expanded>
        <template v-slot:day-content="{ day }">
          <div class="flex flex-col h-full z-10 overflow-hidden">
            <span class="day-label text-sm text-gray-900">{{ day.day }}</span>

            <div class="flex-grow overflow-y-auto overflow-x-auto">
              <p
                v-for="workout in user.workouts"
                :key="workout.id"
                class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              ></p>
            </div>
          </div>
        </template>
      </v-calendar> -->
    </div>

    <!-- <div id="spacing" class="row">
      <div class="col-sm-4" v-for="workout in user.workouts" v-bind:key="workout.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ workout.friendly_created_at }}</h5>
            <p class="card-text">{{ workout.friendly_time_created_at }} {{ workout.count }}</p>
            <a v-on:click="showWorkoutSummary(workout)" class="btn btn-primary">Workout Summary</a>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div v-for="workout in user.workouts" v-bind:key="workout.id">
      <p>{{ workout.created_at }}</p>
      <div>
        <button v-on:click="showWorkoutSummary(workout)">Workout Summary</button>
      </div>
    </div> -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Workout Summary</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-for="lift_workout in currentWorkout.lift_workouts" v-bind:key="lift_workout.id">
            <p>Exercise: {{ lift_workout.lift.name }}</p>
            <p>1st Set: {{ lift_workout.set1_reps }}</p>
            <p>Weight: {{ lift_workout.weight1 }}</p>
            <p>2nd Set: {{ lift_workout.set2_reps }}</p>
            <p>Weight: {{ lift_workout.weight2 }}</p>
            <p>3rd Set: {{ lift_workout.set3_reps }}</p>
            <p>Weight: {{ lift_workout.weight3 }}</p>
            <p>Comments: {{ lift_workout.comments }}</p>
          </div>
          <div class="modal-footer">
            <button
              v-on:click="deleteWorkout(currentWorkout)"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Delete Workout
            </button>
            <button v-on:click="repeatWorkout" type="button" class="btn btn-primary">Repeat Workout</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
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
          <button v-on:click="deleteWorkout(currentWorkout)">Delete Workout</button>
          <br />
          <button>Close</button>
        </form>
      </dialog>
    </div> -->
  </div>
</template>

<style>
#spacing {
  padding: 25px;
  padding-bottom: 30px;
}
</style>

<script>
import axios from "axios";
import Vue from "vue";
import VCalendar from "v-calendar";

Vue.use(VCalendar, {});

export default {
  data: function () {
    // const month = new Date().getMonth();
    // const year = new Date().getFullYear();

    return {
      userId: localStorage.getItem("userId"),
      user: { workouts: [{}] },
      workouts: [],
      lift_workouts: [],
      currentWorkout: {},
      workout: {},
      masks: {
        weekdays: "WWW",
      },
      attributes: [
        {
          key: "today",
          highlight: "red",
          dates: new Date(),
        },
      ],
    };
  },

  created: function () {
    this.currentUser();
  },
  methods: {
    currentUser: function () {
      axios.get("https://arcane-tor-51371.herokuapp.com/users/" + this.userId).then((response) => {
        this.user = response.data;

        // const month = new Date().getMonth();
        // const year = new Date().getFullYear();

        this.user.workouts.forEach((workout) => {
          console.log(workout, workout.created_at, new Date(workout.created_at));
          this.attributes.push({
            key: "workout",
            highlight: "green",
            dates: new Date(workout.created_at),
          });
        });
        console.log(this.user);
      });
    },
    showWorkoutSummary: function (workout) {
      console.log(workout);
      this.currentWorkout = workout;
    },
    repeatWorkout: function () {
      var repeatWorkoutParams = { workout_id: this.currentWorkout.id };
      axios.post("https://arcane-tor-51371.herokuapp.com/workouts", repeatWorkoutParams).then((response) => {
        console.log("Workout cloned", response.data);
        this.$router.push("https://arcane-tor-51371.herokuapp.com/workout");
        this.$router.go();
      });
    },
    deleteWorkout: function (workout) {
      axios.delete("https://arcane-tor-51371.herokuapp.com/workouts/" + this.currentWorkout.id).then((response) => {
        console.log("Workout succesfully deleted", response.data);
        this.$parent.flashMessage = "Workout Deleted";
        var index = this.user.workouts.indexOf(workout);
        this.user.workouts.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
