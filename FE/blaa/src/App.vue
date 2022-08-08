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
    <button @click="register">회원가입</button>
  </div>
  <router-view />
</template>

<script>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> develop_FE
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

    const logout = () => {
      store.commit("account/LOGIN", false);
      store.commit("account/USER_INFO", null);
      sessionStorage.removeItem("token");
      router.go();
    };

    const register = () => {
      router.push({ name: "signup" });
    };

    // const login = () => {
    //   router.push("/login");
    // };
<<<<<<< HEAD
=======
=======
//
// import axios from 'axios'
// import { useStore } from "vuex";

export default {
  setup() {
    // vuex store 사용법 예제
    // const store = useStore();

>>>>>>> feature/story
>>>>>>> develop_FE
    // // actions
    // store.dispatch("test/test");
    // // state
    // console.log(store.state.test.data);
    // // getters
    // console.log(store.getters["test/example"]);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> develop_FE
    return {
      isLogin,
      userInfo,
      login,
      logout,
      register,
    };
<<<<<<< HEAD
=======
=======
>>>>>>> feature/story
>>>>>>> develop_FE
  },
};
</script>

<style></style>
