<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Signup</h3>
          <div class="form-group">
            <input
              v-model="name"
              :class="{
                'is-invalid': errors.name,
                'is-valid': !errors.name && this.submitted
              }"
              type="text"
              placeholder="Name"
              class="form-control"
            />
            <div v-if="errors.name" class="errors">
              <small
                v-for="error in errors.name"
                :key="error"
                class="text-danger"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="email"
              :class="{
                'is-invalid': errors.email,
                'is-valid': !errors.email && this.submitted
              }"
              type="text"
              placeholder="Email"
              class="form-control"
            />
            <div v-if="errors.email" class="errors">
              <small
                v-for="error in errors.email"
                :key="error"
                class="text-danger"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="password"
              :class="{
                'is-invalid': errors.password,
                'is-valid': !errors.password && this.submitted
              }"
              type="password"
              placeholder="Password"
              class="form-control"
            />
            <div v-if="errors.password" class="errors">
              <small
                v-for="error in errors.password"
                :key="error"
                class="text-danger"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="form-group text-center">
            <button
              :disabled="loading"
              class="btn form-control btn-success"
              @click="registerUser()"
            >
              <i v-if="loading" class="fas fa-spin fa-spinner"></i>
              {{ loading ? "" : "Signup" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import config from "@/config";

export default {
  beforeRouteEnter(to, from, next) {
    next();
    if (localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },

  methods: {
    registerUser() {
      this.loading = true;
      Axios.post(`${config.apiUrl}/auth/register`, {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.loading = false;
          this.submitted = true;
          const { data } = response.data;
          localStorage.setItem("auth", JSON.stringify(data));
          this.$root.auth = data;
          this.$noty.success("Successfully registered.");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.$noty.error("Oops! Something went wrong.");
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
        });
    }
  }
};
</script>
