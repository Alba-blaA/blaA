<template>
  <StoryImageCardList :images="images" v-if="isFollow"/>
  <div v-else>
    <p>팔로우 한 사람이 없어요!</p>
    <router-link :to="{name: 'story'}">오출완으로 돌아가기</router-link>
  </div>
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
    const isFollow = ref(false)

    const getPure = async() => {
      await store.dispatch('story/getFollow')
      images.value = store.state.story.images
    }

    onBeforeMount( async() => {
      await getPure()
      if (images.value.length == 1){
        for (const key in images.value.keys()) {
          console.log(key)
          if (key == 'message') {
            isFollow.value = false
            break
          }
        }
      } else {
        console.log('데이터가 있음')
        isFollow.value = true
      }
    })

    return {
      images
    }
  }
}
</script>

<style>

</style>