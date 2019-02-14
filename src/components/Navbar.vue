<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <div>Community Blog</div>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li v-if="!authUser" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="!authUser" class="nav-item">
            <router-link class="nav-link" to="/signup">Signup</router-link>
          </li>
          <li v-if="authUser" class="nav-item">
            <router-link class="nav-link" to="/articles/create"
              >Create New Article</router-link
            >
          </li>
          <li v-if="authUser" class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ authUser.name }}</a
            >
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click="logout()">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

//
<script>
export default {
  computed: {
    authUser() {
      return this.$root.auth.user;
    }
  },
  methods: {
    // method to logout
    logout() {
      // remove auth token from local storage
      localStorage.removeItem('auth');
      // set auth data to empty object
      this.$root.auth = {};
      this.$noty.success('Succeessfully logged out.');
    }
  }
};
</script>

<style>
.navbar {
  -webkit-box-shadow: 0 8px 6px -6px #999;
  -moz-box-shadow: 0 8px 6px -6px #999;
  box-shadow: 0 8px 6px -6px #999;
}

.nav-link {
  color: #fff !important;
}

.nav-link:hover {
  font-weight: bold;
}
</style>
