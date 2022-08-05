<template>
 <div class="my-modal">
    <div class="overlay">
      <div class="modal-card" style="opacity: 1">
        <div>
          <p>장소를 검색하세요 <span  @click="$emit('close-modal')" style="cursor:pointer"> 닫기</span></p>
          <input type="text" v-model="searchWord" @keyup.enter="searchStore">
        </div>
        <div v-if="searchList.length">
          <ReviewMapList v-for="searchChild in searchList" :key="searchChild.id" :searchChild="searchChild"/>
          <PaginationBar :currentPage="currentPage" :numberOfPages="numberOfPages" @click="searchStore"/>
        </div>
        <p v-else>검색결과가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import axios from 'axios'
import ReviewMapList from '@/components/review/ReviewMapList.vue'
import PaginationBar from '@/components/review/PaginationBar.vue'

export default {
  components: {
    ReviewMapList,
    PaginationBar
  },
  setup() {
    const searchList = ref([])
    const searchWord = ref('')
    const currentPage = ref(1)
    const totalCount = ref(0)

    // 가게를 검색하는 함수
    console.log(currentPage.value)
    const searchStore = async(page = currentPage.value) => {
      const query = searchWord.value
      try {
        const res = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`, {
          headers: {
            Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`
          },
          params: {
            page: page,
            size: 5
          }
        })
        searchList.value = res.data.documents
        totalCount.value = res.data.meta.total_count
        currentPage.value = page
      } catch(error) {
        console.error(error)
      }
    }
    
    // 페이지 수 계산
    const numberOfPages = computed(() => {
      return Math.ceil(totalCount.value / 5)
    })

    return {
      searchWord,
      searchList,
      searchStore,
      currentPage,
      numberOfPages,
    }
  }

}
</script>

<style scoped>
.my-modal, .overlay {
    width: 100%;
    height: 100%;
    /* 상단에 고정되어 있어야 하므로 */
    position: fixed;
    /* top: 0px;
    left: 0px; */
  }
  /* 모달이 떳을 떄 뒤에 배경화면을 안보이게 */
  .overlay {
    opacity: 0.5;
    background-color:black;
  }

  .modal-card {
    position: relative;
    max-width: 80%;
    margin:auto;
    margin-top: 30px;
    padding: 20px;
    background-color: white;
    min-height: 300px;
    z-index:10;
  }
</style>