<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Login</h3>
          <div class="form-group">
            <input
              v-model="email"
              :class="{ 'is-invalid': errors.email }"
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
              :class="{ 'is-invalid': errors.password }"
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
              @click="loginUser"
            >
              <i v-if="loading" class="fas fa-spin fa-spinner"></i>
              {{ loading ? '' : 'Login' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';

export default {
  beforeRouteEnter(to, from, next) {
    next();
    if (localStorage.getItem('auth')) {
      return next({ path: '/' });
    }
    next();
  },

  data() {
    return {
      email: '',
      password: '',
      errors: {},
      loading: false
    };
  },

  methods: {
    // method to handle user login
    loginUser() {
      this.loading = true;
      Axios.post(`${config.apiUrl}/auth/login`, {
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.loading = false;
          // set the root auth data to response auth data
          const { data } = response.data;
          this.$root.auth = data;
          // store the auth data into local storage
          localStorage.setItem('auth', JSON.stringify(data));
          this.$noty.success('Successfully logged in.');
          // redirect user to the home page
          this.$router.push('/');
        })
        // handle user login error
        .catch(({ response }) => {
          this.loading = false;
          this.$noty.error('Oops something went wrong!');
          // if response status is 401, return custom error message
          if (response.status === 401) {
            this.errors = {
              email: ['These credentials do not match our records.']
            };
          } else {
            this.errors = response.data;
          }
        });
    }
  }
};
</script>
