<template>
  <div>
    {{ crewInfo.crew_name }} 의 게시판입니다.<br /><br />
    <button @click="moveToArticle">Article</button>
    <button @click="moveToCalendar">Calendar</button>
    <button @click="crewMember">Memebers</button>
    <router-view></router-view>
    <button @click="modifyCrew">크루 수정</button>
    <button @click="deleteCrew">크루 삭제</button>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "vue";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const crewInfo = reactive({
      crew_pk: "",
      crew_name: "",
      crew_explain: "",
      crew_region: "",
      crew_img: "",
      crew_member_count: "",
      created_at: "",
    });

    const getCrewInfo = async () => {
      await store.dispatch("crew/getCrewInfo", route.params.crew_pk);
      Object.assign(crewInfo, store.state.crew.crewInfo);
    };

    const moveToArticle = () => {
      router.push({ name: "articlelist" });
    };

    const moveToCalendar = () => {
      router.push({ name: "schedule" });
    };

    getCrewInfo();

    const crewMember = (crew_pk) => {
      router.push({ name: "crewmember"}, {
        params : {
          crew_pk : crew_pk
        }
      })
    }

    return {
      crewInfo,
      getCrewInfo,
      moveToArticle,
      moveToCalendar,
      crewMember,
    };
  },
};
</script>

<style></style>
