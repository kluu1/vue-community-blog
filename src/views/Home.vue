<template>
  <div class="row">
    <div
      v-for="article in articles.data"
      v-if="articles.data"
      :key="article.id"
      class="col-md-8 offset-md-2"
    >
      <Article :article="article" />
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
      articles: {}
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      Axios.get(`${config.apiUrl}/articles`).then(response => {
        this.articles = response.data.data;
      });
    }
  }
};
</script>
