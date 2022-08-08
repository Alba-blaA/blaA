<template>
  <div>
    댓글 : {{ comments.length }}
  </div>
  <hr>
  <ul v-for="comment in comments" :key="comment.comment_pk">
    <!-- comment에서 작성한 유저의 프로필 요청을 어떻게 해야될지 감이 안옴 -->
    <li>
      <img :src="comment.user_pk.image" alt="이미지 자리">
      <br>
      <span>{{ comment.user_pk.nickname }}</span> <span>작성일: {{ comment.created_at }}</span>
      <div>{{ comment.story_comment }}</div>
    </li>
  </ul>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
// import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const comments = ref([])


    onMounted(async () => {
        await store.dispatch('story/getComment', route.params.story_pk).then(() => {
          comments.value = store.state.story.comments
        })
      })
    

    
    return {
      comments
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>