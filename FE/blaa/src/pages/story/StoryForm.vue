<template>
<form @click.prevent="Sumbit">
  <h1>오출완 작성</h1>
  <button>등록</button>
  <div>
    <label for="story_picture">사진 등록</label>
    <input type="file" id="story_picture">
    <div v-if="isPictureVaild" style="color: red">
      사진을 등록해주세요!
    </div>
  </div>
  <div>
    <label for="story_title">제목 입력</label>
    <input type="text" placeholder="제목을 입력하세요" id="story_title">
    <div v-if="isTitleVaild" style="color: red">
      제목을 입력해주세요!
    </div>
  </div>
  <div>
    <!-- 해시태그는 추후에 작성-->
    <label for="hast_tag">해시태그</label>
    <input type="text" placeholder="#스타벅스" id="hast_tag">
  </div>
</form>
  

</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import api from '@/api/api'
export default {
  setup() {
    const router = useRouter()
    const story_picture = ref(null)
    const story_title = ref('')
    const isPictureVaild = ref(false)
    const isTitleVaild = ref(false)

    const Sumbit = async() => {
      // 사진과 제목 값이 모두 존재할 때 생성
      if (story_picture && story_title) {
        try {
          const res = await axios.post(api.story.story(), {
            story_picture: story_picture.value,
            story_title: story_title.value,
          })
          // 작성 후 상세페이지로 이동
          router.push({
            name: 'story'
          })
        } catch(error) {
          console.log(error)
        }
      } else {
        // 제목과 사진이 입력되지 않았으면 경고문을 띄우기 위한 error
        isPictureVaild = story_picture ? false : true
        isTitleVaild = story_title ? false : true
      }
      
    }

    return {
      Sumbit
    }
  }

}
</script>

<style>

</style>