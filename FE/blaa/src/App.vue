<template>
  <header-view></header-view>
  <div class="app" style="padding-bottom: 80px">
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
    // HeaderView,
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
    font-family: 'Pretendard-ExtraLight';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraLight.woff') format('woff');
    font-weight: 200;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 200;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard-ExtraLight';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraLight.woff') format('woff');
    font-weight: 200;
    font-style: normal;
}


</style>
