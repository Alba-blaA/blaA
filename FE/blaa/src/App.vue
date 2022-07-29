<template>
  <h1>메인페이지</h1>
  <router-view />
</template>

<script>
//
// import axios from 'axios'
import { useStore } from "vuex";

export default {
  setup() {
    // vuex store 사용법 예제
    const store = useStore();

    // actions
    store.dispatch("test/test");
    // state
    console.log(store.state.test.data);
    // getters
    console.log(store.getters["test/example"]);
  },
};
</script>

<style></style>
