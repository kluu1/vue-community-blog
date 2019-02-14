<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <picture-input
              accept="image/jpeg, image/png"
              size="5"
              button-class="btn btn-danger"
              @change="onChange"
            />
            <select v-model="category" class="form-control my-3">
              <option selected>Select a Category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</option
              >
            </select>
            <input
              v-model="title"
              type="text"
              placeholder="Title"
              class="my-3 form-control"
            />
            <wysiwyg v-model="content" />
            <div class="text-center">
              <button
                :disabled="loading"
                class="btn-success btn mt-3"
                @click="createArticle()"
              >
                <i v-if="loading" class="fas fa-spin fa-spinner"></i>
                {{ loading ? '' : 'Create Category' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';
import PictureInput from 'vue-picture-input';

export default {
  // Check local storage for "auth"
  beforeRouteEnter(to, from, next) {
    // If "auth" is not found, redirect to the login page
    if (!localStorage.getItem('auth')) {
      return next({ path: '/login' });
    }
    next();
  },

  components: {
    PictureInput
  },

  data() {
    return {
      title: '',
      content: '',
      image: null,
      categories: [],
      category: '',
      loading: false
    };
  },

  // on mount, call function to get categories
  mounted() {
    this.getCategories();
  },

  methods: {
    // method to change image
    onChange(image) {
      this.image = image;
    },

    createArticle() {
      // valid title, image, category, and content is NOT empty
      if (!this.title || !this.image || !this.category || !this.content) {
        this.$noty.error('Please fill in all fields.');
        return;
      }

      this.loading = true;
      // create new form object to store form data
      const form = new FormData();
      form.append('file', this.image);
      form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

      // make post request to cloudinary with form data
      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
        .then(res =>
          // make post request to save the article
          Axios.post(
            `${config.apiUrl}/articles`,
            {
              title: this.title,
              content: this.content,
              category_id: this.category,
              imageUrl: res.data.secure_url
            },
            {
              // pass authorization token with request
              headers: {
                Authorization: `Bearer ${this.$root.auth.token}`
              }
            }
          )
            .then(() => {
              this.loading = false;
              this.$noty.success('Article created successfully.');
              this.$router.push('/');
            })
            // handle error for creating new article
            .catch(() => {
              this.loading = false;
              this.$noty.error('Oops ! Something went wrong.');
            })
        )
        // handle error for post request for cloudinary
        .catch(() => {
          this.loading = false;
          this.$noty.error('Oops ! Something went wrong.');
        });
    },

    // method to get the list of categories
    getCategories() {
      // check local storage for categories
      const categories = localStorage.getItem('categories');
      // if found, set categories into data
      if (categories) {
        this.categories = JSON.parse(categories);
        return;
      }

      // get request to get the list of categories
      Axios.get(`${config.apiUrl}/categories`).then(res => {
        // save the list of categories into the "categories" data
        this.categories = res.data.categories;
        // save the list of categories into local storage
        localStorage.setItem('categories', JSON.stringify(this.categories));
      });
    }
  }
};
</script>
