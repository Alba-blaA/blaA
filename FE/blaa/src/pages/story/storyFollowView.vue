<template>
  <StoryImageCardList :images="images"/>
</template>

<script>
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import { useStore } from 'vuex'
import { onBeforeMount, ref } from 'vue'

export default {
  components: {
    StoryImageCardList
  },
  setup() {
    const store = useStore()
    const images = ref(null)

    const getPure = () => {
          store.dispatch('story/getFollow').then(() => {
          images.value = store.state.story.images          
      })
    }

    onBeforeMount(() => {
      console.log('실행')
      getPure()
    })

    return {
      images
    }
  }
}
</script>

<style>

</style>