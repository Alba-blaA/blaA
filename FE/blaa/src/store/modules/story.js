import axios from 'axios'
import api from '@/api/api'

export default {
  namespaced: true,
  state: {
    Token: sessionStorage.getItem('token'),
    stories: [],
    images: [],
    comments: [],
    currentStory: null,
  },
  mutations: {
    GET_IMAGES(state, payload) {
      state.images = payload
    },
    GET_CURRENT_STORY(state, payload) {
      state.currentStory = payload
    },
    DELETE_CURRENT_STORY(state) {
      state.currentStory = null
    },
    CREATE_COMMENT(state, payload) {
      // 작성자, 내용, 날짜가 객체로 들어감
      state.comments.push(payload)
    },
    GET_COMMENT(state, payload) {
      state.comments = payload
    },
  },
  actions: {
    // Story 목록 조회
    async getImages({commit, state}) {
      try {
        // 현재 백엔드에 데이터가 없으므로 더미 데이터를 사용 진행
        // 후에 교체 예정
        const res = await axios.get(api.story.story(), {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
        commit('GET_IMAGES',res.data)
      } catch(error) {
        // 에러 발생시
        console.log(error)
      }
    },
    async getCurrentStory({commit, state}, story_pk) {
      try {
        const res = await axios.get(api.story.detail(story_pk), {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
        commit('GET_CURRENT_STORY', res.data)
      } catch(error) {
        console.log(error)
      }
    },
    async deleteCurrentStory({commit, state}, story_pk) {
      try {
        await axios.delete(api.story.detail(story_pk), {
          headers: {
            Authorization: `Baerar ${state.Token}`
          }
        })
        commit('DELETE_CURRENT_STORY')
      } catch (error) {
        console.error(error)
      }
    },
    // 댓글을 가져오는 함수
    async getComment({commit, state}, story_pk) {
      try {
        const res = await axios.get(api.story.comment(story_pk), {
          headers: {
            Authorization: `Baerer ${state.Token}`
          }
        })
        commit('GET_COMMENT', res.data)
      } catch(error) {
        console.log(error)
      }
    },
    // 댓글 생성 함수
    async createComment({commit, state}, content){
      try {
        // comment 생성 응답이 없어 임의로 작성
        // story.id를 추가적으로 입력해야됨
        const res = await axios.post(api.story.comment(content.story_pk), {
          story_comment: content.story_comment
          },
          {
            headers: {
              Authorization: `Baerer ${state.Token}`
            }
          })
        // 작성자, 내용, 날짜, 작성자 프로필을 요청하여 추가적으로 입력
        commit('CREATE_COMMENT', res.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
  },
};
