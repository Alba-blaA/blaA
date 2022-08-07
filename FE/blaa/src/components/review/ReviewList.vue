<template>
  <div v-if="reviews.length">
    
  </div>
  <div v-else>아직 리뷰가 없어요 ㅠㅠ</div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array
    }
  },
  setup() {

  }
}
</script>

<style>

</style>