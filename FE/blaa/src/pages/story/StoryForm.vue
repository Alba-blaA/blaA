<template>
<!-- enctype 파일 업로드에서 무조건 사용 -->
<form @submit.prevent="Sumbit" enctype="multipart/form-data" method="POST">
  <h1>오출완 작성</h1>
  <button type="submit">등록</button>
  <div>
    <label for="story_picture">사진 등록</label>
    <input class="story_picture" id="story_picture" type="file" @change="previewFile" /><br />
    <img class="img_test" src="" height="200" alt="이미지 미리보기..." />
    <div v-if="isPictureVaild" style="color: red">
      사진을 등록해주세요!
    </div>
  </div>
  <div>
    <label for="story_title">제목 입력</label>
    <input type="text" placeholder="제목을 입력하세요" v-model="story_title" id="story_title">
    <div v-if="isTitleVaild" style="color: red">
      제목을 입력해주세요!
    </div>
  </div>
  <div>
    <!-- 해시태그는 추후에 작성-->
    <HashTagForm/>
  </div>
  
</form>
  

</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import api from '@/api/api'
import HashTagForm from '@/components/story/HashTagForm.vue'

export default {
  components: {
    HashTagForm
  },
  setup() {
    const router = useRouter()
    const story_picture = ref(null)
    const story_title = ref('')
    const isPictureVaild = ref(false)
    const isTitleVaild = ref(false)
    
    // 업로드 된 이미지를 미리 확인하는 함수
    function previewFile() {
      const preview = document.querySelector('.img_test')
      if (document.querySelector('.story_picture').files[0]) {
        story_picture.value = document.querySelector('.story_picture').files[0]
        const reader = new FileReader();

        // 파일명을 가져와서 소문자로 변환
        let fileName = story_picture.value.name.substring(
          story_picture.value.name.lastIndexOf(".") + 1
        )
        fileName = fileName.toLowerCase()

        // 파일 형식과 3MB의 파일크기 확인
        if (
          ["jpeg", "png", "gif", "bmp"].includes(fileName) && story_picture.value.size <= 25165824
        ) {
          reader.onload = e => {
            preview.src = e.target.result
          }
          reader.readAsDataURL(story_picture.value)
        } else if (story_picture.value.size <= 25165824) {
          preview.src = null
        } else {
          alert('파일을 다시 선택해 주세요')
          story_picture.value = null
          preview.src = null
        }
      // 파일을 선택하지 않았을 떄
      } else {
        story_picture.value = null
        preview.src = null
      }
    }


    // 제출하는 함수
    const Sumbit = async() => {
      // 사진과 제목 값이 모두 존재할 때 생성
      if (story_picture.value && story_title.value) {
        const form = new FormData()
        form.append("file", {
          story_picture: story_picture.value,
          story_title: story_title.value
        })
        try {
          const res = await axios.post(api.story.story(), form, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0NzAwMjkzfQ.Z4wpr2HSWfxtlowEa_Gx7ar9V912459jVogY_V72tk8"
            },
          })
          const index = res.data.story_pk
          // 작성 후 상세페이지로 이동
          router.push({
            name: 'story',
            params: {
              index
            }
          })
        } catch(error) {
          console.log(error)
        }
      } else {
        // 제목과 사진이 입력되지 않았으면 경고문을 띄우기 위한 error
        isPictureVaild.value = story_picture.value ? false : true
        isTitleVaild.value = story_title.value ? false : true
      }
      
    }

    return {
      Sumbit,
      isPictureVaild,
      isTitleVaild,
      story_picture,
      story_title,
      previewFile
    }
  }

}
</script>

<style>

</style>