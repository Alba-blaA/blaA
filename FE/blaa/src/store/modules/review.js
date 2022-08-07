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
        console.log(res)
      } catch(error) {
        console.error(error)
      } 
    },
    async makeReviews({state}, data) {
      const isStore = data.slice(0, 1)
      const store = data.slice(0,2)
      // 스토어 정보가 없어 새로 생성시
      if (!isStore) {
        try {
          const res = await axios.post(api.review.review(), store, {
            headers: {
              Authorization: `Baerer ${state.Token}`
            }
          })
          // 추후 넘어오는 데이터의 형태를 확인하고 리뷰 생성으로 넘겨줌
          console.log(res.data)
        } catch (error) {
          console.error(error)
        }
      }
      try {
        await axios.post(api.review.review(), {
          data
        }, {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
      
  },
  getters: {},
};
