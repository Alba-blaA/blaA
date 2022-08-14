<template>
<div id="review" class="d-flex justify-content-center">
  <div style="width: 90%">
     <div class="d-flex justify-content-between">
      <h1 style="font-weight:bold">가게 리뷰</h1>
      <div class="d-flex">
        <!-- 클릭하거나 엔터를 치면 -->
        <div class="search-box">
          <input class="search-txt" type="text" v-model="searchText" @keypress.enter="searchStore">
          <span class="search-button material-symbols-outlined" @click="isSearch=!isSearch">search</span>
        </div>
        <router-link style="color:black; margin-left:5px; text-align:enter;" :to="{name: 'createReview'}"><i class="fa fa-solid fa-plus fa-2x"></i></router-link>
      </div>
    </div>
    <div v-if="reviews.value"> 
      <ReviewList v-for="review in reviews.value" :key="review" :review="review"/>
      <div class="end-list"></div>
    </div>
    <p v-else>아직 리뷰가 없어요 ㅠㅠ</p>
  </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'
import ReviewList from '@/components/review/ReviewList.vue'

export default {
  components: {
    ReviewList,
  },
  setup() {
    const store = useStore()
    const reviews = ref([])
    const currentPage = ref(1)
    const total = ref(0)
    const searchStoreName = ref('')
    const isSearch = ref(false)

    // 데이터를 가져오는 함수
    const getReviews = async(page = currentPage.value) => {
      const data = {
        searchText: searchStoreName.value,
        page: page
      }
      await store.dispatch('review/getReviews', data)
    }

    // DOM에 가져오기 전에 데이터 가져오기
    onBeforeMount(async() => {
      await getReviews()
      reviews.value = computed(() => {return store.state.review.reviews})
      total.value = computed(() => {return store.state.review.total_reviews})
    })

    const numberOfPages = computed(() => {
      return Math.ceil(total.value.value / 5)
    })

    // 무한 스크롤 구현
    window.onscroll = function(e) {
    if (numberOfPages.value > currentPage.value) {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { 
        setTimeout(function(){
        // 실행 시킬 함수 구현
        currentPage.value += 1
        getReviews(currentPage.value)
        }, 1000)}
      }
    }

    // 필터링 함수
    // 새로 찾을 때 검색 정보 데이터를 다시 받아와야함
    const searchStore = (searchText) => {
      console.log(searchText)
      searchStoreName.value = searchText
      // 새로 찾을 때 
      currentPage.value = 1
      getReviews()
    }

    return {
      reviews,
      numberOfPages,
      currentPage,
      getReviews,
      searchStore,
      isSearch
    }
  }
}
</script>

<style scoped>
.search-box {
  height: 40px;
  background-color: #949BA0;
  padding: 0 10px;
  border-radius: 40px;
}

.search-button {
  color: #EDEDED;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #949BA0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-txt {
  float: left;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 15px;
  line-height: 40px;
  width: 0;
  transition: 0.5s;
}
/* 마우스를 위에 올렸을 때 늘어남 */
.search-box:hover > .search-txt {
  width: 200px;
}

.search-box:hover > .search-btn {
  background: #464E54;
}
</style>
