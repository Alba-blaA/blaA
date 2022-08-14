<template>
  <div>게시판-view</div>
  <div id="contents">
    <router-view></router-view>
  </div>
</template>

<script>
// import BoardList from "@/components/crew/article/BoardList.vue";
export default {
  components: {
    // BoardList,
  },
};
</script>

<style>
#contents {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 6rem;
}
</style>
