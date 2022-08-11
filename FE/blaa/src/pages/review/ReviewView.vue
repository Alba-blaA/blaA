<template>
  <h1>여기는 리뷰 페이지입니다!</h1>
  <router-link class="btn btn-primary" :to="{name: 'createReview'}">리뷰 생성</router-link>
  <div v-if="reviews"> 
    <ReviewList v-for="review in reviews" :key="review.store_pk" :review="review"/>
    <PaginationBar :currentPage="currentPage" :numberOfPages="numberOfPages" :idx="idx" @click="getReviews"/>
  </div>
  <p v-else>아직 리뷰가 없어요 ㅠㅠ</p>
  
  
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'
import ReviewList from '@/components/review/ReviewList.vue'
import PaginationBar from '@/components/review/PaginationBar.vue'

export default {
  components: {
    ReviewList,
    PaginationBar
  },
  setup() {
    const store = useStore()
    const reviews = ref([])
    const currentPage = ref(1)
    const total = ref(0)

    // 데이터를 가져오는 함수
    const getReviews = async(page = currentPage.value) => {
      await store.dispatch('review/getReviews', page)
      reviews.value = store.state.review.reviews
      currentPage.value = page
    }

    // DOM에 가져오기 전에 데이터 가져오기
    onBeforeMount(async() => {
      await getReviews()
      total.value = store.state.review.total_reviews
    })

    const numberOfPages = computed(() => {
      return Math.ceil(total.value / 5)
    })

    const idx = computed(() => {
      return parseInt((currentPage.value -1) /5)
    })

    return {
      reviews,
      numberOfPages,
      currentPage,
      getReviews,
      idx
    }
  }
}
</script>

<style></style>
