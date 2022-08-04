import api from '@/api/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    reviews: [],
    Token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0Nzg0NTYxfQ.1bIJV7Baadoa_b68_lJ9c_RGKL6p8YJGmgh6xG-iik4',
  },
  mutations: {
    GET_REVIEWS(state, payload){
      state.reviews = payload
    }
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
