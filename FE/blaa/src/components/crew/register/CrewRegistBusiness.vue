<template>
  <div>
    <p>Business crew 등록</p>
    <div>
      <label for="crew_name">크루명</label><br />
      <input type="text" id="crew_name" name="crew_name" v-model="crewData.crew_name" /><br />
      <label for="crew_explain">크루 설명</label><br />
      <textarea id="crew_explain" name="crew_explain" v-model="crewData.crew_explain" cols="35" rows="5"></textarea><br />
      <label for="crew_region">크루 지역</label><br />
      <input type="text" id="crew_region" name="crew_region" v-model="crewData.crew_region" /><br />
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
      is_business: true,
    });

    const checkValue = () => {
      let error = true;
      let msg = "";
      console.log("크루명: " + crewData.crew_name);
      console.log("isbusiness: ", crewData.is_business);
      !crewData.crew_name && ((msg = "크루명을 입력하세요."), (error = false));
      error && !crewData.crew_explain && ((msg = "크루 설명을 입력하세요."), (error = false));
      error && !crewData.crew_region && ((msg = "크루 지역을 입력하세요."), (error = false));

      if (!error) alert(msg);
      else registCrew();
    };

    const registCrew = async () => {
      try {
        await store.dispatch("crew/registcrew", crewData);
        alert("등록에 성공하였습니다.");
        router.push({ name: "allcrewlist" });
      } catch (error) {
        console.log(error);
        alert("등록에 실패하였습니다.");
      }
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
