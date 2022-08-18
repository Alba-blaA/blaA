<template>
  <h5 v-show="check">새로운 크루를 만들어보세요!</h5>
  <div class="row" style="padding-top: 20px">
    <div class="category1" v-show="check" @click="moveToBusiness">영업용</div>
    <div class="category2" v-show="check" @click="moveToFriends">친목용</div>
  </div>
  <!-- <router-view></router-view> -->

  <ReviewMap v-if="isModalOpen" @close-modal="isModalOpen = false" @select-store="selectStore" />
  <div v-show="!check">
    <button @click="back">뒤로가기</button>
  </div>
  <div v-show="!check && is_business">
    <p style="text-align: center">업무용 크루</p>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div style="text-align: center">
        <label class="input_file_button" for="crew_img">
          <img src="@/assets/crew_default1.png" />
          <p style="padding-top: 5px; color: #498d6d">크루 이미지</p>
        </label>
        <input type="file" id="crew_img" name="crew_img" @change="previewFile" style="display: none" />
      </div>
      <label for="crew_name">크루명</label><br />
      <input type="text" id="crew_name" name="crew_name" v-model="crew_name" /><br />

      <label for="crew_explain">크루 설명</label><br />
      <textarea id="crew_explain" name="crew_explain" v-model="crew_explain" cols="35" rows="5"></textarea><br />
      <div class="row">
        <div class="col-8">
          <label for="crew_region">크루 지역</label><br />
          <input type="text" id="crew_region" name="crew_region" v-model="crew_region" disabled />
        </div>
        <div class="col-4" style="display: flex; align-items: end">
          <div class="submit_button3" @click="isModalOpen = true">검색</div>
        </div>
      </div>
      <label for="crew_region">크루 지역</label><br />
      <input type="text" id="crew_region" name="crew_region" v-model="crew_region" />
      <div class="row" style="text-align: center; padding-top: 20px">
        <div class="col">
          <button class="submit_button1" @click="moveList">목록</button>
        </div>
        <div class="col">
          <button class="submit_button1" type="submit">등록</button>
        </div>
      </div>
    </form>
  </div>

  <div v-show="!check && !is_business">
    <p style="text-align: center">친목용 크루</p>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div style="text-align: center">
        <label class="input_file_button" for="crew_img">
          <img src="@/assets/crew_default2.png" />
        </label>
        <input type="file" id="crew_img" name="crew_img" @change="previewFile" style="display: none" />
        <p style="color: #498d6d">크루 이미지 설정</p>
      </div>
      <label for="crew_name">크루명</label><br />
      <input type="text" id="crew_name" name="crew_name" v-model="crew_name" /><br />

      <label for="crew_explain">크루 설명</label><br />
      <textarea id="crew_explain" name="crew_explain" v-model="crew_explain" cols="35" rows="5"></textarea><br />

      <label for="crew_region">크루 활동 지역</label><br />
      <input type="text" id="crew_region" name="crew_region" v-model="crew_region" />

      <div class="row" style="text-align: center; padding-top: 20px">
        <div class="col">
          <button class="submit_button2" @click="moveList">목록</button>
        </div>
        <div class="col">
          <button class="submit_button2" type="submit">등록</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ReviewMap from "@/components/review/ReviewMap.vue";
import PopUp from "@/components/story/PopUp.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  emits: ["select-store"],
  components: {
    ReviewMap,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    let check = ref(true);
    let isbusiness = ref(true);
    const crew_name = ref("");
    const crew_explain = ref("");
    const crew_region = ref("");
    const crew_img = ref(null);
    const is_business = ref(false);

    const isModalOpen = ref(false);
    const isStore = ref(false);
    const store_pk = ref(0);
    const storeName = ref("");
    const storeAddress = ref("");

    const selectStore = (data) => {
      store_pk.value = data.store_pk;
      isStore.value = data.isStore;
      console.log(isStore.value);
      storeName.value = data.name;
      storeAddress.value = data.region;

      isModalOpen.value = false;
    };

    const moveToBusiness = () => {
      check.value = false;
      is_business.value = true;
    };
    const moveToFriends = () => {
      check.value = false;
      is_business.value = false;
    };
    const back = () => {
      check.value = true;
    };
    const submitForm = () => {
      let error = true;
      let msg = "";
      console.log("크루명: " + crew_name.value);
      !crew_name.value && ((msg = "크루명을 입력하세요."), (error = false));
      error && !crew_explain.value && ((msg = "크루 설명을 입력하세요."), (error = false));
      error && !crew_region.value && ((msg = "크루 지역을 입력하세요."), (error = false));
      if (!error) alert(msg);
      else crewRegist();
    };
    const previewFile = (e) => {
      if (e.target.files[0]) {
        crew_img.value = e.target.files[0];
      } else {
        alert("파일을 다시 선택해 주세요");
        crew_img.value = null;
      }
    };
    const crewRegist = async () => {
      const crewData = new FormData();
      crewData.append("crew_name", crew_name.value);
      crewData.append("crew_explain", crew_explain.value);
      crewData.append("crew_region", crew_region.value);
      crewData.append("crew_img", crew_img.value);
      crewData.append("is_business", is_business.value);
      try {
        console.log(crewData);
        await store.dispatch("crew/registcrew", crewData);
        await store.dispatch("account/getMyCrewList", store.state.account.userInfo.user_pk);

        // store.commit("account/ADD_NEW_CREW", crewData);
      } catch (error) {
        console.log(error);
      }
    };
    const moveList = () => {
      router.push({ name: "crewlist" });
    };
    return {
      moveToBusiness,
      moveToFriends,
      check,
      isbusiness,
      back,
      submitForm,
      crew_name,
      crew_explain,
      crew_region,
      crew_img,
      is_business,
      previewFile,
      moveList,

      isModalOpen,
      selectStore,
      storeName,
      storeAddress,
    };
  },
};
</script>

<style scoped>
.category1 {
  display: flex;
  width: 150px;
  height: 50px;
  margin: auto;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #498d6d;
  color: #ffcd38;
  border-radius: 100px;

  position: relative;
  animation: fadeInUp 1s;
}
.category2 {
  display: flex;
  width: 150px;
  height: 50px;
  margin: auto;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #ffcd38;
  color: #498d6d;
  border-radius: 100px;

  position: relative;
  animation: fadeInUp 1s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

#crew_name,
#crew_region {
  box-sizing: border-box;
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  width: 100%;
  height: 48px;

  /* Neutral/Light/Darkest */

  border: 1px solid #c5c6cc;
  border-radius: 12px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}
#crew_explain {
  /* Field */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 8px;

  width: 100%;
  height: 97px;

  /* Neutral/Light/Darkest */

  border: 1px solid #c5c6cc;
  border-radius: 12px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}

.input_file_button {
  border-radius: 75px;
  color: white;
  cursor: pointer;

  width: 102px;
  height: 102px;

  align-items: center;
}

.submit_button1 {
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 24px;
  margin: auto;
  /* gap: 10px; */

  width: 100px;
  background: #498d6d;
  color: #ffcd38;
  border-radius: 100px;
  border: 0px;
}

.submit_button2 {
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 24px;
  margin: auto;
  /* gap: 10px; */

  width: 100px;
  background: #ffcd38;
  color: #498d6d;
  border-radius: 100px;
  border: 0px;
}

.submit_button3 {
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 24px;
  margin: auto;
  /* gap: 10px; */

  width: 80px;
  background: #498d6d;
  color: #ffcd38;
  border-radius: 100px;
  border: 0px;
}
</style>
