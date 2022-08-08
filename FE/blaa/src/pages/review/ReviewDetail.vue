<template>
  <h1>리뷰 상세</h1>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const review = ref([])

    const start = async() => {
      await store.dispatch('review/getReview', route.params.store_pk)
      review.value = store.state.review.review        
    }

    start()
  }
}
</script>

<style>

</style>