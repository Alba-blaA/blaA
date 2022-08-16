<template>
  <div>
    <div class="row" id="top_box">
      <div class="col-2" id="top_box_text"><img src="@/assets/icon/arrow-left.png" /></div>
      <h5 class="col-8" id="top_box_text">게시글</h5>
      <div class="col-2" id="top_box_text"><img src="@/assets/icon/search.png" /></div>
    </div>
    <article-list></article-list>
    <button @click="moveRegist">글쓰기</button>
  </div>
</template>

<script>
import ArticleList from "@/components/crew/article/ArticleList.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    ArticleList,
  },
  setup() {
    const router = useRouter();
    const moveRegist = () => {
      router.push({ name: "articleregist" });
    };
    return {
      moveRegist,
    };
  },
};
</script>

<style scoped>
#top_box {
  height: 50px;
  margin: auto;

  color: white;
  background-color: #498d6d;
}

#top_box_text {
  /* display: flex; */
  text-align: center;
  line-height: 50px;
}
</style>
