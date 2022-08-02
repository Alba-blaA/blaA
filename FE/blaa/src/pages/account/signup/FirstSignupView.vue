<template>
  <button @click.prevent="isAlba">아르바이트를 하고 있어요</button> &nbsp;
  <button @click.prevent="isPublic">아르바이트를 안 하고 있어요</button>
</template>

<script>
import { useStore } from "vuex";
import router from "@/router/index.js";

export default {
  setup() {
    const store = useStore();

    const isAlba = () => {
      store.commit("account/ALBA", true);
      console.log("isAlba : ", store.state.account.isAlba);
      router.push({ name: "form" });
    };

    const isPublic = () => {
      store.commit("account/ALBA", false);
      console.log("isAlba : ", store.state.account.isAlba);
      router.push({ name: "form" });
    };

    return {
      isAlba,
      isPublic,
    };
  },
};
</script>

<style></style>
