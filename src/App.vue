<template>
  <div id="app">
    <header id="header" class="fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="logo me-auto me-lg-0"><a href="/">Better Than Yesterday Fitness</a></h1>
        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a v-if="!isLoggedIn()" href="/signup">Sign Up</a></li>
            <li><a v-if="!isLoggedIn()" href="/login">Login</a></li>
            <li><a v-if="isLoggedIn()" href="/generate_workout">Generate New Workout</a></li>
            <li><a v-if="isLoggedIn()" href="/profile">Profile</a></li>
            <li><a v-if="isLoggedIn()" href="/logout">Log Out</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <!-- .navbar -->
        <!-- <section id="hero" class="d-flex align-items-center">
          <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
            <h1>Kelly Adams</h1>
            <h2>I'm a professional illustrator from San Francisco</h2>
          </div>
        </section> -->
        <!-- End Hero -->

        <!-- <router-link to="/">Home</router-link>
      |
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/signup">Sign Up</router-link>
      |
      <router-link to="/logout">Log Out</router-link>
      |
      <router-link to="/generate_workout">Generate Workout</router-link>
      |
      <router-link to="/profile">Profile</router-link> -->
      </div>
    </header>
    <div v-if="flashMessage" class="alert alert-success flash-message" v-on:click="flashMessage = ''">
      {{ flashMessage }}
    </div>

    <router-view />
    <footer class="fixed-bottom" id="footer" position="fixed">
      <div class="container">
        <div class="copyright">
          &copy; Copyright
          <strong><span>Percy Jonasson</span></strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/ -->
          Designed by
          <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
    <!-- End  Footer -->
  </div>
</template>

<style>
.flash-message {
  position: fixed;
  top: 5em;
  z-index: 10001;
}
.alert alert-success {
  position: absolute;
}
</style>

<script>
export default {
  data: function () {
    return {
      flashMessage: "",
    };
  },
  methods: {
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
