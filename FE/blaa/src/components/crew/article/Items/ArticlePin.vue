<template>
  <div v-if="articles.length > 0">
    <div v-for="(article, i) in articleFilter" :key="i">
      <div class="card" @click="moveToArticle(article.crew_article_pk)">
        <div class="row">
          <div class="col-8">
            <p class="card_text">{{ article.crew_title }}</p>
          </div>
          <div class="col-4">
            <img :src="article.profile" width="20" style="float: left; margin-top: 15px; padding-right: 0" />
            <p class="card_text" style="float: left">{{ article.nickname }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const articles = ref([]);

    const getArticle = async () => {
      await store.dispatch("crew/getCrewArticle", route.params.crew_pk);
      articles.value = store.state.crew.articles;
    };

    const articleFilter = computed(() => {
      if (articles.value.length > 0) {
        return articles.value.filter((item) => {
          return item.crew_pin == true;
        });
      } else {
        return 0;
      }
    });

    getArticle();

    const moveToArticle = (crew_article_pk) => {
      router.push({ name: "articledetail", params: { crew_article_pk: crew_article_pk } });
    };

    return {
      articleFilter,
      articles,
      moveToArticle,
    };
  },
};
</script>

<style scoped>
.card {
  width: 90%;
  height: 50px;
  margin: auto;

  margin-bottom: 5px;

  background: #ffffff;
  box-shadow: 0px 4px 80px rgba(0, 0, 0, 0.07), 0px 0.893452px 17.869px rgba(0, 0, 0, 0.0417275), 0px 0.266004px 5.32008px rgba(0, 0, 0, 0.0282725);
  /* border-radius: 20px; */
}

.card_text {
  font-weight: 600;
  padding: 5px;
  line-height: 40px;
  margin-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
