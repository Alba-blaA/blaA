import axios from 'axios'
import api from '@/api/api'

export default {
  namespaced: true,
  state: {
    token : sessionStorage.getItem('token'),
    messages : [],
    to_userProfile : "",
    from_userProfile : "",

  },
  mutations: {
    GET_TOPROFILE(state, userpk) {
      state.to_userProfile = userpk
    },
  },
  actions: {
    async getToProfile({commit, state}, userpk) {
      try {        
        const res = await axios.get(api.accounts.pkinfo(userpk), {
          headers: {
            Authorization: `Baerer ${state.token}`
          }
        })
        commit('GET_TOPROFILE',res.data)
      } catch(error) {
        // 에러 발생시
        console.log(error)
      }
    }

  },
  getters: {},
};
