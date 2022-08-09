<template>
  <div>
    <h3>팔로우 페이지</h3>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api/api.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const token = sessionStorage.getItem("token");

    axios
      .get(api.accounts.myFollower(route.params.user_pk), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "following",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(api.accounts.myFollower(route.params.user_pk), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "follow",
        },
      })
      .then((response) => {
        console.log("팔로우 response", response);
      })
      .catch((err) => {
        console.log("팔로우 err : ", err);
      });

    return {};
  },
};
</script>

<style></style>
