<template>
  <br />
  <div v-if="isFollower">
    <h3><b>팔로워 페이지</b></h3>
    <hr />
    <div
      class="container"
      v-for="follower in followerList.results"
      :key="follower.user_pk"
      style="width: 100%"
    >
      <div class="d-flex justify-content-between row">
        <img
          :src="follower.image"
          style="width: 5rem; height: 3.5rem; border-radius: 50%"
          @click="userProfile(follower.user_pk)"
        />
        <h1
          class="col-9 mt-3 mb-0"
          style="font-family: 'East Sea Dokdo', cursive"
        >
          {{ follower.nickname }}
        </h1>
      </div>
      <hr />
    </div>
    <!-- <infinite-loading
      @infinite="infiniteHandler"
      spinner="waveDots"
    ></infinite-loading> -->
  </div>

  <div v-else>
    <h3><b>팔로잉 페이지</b></h3>
    <hr />
    <div
      class="container"
      v-for="following in followingList.results"
      :key="following.user_pk"
      style="width: 100%"
    >
      <div class="d-flex justify-content-between row">
        <img
          :src="following.image"
          style="width: 5rem; height: 3.5rem; border-radius: 50%"
          @click="userProfile(following.user_pk)"
        />
        <h1
          class="col-9 mt-3 mb-0"
          style="font-family: 'East Sea Dokdo', cursive"
        >
          {{ following.nickname }}
        </h1>
      </div>
      <hr />
      <!-- <infinite-loading
        @infinite="infiniteHandler"
        spinner="waveDots"
      ></infinite-loading> -->
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, onBeforeMount } from "vue";
import axios from "@/api/axios.js";
// import InfiniteLoading from "v3-infinite-loading";

export default {
  components: {
    // InfiniteLoading,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const followerList = ref([]);
    const followingList = store.state.profile.followingList;

    if (route.params.followType === "follower") {
      followerList.value = store.state.profile.followerList;
      console.log("followerList : ", followerList.value);
    } else {
      followingList.value = store.state.profile.followingList;
      console.log("followwingList : ", followingList.value);
    }

    const isFollower = computed(() => {
      if (route.params.followType === "follower") {
        return true;
      }
      return false;
    });

    const followerCurrentPage = ref(1);
    const totalFollowers = ref(0);

    const getFollowers = async (page = followerCurrentPage.value) => {
      const data = {
        user_pk: route.params.user_pk,
        type: "follower",
        page: 1,
      };
      await store.dispatch("profile/getFollowerList", data);
      console.log(data);
      followerList.value = computed(() => {
        console.log(
          "profile followerList : ",
          store.state.profile.followerList
        );
        return store.state.profile.followerList;
      });
      totalFollowers.value = computed(() => {
        console.log("totalFollowers : ", store.state.profile.totalFollowers);
        return store.state.profile.totalFollowers;
      });
    };

    onBeforeMount(async () => {
      await getFollowers();
    });

    const numberOfPages = computed(() => {
      return Math.ceil(totalFollowers.value / 10);
    });

    window.onscroll = function (e) {
      if (numberOfPages.value > followerCurrentPage.value) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setTimeout(function () {
            followerCurrentPage.value += 1;
            console.log("followerCurrentPage : ", followerCurrentPage.value);
            getFollowers(followerCurrentPage.value);
          }, 1000);
        }
      }
    };

    // const infiniteHandler = async ($state) => {
    //   if (store.state.profile.followerList.next) {
    //     await axios
    //       .get(store.state.profile.followerList.next)
    //       .then((response) => {
    //         console.log("추가 팔로워리스트 : ", response.data);
    //         const followerData = ref({});
    //         followerData.value = response.data;

    //         store.commit("profile/GET_FOLLOWER_LIST", followerData);
    //       });
    //     setTimeout(() => {
    //       console.log(
    //         "페이지 추가 followerlist : ",
    //         store.state.profile.followerList
    //       );
    //       followerList.value = store.state.profile.followerList.results;
    //       $state.loaded();
    //     }, 1000);
    //   } else {
    //     $state.complete();
    //   }
    // };

    const userProfile = (user_pk) => {
      console.log("다른 유저 프로필 페이지 이동");
      router.push({
        name: "userProfile",
        params: {
          user_pk: user_pk,
        },
      });
    };

    return {
      followerList,
      followingList,
      isFollower,
      followerCurrentPage,
      totalFollowers,
      numberOfPages,
      getFollowers,
      // infiniteHandler,
      userProfile,
    };
  },
};
</script>

<style>
#profile {
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
}

#imgProfile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
