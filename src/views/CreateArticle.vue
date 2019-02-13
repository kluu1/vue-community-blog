<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <picture-input
              accept="image/jpeg,image/png"
              size="5"
              button-class="btn btn-danger"
              @change="onChange"
            >
            </picture-input>
            <input type="text" placeholder="Title" class="form-control mb-3" />
            <wysiwyg v-model="content" />
            <div class="text-center">
              <button class="btn-success btn-lg mt-3" @click="createArticle()">
                Create Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import PictureInput from "vue-picture-input";

export default {
  components: {
    PictureInput
  },

  data() {
    return {
      content: "",
      image: null
    };
  },
  mounted() {
    console.log(process.env);
  },

  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);

      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>
