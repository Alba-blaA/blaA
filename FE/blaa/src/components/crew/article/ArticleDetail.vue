<template>
  <div class="row" id="top_box">
    <div class="col-2" id="top_box_text" @click="moveBack"><img src="@/assets/icons/arrow-left.png" /></div>
    <h5 class="col-8" id="top_box_text">게시글</h5>
    <div class="col-2" id="top_box_text"></div>
  </div>
  <div>
    {{article}}
    <h2>제목 : {{ article.crew_title }}</h2>
    <p>작성자: {{ article.nickname }}</p>
    <template v-for="image in article.images" :key="image">
      <img :src="host + image.article_picture" width="200" />
      {{ image.crew_article_pk }} </template
    ><br />
    <p>{{ article.crew_content }}</p>
    <button @click="articlemodify">수정</button>
    <button @click="articledele">삭제</button>
  </div>
  <comment-list></comment-list>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
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

    onMounted ( async () => {
      await store.dispatch("crew/getArtileDetail", route.params.crew_article_pk);
      article.value = store.state.crew.article;
      console.log("이미지", article.value.images);
    })

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

    const moveBack = () => {
      router.go(-1);
    }


    return {
      article,
      articlemodify,
      articledele,
      host,
      moveBack,
    };
  },
};
</script>

<style scoped>
#top_box {
  height: 55px;
  margin: auto;

  color: white;
  background-color: #498d6d;
}

#top_box_text {
  /* display: flex; */
  text-align: center;
  line-height: 55px;
}
</style>
