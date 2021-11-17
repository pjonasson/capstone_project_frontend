<template>
  <div class="app">
    <section id="login" class="d-flex align-items-top">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
        <form v-on:submit.prevent="submit()">
          <h1>Login</h1>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
          <div>
            <h2>Email:</h2>
            <input type="email" v-model="newSessionParams.email" />
          </div>
          <div>
            <h2>Password:</h2>
            <input type="password" v-model="newSessionParams.password" />
          </div>
          <br />
          <input type="submit" class="btn btn-danger btn-lg" value="Get to Work!" />
        </form>
      </div>
    </section>
  </div>
</template>

<style>
#generate {
  height: 50vh;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("https://arcane-tor-51371.herokuapp.com//sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          console.log(response.data);
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userName", response.data.first_name);
          localStorage.setItem("userId", response.data.user_id);
          this.$router.push("https://arcane-tor-51371.herokuapp.com/profile");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
