<template>
  <header-view></header-view>
  <div style="padding-bottom: 80px">
    <router-view></router-view>
  </div>
  <footer-view></footer-view>
</template>

<script>
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";

export default {
  components: {
    FooterView,
    HeaderView,
  },
};
</script>

<style>
@font-face {
  font-family: "pretendard";
  src: url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/variable/pretendardvariable.css");
}
</style>
