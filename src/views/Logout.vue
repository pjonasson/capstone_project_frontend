<template>
  <div class="app"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    console.log("Success");

    this.$parent.flashMessage = "Logged Out Successfully!";
    this.$router.push("/");
  },
};
</script>
