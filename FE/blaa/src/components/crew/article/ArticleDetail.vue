<template>
  {{ $route.params.crew_article_pk }}번 글

  <div>
    <h2>제목 : {{ article.crew_title }}</h2>
    <p>작성자: {{ article.user }}</p>
    <template v-for="image in article.images" :key="image">
      <img :src="host + image.article_picture" width="200" />
      {{ image.crew_article_pk }} </template
    ><br />
    <p>{{ article.crew_content }}</p>
    <p>{{ article.images.article_picture }}</p>
    <button @click="articlemodify">수정</button>
    <button @click="articledele">삭제</button>
  </div>
  <comment-list></comment-list>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CommentList from "@/components/crew/article/Comment/CommentList.vue";
export default {
  components: {
    CommentList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const article = ref([]);
    const host = ref("https://i7b209.p.ssafy.io");

    const getDetail = async () => {
      await store.dispatch("crew/getArtileDetail", route.params.crew_article_pk);
      article.value = store.state.crew.article;
      console.log("이미지", article.value.images);
    };

    const articlemodify = () => {
      router.push({ name: "articlemodify" });
    };

    const articledele = () => {
      if (confirm("삭제하시겠습니까?")) {
        router.replace({
          name: "articledelete",
          params: { crew_article_pk: route.params.crew_article_pk },
        });
      }
    };

    getDetail();

    return {
      article,
      getDetail,
      articlemodify,
      articledele,
      host,
    };
  },
};
</script>

<style></style>
