<template>
  <div>
    <h3>내 스토리 조회</h3>
  </div>
</template>

<script>
// import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "@/api/axios.js";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const userInfo = store.state.account.userInfo;
    console.log(userInfo);

    axios
      .get(api.story.myStory(route.params.user_pk))
      .then((data) => {
        console.log(data.config.headers);
        console.log(data);
      })
      .catch((err) => {
        console.log("header", err.config.headers);
        console.log(err);
      });

    // onMounted(() => {
    //   const userInfo = store.state.account.userInfo;
    //   console.log(userInfo);

    //   axios.get(api.story.myStory(route.params.user_pk), route.params.user_pk).then((data) => {
    //     console.log(data);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // })
  },
};
</script>

<style></style>
