<template>
<div id="contain">
  <div class="comment-form">
    <div style="background-color:white;">
      <input type="text" v-model="comment" placeholder="댓글을 입력해주세요" :style="{width: windowWidth.value + 'px'}" @keyup.enter="CommentCreate">
      <button @click="CommentCreate">등록</button>
    </div>
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
    const formWidth = ref(0)

    const CommentCreate = () => {
      const content = {
        story_comment: comment.value,
        story_pk: route.params.story_pk
      }
      store.dispatch('story/createComment', content)
      comment.value = ''
    }


    windowWidth.value = computed(() => {
      return $(window).width() - 215
    }) 

    formWidth.value = computed(() => {
      return windowWidth.value.value + 64
    })

    $(window).resize(function() {
      windowWidth.value = computed(() => {
          return $(window).width() - 215
      })
      formWidth.value = computed(() => {
        return windowWidth.value.value + 64
      })
    })
    

    return {
      CommentCreate,
      comment,
      windowWidth,
      formWidth
    }
  }
}
</script>

<style scoped>
#contain {
  position:fixed;
  width: 100%;
  background-color: white;
  height: 3rem;
  bottom: 68px;
  left: 0;
}

input {
  margin-top: 0.75rem;
  border:none;
  margin-left: 2rem;
}

.comment-form {
  /* background-color: white; */
  position:fixed;
  left: 5%;
  width: 87%;
  margin: 0 12px;
  bottom: 68px;
  height: 3rem;
  border-top: 1px solid black;
}

button {
  position: fixed;
  bottom: 73px;
  right: 8%;
  width: 4rem;
  height: 2.5rem;
  border-radius: 10px;
  background-color: #D9D9D9;
  border-color: #D9D9D9;
}

</style>