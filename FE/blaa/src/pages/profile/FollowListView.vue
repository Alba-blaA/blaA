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
      <infinite-loading
        @infinite="infiniteHandler"
        spinner="waveDots"
      ></infinite-loading>
    </table>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import axios from "@/api/axios.js";
import api from "@/api/api.js";
import InfiniteLoading from "v3-infinite-loading";

export default {
  components: {
    InfiniteLoading,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const followerList = null;
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

    var page = ref(route.query.page) + 1;
    const infiniteHandler = (state) => {
      axios
        .get(api.profile.myFollow(route.params.user_pk), {
          params: {
            type: "follower",
            page: page.value,
          },
        })
        .then((response) => {
          setTimeout(() => {
            // console.log("page : ", page);
            console.log("followerList value : ", followerList);
            followerList.value = followerList.concat(response.data.results);
            console.log("페이지 추가 followerList", followerList.value);
            state.loaded();
            page.value += 1;
            // if (response.data.next) {
            //   state.complete();
            // }
          }, 1000);
        })
        .catch((error) => {
          if (error.status == 404) {
            state.complete();
          }
          console.log(error);
        });
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
      page,
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
