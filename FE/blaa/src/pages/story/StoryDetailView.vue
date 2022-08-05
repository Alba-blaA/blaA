<template>
<!-- 뒤로, 하트 이모지 추가 -->
  <div v-if="!isError">
    <div>
      <span>뒤로</span>
    </div>
    <div>
      <span>{{ story.story_title }}</span>
      <span>heart</span>
    </div>
    <div>
      <img :src="story.story_picture" alt="">
      <span>닉네임</span>
      <span>{{ story.created_at }}</span>
    </div>
    <CommentList/>
    <hr>
    <CommentForm/>
  </div>
  <div v-else>
    <h2>오류가 발생하였습니다. 다시 시도해주세요</h2>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import CommentList from '@/components/story/CommentList.vue'
import CommentForm from '@/components/story/CommentForm.vue'
import api from '@/api/api'
import { useRouter } from 'vue-router'

export default {
  components: {
    CommentList,
    CommentForm
  },
  setup() {
    const story = ref({})
    const isError = ref(false)
    const router = useRouter()

    const start = async () => {
      isError.value = false
      try {
        const res = await axios.get(api.story.detail(router.params.story_pk))  
        story.value = res.data
      } catch (error) {
        isError.value = true
        console.log(error)
      }      
    }
    
    start()
  }
}
</script>

<style>

</style>