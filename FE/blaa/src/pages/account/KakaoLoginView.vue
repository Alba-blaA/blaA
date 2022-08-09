<template>
  <div>
    <h2>카카오 로그인 페이지</h2>
  </div>
</template>

<script>
import { getKakaoToken, getKakaoUserInfo } from "@/hooks/kakaologin.js";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
import router from "@/router/index.js";
import axios from "axios";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const { cookies } = useCookies();
    const store = useStore();

    const setKakaoToken = async () => {
      console.log("카카오 인증 코드", route.query.code);
      const { data } = await getKakaoToken(route.query.code);
      if (data.error) {
        alert("카카오톡 로그인 오류입니다.");
        router.push({ name: "login" });
        return;
      }
      window.Kakao.Auth.setAccessToken(data.access_token);
      cookies.set("access-token", data.access_token, "1d");
      cookies.set("refresh-token", data.refresh_token, "1d");
      await setUserInfo();
      alert("카카오 로그인 완료!");

      axios
        .post(
          api.accounts.emailCheck(),
          store.state.account.kakaoUserInfo.email
        )
        .then(() => {
          router.push({ name: "choice" });
        })
        .catch(() => {
          router.replace("/");
        });
    };

    const setUserInfo = async () => {
      const data = await getKakaoUserInfo();
      const kakaoUserInfo = {
        email: data.kakao_account.email,
        name: data.kakao_account.profile.nickname,
        image: data.kakao_account.profile.profile_image_url,
      };
      store.commit("account/SET_KAKAO_USER_INFO", kakaoUserInfo);
    };

    if (route.query.code) {
      setKakaoToken();
    }

    return {
      setKakaoToken,
      setUserInfo,
    };
  },
};
</script>

<style></style>
