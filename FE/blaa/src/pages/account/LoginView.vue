<template>
  <h4>여기는 로그인 페이지입니다!</h4>
  <li v-for="(user, i) in userInfo" :key="i" v-bind="user">
    <router-link :to="'/crew/'+ user.user_pk">{{ user.user_pk }}</router-link>
  </li>
</template>

<script>
import axios from "axios";
const url = "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/loginuser";
export default {
  data() {
    return {
      userInfo: [],
    };
  },
  created() {
    axios.get(url).then((response) => {
      console.log(response.data);
      this.userInfo = response.data;
    });
  },
};
</script>

<style></style>
