<template>
  <div class="app">
    <section id="signup" class="d-flex align-items-top">
      <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
        <form v-on:submit.prevent="submit()" autocomplete="off">
          <h1>Signup</h1>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
          <div>
            <h2>First Name:</h2>
            <input type="text" v-model="newUserParams.first_name" />
            <small v-if="newUserParams.first_name.length > 20">Must be fewer than 20 Characters</small>
          </div>
          <div>
            <h2>Last Name:</h2>
            <input type="text" v-model="newUserParams.last_name" />
            <small v-if="newUserParams.last_name.length > 20">Must be fewer than 20 Characters</small>
          </div>
          <div>
            <h2>Username:</h2>
            <input type="text" v-model="newUserParams.username" />
            <small v-if="newUserParams.username.length > 20">Must be fewer than 20 Characters</small>
          </div>
          <div>
            <h2>Email:</h2>
            <input type="email" autocomplete="off" v-model="newUserParams.email" />
          </div>
          <div>
            <h2>Password:</h2>
            <input type="password" v-model="newUserParams.password" />
          </div>
          <div v-if="newUserParams.password.length > 6">
            <h2>Password confirmation:</h2>
            <input type="password" v-model="newUserParams.password_confirmation" />
          </div>
          <br />
          <input type="submit" value="Submit" />
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
      newUserParams: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("https://arcane-tor-51371.herokuapp.com/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "New User Created";

          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
