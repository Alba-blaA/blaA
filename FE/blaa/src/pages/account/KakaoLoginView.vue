<template>
  <div>
    <h2>카카오 로그인 페이지</h2>
  </div>
</template>

<script>
import { getKakaoToken, getKakaoUserInfo } from "@/hooks/kakaologin.js";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import router from "@/router/index.js";

export default {
  setup() {
    const route = useRoute();
    const { cookies } = useCookies();

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
      router.replace("/");
    };

    const setUserInfo = async () => {
      await getKakaoUserInfo();
      // const userInfo = {
      //   name: res.kakao_account.profile.nickname,
      //   platform: "kakao",
      // };
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
