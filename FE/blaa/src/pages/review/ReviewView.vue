<template>
  <h1>여기는 리뷰 페이지입니다!</h1>
  <router-link class="btn btn-primary" :to="{name: 'createReview'}">리뷰 생성</router-link>
  <div v-if="reviews"> 
    <ReviewList v-for="review in reviews" :key="review.store_pk" :review="review"/>
  </div>
  <p v-else>아직 리뷰가 없어요 ㅠㅠ</p>
  
  
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import ReviewList from '@/components/review/ReviewList.vue'

export default {
  components: {
    ReviewList
  },
  setup() {
    const store = useStore()
    const reviews = ref([])

    const start = async () => {
      await store.dispatch('review/getReviews')
        reviews.value = store.state.review.reviews
    }

    start()

    return {
      reviews
    }
  }
}
</script>

<style></style>
