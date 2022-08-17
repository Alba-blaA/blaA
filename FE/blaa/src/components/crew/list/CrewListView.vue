<template>
  <div class="row" id="top_box">
    <div class="col-2" id="top_box_text"></div>
    <h5 class="col-8" id="top_box_text">크루</h5>
    <div class="col-2" id="top_box_text" @click="moveListSearch">
      <img src="@/assets/icons/search.png" />
    </div>
  </div>
  <div class="container" style="margin-bottom: 20px">
    <div class="row" style="margin-top: 10px">
      <div class="col-8" id="title_text" style="display: flex; align-items: center">새로운 크루를 만들어봐요!</div>
      <div class="col-4">
        <div class="newCrewBtn" @click="createCrew">+ 만들기</div>
      </div>
    </div>
  </div>
  <div class="container">
    <p id="semi_title_text">내 크루</p>
    <!-- <crew-list-my style="margin-bottom: 20px"></crew-list-my> -->
  </div>
  <div class="container">
    <p id="semi_title_text">전체 크루</p>
  </div>
  <crew-list-all></crew-list-all>
</template>

<script>
import CrewListAll from "@/components/crew/list/CrewListAll.vue";
import CrewListMy from "@/components/crew/list/CrewListMy.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    CrewListAll,
    // CrewListMy,
  },
  setup() {
    const router = useRouter();

    const createCrew = () => {
      router.push({ name: "crewregist" });
    };
    const moveAllList = () => {
      router.push({ name: "allcrewlist" });
    };
    // const moveMyList = () => {
    //   router.push({ name: "mycrewlist" });
    // };

    const moveListSearch = () => {
      router.push({ name: "crewsearch" });
    };

    return {
      createCrew,
      moveAllList,
      // moveMyList,
      moveListSearch,
    };
  },
};
</script>

<style scoped>
.newCrewBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 90%;
  height: 40px;
  left: 107px;
  right: 107px;
  top: 600px;

  background: #eec95c;
  border-radius: 100px;
  color: #498d6d;
}
#top_box {
  height: 55px;
  margin: auto;

  color: white;
  background-color: #498d6d;
  border-bottom: 0.5px solid #bdbdbd;
}

#top_box_text {
  /* display: flex; */
  text-align: center;
  line-height: 55px;
}

#title_text {
  font-weight: 800;
  font-size: 18px;
}

#semi_title_text {
  font-weight: 600;
  font-size: 18px;
}
</style>
