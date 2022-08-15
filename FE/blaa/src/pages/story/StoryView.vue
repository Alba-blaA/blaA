<template>
<div>
  <StoryTopNavbar :isStory="isStory" :isFollow="isFollow" :isFilter="isFilter" @change="change"/>
  <div v-if="isFilter">
    <button class="btn" @click="isPopUp=true">검색</button>
    <button class="btn m-1" @click="onCategory" :class="{ activate: isCategory, deactivate: !isCategory}">관심업종</button>
    <button class="btn m-1" @click="onRegion" :class="{ activate: isRegion, deactivate: !isRegion}">근무지</button>
  </div>
  <!-- Modal -->
  <PopUp v-if="isPopUp">
    <HashTagForm @search-hash-tag="searchHastTag" @closeModal="[isPopUp=false, getPure()]"/>
    <button type="button" class="btn btn-secondary" @click="[isPopUp=false, getPure()]">닫기</button>
    <button type="button" class="btn btn-primary" @click="searchHastTagStory">검색</button>
  </PopUp>
  <div v-if="images.value">
    <StoryImageCardList :images="images.value"/>
  </div>
  <p v-else>아직 불러오는 중이에요
  </p>
</div>
</template>

<script>
import StoryTopNavbar from '@/components/story/StoryTopNavbar.vue'
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import HashTagForm from '@/components/story/HashTagForm.vue'
import PopUp from '@/components/story/PopUp.vue'
import { useStore } from 'vuex'
import { onBeforeMount, ref, computed } from 'vue'
import { dataChange } from '@/hooks/dateChange'
// import axios from 'axios'

export default {
  components: {
    StoryImageCardList,
    HashTagForm,
    PopUp,
    StoryTopNavbar
  },
  setup() {
    const store = useStore()
    const images = ref([])
    const isCategory = ref(false)
    const isRegion = ref(false)
    const hashTag = ref([])
    const hashtag_content = ref('')
    const isPopUp = ref(false)
    const isStory = ref(true)
    const isFollow = ref(false)
    const isFilter = ref(false)

    const {
      howNow
    } = dataChange()

    const getPure = async() => {
      if (!hashTag.value.length) {
        await store.dispatch('story/getImages')
        images.value = computed(() => {return store.state.story.images})
        images.value.value.forEach(ele => {
          ele.created_at = howNow(ele.created_at)
        })
      }
    }

    // 시작할 떄
    onBeforeMount(() => {
      getPure()
    })

    // 해시태그 검색
    const searchHastTag = async(hash) => {
      hashTag.value = hash
    }

    const searchHastTagStory = async() => {
       hashtag_content.value = ''

      if(hashTag.value.length) {
        for (let i = 0; i < hashTag.value.length; i++) {
          hashtag_content.value += hashTag.value[i]
          if (i < hashTag.value.length - 1){
            hashtag_content.value += ' '
          }
        }
        await store.dispatch('story/getHashtag', hashtag_content.value)
        images.value = computed(() => {return store.state.story.images})
        isPopUp.value = false
      } else {
        getPure()
      }
    }

    const onCategory = async() => {
      isCategory.value = !isCategory.value
      isRegion.value = false
      // 관심업종이 커져있으면 해당 업종 검색
      if (isCategory.value) {
        await store.dispatch('story/getCategory')
        images.value = computed(() => {return store.state.story.images})
      } else {
        getPure()
      }
    }

    const onRegion = async() => {
      isRegion.value = !isRegion.value
      isCategory.value = false
      // 관심업종이 커져있으면 해당 업종 검색
      if (isRegion.value) {
        await store.dispatch('story/getRegion')
        images.value = computed(() => {return store.state.story.images})
      } else {
        getPure()
      }
    }

    const change =  () => {
      isFilter.value = !isFilter.value
    }

    return {
      images,
      searchHastTag,
      onCategory,
      onRegion,
      isRegion,
      isCategory,
      getPure,
      isPopUp,
      searchHastTagStory,
      isStory,
      isFollow,
      isFilter,
      change
    }
  }
}
</script>

<style scoped>
.activate {
  background-color: greenyellow;
}

.deactivate {
  background-color: gray;
}
</style>
