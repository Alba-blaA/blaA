<template>
  <br /><br />
  <h3>비밀번호 수정 페이지</h3>
  <form>
    <input
      id="myinfo-pw"
      type="password"
      v-model="updatePassword.old_password"
      placeholder="Enter password"
      autocomplete="off"
    />
    <br />

    <input
      id="update-newpassword"
      type="password"
      v-model="updatePassword.password"
      placeholder="Enter new password"
      autocomplete="off"
    />
    <br />

    <input
      id="check-newpassword"
      type="password"
      v-model="updatePassword.password2"
      placeholder="Check new password"
      autocomplete="off"
    />
    <br />
    <br />

    <div>
      <button @click.prevent="before">이전</button> &nbsp;
      <button @click.prevent="update">수정</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "@/api/axios.js";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const userInfo = store.state.account.userInfo;

    const updatePassword = ref({
      old_password: null,
      password: null,
      password2: null,
    });

    const before = () => {
      router.go(-1);
    };

    const update = async () => {
      let err = true;
      let msg = "";

      err &&
        !updatePassword.value.old_password &&
        ((msg = "비밀번호를 입력해주세요"), (err = false));
      err &&
        updatePassword.value.password.length < 6 &&
        ((msg = "비밀번호는 6자리 이상이어야 합니다"), (err = false));
      err &&
        updatePassword.value.password != updatePassword.value.password2 &&
        ((msg = "비밀번호가 일치하지 않습니다"), (err = false));

      if (!err) {
        alert(msg);
      } else {
        await axios
          .put(
            api.profile.updateMyPW(route.params.user_pk),
            updatePassword.value
          )
          .then((response) => {
            console.log(response);
            console.log("userInfo : ", userInfo);
            const updateInfo = userInfo;
            updateInfo.password = updatePassword.value.password;
            console.log("update password ; ", updateInfo.password);
            store.commit("account/USER_INFO", updateInfo);
            console.log("updateInfo : ", userInfo);
            alert("비밀번호 변경이 완료되었습니다");
            router.push({
              name: "myInfo",
              params: {
                user_pk: route.params.user_pk,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.old_password) {
              alert("회원정보에 등록된 비밀번호와 일치하지 않습니다.");
              updatePassword.value.old_password = null;
              updatePassword.value.password = null;
              updatePassword.value.password2 = null;
            }
          });
      }
    };

    return {
      updatePassword,
      before,
      update,
    };
  },
};
</script>

<style></style>
