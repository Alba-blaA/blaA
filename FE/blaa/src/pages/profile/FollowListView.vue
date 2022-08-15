<template>
  <br />
  <div v-if="isFollower">
    <h3><b>팔로워 페이지</b></h3>
    <hr />
    <table
      v-for="follower in followerList.results"
      :key="follower.user_pk"
      style="width: 100%"
    >
      <tr>
        <td width="10px"></td>
        <td id="profile">
          <img
            id="imgProfile"
            :src="follower.image"
            @click="userProfile(follower.user_pk)"
          />
        </td>
        <td width="20px"></td>
        <td>
          <b>{{ follower.nickname }}</b>
        </td>
      </tr>
      <tr>
        <td colspan="100%"><hr /></td>
      </tr>
    </table>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="waveDots"
    ></infinite-loading>
  </div>

  <div v-else>
    <h3><b>팔로잉 페이지</b></h3>
    <hr />
    <table
      v-for="following in followingList.results"
      :key="following.user_pk"
      style="width: 100%"
    >
      <tr>
        <td width="10px"></td>
        <td id="profile">
          <img
            id="imgProfile"
            :src="following.image"
            @click="userProfile(following.user_pk)"
          />
        </td>
        <td width="20px"></td>
        <td>
          <b>{{ following.nickname }}</b>
        </td>
      </tr>
      <tr>
        <td colspan="100%"><hr /></td>
      </tr>
    </table>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="waveDots"
    ></infinite-loading>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import axios from "@/api/axios.js";
import InfiniteLoading from "v3-infinite-loading";

export default {
  components: {
    InfiniteLoading,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const followerList = store.state.profile.followerList;
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

    const infiniteHandler = async ($state) => {
      if (store.state.profile.followerList.next) {
        await axios
          .get(store.state.profile.followerList.next)
          .then((response) => {
            console.log("추가 팔로워리스트 : ", response.data);
            const followerData = ref({});
            followerData.value = response.data;

            store.commit("profile/GET_FOLLOWER_LIST", followerData);
          });
        setTimeout(() => {
          console.log(
            "페이지 추가 followerlist : ",
            store.state.profile.followerList
          );
          followerList.value = store.state.profile.followerList.results;
          $state.loaded();
        }, 1000);
      } else {
        $state.complete();
      }
    };

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
      infiniteHandler,
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
