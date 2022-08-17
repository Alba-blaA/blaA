<template>
<div>
  <div style="padding:10px;">
    <StoryTopNavbar :isStory="isStory" :isFollow="isFollow" :isFilter="isFilter" @change="change"/>
    <div class="search-component" v-if="isFilter" style="margin: 10px 0px;">
      <button class="button" @click="isPopUp=true">검색</button>
      <button class="button" @click="onCategory" :class="{ activate: isCategory }">관심업종</button>
      <button class="button" @click="onRegion" :class="{ activate: isRegion }">근무지</button>
    </div>
  </div>

  <!-- Modal -->
  <PopUp v-if="isPopUp">
    <HashTagForm @search-hash-tag="searchHastTag" @closeModal="[isPopUp=false, getPure()]"/>
    <div class="buttons">
      <button class="hashbutton" type="button" @click="[isPopUp=false, getPure()]">닫기</button>
      <button class="hashbutton" style="background-color: #498D6D;" type="button" @click="searchHastTagStory">검색</button>
    </div>
  </PopUp>
  <div v-if="images.value">
    <StoryImageCardList :images="images.value"/>
  </div>
  <p v-else>해당하는 게시물이 없어요</p>
</div>
</template>

<script>
import StoryTopNavbar from '@/components/story/StoryTopNavbar.vue'
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import HashTagForm from '@/components/story/HashTagForm.vue'
import PopUp from '@/components/story/PopUp.vue'
import { useStore } from 'vuex'
import { onBeforeMount, ref, computed, watch } from 'vue'
import { dataChange } from '@/hooks/dateChange'
import { number } from 'mathjs'
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
    const isState = ref('')
    const currentPage = ref(1)
    const numberOfPages = ref(1)

    const {
      howNow
    } = dataChange()

    const getPure = async(page = currentPage.value) => {     
      if (isState.value != "") {currentPage.value = 1}
      if (!hashTag.value.length) {
        isState.value = ""
        const data = {
          isState: isState,
          page: currentPage.value
        }
        await store.dispatch('story/getImages', data)
        images.value = computed(() => {return store.state.story.images})
        numberOfPages.value = computed(() => {
          return  Math.ceil(store.state.story.totalCount / 10)
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

    const searchHastTagStory = async(page = currentPage.value) => {
      if (isState.value != "hashtag") {currentPage.value = 1}
      hashtag_content.value = ''
      isState.value = "hashtag"
      if(hashTag.value.length) {
        for (let i = 0; i < hashTag.value.length; i++) {
          hashtag_content.value += hashTag.value[i]
          if (i < hashTag.value.length - 1){
            hashtag_content.value += ' '
          }
        }
        const data = {
          hashtag_content: hashtag_content.value,
          isState: isState,
          page: currentPage.value
        }
        await store.dispatch('story/getHashtag', data)
        images.value = computed(() => {return store.state.story.images})
        numberOfPages.value = computed(() => {
          return  Math.ceil(store.state.story.totalCount / 10)
        })
        isPopUp.value = false
      } else {
        getPure()
      }
    }

    const onCategory = async(page = currentPage.value) => {
      if (isState.value != "category") {currentPage.value = 1}
      isState.value = "category"
      isCategory.value = !isCategory.value
      isRegion.value = false

      // 관심업종이 커져있으면 해당 업종 검색
      if (isCategory.value) {
        const data = {
          isState: isState,
          page: currentPage.value
        }
        await store.dispatch('story/getCategory', data)
        images.value = computed(() => {return store.state.story.images})
        numberOfPages.value = computed(() => {
          return  Math.ceil(store.state.story.totalCount / 10)
        })
      } else {
        currentPage.value = 1
        isState.value = ''
        getPure()
      }
    }

    const onRegion = async(page = currentPage.value) => {
      if (isState.value != "region") {currentPage.value = 1}
      isState.value = "region"
      isRegion.value = !isRegion.value
      isCategory.value = false

      // 관심업종이 커져있으면 해당 업종 검색
      if (isRegion.value) {
        const data = {
          isState: isState,
          page: currentPage.value
        }
        await store.dispatch('story/getRegion', data)
        images.value = computed(() => {return store.state.story.images})
        numberOfPages.value = computed(() => {
          return  Math.ceil(store.state.story.totalCount / 10)
        })
      } else {
        currentPage.value = 1
        isState.value = ''
        getPure()
      }
    }

    const change = () => {
      isFilter.value = !isFilter.value
    }   

    window.onscroll = function(e) {
    if (numberOfPages.value.value > currentPage.value) {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { 
        setTimeout(function(){
        // 실행 시킬 함수 구현

        // 오류 방지 조건문
        if (numberOfPages.value.value > currentPage.value) {
          currentPage.value += 1
          
          if( isState.value == '') {
            getPure(currentPage.value)
          } else if(isState.value == 'region') {
            onRegion(currentPage.value)
          } else if (isState.value == 'category') {
            onCategory(currentPage.value)
          } else if (isState.value == 'hashtag'){
            searchHastTagStory(currentPage.value)
          }
        }

        }, 1000)}
      }
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
/* 애니메이션 */
.search-component {
  -webkit-animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

 @-webkit-keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-15px);
            transform: translateY(-15px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);

    opacity: 1;
  }
}
@keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-15px);
            transform: translateY(-15px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}




.activate {
  background-color: #498D6D;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.button {
  border: 0;
  padding: 5px 8px;
  margin-right: 20px;
  border-radius: 10px;
  font-weight: 600;
}

.hashbutton {
  border: 0;
  padding: 5px 8px;
  margin: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  width: 40%;
}
</style>
