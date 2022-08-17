<template>
  <div class="store" @click="moveToDetail">
    <div class="storeInfo">
      <img :src="HOST + review.image" alt="이미지">
      <p style="width: 100%">{{review.name}}</p>  
    </div>
    <div class="star-ratings" :style="{ left : starWidth.value }" >
        <div 
          class="star-ratings-fill space-x-2 text-lg"
          :style="{ width: score + '%' }"
        >
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div class="star-ratings-base space-x-2 text-lg">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
      <div id="buttons">
        <div v-for="button in high_button" :key="button.id">
          <div class="high-button">{{button}}</div>
        </div>
      </div>
  </div>
  
</template>

<script>
import { ref } from 'vue'
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import $ from 'jquery'
export default {
  props: {
    review: {
      type: Array
    }
  },
  setup(props) {
    const HOST = ref("https://i7b209.p.ssafy.io");
    const router = useRouter()
    const host = ref('https://i7b209.p.ssafy.io')
    const starWidth = ref(0)

    // 버튼
    const buttonType = ['친절한 사장님', '깨끗한 매장', '좋은 분위기', '교통 접근성', '칼퇴근 가능', '유니폼 제공']
    const score = props.review.star * 20
    const high_button = ref([])
    for (let i=0; i < 3; i++){
      let max_idx = 0
      let max_value = 0
      for (let j=0; j < 6; j++) {
        if (props.review.button[buttonType[j]] > max_value && !high_button.value.includes(buttonType[j])) {
          max_value = Number(props.review.button[buttonType[j]])
          max_idx = j
        }
      }
      if (max_value == 0) {
        break
      }
      high_button.value.push(buttonType[max_idx])
    }

    high_button.value.forEach(ele => {
      return props.review.button[ele]
    })

    // 별점 위치
    onMounted(() => {
      setTimeout(() => {
        starWidth.value = computed(() => {
          return $('.store').width() * 0.8
        })
      }, 50)
    })
   
    $(window).resize(function() {
      starWidth.value = computed(() => {
        return $('.store').width() * 0.8
      })
    })
    
    const moveToDetail = () => {
      router.push({
        name: 'detailReview',
        params: {
          store_pk: props.review.store_pk,
          store_name: props.review.name
        }
      })
    }
    return {
      moveToDetail,
      score,
      high_button,
      starWidth,
      HOST
    }
  }
}
</script>

<style scoped>
.store {
  cursor:pointer;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  background-color: #F8F9FE;
}

.storeInfo {
  display: flex;
  grid-template-columns: 30% auto;
  padding: 14px 0 0 12px;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

p {
  padding: 5px 0 0 10px;
  font-weight: bold;
  font-size: 20px;
}

span {
  padding: 0 1px;
  font-size: 20px;
}

/* 별점 css */
.star-ratings {
  color: #aaa9a9; 
  position: relative;
  display: inline-block;
  unicode-bidi: bidi-override;
  width: max-content;
  margin-bottom: 10px;
  
  left: 70%;
  /* margin-right: 20px; */
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #E58D1F;
}
 
.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: #E58D1F;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}

#buttons {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
}

.high-button {
  background-color: #F5F5F5;
  text-align: center;
  border-radius: 12px;
  width: 115px;
  height: 24px;
  padding: 0px 4px;
  margin-left: 4px;
  font-weight: bold;
  color: #E58D1F;
}

</style>