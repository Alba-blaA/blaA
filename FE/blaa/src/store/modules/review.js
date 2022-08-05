import api from '@/api/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    reviews: [],
    searchStores: [],
    Token: sessionStorage.getItem('token')
  },
  mutations: {
    GET_REVIEWS(state, payload){
      state.reviews = payload
    },
  },
  actions: {
    async getReviews({commit, state}) {
      try {
        const res = await axios.get(api.review.review(), {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
        commit('GET_REVIEWS', res.data)
      } catch(error) {
        console.error(error)
      }
      
    }
  },
  getters: {},
};
