import axios from 'axios'
import api from '@/api/api'

export default {
  namespaced: true,
  state: {
    stories: [],
    images: [],
    comments: [],
  },
  mutations: {
    GET_IMAGES(state, payload) {
      state.images = payload
    },
    CREATE_COMMENT(state, payload) {
      // 작성자, 내용, 날짜가 객체로 들어감
      state.comments.push(payload)
    },
    GET_COMMENT(state, payload) {
      state.comments = payload
    }
  },
  actions: {
    // Story 목록 조회
    async getImages({commit}) {
      try {
        // 현재 백엔드에 데이터가 없으므로 더미 데이터를 사용 진행
        // 후에 교체 예정
        const res = await axios.get(api.story.story(), {
          headers: {
            Authorization: 'Baerer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0NzAwMjkzfQ.Z4wpr2HSWfxtlowEa_Gx7ar9V912459jVogY_V72tk8'
          }
        })
        console.log('받아온 데이터', res.data)
        commit('GET_IMAGES',res.data)
      } catch(error) {
        // 에러 발생시
        console.log(error)
      }
    },
    // 댓글을 가져오는 함수
    async getComment({commit}) {
      try {
        const res = await axios.get(api.story.comment())
        // 댓글에 댓글내용과 생성일자 밖에 없는데 프로필과 유저 닉네임은 어찌 가져와야할까?
        // 이건 추후에 api 완성되고 추가적으로 작성해봐야 될것같음
        commit('GET_COMMENTS', res.data)
      } catch(error) {
        console.log(error)
      }
    },
    // 댓글 생성 함수
    async createComment({commit}, content){
      try {
        // comment 생성 응답이 없어 임의로 작성
        // story.id를 추가적으로 입력해야됨
        const res = await axios.post(api.story.comment(), content)
        // 작성자, 내용, 날짜, 작성자 프로필을 요청하여 추가적으로 입력
        console.log(res)
        commit('CREATE_COMMENT', content)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {},
};
