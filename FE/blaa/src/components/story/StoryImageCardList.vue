<template>
  <div class="wrapper">
    <div class="cards" v-if="images.length">
      <StroyImageCard v-for="image in images" :key="image.id" :image="image" />
    </div>
    <div class="cards-loading" v-else>Loading image....</div>
  </div>
</template>

<script>
// import { useStore } from 'vuex'
import StroyImageCard from '@/components/story/StoryImageCard.vue'

export default {
  components: {
    StroyImageCard
  },
  props: {
      images: {
          type: Array,
          required: true
      }
  },
  setup() {
  }
}
</script>

<style scoped>
.wrapper .cards {
  display: grid;
  /* 행, 열간격 설정 */
  column-gap: 10px;
  row-gap: 7px;
  /* 행 갯수와 크기 설정, 추후에 모바일 크기에 따라서 조정 or 반응형으로 설정하면 될듯 */
  grid-template-columns: repeat(4, 300px);
  justify-content: center;
  max-width: var(--card-container-width);
}
</style>