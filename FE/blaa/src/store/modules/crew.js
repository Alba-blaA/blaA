import axios from "axios";
import api from "@/api/api";

export default {
  namespaced: true,
  state: {
    Token: sessionStorage.getItem("token"),
    AllCrews: [],
    articles: [],
    article: [],
    crewInfo: {
      crew_pk: "",
      crew_name: "",
      crew_explain: "",
      crew_region: "",
      crew_img: "",
      crew_member_count: "",
      created_at: "",
    },
  },
  mutations: {
    GET_ALL_CREWS(state, payload) {
      state.AllCrews = payload;
    },
    IS_BUSINESS(state, payload) {
      state.crewInfo.is_business = payload;
    },
    SET_CREW_INFO(state, payload) {
      state.crewInfo = payload;
    },
    GET_CREW_ARTICLES(state, payload) {
      state.articles = payload;
    },
    GET_ARTICLE_DETAIL(state, payload) {
      state.article = payload;
    },
  },
  actions: {
    async allcrewlist({ commit, state }) {
      try {
        const instance = await axios.get(api.crew.crew(), {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
        commit("GET_ALL_CREWS", instance.data);
      } catch (error) {
        console.log(error);
      }
    },
    async registcrew({ state }, crewData) {
      try {
        await axios.post(api.crew.crew(), crewData, {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getCrewInfo({ commit, state }, crew_pk) {
      try {
        const instance = await axios.get(api.crew.crewInfo(crew_pk), {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
        commit("SET_CREW_INFO", instance.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getCrewArticle({ commit, state }, crew_pk) {
      try {
        const instance = await axios.get(api.crew.articles(crew_pk), {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
        commit("GET_CREW_ARTICLES", instance.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getArtileDetail({ commit, state }, crew_article_pk) {
      try {
        const instance = await axios.get(api.crew.article(crew_article_pk), {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
        commit("GET_ARTICLE_DETAIL", instance.data);
      } catch (error) {
        console.log(error);
      }
    },
    async registArticle({ state }, payload) {
      // console.log(payload.crew_pk);
      // console.log(payload.article);
      try {
        await axios.post(api.crew.articles(payload.crew_pk), payload.article, {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async modifyArticle({ state }, payload) {
      // console.log(payload.crew_article_pk);
      console.log(payload.article);
      try {
        await axios.put(api.crew.article(payload.crew_article_pk), payload.article, {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteArticle({ state }, crew_article_pk) {
      console.log(crew_article_pk, "번째 글 삭제");
      console.log(state.Token);
      try {
        await axios.delete(api.crew.article(crew_article_pk), {
          headers: {
            Authorization: `Bearer ${state.Token}`,
          },
        });
        alert("삭제가 완료되었습니다.");
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};
