<template>
  <div v-if="articles.length < 1">아직 작성된 게시글이 없어요 ㅜ ㅜ</div>
  <div v-else>
    <article-list-item v-for="(article, i) in articles" :key="i" v-bind="article" :isMember="isMember" />
  </div>
</template>

<script>
import ArticleListItem from "@/components/crew/article/ArticleListItem.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
export default {
  components: {
    ArticleListItem,
  },
  props: {
    isMember: Boolean,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const articles = ref([]);

    onMounted(async () => {
      await store.dispatch("crew/getCrewArticle", route.params.crew_pk);
      articles.value = store.state.crew.articles;
    });

    return {
      articles,
    };
  },
};
</script>

<style scoped></style>
