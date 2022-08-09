<template>
  <div>
    <button @click="moveToBusiness">영업용</button>
    <button @click="moveToFriends">친목용</button>
  </div>
  <router-view></router-view>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const moveToBusiness = () => {
      store.commit("crew/IS_BUSINESS", true);
      console.log("isbusiness : ", store.state.crew.crewInfo.is_business);
      router.push({ name: "businesscrew" });
    };
    const moveToFriends = () => {
      store.commit("crew/IS_BUSINESS", false);
      console.log("isbusiness : ", store.state.crew.crewInfo.is_business);
      router.push({ name: "friendshipcrew" });
    };

    return {
      moveToBusiness,
      moveToFriends,
    };
  },
};
</script>

<style></style>
