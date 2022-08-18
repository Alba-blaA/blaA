<template>
  <div class="row" id="top_box">
    <div class="col-2" id="top_box_text" @click="back"><img src="@/assets/icons/arrow-left.png" /></div>
    <h5 class="col-8" id="top_box_text">{{ store_name }}</h5>
    <div class="col-2" id="top_box_text"></div>
  </div>
  <div class="d-flex justify-content-center main">
    <div style="width: 90%">
      <!-- 상단 가게 정보 div -->
      <div>
        <!-- <div class="d-flex justify-content-between align-items-center">
          <router-link :to="{ name: 'review' }"><span class="material-symbols-outlined" style="color: black; font-size: 36px">arrow_back</span></router-link>
          <h2 style="margin: 0; font-weight: 700">{{ store_name }}</h2>
          <div style="width: 36px"></div>
        </div>
        <div style="background: black; height: 1px; width: 100%; margin-top: 10px"></div> -->
        <!-- 별점  -->
        <div class="star">
          <p style="font-weight: bold">총 {{ person }}명이</p>
          <span style="font-size: 24px; font-weight: bold; margin-right: 6px">{{ star }} 점</span>
          <div class="star-ratings">
            <div class="star-ratings-fill space-x-2 text-lg" :style="{ width: score + '%' }">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div class="star-ratings-base space-x-2 text-lg"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <span style="display: inline-block; font-weight: 700; font-size: 15px; margin-top: 5px; margin-right: 6px">으로 평가했어요!</span>
        </div>
      </div>

      <br />
      <!-- 버튼식 리뷰 -->
      <div class="star">
        <div class="button-review" v-for="(value, name) of types.value" :key="name.id">
          <p style="margin: 0">{{ name }}</p>
          <div style="display: flex">
            <div
              style="background: #6bc098; padding: 0; position: absolute; z-index: 1; display: flex; overflow: hidden; border-radius: 20px; height: 15px"
              :style="{ width: (barWidth.value * value) / 100 + 'px' }"
              class="progressbar"
            ></div>
            <div
              style="
          background: #D6D6D6;
          border-radius: 20px;
          height:15px;
          width: 85%
          z-index: 0;
          padding: 0;
          margin-right: 20px;"
              id="barWidth"
            ></div>
            <span style="font-weight: 700; font-size: 15px">{{ value }}%</span>
          </div>
          <br />
        </div>
      </div>

      <br />
      <!-- 한줄평 -->
      <h3 style="font-weight: 700; margin-left: 5px">한줄평</h3>
      <div v-if="review">
        <CommentDetail
          class="userReview"
          v-for="userReview in review.value"
          :key="userReview.review_pk"
          :review="userReview"
          :isDetail="false"
          @update="update"
        />
      </div>
      <p v-else>아직 리뷰가 없어요</p>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import CommentDetail from "@/components/review/CommentDetail.vue";
import $ from "jquery";

export default {
  components: {
    CommentDetail,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const review = ref([]);
    const types = ref([]);
    const star = ref(0);
    const store_name = route.params.store_name;
    const score = ref(0);
    const like = ref(false);
    const user_pk = store.state.account.userInfo.user_pk;
    const person = ref(0);
    const barWidth = ref(0);

    // 처음 시작될 때 실행
    onMounted(async () => {
      await store.dispatch("review/getReview", route.params.store_pk);
      review.value = computed(() => {
        return store.state.review.review;
      });
      // 별점, 버튼, 날짜 변환
      star.value = computed(() => {
        return store.state.review.reviewStar;
      });
      types.value = computed(() => {
        return store.state.review.reviewBtn;
      });
      // 조정
      score.value = star.value.value * 20 - 1.5;
      person.value = computed(() => {
        return review.value.value.length;
      });
      // for문으로 인해 바로 로딩이 안되서 대기 시간을 부여
      setTimeout(() => {
        barWidth.value = computed(() => {
          return $("#barWidth").width();
        });
      }, 50);
    });

    $(window).resize(function () {
      barWidth.value = computed(() => {
        return $("#barWidth").width();
      });
    });

    const back = () => {
      router.push({ name: "review" });
    };

    return {
      like,
      star,
      types,
      review,
      store_name,
      score,
      user_pk,
      person,
      barWidth,
      back,
    };
  },
};
</script>

<style scoped>
.main {
  padding-top: 24px;
}
/* 유저 리뷰 css */
.userReview {
  background-color: #f8f9fe;
  border-radius: 20px;
  padding: 20px;
  z-index: 1;
}

.star {
  padding: 20px 0;
  background: #ffffff;
  box-shadow: 0px 4px 80px rgba(0, 0, 0, 0.07), 0px 0.893452px 17.869px rgba(0, 0, 0, 0.0417275), 0px 0.266004px 5.32008px rgba(0, 0, 0, 0.0282725);
  /* border-radius: 10px; */
}
/* 별점 css */
.star-ratings {
  margin-bottom: 2px;
  color: #dadada;
  position: relative;
  display: inline-block;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: #dadada; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
}

.star-ratings span {
  margin-right: 3px;
}

.star-ratings-fill {
  color: #e58d1f;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: #e58d1f;
}

.star-ratings-base {
  z-index: 0;
  padding: 0;
}

/* 버튼 리뷰 애니메이션 및 css */
.progressbar {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-left {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.button-review p {
  font-weight: 700;
  font-size: 15px;
}

.userReview {
  margin-bottom: 10px;
}

/* 하트 css */
.heart {
  z-index: 10;
  height: 25px;
  width: 25px;
}
.activate {
  background-color: red;
}

.deactivate {
  background-color: #aaa9a9;
}
</style>
