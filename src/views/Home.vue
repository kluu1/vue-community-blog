<template>
  <div>
    <div class="d-flex mt-4 justify-content-center">
      <button
        :disabled="articles.prev_page_url === null"
        class="btn btn-primary mr-5"
        @click="getPrevArticles()"
      >
        Prev Page
      </button>
      <button
        :disabled="articles.next_page_url === null"
        class="btn btn-primary ml-5"
        @click="getNextArticles()"
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
import Axios from 'axios';
import config from '@/config';
import Article from '@/components/Article.vue';

export default {
  // set the imported component
  components: {
    Article
  },

  // set the data state
  data() {
    return {
      articles: {},
      loading: true
    };
  },

  // on mount, get the list of articles
  mounted() {
    this.getArticles();
  },

  methods: {
    // method to get the list of articles
    getArticles(url = `${config.apiUrl}/articles`) {
      // while fetching, update loading data to true
      this.loading = true;
      // get request to get the list of articles
      Axios.get(url).then(response => {
        // after request is complete, set loading to false
        this.loading = false;
        // set the article data to the response data
        const { data } = response.data;
        this.articles = data;
      });
    },

    // get next page of articles
    getNextArticles() {
      this.getArticles(this.articles.next_page_url);
    },

    // get previous page of articles
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
