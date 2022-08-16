<template>
  <br /><br />
  <button type="button" @click="startChat">채팅하기</button>

  <div id="profile" style="border: 3px solid; text-align:center; margin: auto;" >
    <img class="imgProfile" :src="HOST + userProfile.image" />
  </div>
  <br>
  <div class="d-flex justify-content-center row">
    <h5 class="mt-2 mb-2 col-7" style="text-align:right; font-weight: bold;">{{ userProfile.nickname }}</h5>
    <div class="col-5 px-0 mb-2">

      <div>v-if로 고치기</div>
      <button id="follow" type="button" 
      class="rounded-pill "
      style="width:5rem; height:2rem; text-align:center; border-radius: 20%; background-color: #1294F2; border: 0px;"
      @click="btnFollow">
        <p class="mt-1" style="color:white;">{{ followMessage }}</p>
      </button>
    </div>

  </div>

  <hr>
  <div class="d-flex justify-content-center">
    <table>
      <tr>
        <td rowspan="4" align="center" @click="follower">
        <div style="margin-right: 0.5rem;">
          <b style="font-size:1.2rem">
            {{ userProfile.followers }}
            <br />
            팔로워
          </b>
        </div>
        </td> 
        &nbsp; &nbsp;
        <td rowspan="4" align="center" @click="following">
        <div style="margin-left: 0.5rem;">
          <b style="font-size:1.2rem">
            {{ userProfile.followings }}
            <br />
            팔로잉
          </b>
        </div>
        </td>
      </tr>
    </table>
  </div>

  <hr />
  <div @click="userReview">
    <h5 class="profile_list">
      <b>{{ userProfile.nickname }}님의 리뷰</b>
    </h5>
  </div>

  <hr />
  <div @click="userCrew">
    <h5 class="profile_list">
      <b>{{ userProfile.nickname }}님의 크루</b>
    </h5>
  </div>

  <hr />
  <div @click="setBlackList">
    <h5 class="profile_list">
      <b>{{ userProfile.nickname }}님 신고하기</b>
    </h5>
  </div>
  <hr />
</template>

<script>
import axios from "@/api/axios.js";
import api from "@/api/api.js";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const HOST = ref("https://i7b209.p.ssafy.io");

    const userProfile = ref({});

    const myFollowingList = store.state.profile.followingList.results;

    var followMessage = ref("");

    const setProfile = async () => {
      await axios
        .get(api.accounts.myInfo(route.params.user_pk))
        .then((response) => {
          console.log("response : ", response);
          userProfile.value = response.data;
          console.log("userProfile : ", userProfile.value);
        })
        .catch((err) => {
          console.log("err", err);
        });

      for (var i = 0; i < myFollowingList.length; i++) {
        console.log("myfollowingList user_pk", myFollowingList[i].user_pk);
        console.log("userProfile user_pk", userProfile.value.user_pk);
        if (myFollowingList[i].user_pk == userProfile.value.user_pk) {
          followMessage.value = "Unfollow";

          return;
        } else {
          followMessage.value = "Follow";
        }
      }
    };
    setProfile();

    const startChat = () => {
      console.log("채팅 시작하기");
    };

    const btnFollow = () => {
      console.log("팔로우 버튼");
      followMessage.value = "Unfollow";
      axios
        .post(api.profile.follow(route.params.user_pk))
        .then((response) => {
          console.log("follow start response : ", response);
          const result = response.data.result;
          const arr = result.split(" ");
          if (arr.length === 3) {
            alert(userProfile.value.nickname + "님을 팔로우합니다.");
            followMessage.value = "Unfollow";
          } else {
            alert(userProfile.value.nickname + "님을 팔로우 취소합니다.");
            followMessage.value = "Follow";
          }
        })
        .catch((err) => {
          console.log("follow start err : ", err);
        });
    };

    const follower = async () => {
      await store.dispatch(
        "profile/getFollowerList",
        userProfile.value.user_pk
      );
      console.log(
        "userProfileView에서 값 확인",
        store.state.profile.myFollower
      );
      router.push({
        name: "followList",
        params: {
          user_pk: userProfile.value.user_pk,
          followType: "follower",
        },
      });
    };

    const following = async () => {
      await store.dispatch(
        "profile/getFollowingList",
        userProfile.value.user_pk
      );
      router.push({
        name: "followList",
        params: { user_pk: userProfile.value.user_pk, followType: "following" },
      });
    };

    const userReview = async () => {
      await store.dispatch("profile/getReviewList", userProfile.value.user_pk);
      router.push({
        name: "reviewList",
        params: {
          user_pk: userProfile.value.user_pk,
        },
      });
    };

    const userCrew = async () => {
      await store.dispatch("profile/getCrewList", userProfile.value.user_pk);
      router.push({
        name: "crewList",
        params: {
          user_pk: userProfile.value.user_pk,
        },
      });
    };

    const setBlackList = () => {
      router.push({
        name: "setBlackList",
        params: {
          user_pk: userProfile.value.user_pk,
        },
      });
    };

    return {
      HOST,
      userProfile,
      myFollowingList,
      followMessage,
      setProfile,
      startChat,
      btnFollow,
      follower,
      following,
      userReview,
      userCrew,
      setBlackList,
    };
  },
};
</script>

<style>
#profile {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.imgProfile {
  width: 9.6rem;
  height: 9.6rem;
  object-fit: cover;
}
</style>
