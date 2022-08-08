<template>
  <!-- <a :href="userInfo.image"></a> -->
  <div id="profile">
    <img id="imgProfile" :src="HOST + userInfo.image">
  </div>
  
  <div>
    <h3 style="float: left;">{{userInfo.nickname}}</h3> &nbsp;
    <button @click="updateMyInfo">회원정보 수정</button>
  </div>

  <div>
    <div style="float: left;">
      <b>177</b>
      <br>
      <b>팔로워</b>
    </div>
    <div>
      <b>144</b>
      <br>
      <b>팔로잉</b>
    </div>
  </div>

  <hr>
  <div @click="myStory">
    <h5><b>내 스토리</b></h5>
  </div>

  <hr>
  <div @click="myReview">
    <h5><b>내 리뷰</b></h5>
  </div>

  <hr>
  <div @click="myGroup">
    <h5><b>내 그룹</b></h5>
  </div>

  <hr>
  <div @click="myInfo">
    <h5><b>회원정보</b></h5>
  </div>

  <hr>
  <div>
    <h5><b>회원탈퇴</b></h5>
  </div>
  <hr>
  
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import axios from "axios";
import api from "@/api/api.js";
import router from "@/router/index.js";

export default {
  setup() {
    const store = useStore();

    const HOST = ref("http://localhost:8000");

    const userInfo = store.state.account.userInfo;
    console.log(userInfo);
    console.log("nickname : ", userInfo.nickname);
    console.log("image : ", userInfo.image)

    const updateMyInfo = () => {
      console.log("회원정보 수정");
      router.push({name: "updateInfo", params: {user_pk: userInfo.user_pk}});
    };

    const myStory = () => {
      console.log("내 스토리 조회");
      router.push({name: "mystory", params: {user_pk: userInfo.user_pk}});
      console.log("페이지 이동")
    }

    const myReview = () => {
      console.log("내 리뷰 조회");
      
    }

    const myGroup = () => {
      console.log("내 그룹 조회");
      console.log(userInfo.user_pk);
      axios.get(api.crew.myCrew(userInfo.user_pk)).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    }

    const myInfo = () => {
      console.log("회원정보 조회");
      axios.get(api.accounts.myInfo(userInfo.user_pk)).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    }

    return {
      userInfo,
      updateMyInfo,
      HOST,
      myStory,
      myReview,
      myGroup,
      myInfo,
    }
  
  }
};
</script>

<style>
#profile {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
}

#imgProfile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
