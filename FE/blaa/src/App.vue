<template>
  <header-view></header-view>
  <div style="padding-bottom: 80px">
    <router-view></router-view>
  </div>
  <footer-view v-if="isLogin"></footer-view>
</template>

<script>
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    FooterView,
    HeaderView,    
  },

  setup() {
    const store = useStore();

    const isLogin = computed(() => {
      return store.state.account.isLogin;
    });

    return {
      isLogin,
    };
  },
};
</script>

<style>
@font-face {
  font-family: "pretendard";
  src: url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/variable/pretendardvariable.css");
}
</style>
