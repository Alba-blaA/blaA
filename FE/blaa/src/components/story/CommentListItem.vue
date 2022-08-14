<template>
    <li>
      <br>
      <div class="comment-info">
        <div>
          <img :src="comment.user_pk.image" alt="프로필 이미지">
        </div>
        <div>
          <span>{{ comment.user_pk.nickname }}</span> <span>작성일: {{ comment.created_at }}</span> 
        </div>
        <div v-if="user_pk == comment.user_pk.user_pk">
          <i class="fa fa-solid fa-bars" @click="isUpdate=!isUpdate"></i>
          <div v-if="isUpdate" id="update">
            <div style="cursor:pointer" @click="[isFix=true, isUpdate=!isUpdate]">수정</div>
            <div style="cursor:pointer" @click="[commnetDelete, isUpdate=!isUpdate]">X</div>
          </div>
          <PopUp v-if="popUpOpen" @close-modal="popUpOpen=false">
            <div class="modal-content">
            <p>정말 삭제하시겠습니까?</p>
            <button class="btn btn-secondary" @click="popUpOpen=false">취소</button> 
            <button class="btn btn=danger" @click="commnetDelete">삭제</button>
          </div>
          </PopUp>  
        </div>
      </div>
      <div v-if="!isFix">{{ comment.story_comment }}</div>
      <div v-else>
        <input type="text" v-model="changeComment" @keyup.enter="commentFix"> <button @click="commentFix">제출</button>
      </div>
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
    const isFix = ref(false)
    const changeComment = ref('')
    const isUpdate = ref(false)
    changeComment.value += String(props.comment.story_comment)

    const commnetDelete = async() => {
      const comment_pk = props.comment.comment_pk
      await store.dispatch('story/deleteComment', comment_pk)
    }

    const commentFix = async() => {
      const data = {
        comment_pk: props.comment.comment_pk,
        story_comment: changeComment.value
      }
      await store.dispatch('story/fixComment', data)
      isFix.value = false
    }

    

    return {
      user_pk,
      popUpOpen,
      commnetDelete,
      commentFix,
      isFix,
      changeComment,
      isUpdate
    }
  }
}
</script>

<style scoped>
.comment-info {
  display: flex;
  justify-content: space-between;
}

#update {
  position: absolute;
  display: white;

}
</style>