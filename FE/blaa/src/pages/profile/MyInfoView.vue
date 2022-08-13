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
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const myInfo = store.state.account.userInfo;
    console.log("myInfo : ", myInfo);
    console.log("is_alba: ", myInfo.is_alba);
    return {
      myInfo,
    };
  },
};
</script>

<style></style>
