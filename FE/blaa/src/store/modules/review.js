import api from '@/api/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    reviews: [],
  },
  mutations: {
    GET_REVIEWS(state, payload){
      state.reviews = payload
    }
  },
  actions: {
    async get_reviews({commit}) {
      try {
        const res = await axios.get(api.review.reviews())
        commit('GET_REVIEWs', res.data)
      } catch(error) {
        console.error(error)
      }
      
    }
  },
  getters: {},
};
