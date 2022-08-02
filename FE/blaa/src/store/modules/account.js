// import jwt_decode from "jwt-decode";
import { login, findByToken } from "@/hooks/user.js";

const accountStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  mutations: {
    LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.status === 200) {
            let token = response.data["token"];
            commit("LOGIN", true);
            commit("LOGIN_ERROR", false);
            sessionStorage.setItem("token", token);
            console.log("로그인성공");
          } else {
            commit("LOGIN", false);
            commit("LOGIN_ERROR", true);
            console.log("로그인 실패");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getUserInfo({ commit }, token) {
      // let decode_token = jwt_decode(token);
      console.log("token : ", token);
      findByToken(
        token,
        (response) => {
          if (response.status === 200) {
            console.log("response : ", response);
            commit("USER_INFO", response.data.user);
            console.log("userInfo : ", response.data.user);
          } else {
            console.log("유저 정보 없음");
          }
        },
        (error) => {
          console.log("에러코드 : ", error.status);
          console.log("getUserInfo 에러", error);
        }
      );
    },
  },
};

export default accountStore;
