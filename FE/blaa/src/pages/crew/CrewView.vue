<template>
<div>
  <h3>크루 페이지</h3>
  <span>
    <router-link :to="{ name: 'board' }">게시글</router-link>
    <router-link :to="{ name: 'schedule' }">스케줄</router-link>
    <!-- <router-link :to="{name: 'qna'}">QnA</router-link> -->
    <!-- <router-link :to="{ name: 'gallery' }">갤러리</router-link> -->
  </span>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style></style>
