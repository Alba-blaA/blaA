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
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api/api.js";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const followerList = ref({});
    const followingList = ref({});

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
