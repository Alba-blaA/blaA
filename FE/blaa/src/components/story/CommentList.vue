<template>
  <div>
    댓글 : {{ comments.length }}
  </div>
  <hr>
  <ul>
    <CommentListItem v-for="comment in comments" :key="comment.comment_pk" :comment="comment"/>
  </ul>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import CommentListItem from '@/components/story/CommentListItem.vue'

export default {
  components: {
    CommentListItem
  },
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
      comments,
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>