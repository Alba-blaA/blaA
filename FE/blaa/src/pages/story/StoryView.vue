<template>
<div>
  <h1>여기는 오출완 페이지입니다!</h1>
  <router-link :to="{name: storycreate}">+</router-link>
  <StoryImageCardList :images="images"/>
</div>
</template>

<script>
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
import axios from 'axios'

export default {
  components: {
    StoryImageCardList
  },
  setup() {
    const store = useStore()

    const images = ref([])
    store.dispatch('story/getRandomImages', 30).then(() => {
      images.value = store.state.story.images
    })

    const test = async() => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/v1/accounts/login/',{
          email: 'test@ssafy.com',
          password: 'test1234'
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    test()

    return {
      images
    }
  }
}
</script>

<style></style>
