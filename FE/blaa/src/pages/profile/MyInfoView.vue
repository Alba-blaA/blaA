<template>
  <br /><br />
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
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = () => {
      store.commit("account/LOGIN", false);
      store.commit("account/USER_INFO", null);
      sessionStorage.removeItem("token");
      store.commit("account/RESET_STORAGE");
      router.replace("/");
    };

    const myInfo = store.state.account.userInfo;
    console.log("myInfo : ", myInfo);
    console.log("is_alba: ", myInfo.is_alba);
    return {
      myInfo,
      logout,
    };
  },
};
</script>

<style></style>
