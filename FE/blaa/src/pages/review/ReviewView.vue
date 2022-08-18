<template>
  <div class="row" id="top_box">
    <div class="col-2" id="top_box_text"></div>
    <h5 class="col-8" id="top_box_text">지점별 리뷰</h5>
    <div class="col-2" id="top_box_text"></div>
  </div>
  <div style="margin-top: 20px; margin-left: 20px">
    <div id="title_text" style="display: flex; align-items: center; padding-right: 0">다양한 리뷰를 확인해보세요!</div>
  </div>

  <div id="review" class="d-flex justify-content-center">
    <div style="width: 90%">
      <div class="d-flex justify-content-between align-items-center">
        <div class="buttons">
          <!-- 클릭하거나 엔터를 치면 -->
          <span class="search-end material-symbols-outlined" v-if="isSearch" @click="searchEnd">cancel</span>
          <div class="search-box">
            <input class="search-txt" type="text" v-model="searchText" @keypress.enter="searchStore" />
            <span class="search-button material-symbols-outlined">search</span>
          </div>
          <div v-if="isSearch"></div>
          <router-link style="color: black; margin-left: 5px; text-align: center" :to="{ name: 'createReview' }"
            ><span class="material-symbols-outlined" style="font-size: 40px; margin-top: 3.5px">add</span></router-link
          >
        </div>
      </div>
      <div v-if="reviews.value">
        <ReviewList v-for="review in reviews.value" :key="review" :review="review" />
        <div class="end-list"></div>
      </div>
      <p v-else>아직 리뷰가 없어요 ㅠㅠ</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onBeforeMount, ref } from "vue";
import ReviewList from "@/components/review/ReviewList.vue";

export default {
  components: {
    ReviewList,
  },
  setup() {
    const store = useStore();
    const reviews = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const isSearch = ref(false);
    const searchText = ref("");

    // 데이터를 가져오는 함수
    const getReviews = async (page = currentPage.value) => {
      const data = {
        isSearch: isSearch.value,
        searchText: searchText.value,
        page: page,
      };
      console.log(data);
      await store.dispatch("review/getReviews", data);
      reviews.value = computed(() => {
        return store.state.review.reviews;
      });
      total.value = computed(() => {
        return store.state.review.total_reviews;
      });
    };

    // DOM에 가져오기 전에 데이터 가져오기
    onBeforeMount(async () => {
      await getReviews();
    });

    const numberOfPages = computed(() => {
      return Math.ceil(total.value.value / 5);
    });

    // 무한 스크롤 구현
    window.onscroll = function (e) {
      if (numberOfPages.value > currentPage.value) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setTimeout(function () {
            // 실행 시킬 함수 구현
            if (numberOfPages.value > currentPage.value) {
              currentPage.value += 1;
              getReviews(currentPage.value);
            }
          }, 1000);
        }
      }
    };

    // 필터링 함수
    // 새로 찾을 때 검색 정보 데이터를 다시 받아와야함
    const searchStore = () => {
      // 새로 찾을 때
      currentPage.value = 1;
      isSearch.value = true;
      getReviews();
    };

    const searchEnd = async () => {
      isSearch.value = false;
      searchText.value = "";
      currentPage.value = 1;
      await getReviews();
    };

    return {
      reviews,
      numberOfPages,
      currentPage,
      getReviews,
      searchStore,
      searchText,
      isSearch,
      searchEnd,
    };
  },
};
</script>

<style scoped>
#review {
  margin-top: 24px;
}

.buttons {
  display: flex;
  align-items: center;
}

.search-box {
  height: 40px;
  background-color: #4d8d4d;
  padding: 0 10px;
  border-radius: 40px;
}

.search-button {
  color: #ededed;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4d8d4d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-txt {
  float: right;
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

.search-end {
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: auto 5px;
  cursor: pointer;
}

/* 마우스를 위에 올렸을 때 늘어남 */
.search-box:hover > .search-txt {
  width: 75%;
}

.search-box:hover > .search-btn {
  background: #464e54;
}
</style>
