<template>
  <li>
    <div class="comment-info">
      <div>
        <span>{{ comment.nickname }}</span> <span>작성일: {{ comment.created_at }}</span>
      </div>
      <div v-if="user_pk == comment.user">
        <span style="display: inline-block; margin-right: 10px; cursor: pointer" @click="modiComment">수정</span>
        <span style="display: inline-block; cursor: pointer" @click="deleComment">삭제</span>
        <!-- <PopUp v-if="popUpOpen" @close-modal="popUpOpen = false">
          <div class="modal-content">
            <p>정말 삭제하시겠습니까?</p>
            <button class="btn btn-secondary" @click="popUpOpen = false">취소</button>
            <button class="btn btn=danger" @click="commnetDelete">삭제</button>
          </div>
        </PopUp> -->
      </div>
    </div>
    <div>{{ comment.comment_content }}</div>
  </li>
</template>

<script>
// import PopUp from "@/components/story/PopUp.vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    // PopUp,
  },
  setup(props) {
    const store = useStore();
    const popUpOpen = ref(true);
    const user_pk = store.state.account.userInfo.user_pk;

    // const commnetDelete = async() => {
    //   const comment_pk = props.comment.comment_pk
    //   await store.dispatch('story/deleteComment', comment_pk)
    // }

    const deleComment = async () => {
      const comment_pk = props.comment.crew_comment_pk;
      await store.dispatch("crew/deleComment", comment_pk);
    };

    return {
      user_pk,
      popUpOpen,
      deleComment,
    };
  },
};
</script>

<style scoped>
.comment-info {
  display: flex;
  justify-content: space-between;
}
</style>
