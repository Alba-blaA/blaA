<template>
  <StoryTopNavbar :isStory="isStory" :isFollow="FollowTap" :isFilter="isFilter" @change="change"/>
  <StoryImageCardList :images="images" v-if="isFollow"/>
  <div v-else>
    <p>팔로우 한 사람이 없어요!</p>
  </div>
</template>

<script>
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import StoryTopNavbar from '@/components/story/StoryTopNavbar.vue'
import { useStore } from 'vuex'
import { onBeforeMount, ref, computed } from 'vue'

export default {
  components: {
    StoryImageCardList,
    StoryTopNavbar
  },
  setup() {
    const store = useStore()
    const images = ref(null)
    const isStory = ref(false)
    const isFollow = ref(false)
    const isFilter = ref(false)
    const FollowTap = ref(true)
    const numberOfPages = ref(0)
    const currentPage = ref(1)

    const getPure = async(page = currentPage.value) => {
      const data = {
        isState: 'follow',
        page: page
      }
      await store.dispatch('story/getFollow', data)
      images.value = store.state.story.images
      numberOfPages.value = computed(() => {
        return Math.ceil(store.state.story.totalCount / 10)
      })
    }

    window.onscroll = function(e) {
    if (numberOfPages.value.value > currentPage.value) {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { 
        setTimeout(function(){
        // 실행 시킬 함수 구현
        currentPage.value += 1
        getPure()
        }, 1000)}
      }
    }

    onBeforeMount( async() => {
      await getPure()
      if (images.value.length == 1){
          // 메세지 하나밖에 없으면
        if (images.value[0].length == 1) {
          isFollow.value = false
        } else {
          isFollow.value = true
        }
      } else {
        console.log('데이터가 있음')
        isFollow.value = true
      }
    })

    return {
      images,
      isStory,
      isFilter,
      FollowTap
    }
  }
}
</script>

<style>

</style>
