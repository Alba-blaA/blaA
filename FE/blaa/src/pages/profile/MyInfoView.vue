<template>
  <div style="display: flex">
    <img class="back" src="@/img/back.png" @click="back" /> &nbsp;
    <h1 style="text-align: center">회원정보</h1>
  </div>
  <hr />
  <div style="border 1px black solid">
    <b>이메일 : {{ myInfo.email }}</b> <br />
    <b>이름 : {{ myInfo.name }}</b> <br />
    <b>닉네임 : {{ myInfo.nickname }}</b> <br />
    <b>전화번호 : {{ myInfo.tel }}</b> <br />
    <div>
      <b v-if="myInfo.is_alba">알바여부 : 예</b>
      <b v-else>알바여부 : 아니오</b>
      <br />
    </div>
    <b>카테고리 : {{ myInfo.category }}</b
    ><br />
    <b>지역 : {{ myInfo.region }}</b
    ><br />
    <button @click.prevent="logout">로그아웃</button>
    <button type="button" @click="updateMyInfo">회원정보 수정</button>
    <button type="button" @click="updatePassword">비밀번호 변경</button>
    <button type="button" @click="deleteAccount">회원탈퇴</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const back = () => {
      router.go(-1);
    };

    const logout = () => {
      store.commit("account/USER_INFO", null);
      store.commit("account/LOGIN", false);
      sessionStorage.removeItem("token");
      store.commit("account/RESET_STORAGE");
      router.replace("/");
    };

    const myInfo = store.state.account.userInfo;
    console.log("myInfo : ", myInfo);
    console.log("is_alba: ", myInfo.is_alba);

    const updateMyInfo = () => {
      console.log("회원정보 수정");
      router.push({
        name: "updateInfo",
        params: { user_pk: route.params.user_pk },
      });
    };

    const updatePassword = () => {
      router.push({
        name: "updatePassword",
        params: {
          user_pk: route.params.user_pk,
        },
      });
    };

    const deleteAccount = () => {
      router.push({
        name: "deleteAccount",
        params: { user_pk: route.params.user_pk },
      });
    };

    return {
      back,
      myInfo,
      logout,
      updateMyInfo,
      updatePassword,
      deleteAccount,
    };
  },
};
</script>

<style scoped></style>
