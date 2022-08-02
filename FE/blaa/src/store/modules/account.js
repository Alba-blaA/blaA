// import jwt_decode from "jwt-decode";
import { login, findByToken } from "@/hooks/user.js";
import axios from "axios";
import api from "@/api/api.js";

const accountStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isAlba: true,
    signupUser: null,
    category: [],
    si: [],
    gu: [],
    dong: [],
  },
  getters: {
    category_list(state) {
      let ret = state.category;
      ret.unshift({ value: null, text: "업종 카테고리" });
      return ret;
    },
    si_list(state) {
      let ret = state.si;
      ret.unshift({ value: null, text: "시/도" });
      return ret;
    },
    gu_list(state) {
      let ret = state.gu;
      ret.unshift({ value: null, text: "구/군" });
      return ret;
    },
    dong_list(state) {
      let ret = state.dong;
      ret.unshift({ value: null, text: "동/면/리" });
      return ret;
    },
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
    ALBA: (state, isAlba) => {
      state.isAlba = isAlba;
    },
    SIGNUP_USER: (state, signupUser) => {
      state.signupUser = signupUser;
    },
    GET_CATEGORY_LIST: (state, payload) => {
      state.category = payload;
    },
    GET_SI_LIST: (state, payload) => {
      state.si = payload;
    },
    GET_GU_LIST: (state, payload) => {
      state.gu = payload;
    },
    GET_DONG_LIST: (state, payload) => {
      state.dong = payload;
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
    getCategoryList(context) {
      axios.get(api.categorys.job()).then(({ data }) => {
        context.commit("GET_CATEGORY_LIST", data);
      });
    },
    getSiList(context) {
      axios.get(api.categorys.region()).then(({ data }) => {
        context.commit("GET_SI_LIST", data);
      });
    },
    getGuLIst(context, sido) {
      axios.get(api.categorys.region() + sido + "/").then(({ data }) => {
        context.commit("GET_GU_LIST", data);
      });
    },
    getDongLIst(context, region) {
      axios
        .get(api.categorys.region() + region.sido + "/" + region.gugun + "/")
        .then(({ data }) => {
          context.commit("GET_DONG_LIST", data);
        });
    },
  },
};

export default accountStore;
