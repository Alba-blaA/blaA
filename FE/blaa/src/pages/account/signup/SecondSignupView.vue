<template>
  <div id="signup">
    <br />
    <form>
      <input id="signup-email" v-model="user.email" placeholder="Enter email" />
      &nbsp;
      <button>중복확인</button>
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

    const before = () => {
      router.go(-1);
    };

    const next = () => {
      if (store.state.account.isAlba) {
        router.push({ name: "alba" });
      } else {
        router.push({ name: "public" });
      }
    };
    return {
      user,
      before,
      next,
    };
  },
};
</script>

<style></style>
