<template>
  <!-- <div style="width: 100%; height: 500px; background-color: #eea236"></div> -->
  <!-- <div style="width: 100%; height: 500px; background-color: #a94442"></div> -->

  <div class="row" id="bottom_menu">
    <div class="col" @click.prevent="gostory">
      <img width="25" src="@/assets/footer/home.png" />
    </div>
    <div class="col" @click.prevent="gocrew">
      <img width="25" src="@/assets/footer/group.png" />
    </div>
    <div class="col" @click.prevent="goReview">
      <img width="25" src="@/assets/footer/store.png" />
    </div>
    <div class="col" @click.prevent="goMyProfile">
      <img width="25" src="@/assets/footer/gear.png" />
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
#bottom_menu {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 65px;
  z-index: 100;
  border-top: 1px solid black;
  background-color: white;
  margin: 0;

  text-align: center;
  align-content: center;
  overflow-x: hidden;
}
</style>
