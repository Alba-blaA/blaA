<template>
  <!-- 작성자프로필, 제목, 작성자와 좋아요 현황 추가해야 됨 -->
  <div
    class="grid-item"
    :style="{
      height: tH + 'px',
      gridRowEnd: gap,
    }"
  >
      <div @click="moveToDetail" style="cursor: pointer">
        <img :src="host + image.story_picture" class="image"  :style="{ width: '100%', borderRadius:'10px' }" />
      </div>
    <div class="storyInfo">
      <img :src="host + image.user_pk.image" alt="프로필">
      <div>
        <p>{{ image.story_title }}</p>
        <!-- created at 현재 시간이랑 비교 -->
        <div class="userInfo">
          <div>{{ image.user_pk.nickname }}</div> <div>{{ image.created_at }}</div>
        </div>
      </div>
    </div>
</div>
  
</template>

<script>
import { ref } from "vue";
import { round } from "mathjs";
import { useRouter } from "vue-router";
import $ from 'jquery'
import api from '@/api/api'

export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const tH = ref(null);
    const gap = ref(null);
    // 로컬에서는 해당 형식으로 작동
    const host = ref('http://localhost:8000');
    const time = ref('')
    // const host = ref(api.story.host());


    // 이미지 크기 설정
    $(document).ready(function() {
      $("<img/>").attr('src', host.value + props.image.story_picture)
      .on('load', function() {
          const width = this.naturalWidth
          const height = this.naturalHeight

          tH.value = round(height / (width / 200) + 70)
          gap.value = round(tH.value / 10);
          gap.value = `span ${gap.value}`;
        })
      })
    
    const moveToDetail = () => {
      console.log(props.image);
      router.push({
        name: "detailStory",
        params: {
          story_pk: props.image.story_pk,
        },
      });
    };

    return {
      tH,
      gap,
      moveToDetail,
      host,
    };
  },
};
</script>

<style scoped>
.storyInfo {
  display: flex;
  grid-template-columns: 25% auto;
}

p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.userInfo {
  display: flex;
  justify-content: space-between;
}
</style>
