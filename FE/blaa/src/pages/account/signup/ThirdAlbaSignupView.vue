<template>
  <select
    id="signup-category"
    v-model="user.category"
    :options="category_list"
    @change="getChange()"
  />
  <div>
    <select
      id="signup-sido"
      v-model="user.sido"
      :options="si_list"
      @change="getGu(user.value.sido)"
    ></select>
    <select
      id="signup-gugun"
      v-model="user.gugun"
      :options="gu_list"
      @change="getDong(user.sido, user.gugun)"
    ></select>
    <select
      id="signup-dong"
      v-model="user.dong"
      :options="dong_list"
      @change="getChange()"
    ></select>
  </div>
  <div>
    <button @click.prevent="before">이전</button> &nbsp;
    <button @click.prevent="signup">가입</button>
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
      category: null,
      sido: null,
      gugun: null,
      dong: null,
    });

    store.dispatch("account/getCategoryList");
    store.dispatch("account/getSiList");

    const getGu = (sido) => {
      if (sido != null) {
        store.dispatch("account/getGuList", sido);
        user.value.gugun = null;
        user.value.dong = null;
      }
    };

    const before = () => {
      router.go(-1);
    };

    const signup = () => {};

    return {
      user,
      getGu,
      before,
      signup,
    };
  },
};
</script>

<style></style>
