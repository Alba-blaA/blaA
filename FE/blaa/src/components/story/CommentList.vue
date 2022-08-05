<template>
  <div>
    댓글 : {{ comments.length }}
  </div>
  <hr>
  <div v-for="comment in comments" :key="comment.id">
    <!-- comment에서 작성한 유저의 프로필 요청을 어떻게 해야될지 감이 안옴 -->
    <img :src="comment.image" alt="화면이 안떠요">
    <div><span>{{ comment.user }}</span> <span>{{ comment.created_at }}</span></div>
    <div>{{ comment.story_comment }}</div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const comments = computed(() => {
      return store.state.story.comments
    })

    return {
      comments
    }
  }
}
</script>

<style>

</style>