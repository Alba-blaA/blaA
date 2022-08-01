import axios from 'axios'
// import api from '@/api/api'

export default {
  namespaced: true,
  state: {
    images: []
  },
  mutations: {
    GET_IMAGES(state, payload) {
      state.images = payload
    }
  },
  actions: {
    async getRandomImages({commit}, count) {
      try {
        // 현재 백엔드에 데이터가 없으므로 더미 데이터를 사용 진행
        // 후에 교체 예정
        const res = await axios.get('https://api.unsplash.com/photos/random', {
          headers: {
            Authorization: 'Client-ID nztOvTSyGzNixUYxs366oiDID-D_T7Pu5v5_XYbpBU8'
          },
          params: {
            count
          }
        })
        commit('GET_IMAGES',res.data)
      } catch(error) {
        // 에러 발생시
        console.log(error)
      }
    }
  },
  getters: {},
};
