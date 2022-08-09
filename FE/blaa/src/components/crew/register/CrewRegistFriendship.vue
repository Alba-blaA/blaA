<template>
  <div>
    <p>friendship crew 등록</p>
    <div>
      <label for="crew_name">크루명</label><br />
      <input type="text" id="crew_name" name="crew_name" v-model="crewData.crew_name" /><br />
      <label for="crew_explain">크루 설명</label><br />
      <textarea id="crew_explain" name="crew_explain" v-model="crewData.crew_explain" cols="35" rows="5"></textarea><br />
      <label for="crew_region">크루 지역</label><br />
      <button @click="checkValue">등록</button>
      <button @click="moveList">목록</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const crewData = reactive({
      crew_name: "",
      crew_explain: "",
      crew_region: "",
      is_business: false,
    });

    const checkValue = () => {
      let error = true;
      let msg = "";
      console.log("크루명: " + crewData.crew_name);
      !crewData.crew_name && ((msg = "크루명을 입력하세요."), (error = false));
      error && !crewData.crew_explain && ((msg = "크루 설명을 입력하세요."), (error = false));
      error && !crewData.crew_region && ((msg = "크루 지역을 입력하세요."), (error = false));

      if (!error) alert(msg);
      else registCrew();
    };

    const registCrew = async () => {
      await store.dispatch("crew/registcrew", crewData);
      let msg = "등록이 완료되었습니다.";
      alert(msg);
      moveList();
    };

    const moveList = () => {
      router.push({ name: "allcrewlist" });
    };

    return {
      crewData,
      checkValue,
      moveList,
    };
  },
};
</script>

<style></style>
