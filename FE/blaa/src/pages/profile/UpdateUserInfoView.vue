<template>
  <br /><br />
  <div>
    <h3>회원정보수정페이지</h3>
    <form>
      <input
        id="update-email"
        type="email"
        v-model="userInfo.email"
        placeholder="Enter email"
        disabled
      />
      <input
        id="update-password"
        type="password"
        v-model="updatePassword.password"
        placeholder="Enter password"
      />
      <input
        id="update-checkPassword"
        type="password"
        v-model="updatePassword.password2"
        placeholder="Check password"
      />
      <input
        id="update-name"
        type="text"
        v-model="updateInfo.name"
        placeholder="Enter name"
      />
      <input id="update-tel1" v-model="user.tel1" placeholder="Enter tel" />
      <b> - </b>
      <input id="update-tel2" v-model="user.tel2" />
      <b> - </b>
      <input id="update-tel3" v-model="user.tel3" />
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

    const updateInfo = ref({
      name: userInfo.name,
      tel: userInfo.tel,
      nickname: userInfo.nickname,
      category: userInfo.category,
      region: userInfo.region,
    });

    const updatePassword = ref({
      old_password: null,
      password: null,
      password2: null,
    });

    const tel1 = ref("");
    const tel2 = ref("");
    const tel3 = ref("");

    const updateUserInfo = {};

    const checkPassword = () => {
      var password = prompt("비밀번호를 입력해주세요!");

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
    };

    if (!store.state.account.kakaoLogin) {
      checkPassword();
    }

    return {
      updateUserInfo,
      updatePassword,
      tel1,
      tel2,
      tel3,
      checkPassword,
    };
  },
};
</script>

<style></style>
