<template>
<div class="d-flex justify-content-center comment-form">
  <div style="width: 100%; background-color:white;">
    <input type="text" v-model="comment" placeholder="댓글을 입력해주세요" :style="{width: windowWidth.value + 'px'}">
    <button @click="CommentCreate">등록</button>
  </div>
</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import $ from 'jquery'

export default {
  setup() {
    const comment = ref('')
    const store = useStore()
    const route = useRoute()
    const windowWidth = ref(0)

    const CommentCreate = () => {
      const content = {
        story_comment: comment.value,
        story_pk: route.params.story_pk
      }
      store.dispatch('story/createComment', content)
      comment.value = ''
    }


    windowWidth.value = computed(() => {
      return $(window).width() - 65
    }) 

    $(window).resize(function() {
      windowWidth.value = computed(() => {
          return $(window).width() - 65
      })  
    })
    

    return {
      CommentCreate,
      comment,
      windowWidth
    }
  }
}
</script>

<style scoped>
input {
  margin-top: 0.75rem;
  border:none;
}

.comment-form {
  background-color: white;
  position:fixed;
  bottom:0;
  width:100%;
  height: 3rem;
  border-top: 1px solid black;
}
button {
  width: 4rem;
  height: 2.5rem;
  border-radius: 10px;
  margin-top: 0.25rem;
  background-color: #D9D9D9;
  border-color: #D9D9D9;
}

</style>