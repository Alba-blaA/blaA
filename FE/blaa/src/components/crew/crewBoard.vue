<template>
  <div>
    {{ $route.params.crew_pk }} 의 게시판입니다.
    
    <h2>글 목록</h2>
    <table>
      <thead>
        <th>글번호</th>
        <th>글제목</th>
        <th>글내용</th>
        <th>작성일자</th>
        <th>공개여부</th>
        <th>고정여부</th>
      </thead>
      <board-item v-for="article in articles" :key="article.articleno" v-bind="article" />
    </table>
    <button @click="moveRegist">글쓰기</button>
  </div>
</template>

<script>
import BoardItem from "@/components/crew/article/BoardItem.vue";
import axios from "axios";
const url = "http://127.0.0.1:8000/api/v1/";
export default {
  components: {
    BoardItem,
  },
  props: {
    crew_pk: Number,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    console.log(this.$route.params.crew_pk);
    axios
      .get(url + "crews/article/" + this.$route.params.crew_pk + "/", {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0ODQ4OTgxfQ.JBHgq3KkxPNASpcEfekXs8DVHPBftcTHgj91GZOrKtg`,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        this.articles = response.data.results;
      });
  },
  methods: {
    moveRegist() {
      this.$router.push({ name: "articleregist" });
    },
  },
}
</script>

<style>

</style>