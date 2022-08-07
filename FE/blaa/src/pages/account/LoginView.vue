<template>
<<<<<<< HEAD
  <h4>여기는 로그인 페이지입니다!</h4>
  <li v-for="(user, i) in userInfo" :key="i" v-bind="user">
    <router-link :to="'/crew/'+ user.user_pk">{{ user.user_pk }}</router-link>
  </li>
</template>

<script>
import axios from "axios";
const url = "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/loginuser";
export default {
  data() {
    return {
      userInfo: [],
    };
  },
  created() {
    axios.get(url).then((response) => {
      console.log(response.data);
      this.userInfo = response.data;
    });
  },
=======
  <div id="login">
    <br />
    <form>
      <input id="login-id" v-model="user.email" placeholder="Enter email" />
      <br />
      <input
        id="login-userpw"
        type="password"
        autocomplete="off"
        v-model="user.password"
        placeholder="Enter Password"
      />
    </form>
    <br /><br />
    <div><button @click.prevent="confirm">Login</button> <br /></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import router from "@/router/index.js";

export default {
  setup() {
    const store = useStore();

    const user = ref({
      email: null,
      password: null,
    });

    const isLogin = computed(() => {
      return store.state.account.isLogin;
    });

    const isLoginError = computed(() => {
      return store.state.account.isLoginError;
    });

    // store.dispatch("account/userConfirm");

    const confirm = async () => {
      await store.dispatch("account/userConfirm", user.value);

      let token = sessionStorage.getItem("token");
      if (isLogin.value) {
        await store.dispatch("account/getUserInfo", token);
        console.log("로그인 성공!!!!!");
        router.push("/");
      } else {
        console.log("isLogin : ", store.state.account.isLogin);
        console.log("isLoginError : ", store.state.account.isLoginError);
        console.log("로그인 안됨??????");
      }
    };

    return {
      user,
      isLoginError,
      isLogin,
      confirm,
    };
  },
>>>>>>> remotes/origin/develop_FE
};
</script>

<style></style>
