import api from '@/api/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    reviews: [],
    review: [],
    searchStores: [],
    Token: sessionStorage.getItem('token')
  },
  mutations: {
    GET_REVIEWS(state, payload){
      state.reviews = payload
    },
    GET_REVIEW(state, payload){
      state.review = payload
    },
    LIKE_ONE_REIVEW(state, payload){
      const review_pk = payload.splice(0, 1)
      // 해당값으로 리뷰를 갱신
      state.review[review_pk-1].like_users = payload.like_users
      state.review[review_pk-1].like_user_count = payload.like_user_count
    }
  },
  actions: {
    async getReviews({commit, state}) {
      try {
        const res = await axios.get(api.review.store(), {
          headers: {
            Authorization: `Bearer ${state.Token}`
          }
        })
        commit('GET_REVIEWS', res.data.results)
      } catch(error) {
        console.error(error)
      } 
    },
    async getReview({commit, state}, store_pk) {
      try {
        const res = await axios.get(api.review.review(store_pk),{
          headers: {
            Authorization: `Bearer ${state.Token}`
          }
        })
        commit('GET_REVIEW', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async likeOneReview({commit, state}, review_pk) {
      try {
        const res = await axios.post(api.review.like(review_pk), {
          headers: {
            Authorization: `Bearer ${state.Token}`
          }
        })
        const data = {
          review_pk: review_pk,
          like_users: res.data.like_users,
          like_user_count: res.data.like_user_count
        }
        commit('LIKE_ONE_REIVEW', data)
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
              Authorization: `Bearer ${state.Token}`
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
            Authorization: `Bearer ${state.Token}`
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
