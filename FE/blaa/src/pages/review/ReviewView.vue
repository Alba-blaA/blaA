<template>
  <h1>여기는 리뷰 페이지입니다!</h1>
  <router-link class="btn btn-primary" :to="{name: 'createReview'}">리뷰 생성</router-link>
  <div v-if="reviews"> 
    <ReviewList v-for="review in reviews" :key="review.store_pk" :review="review"/>
    <PaginationBar :currentPage="currentPage" :numberOfPages="numberOfPages" @click="searchReview"/>
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

    onBeforeMount(async() => {
      await store.dispatch('review/getReviews')
      // 페이지네이션 처리      
      reviews.value = store.state.review.reviews.slice((currentPage.value - 1)* 5 + 1, currentPage.value*5 + 1)
      total.value = store.state.review.reviews.length
      console.log(total.value)
    })

    // const numberOfPages = computed(() => {
    //   console.log(total.value)
    //   return Math.ceil(total.value / 5)
    // })

    const searchReview = (page = currentPage.value) => {
      reviews.value = store.state.review.reviews.slice((page - 1)* 5 + 1, page * 5)
    }

    return {
      reviews,
      searchReview,
      // numberOfPages
    }
  }
}
</script>

<style></style>
