<template>
  <!-- <button @click="moveMyList">내 크루</button> -->
  <!-- <button @click="moveAllList">전체 크루</button> -->
  <button @click="moveListSearch">크루 검색</button>
  <router-view></router-view><br />
  <div class="newCrew" @click="createCrew">새 크루 생성</div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
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
.newCrew {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 24px;
  gap: 10px;

  position: fixed;
  width: 146px;
  height: 40px;
  left: 107px;
  /* margin: auto; */
  top: 630px;

  background: #eec95c;
  border-radius: 100px;
  color: #498d6d;
}
</style>
