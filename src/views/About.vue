<template>
  <div class="app">
    <div>
      <h1>Welcome to Better Than Yesterday Fitness</h1>
      <h2>
        This app was created with the intention of helping beginners in weight lifting figure out how to design a
        workout routine while taking out much of the thought process.
      </h2>
      <h2>
        To simply start, either sign up or login at the top of the page. After, navigate your way to the 'Generate
        Workout Page' to begin the process there. You will be prompted to select the number of different exercises you
        wish to complete per muscle group. After increasing the quantity to the desired amount, make sure you click 'Add
        to Workout'. This is similar to adding items to an online shopping cart. Once you have added all muscle gourps
        and quantities that you like, click the giant green button to be taken to your generated workout. Good luck!
      </h2>
      <h1>Here is an index of lifts to reference. Your workout will be comprised of a combination below:</h1>
      <p>Search by lift name:</p>
      <input type="text" v-model="searchFilter" />
      <div v-for="lift in filterBy(lifts, searchFilter, 'name')" v-bind:key="lift.id">
        <p type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" v-on:click="showLift(lift)">
          Exercise Name: {{ lift.name }}
        </p>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ currentLift.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ currentLift.description }}</p>
            <iframe
              v-if="currentLift.video_url"
              v-bind:key="currentLift.id"
              width="460"
              height="420"
              v-bind:src="`https://www.youtube.com/embed/${currentLift.video_url.split('=')[1]}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],

  data: function () {
    return {
      lifts: [],
      searchFilter: "",
      currentLift: {},
    };
  },
  created: function () {
    this.liftIndex();
  },
  methods: {
    liftIndex: function () {
      axios.get("http://localhost:3000/lifts").then((response) => {
        console.log("Lift Index", response.data);
        this.lifts = response.data;
      });
    },
    showLift: function (lift) {
      console.log(lift);
      this.currentLift = lift;
      // document.querySelector("#exampleModal").showModal();
    },
  },
};
</script>
