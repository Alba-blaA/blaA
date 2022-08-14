<template>
<div>
  <div class="d-flex justify-content-center">
    <div style="width: 90%">
      댓글 : {{ comments.length }}
    </div>
  </div>
  <hr>
  <div class="d-flex justify-content-center">
    <ul v-if="comments.length" style="width:90%; padding: 0;">
      <CommentListItem  v-for="comment in comments" :key="comment.comment_pk" :comment="comment"/>
    </ul>
    <p v-else class="m-0" style="width:90%">댓글이 아직 없어요!</p>
  </div>
</div>
  
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
          console.log(comments.value)
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