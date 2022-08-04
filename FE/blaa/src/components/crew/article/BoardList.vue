<template>
  <div>
    <h2>글 목록</h2>
    <table>
      <board-item v-for="article in articles" :key="article.articleno" v-bind="article" />
    </table>
    <button @click="moveRegist">글쓰기</button>
  </div>
</template>

<script>
import BoardItem from "@/components/crew/article/BoardItem.vue";
import axios from "axios";
const url = "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/list";

export default {
  name: "BoardList",
  components: {
    BoardItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    axios.get(url).then((response) => {
      // console.log(response);
      this.articles = response.data;
    });
  },
  methods: {
    moveRegist() {
      this.$router.push({ name: "articleregist" });
    },
  },
};
</script>

<style scoped></style>
