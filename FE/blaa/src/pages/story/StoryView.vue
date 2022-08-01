<template>
<div>
  <h1>여기는 오출완 페이지입니다!</h1>
  <StoryImageCardList :images="images"/>
</div>
</template>

<script>
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

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

    return {
      images
    }
  }
}
</script>

<style></style>
