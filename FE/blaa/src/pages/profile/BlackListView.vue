<template>
  <form>
    <select id="blacklist-category" v-model="blackList.black_reason">
      <option value="null">신고 사유</option>
      <option value="부적절한 닉네임">부적절한 닉네임</option>
      <option value="욕설/혐오 발언">욕설/혐오 발언</option>
      <option value="악의적인 리뷰">악의적인 리뷰</option>
      <option value="기타">기타</option>
    </select>

    <br /><br />

    <input
      id="blacklist-reason"
      type="text"
      v-model="blackList.black_content"
      placeholder="신고 내용"
    />

    <button id="blacklist-submit" type="button" @click="setBlackList">
      등록
    </button>
  </form>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "@/api/axios.js";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();

    const blackList = ref({
      black_reason: null,
      black_content: null,
      user_pk: route.params.user_pk,
    });

    const setBlackList = () => {
      let err = true;
      let msg = "";

      err &&
        !blackList.value.black_content &&
        ((msg = "신고 사유를 선택해주세요"), (err = false));
      err &&
        !blackList.value.black_reason &&
        ((msg = "신고 내용을 작성해주세요"), (err = false));

      if (!err) {
        alert(msg);
      } else {
        axios
          .post(api.profile.setBlackList(), blackList.value)
          .then((response) => {
            console.log("blacklist response : ", response);
            alert("신고 완료!");
          })
          .catch((err) => {
            console.log("blacklist err : ", err);
            alert("신고 오류");
          });
      }
    };

    return {
      blackList,
      setBlackList,
    };
  },
};
</script>

<style></style>
