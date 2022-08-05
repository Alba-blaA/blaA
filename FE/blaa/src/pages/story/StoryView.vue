<template>
<div>
  <h1>여기는 오출완 페이지입니다!</h1>
  <router-link class="btn btn-primary" style="maring-left:5px" :to="{name: 'createStory'}">+</router-link>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    검색
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <HashTagForm @search-hash-tag="searchHastTag"/>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary">검색</button>
        </div>
      </div>
    </div>
  </div>
  <StoryImageCardList :images="images"/>
</div>
</template>

<script>
import StoryImageCardList from '@/components/story/StoryImageCardList.vue'
import HashTagForm from '@/components/story/HashTagForm.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
// import axios from 'axios'

export default {
  components: {
    StoryImageCardList,
    HashTagForm
  },
  setup() {
    const store = useStore()

    const images = ref(null)
    store.dispatch('story/getImages').then(() => {
      images.value = store.state.story.images
    })

    const searchHastTag = (hastTag) => {
      // 검색 기능 구현
      hastTag
    }

    return {
      images,
      searchHastTag
    }
  }
}
</script>

<style></style>
