<template>
  <div v-if="reviews.length">
    <div v-for="review in reviews" :key="review.id">
      
    </div>
  </div>
  <p v-else>아직 리뷰가 없어요 ㅠㅠ</p>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array
    }
  },
  setup(props) {
    console.log(props.reviews)
  }
}
</script>

<style>

</style>