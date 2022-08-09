<template>
  <span style="cursor:pointer" @click="moveToPrevious">X</span> <h3>{{store_name}}</h3>
    <div class="userReview">
      <div class="userOnelineReview">
        <div>{{ review.oneline_review}}</div>
        <div>
          <span>{{review.like_user_count}}</span>
          <span :class="review.like_users? activate : deactivate" 
          @click="likeOneReview(review.review_pk)"
          style="cursor:pointer">♥</span> 
        </div>
      </div>
      <div class="user_info"><span>{{review.user.nickname}}</span> <span>작성일: {{review.created_at}} </span></div> 
    </div>
    <br>
    <div>
      <p>{{review.user.nickname}} 님은이렇게 평가했어요.</p>
    </div>
    <br>
    <div class="userReviewDetail">
      <div>
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
        <span>{{review.star}} 점</span>
      </div>
      <div v-for="(value, name) of review.button" :key="name.id">
        <div v-if="value == 1" class="buttonReview" >{{name}}</div>
      </div>
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import api from '@/api/api'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import {dataChange} from '@/hooks/dateChange'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const store_pk = route.params.store_pk
    const review_pk = route.params.review_pk
    const store_name = route.params.store_name
    const score = ref(0)
    const review = ref([])

    const {
      yyyyMMdd
    } = dataChange()


    onBeforeMount(async() => {
      try {
        const res = await axios.get(api.review.reviewDetail(review_pk), {
          headers: {
            Authorization: `Bearer ${store.state.review.Token}`
          }
        })
        review.value = res.data
        review.value['created_at'] = yyyyMMdd(review.value['created_at'])
        score.value = (review.value.star * 20) + 1.5
      } catch (error) {
        console.error(error)
      }
    })

    const moveToPrevious =() => {
      console.log('이동')
      router.push({
        name: 'detailReview',
        params: {
          store_pk: store_pk,
          store_name: store_name
        }
      })
    }

    return {
      review,
      moveToPrevious,
      score,
      store_name
    } 
  }
}
</script>

<style scoped>
/* 유저 리뷰 css */
.userReview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;

  background: #F8F9FE;
  border-radius: 16px;
}

.userOnelineReview {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.user_info {
  flex-direction: row;
  justify-content: space-between;
}
/* 별점 css */
.star-ratings {
  color: #aaa9a9; 
  position: relative;
  display: inline-block;
  unicode-bidi: bidi-override;
  width: max-content;
  margin-right: 20px;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: greenyellow;
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
  -webkit-text-fill-color: greenyellow;
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

.userReviewDetail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  background: #F8F9FE;
  border-radius: 16px;
}
/* 버튼 css */
.buttonReview {
  
}
</style>