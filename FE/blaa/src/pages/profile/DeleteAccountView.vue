<template>
  <div></div>
</template>

<script>
import axios from "@/api/axios.js";
import api from "@/api/api";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    var result = confirm("정말로 탈퇴하시겠습니까?");
    if (result) {
      axios
        .delete(api.profile.myInfo(route.params.user_pk), route.params.user_pk)
        .then((response) => {
          alert("탈퇴가 완료되었습니다.");
        })
        .catch((err) => {
          alert("회원 탈퇴 에러");
          console.log(err);
        });
    } else {
      router.go(-1);
    }

    return {};
  },
};
</script>

<style></style>
