<template>
  <!-- <div style="width: 100%; height: 500px; background-color: #eea236"></div> -->
  <!-- <div style="width: 100%; height: 500px; background-color: #a94442"></div> -->

  <div class="bottom_menu">
    <div @click.prevent="gostory">
      <img width="25" src="@/assets/Footer/home.png" />
    </div>
    <div @click.prevent="gocrew">
      <img width="25" src="@/assets/Footer/group.png" />
    </div>
    <div @click.prevent="goReview">
      <img width="25" src="@/assets/Footer/store.png" />
    </div>
    <div @click.prevent="goMyProfile">
      <img width="25" src="@/assets/Footer/gear.png" />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const gostory = () => {
      router.push({ path: "/story" });
    };

    const gocrew = () => {
      router.push({ path: "/crew" });
    };

    const goMyProfile = async () => {
      router.push({ path: "/profile" });
    };

    const goReview = () => {
      router.push({ path: "/review" });
    };

    return {
      gostory,
      gocrew,
      goMyProfile,
      goReview,
    };
  },
};
</script>

<style scoped>
.bottom_menu {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 360px; /*화면 가로크기에 따라 변경됨.*/
  height: 50px;
  z-index: 100;
  border-top: 1px solid black;
  background-color: white;
}
.bottom_menu > div {
  float: left;
  width: 25%;
  height: 100%;
  text-align: center;
  padding-top: 13px;
}
</style>
