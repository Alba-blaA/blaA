import axios from 'axios'
import api from '@/api/api'

export default {
  namespaced: true,
  state: {
    Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0ODQ4OTgxfQ.JBHgq3KkxPNASpcEfekXs8DVHPBftcTHgj91GZOrKtg",
    articles : [],
  },
  mutations: {
    //
  },
  actions: {
    crewList({state}) {
      axios.get(api.crew.crewList(), {
        headers: {
          Authorization: `Bearer ${state.Token}`
        },
      })
        .then(({ res }) => {
          console.log("뭔데", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    crewRegist({state}) {
      axios.post(api.crew.crewList(), {
        headers: {
          Authorization: `Bearer ${state.Token}`
        },
      })
        .then(({ res }) => {
          console.log("뭔데", res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  getters: {},
};
