<template>
  <div class="row" id="top_box">
    <div class="col-2" id="top_box_text" @click="moveBack"><img src="@/assets/icons/arrow-left.png" /></div>
    <h5 class="col-8" id="top_box_text">게시글</h5>
    <div class="col-2" id="top_box_text"></div>
  </div>
  <div style="padding: 20px 20px 0px 20px">
    <div>
      <h3 style="margin: 0">{{ article.crew_title }}</h3>
      <div class="row">
        <div class="col-2" style="padding-bottom: 10px">
          <img :src="article.profile" width="50" style="float: right; margin-top: 15px; padding-right: 0" />
        </div>
        <div class="col-10" style="padding-top: 10px; padding-left: 0">
          <p style="margin: 0">{{ article.nickname }}</p>
          <p>{{ article.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
  <hr style="margin: 0" />

  <div style="padding: 20px 20px 0px 20px">
    <div>
      <template v-for="image in article.images" :key="image">
        <img :src="host + image.article_picture" width="200" />
        {{ image.crew_article_pk }}
      </template>
      <div style="white-space: pre">{{ article.crew_content }}</div>
    </div>
  </div>
  <hr />

  <div style="padding: 0px 20px 0px 20px">
    <div>
      <button @click="articlemodify">수정</button>
      <button @click="articledele">삭제</button>
    </div>
    <comment-list></comment-list>
  </div>
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

    onMounted(async () => {
      await store.dispatch("crew/getArticleDetail", route.params.crew_article_pk);
      article.value = store.state.crew.article;
      console.log("이미지", article.value.images);
    });

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
    };

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
