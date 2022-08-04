<template>
  <h3>회원가입 2단계</h3>
  <div id="signup">
    <br />
    <form>
      <input id="signup-email" v-model="user.email" placeholder="Enter email" />
      &nbsp;
      <button @click="emailCheck">중복확인</button>
      <br />

      <input
        id="signup-password"
        type="password"
        v-model="user.password"
        placeholder="Enter password"
      />
      <br />

      <input
        id="signup-checkpassword"
        type="password"
        placeholder="Check password"
      />
      <br />

      <input id="signup-name" v-model="user.name" placeholder="Enter name" />
      <br />

      <input
        id="signup-nickname"
        v-model="user.nickname"
        placeholder="Enter nickname"
      />
      &nbsp;
      <button @click="emailCheck">중복확인</button>
    </form>
    <br /><br />
    <div>
      <button @click.prevent="before">이전</button> &nbsp;
      <button @click.prevent="next">다음</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import router from "@/router/index.js";

export default {
  setup() {
    const store = useStore();

    const user = ref({
      email: null,
      password: null,
      name: null,
      nickname: null,
    });

    const emailCheck = () => {};

    const before = () => {
      router.go(-1);
    };

    const next = () => {
      let err = true;
      let msg = "";

      err &&
        !user.value.email &&
        ((msg = "이메일을 입력해주세요"), (err = false));
      err &&
        !user.value.password &&
        ((msg = "비밀번호를 입력해주세요"), (err = false));
      err && !user.value.name && ((msg = "이름을 입력해주세요"), (err = false));
      err &&
        !user.value.nickname &&
        ((msg = "닉네임을 입력해주세요"), (err = false));

      if (!err) {
        alert(msg);
      } else {
        store.commit("account/SET_SIGNUP_EMAIL", user.value.email);
        store.commit("account/SET_SIGNUP_PASSWORD", user.value.password);
        store.commit("account/SET_SIGNUP_NAME", user.value.name);
        store.commit("account/SET_SIGNUP_NICKNAME", user.value.nickname);

        router.push({ name: "category" });
      }
    };

    return {
      user,
      emailCheck,
      before,
      next,
    };
  },
};
</script>

<style></style>
