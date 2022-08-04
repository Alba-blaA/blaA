<template>
  <h1>여기는 리뷰 페이지입니다!</h1>
  <ReviewList :reviews="reviews"/>
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
    const reviews = ref({})

    const start = async () => {
      await store.dispatch('review/getReviews')
      reviews.value = computed(() => {
        return store.state.review.reviews
      })
    }

    start()

    return {
      reviews
    }
  }
}
</script>

<style></style>
