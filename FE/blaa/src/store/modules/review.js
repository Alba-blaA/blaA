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
        const res = await axios.get(api.review.store(), {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
        commit('GET_REVIEWS', res.data)
        console.log(res)
      } catch(error) {
        console.error(error)
      } 
    },
    async makeReviews({state}, data) {
      const isStore = data.isStore
      const store = {
        name: data.name,
        region: data.region,
        store_pk: data.store_pk
      }
      const review = {
        oneline_review: data.oneline_review,
        star: data.star,
        chosen_button: data.type
      }
      // 스토어 정보가 없어 새로 생성시
      if (isStore) {
        try {
          const res = await axios.post(api.review.store(), store, {
            headers: {
              Authorization: `Baerer ${state.Token}`
            }
          })
          store.store_pk = res.data.store_pk
        } catch (error) {
          console.error(error)
        }
      }
      // 리뷰 생성
      try {
        console.log(review)
        const res = await axios.post(api.review.review(store.store_pk), review, {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
        console.log(res.data)
      } catch(error) {
        console.error(error)
      }
    }
      
  },
  getters: {},
};
