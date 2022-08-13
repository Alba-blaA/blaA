<template>
  <br /><br />
  <div>
    <h3>회원정보수정페이지</h3>
    <form>
      <input
        id="update-email"
        type="text"
        v-model="updateInfo.email"
        placeholder="Enter email"
        disabled
      />
      <br />

      <input
        id="update-name"
        type="text"
        v-model="updateInfo.name"
        placeholder="Enter name"
        disabled
      />
      <br />

      <input
        id="update-password"
        type="password"
        autocomplete="off"
        v-model="updatePassword.password"
        placeholder="Enter password"
      />
      <br />

      <input
        id="update-checkPassword"
        type="password"
        autocomplete="off"
        v-model="updatePassword.password2"
        placeholder="Check password"
      />
      <br />

      <div>
        <input id="update-tel1" v-model="tel1" placeholder="Enter tel" />
        <b> - </b>
        <input id="update-tel2" v-model="tel2" />
        <b> - </b>
        <input id="update-tel3" v-model="tel3" />
      </div>

      <!-- <select id="update-category">
        <option :key="c" v-for="(category, c)"></option>
      </select> -->
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "@/api/axios.js";
import api from "@/api/api.js";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfo = store.state.account.userInfo;
    console.log("userInfo : ", userInfo);

    const tel = userInfo.tel.split("-");
    const tel1 = ref(tel[0]);
    const tel2 = ref(tel[1]);
    const tel3 = ref(tel[2]);

    const updateInfo = ref({
      email: userInfo.email,
      name: userInfo.name,
      tel: userInfo.tel,
      nickname: userInfo.nickname,
      category: userInfo.category,
      region: userInfo.region,
    });
    console.log("updateInfo", updateInfo.value);

    const updatePassword = ref({
      old_password: null,
      password: null,
      password2: null,
    });

    const updateUserInfo = {};

    const checkPassword = () => {
      var password = prompt("비밀번호를 입력해주세요!");

      if (password) {
        axios
          .post(api.accounts.login(), {
            email: userInfo.email,
            password: password,
          })
          .then((response) => {
            console.log("유저 정보 조회 성공 : ", response);
          })
          .catch((err) => {
            console.log("유저 정보 조회 실패 : ", err);
            router.go(-1);
            alert("비밀번호가 틀립니다!");
            checkPassword();
          });
      } else {
        router.go(-1);
      }
    };

    if (!store.state.account.kakaoLogin) {
      checkPassword();
    }

    return {
      userInfo,
      updateInfo,
      updatePassword,
      updateUserInfo,
      tel1,
      tel2,
      tel3,
      checkPassword,
    };
  },
};
</script>

<style></style>
