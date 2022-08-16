<template>
  <header-view></header-view>
  <div class="container" style="padding-bottom: 80px">
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
#profile {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
}

#imgProfile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
