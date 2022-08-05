<template>
 <div class="my-modal">
    <div class="overlay">
      <div class="modal-card" style="opacity: 1">
        <div>
          <p>장소를 검색하세요 <span  @click="$emit('close-modal')" style="cursor:pointer"> 닫기</span></p>
          <input type="text" v-model="searchWord" @keyup.enter="searchStore">
        </div>
        <hr>
        <div v-if="searchList.length">
          <ul v-for="searchChild in searchList" :key="searchChild.id">
            <li></li>
          </ul>
        </div>
        <p v-else>검색결과가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const searchList = ref([])
    const searchWord = ref('')


    // 가게를 검색하는 함수
    const searchStore = async() => {
      const query = searchWord.value
      try {
        const res = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`, {
          headers: {
            Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`
          }
        })
        console.log(res)
      } catch(error) {
        console.error(error)
      }
    }
    return {
      searchWord,
      searchList,
      searchStore
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