<template>
  <ReviewMap v-if="isModalOpen" @close-modal="isModalOpen=false"/>
  <h1>리뷰 작성 폼</h1>
  <button class="btn btn-primary" @click="isModalOpen=true">검색</button>
</template>

<script>
import ReviewMap from '@/components/review/ReviewMap.vue'
import { ref } from 'vue'

export default {
  components: {
    ReviewMap,
  },
  setup() {
    const isModalOpen = ref(false)

    return {
      isModalOpen
    }
  }
}
</script>

<style>

</style>