<template>
  <br />
  <h3><b>그룹</b></h3>
  <hr />

  <!-- <table v-for="review in reviewList.results" :key="review."> -->

  <!-- </table> -->
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();

    return {};
  },
};
</script>

<style></style>
