<template>
  <div>
    <div class="d-flex my-4 justify-content-between">
      <button
        :disabled="articles.prev_page_url === null"
        class="btn btn-warning"
        @click="getPrevArticles"
      >
        Prev Page
      </button>
      <button
        :disabled="articles.next_page_url === null"
        class="btn btn-warning"
        @click="getNextArticles"
      >
        Next Page
      </button>
    </div>
    <div v-if="!loading" class="row">
      <div
        v-for="article in articles.data"
        :key="article.id"
        class="col-md-8 offset-md-2"
      >
        <Article :article="article" />
      </div>
    </div>
    <div v-else class="loader text-center">
      <i class="fas fa-3x fa-spin fa-spinner"></i>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import config from "@/config";
import Article from "@/components/Article.vue";

export default {
  components: {
    Article
  },
  data() {
    return {
      articles: {},
      loading: true
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles(url = `${config.apiUrl}/articles`) {
      this.loading = true;
      Axios.get(url).then(response => {
        this.loading = false;
        this.articles = response.data.data;
      });
    },
    getNextArticles() {
      this.getArticles(this.articles.next_page_url);
    },
    getPrevArticles() {
      this.getArticles(this.articles.prev_page_url);
    }
  }
};
</script>

<style>
.btn-warning {
  color: #fff;
}
</style>
