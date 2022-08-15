<template>
  <div>
    <div class="oneReview">
      <div class="oneLine" @click="moveToDetailPage" v-if="!isDetail">{{ review.oneline_review}}</div>
      <div v-else>{{ review.oneline_review}}</div>
      <div class="heart">
        <span style="margin: 0 auto; margin-bottom:3px;">{{review.like_user_count}}</span>
        <i  class="fa fa-solid fa-heart" :class="{activate: isLike, deactivate:!isLike}"
        @click="likeOneReview" style="cursor:pointer; font-size:30px; margin: 0 auto;"></i>
      </div>
    </div>
    <div class="user_info"><span>{{review.user.nickname}}</span> <span>{{review.created_at}} </span></div> 
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {computed} from 'vue'

export default {
  props: {
    review: {
      type: Array,
      required: true
    },
    isDetail: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const user_pk = store.state.account.userInfo.user_pk
    
    // 빈값일 때 오류나는 것 방지
    const isLike = computed(() => {
      if (props.review.like_users) {
        return props.review.like_users.includes(user_pk)
      } else {
        return false
      }
    })

    const likeOneReview = async() => {
      const data = {
        isDetail : props.isDetail,
        review_pk : props.review.review_pk
      }
      // 좋아요 로직, 
      await store.dispatch('review/likeOneReview',data)
      // 갱신
      emit('update')
    }

    const moveToDetailPage = () => {
      router.push({
        name: 'detailComment',
        params: {
          store_pk: route.params.store_pk,
          store_name: route.params.store_name,
          review_pk: props.review.review_pk
        }
      })
    }

    return {
      likeOneReview,
      moveToDetailPage,
      isLike
    }
  }
}
</script>

<style scoped>
.oneReview {
  display: grid;
  grid-template-columns: 85% 15%;
}

.oneLine {
  display:flex; 
  cursor:pointer; 
  align-items:center; 
  font-weight:800; 
  font-size:16px; 
}

.user_info {
  display: flex;
  justify-content: space-between;
  color: #71727A;
  margin-top:10px;
}

.heart {
  display: flex;
  flex-direction: column;
}
.activate {
  color: #f36e5d;
}
.deactivate {
  color: #a1a1a1;
}
</style>