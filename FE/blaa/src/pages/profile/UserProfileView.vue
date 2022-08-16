<template>
  
  <div id="profile" style="border: 3px solid; text-align: center; margin: auto">
    <img class="imgProfile" :src="HOST + userProfile.image" />
  </div>
  <br />
  <div class="d-flex justify-content-center row">
    <h5 class="mt-2 mb-2 col-7" style="text-align: right; font-weight: bold">
      {{ userProfile.nickname }}
    </h5>
    <div class="col-5 px-0 mb-2">
      <button
        id="follow"
        type="button"
        class="rounded-pill"
        style="
          width: 5rem;
          height: 2rem;
          text-align: center;
          border-radius: 20%;
          background-color: #1294f2;
          border: 0px;
        "
        @click="btnFollow"
      >
        <p v-show="!isFollow" class="mt-1" style="color: white">Follow</p>
        <p v-show="isFollow" class="mt-1" style="color: white">Unfollow</p>
      </button>
    </div>
  </div>

  <hr />
  <div class="d-flex justify-content-center">
    <table>
      <tr>
        <td rowspan="4" align="center" @click="follower">
          <div style="margin-right: 0.5rem">
            <b style="font-size: 1.2rem">
              {{ userProfile.followers }}
              <br />
              팔로워
            </b>
          </div>
        </td>
        &nbsp; &nbsp;
        <td rowspan="4" align="center" @click="following">
          <div style="margin-left: 0.5rem">
            <b style="font-size: 1.2rem">
              {{ userProfile.followings }}
              <br />
              팔로잉
            </b>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <hr>
  <div>
      <button
        class="profile_list"
       style="border:0; outline:0; background-color: white; font-size: 1.2rem; "
       type="button" @click="startChat(userProfile.user_pk, userProfile.nickname)">{{ userProfile.nickname }}와 채팅하기</button>
  </div>
  <hr />
  <div @click="userReview">
    <h5 class="profile_list">
      <p>{{ userProfile.nickname }}님의 리뷰</p>
    </h5>
  </div>

  <hr />
  <div @click="userCrew">
    <h5 class="profile_list">
      <p>{{ userProfile.nickname }}님의 크루</p>
    </h5>
  </div>

  <hr />
  <div @click="setBlackList">
    <h5 class="profile_list">
      <p>{{ userProfile.nickname }}님 신고하기</p>
    </h5>
  </div>
  <hr />
</template>

<script>
import axios from "@/api/axios.js";
import api from "@/api/api.js";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const HOST = ref("https://i7b209.p.ssafy.io");

    const userProfile = ref({
      category: null,
      email: null,
      followers: null,
      followings: null,
      image: null,
      is_alba: null,
      name: null,
      nickname: null,
      region: null,
      tel: null,
      user_pk: null,
    });

    const myFollowingList = computed(() => {
      return store.state.profile.followingList.results;
    });
    var followMessage = ref("");

    const setProfile = async () => {
      console.log("route.params.user_pk : ", route.params.user_pk);
      console.log("URL : ", api.profile.myInfo(route.params.user_pk));
      await axios
        .get(api.profile.myInfo(route.params.user_pk))
        .then((response) => {
          console.log("response : ", response);
          userProfile.value = response.data;
          console.log("userProfile : ", userProfile.value);
          console.log("userProfile image : ", userProfile.value.image);
        })
        .catch((err) => {
          console.log("err", err);
        });

      for (var i = 0; i < myFollowingList.value.length; i++) {
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

    onBeforeMount(() => {
      setProfile();
      console.log("followMessage : ", followMessage);
    });

    const follow = true;

    const isFollow = computed(() => {
      var check = !follow;
      return check;
    });

    const startChat = (from_userpk, from_usernickname) => {
      console.log("채팅 시작하기");
      router.push({ name: 'chat',
      params: {
        from_userpk: from_userpk,
        from_usernickname : from_usernickname
        }}
        )
      };

    const btnFollow = async () => {
      console.log("팔로우 버튼");
      // followMessage.value = "Unfollow";
      await axios
        .post(api.profile.follow(route.params.user_pk))
        .then((response) => {
          console.log("follow start response : ", response);
          const result = response.data.result;
          const arr = result.split(" ");
          if (arr.length === 3) {
            alert(userProfile.value.nickname + "님을 팔로우합니다.");
            followMessage.value = "Unfollow";
            // axios
            //   .get(api.profile.myInfo(route.params.user_pk))
            //   .then((response) => {
            //     console.log("response : ", response);
            //     userProfile.value = response.data;
            //     console.log("userProfile : ", userProfile.value);
            //     console.log("userProfile image : ", userProfile.value.image);
            //   })
            //   .catch((err) => {
            //     console.log("err", err);
            //   });
            // router.go();
          } else {
            alert(userProfile.value.nickname + "님을 팔로우 취소합니다.");
            followMessage.value = "Follow";
            axios
              .get(api.profile.myInfo(route.params.user_pk))
              .then((response) => {
                console.log("response : ", response);
                userProfile.value = response.data;
                console.log("userProfile : ", userProfile.value);
                console.log("userProfile image : ", userProfile.value.image);
              })
              .catch((err) => {
                console.log("err", err);
              });
            // router.go();
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
      follow,
      isFollow,
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
