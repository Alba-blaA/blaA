<template>
  <div>
    <router-link :to="{name: 'review'}">뒤로</router-link><h2>{{store_name}}</h2>
    <!-- 별점  -->
    <div class="star">
      <p>전체 리뷰 평균 ({{review.length}} 명)</p>
      <span>{{star}} 점</span>
      <div class="star-ratings">
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
      <span>으로 평가했어요!</span>
    </div>
    <br>
    <!-- 버튼식 리뷰 -->
    <div v-for="(value, name) of types" :key="name.id">
      <p style="margin: 0;">{{name}}</p>
      <div style="display: flex;">
        <div class="processBar" style="
          background: #6BC098;
          padding: 0;
          position: absolute;
          z-index: 1;
          display: flex;
          top: 0;
          left: 0;
          overflow: hidden;
          border-radius: 20px;
          height:15px;"

          :style="{width: (value * 100/64) + '%'}"
          >
          
        </div>
        <div style="
          background: #D6D6D6;
          border-radius: 20px;
          height:15px;
          width: 64%
          z-index: 0;
          padding: 0;"
          >
        </div>
        <span>{{value}}%</span>
      </div> 
      <br>
      </div>

    <br>
    <!-- 한줄평 -->
    <h3>한줄평</h3>
    <div>
      <div class="userReview" v-for="userReview in review" :key="userReview.review_pk">
        <!-- d-flex 행렬로 -->
        <div style="cursor:pointer" @click="moveToDetailPage(userReview.review_pk)">
          <div>{{ userReview.oneline_review}}</div>
          <div>
            <span>{{userReview.like_user_count}}</span>
            <span :class="currentUser in userReview.like_users? activate : deactivate" 
            @click="likeOneReview(userReview.review_pk)"
            style="cursor:pointer">♥</span> 
          </div>
          <div class="user_info"><span>{{userReview.user.nickname}}</span> <span>작성일: {{userReview.created_at}} </span></div> 
        </div>
      </div>
    </div>
  </div>
  
  

</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { dataChange } from '@/hooks/dateChange'
// import $ from 'jquery'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const review = ref([])
    const types = ref([])
    const star = ref(0)
    const store_name = route.params.store_name
    const score = ref(0)
    const like = ref(false)
    const {
      yyyyMMdd
    } = dataChange()

    // 처음 시작될 때 실행
    onMounted( async() => {
      await store.dispatch('review/getReview', route.params.store_pk)
      review.value = store.state.review.review
      // 별점, 버튼, 날짜 변환
      star.value = review.value.splice(-1, 1)[0].review_star_static
      types.value =  review.value.splice(-1, 1)[0].review_button_static

      review.value.forEach(ele => {
        ele.created_at = yyyyMMdd(ele.created_at)
        // 현재 유저가 좋아요를 눌렀는지 확인
        // 현재 유저 정보를 불어와야됨
        // if (ele.like_users)
      })
      // 버튼 점수의 비율 계산
      if (review.value.length) {
        for (let type in types.value) {
          types.value[type] = (types.value[type] / review.value.length)
        }
      }
      score.value = (star.value * 20) + 1.5
    })

    const likeOneReview = async(review_pk) => {
      // 좋아요 로직, 
      await store.dispatch('review/likeOneReview', review_pk)
    }

    // 날짜 변환 함수
    

    const moveToDetailPage = (review_pk) => {
      router.push({
        name: 'detailComment',
        params: {
          store_pk: route.params.store_pk,
          store_name: route.params.store_name,
          review_pk: review_pk
        }
      })
    }
    

    return {
      like,
      star,
      types,
      review,
      store_name,
      score,
      likeOneReview,
      moveToDetailPage
    }
  }
}
</script>

<style scoped>
/* 유저 리뷰 css */
.userReview {
  background-color: lightgray;
  border-radius: 20px;
  padding: 5px;
}
/* 별점 css */
.star-ratings {
  color: #aaa9a9; 
  position: relative;
  display: inline-block;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
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
  -webkit-text-fill-color: gold;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}

/* 하트 css */
.activate {
  background-color: red;
}

.deactivate {
  background-color: #aaa9a9;
}
</style>