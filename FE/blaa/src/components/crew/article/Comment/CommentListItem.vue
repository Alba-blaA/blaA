<template>
    <li>
      <br>
      <div class="comment-info">
        <div>
          <span>{{ comment.user_pk.nickname }}</span> <span>작성일: {{ comment.created_at }}</span> 
        </div>
        <div v-if="user_pk == comment.user_pk.user_pk">
          <span style="display:inline-block; margin-right:10px; cursor:pointer" @click="fixComment">수정</span>
          <span style="display:inline-block; cursor:pointer" @click="commnetDelete">X</span>
          <PopUp v-if="popUpOpen" @close-modal="popUpOpen=false">
            <div class="modal-content">
            <p>정말 삭제하시겠습니까?</p>
            <button class="btn btn-secondary" @click="popUpOpen=false">취소</button> 
            <button class="btn btn=danger" @click="commnetDelete">삭제</button>
          </div>
          </PopUp>  
        </div>
      </div>
      <div>{{ comment.story_comment }}</div>
    </li>
</template>

<script>
import PopUp from '@/components/story/PopUp.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    PopUp
  },
  setup(props) {
    const store = useStore()
    const popUpOpen = ref(true)
    const user_pk = store.state.account.userInfo.user_pk

    const commnetDelete = async() => {
      const comment_pk = props.comment.comment_pk
      await store.dispatch('story/deleteComment', comment_pk)
    }

    return {
      user_pk,
      popUpOpen,
      commnetDelete,
    }
  }
}
</script>

<style scoped>
.comment-info {
  display: flex;
  justify-content: space-between;
}
</style>