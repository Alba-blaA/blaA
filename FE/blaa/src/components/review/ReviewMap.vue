<template>
 <div class="my-modal">
    <div class="overlay">
      <div class="modal-card" style="opacity: 1">
        <div>
          <p>장소를 검색하세요 <span  @click="$emit('close-modal')" style="cursor:pointer"> 닫기</span></p>
          <input type="text" v-model="searchWord" @keypress.enter="searchStore" @keyup.enter="test">
          <button> 제출</button>
        </div>
        <div v-if="searchList">
          <ReviewMapList v-for="searchChild in searchList" :key="searchChild.id" :searchChild="searchChild" @select-store="selectStore"/>
          <PaginationBar :currentPage="currentPage" :numberOfPages="numberOfPages" @click="searchStore"/>
        </div>
        <p v-else>검색결과가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import api from '@/api/api'
import ReviewMapList from '@/components/review/ReviewMapList.vue'
import PaginationBar from '@/components/review/PaginationBar.vue'

export default {
  components: {
    ReviewMapList,
    PaginationBar
  },
  setup(props, {emit}) {
    const isStore = ref(true)
    const store = useStore()
    const searchList = ref([])
    const searchWord = ref('')
    const currentPage = ref(1)
    const totalCount = ref(0)

    const test = () => {
      console.log('테스트중')
    }

    const serachNewStore = async(page = currentPage.value) => {
      try {
          const res = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchWord.value}`, {
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

    // 가게를 검색하는 함수
    const searchStore = async(page = currentPage.value) => {
      console.log('검색')
      if (isStore.value) {
        try {
          const res = await axios.get(api.review.review(), {
            headers: {
              Authorization: `Bearer ${store.state.review.Token}` 
            },
            params: {
              search: searchWord.value,
              page: page
            }
          })
          console.log(res)
          isStore.value = res.data ? true : false
          searchList.value = res.data.results 
          totalCount.value = res.data.count
          // 처음 찾았을 떄 없으면
          if (isStore.value) {
            serachNewStore(page)
          }
        } catch (error) {
            console.error(error)
        }
      // 그 이후에 없으면
      } else {
        serachNewStore(page)
      }

      
    
    // 페이지 수 계산
    const numberOfPages = computed(() => {
      return Math.ceil(totalCount.value / 5)
    })

    // 상점 선택 결과 전송
    const selectStore = (data) => {
      data = {
        ...data,
        // 상점 생성 유무를 전송
        isStore: isStore.value
      }
      emit('select-store', data)
    }

    return {
      searchWord,
      searchList,
      searchStore,
      currentPage,
      numberOfPages,
      selectStore,
      test
    }
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
    /* opacity: 0.5; */
    background-color:rgba(255,255,255,0.5);
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