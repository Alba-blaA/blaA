<template>
  <h1>메인페이지</h1>
  <div v-if="userInfo">
    <p>{{ userInfo.nickname }} 님</p>
    <button @click.prevent="logout">로그아웃</button>
  </div>
  <div v-else>
    <p>로그인이 필요합니다.</p>
    <button @click="login">로그인</button>
    &nbsp;
    <button @click="kakaoLogin">카카오 로그인</button>
    &nbsp;
    <button @click="register">회원가입</button>
  </div>
  <router-view />
</template>

<script>
// import axios from 'axios';
import { useStore } from "vuex";
import { computed } from "vue";
import router from "@/router/index.js";

export default {
  setup() {
    // // vuex store 사용법 예제
    const store = useStore();
    // const router = useRoute();

    const isLogin = computed(() => {
      return store.state.account.isLogin;
    });

    const userInfo = computed(() => {
      return store.state.account.userInfo;
    });

    const login = () => {
      router.push({ name: "login" });
    };

    const kakaoLogin = () => {
      const params = {
        redirectUri: "http://localhost:8080/kakao",
        // redirectUri: "http://127.0.0.1:8000/account/sign-in/kakao/callback",
      };
      window.Kakao.Auth.authorize(params);
    };

    const logout = () => {
      store.commit("account/LOGIN", false);
      store.commit("account/USER_INFO", null);
      sessionStorage.removeItem("token");
      router.go();
    };

    const register = () => {
      router.push({ name: "signup" });
    };

    return {
      isLogin,
      userInfo,
      login,
      kakaoLogin,
      logout,
      register,
    };
  },
};
</script>

<style></style>
