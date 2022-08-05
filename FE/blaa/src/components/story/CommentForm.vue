<template>
  <input type="text" v-model="comment" placeholder="댓글을 입력해주세요">
  <button @click="CommentCreate">등록</button>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const comment = ref(null)
    const store = useStore()

    const CommentCreate = () => {
      store.dispatch('story/createComment', comment)
    }
    return {
      CommentCreate
    }
  }
}
</script>

<style>

</style>