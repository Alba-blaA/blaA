<template>
  <ReviewMap v-if="isModalOpen" @close-modal="isModalOpen=false" @select-store="selectStore"/>
  <router-link :to="{name: 'review'}">뒤로</router-link>
  <h1>리뷰 작성 폼</h1>
  <div>
    <p class="form-input">가게명 : {{storeName}} <button class="btn btn-primary" @click="isModalOpen=true">검색</button></p>
    <p class="form-input">가게주소 : {{storeAddress}}</p>
  </div>
  <!-- 별점 -->
  <form id="myform" class="mb-3" @click.prevent="checkStar">
    <fieldset>
      <input type="radio" name="reviewStar" value="5" id="rate1"><label for="rate1">★</label>
      <input type="radio" name="reviewStar" value="4" id="rate2"><label for="rate2">★</label>
      <input type="radio" name="reviewStar" value="3" id="rate3"><label for="rate3">★</label>
      <input type="radio" name="reviewStar" value="2" id="rate4"><label for="rate4">★</label>
      <input type="radio" name="reviewStar" value="1" id="rate5"><label for="rate5">★</label>
    </fieldset>
  </form>
  <!-- 버튼식 -->
  <!-- 한줄평 -->
  
</template>

<script>
import ReviewMap from '@/components/review/ReviewMap.vue'
import { ref } from 'vue'
import $ from 'jquery'

export default {
  components: {
    ReviewMap,
  },
  setup() {
    const storeName = ref('')
    const storeAddress = ref('')
    const storeButton = ref([])
    const oneReview = ref('')
    const isModalOpen = ref(false)
    const star = ref('')

    // 상점 선택하기
    const selectStore = (data) => {
      storeName.value = data.name
      storeAddress.value = data.region
      isModalOpen.value = false
    }

    // 별점 가져오기
    const checkStar = () => {
      console($('input[name=reviewStar]:checked').val())
      star.value = $('input[name=reviewStar]:checked').val()
    }
    return {
      isModalOpen,
      selectStore,
      storeName,
      storeAddress,
      checkStar
    }
  }
}
</script>

<style scoped>
#myform fieldset{
    display: inline-block;
    direction: rtl;
    border:0;
}
#myform fieldset legend{
    text-align: right;
}
#myform input[type=radio]{
    display: none;
}
#myform label:hover{
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
}
#myform label:hover ~ label{
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
}
#myform input[type=radio]:checked ~ label{
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
}
</style>