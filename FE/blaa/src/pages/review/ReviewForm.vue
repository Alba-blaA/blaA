<template>
  <!-- 가게 주소 -->
  <div class="wrapper">
    <div class="d-flex justify-content-center" style="padding-top:24px;">
    <ReviewMap v-if="isModalOpen" @close-modal="isModalOpen=false" @select-store="selectStore"/>
    <div style="width:90%">
      <div div class="d-flex justify-content-between align-items-center" style="padding:4px;">
        <router-link :to="{name: 'review'}" style="text-decoration:none; color:black; font-size:24px; font-weight:bold; width:60px;">X</router-link>
        <h2 style="font-weight:bold; margin:0;">리뷰 작성 폼</h2>
        <button class="submit-btn" @click="sumbitReview">제출</button>
      </div>
      <div style="height: 1px; background-color:black; margin:10px 0px;"></div>

      <div class="store-info" :class="{isStoreInfo: isStore, isNotStoreInfo: !isStore}">
        <div v-if="isStore" class="store-picture">
          <input class="store_picture" id="store_picture" type="file" @change="previewFile" style="display:none"/>
          <img class="img_test" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height="60" width="60" style="border-radius:50%" @click="fileUpload"/>
        </div>
        <div>
          <div style="font-weight: 600;">가게명 : {{storeName}}</div>
          <div style="font-weight: 600; margin-top: 3px;">가게주소 : {{storeAddress}}</div>
          <p v-if="storeError" class="error">가게를 검색해주세요</p>
        </div>
        <button @click="isModalOpen=true">검색</button>
      </div>
      <!-- 별점 -->
      <div class="d-flex justify-content-center">
        <form id="myform" class="mb-3" @click="checkStar">
          <fieldset>
            <input type="radio" name="reviewStar" value="5" id="rate1"><label for="rate1">★</label>
            <input type="radio" name="reviewStar" value="4" id="rate2"><label for="rate2">★</label>
            <input type="radio" name="reviewStar" value="3" id="rate3"><label for="rate3">★</label>
            <input type="radio" name="reviewStar" value="2" id="rate4"><label for="rate4">★</label>
            <input type="radio" name="reviewStar" value="1" id="rate5"><label for="rate5">★</label>
          </fieldset>
        </form>
      </div>
      <p v-if="starError" class="error">별점을 입력해주세요</p>

      <div class="button-info">
        <!-- 버튼식 -->
        <form @click="checkBtn" id="buttonReview">
          <label for="kind" ><input type="checkbox" name="reviewBtn" vlaue="1" id="kind" class="checkList" >친절한 사장님</label>
          <label for="clean" ><input type="checkbox" name="reviewBtn" value="2" id="clean" class="checkList">깨끗한 매장</label>
          <label for="short" ><input type="checkbox" name="reviewBtn" value="3" id="short" class="checkList">교통 접근성</label>
          <label for="good" ><input type="checkbox" name="reviewBtn" value="4" id="good" class="checkList">좋은 분위기</label>
          <label for="workblance" ><input type="checkbox" name="reviewBtn" value="5" id="workblance" class="checkList">칼퇴근 가능</label>
          <label for="uniform"><input type="checkbox" name="reviewBtn" value="6" id="uniform" class="checkList">유니폼 제공</label>
        </form>
      </div>
      

      <!-- 한줄평 -->
      <div class="d-flex justify-content-center">
        <div class="oneReview">
          <p style="font-weight:600;">한줄평</p>
          <textarea v-model="oneReview" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ReviewMap from '@/components/review/ReviewMap.vue'
import { computed, ref, onUnmounted } from 'vue'
import $ from 'jquery'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {
    ReviewMap,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const storeName = ref('')
    const storeAddress = ref('')
    const storeError = ref(false)
    // 6개의 버튼으로 이루어짐
    const storeButton = ref([0,0,0,0,0,0])
    const oneReview = ref('')
    const isModalOpen = ref(false)
    const star = ref(0)
    const starError = ref(false)
    const isStore = ref(false)
    const store_pk = ref(0)
    const store_picture = ref(null)
    const image_url = ref('')
    const isSubmit = ref(false)

    onUnmounted(() => {
      storeButton.value = [0,0,0,0,0,0]
      console.log($('#buttonReview').children())
      $('#buttonReview').children().find('.selected').each( function() {
        console.log($(this))
        $(this).removeClass("selected")
      })
      console.log('언마운트')
    })

    const fileUpload = (e) => {
      e.preventDefault()
      $('#store_picture').click()
    }

    // 상점 선택하기
    const selectStore = (data) => {
      store_pk.value = data.store_pk
      isStore.value = data.isStore
      console.log(isStore.value)
      storeName.value = data.name
      storeAddress.value = data.region
      isModalOpen.value = false
    }

    // 사진 등록하기
    const previewFile = (e) => {
      const preview = document.querySelector('.img_test')
      if (e.target.files[0]) {
        store_picture.value = e.target.files[0]
        const reader = new FileReader();

        // 파일명을 가져와서 소문자로 변환
        let fileName = store_picture.value.name.substring(
          store_picture.value.name.lastIndexOf(".") + 1
        )
        fileName = fileName.toLowerCase()

        // 파일 형식과 3MB의 파일크기 확인
        if (
          ["jpeg", "png", "gif", "bmp"].includes(fileName) && store_picture.value.size <= 25165824
        ) {
          reader.onload = e => {
            preview.src = e.target.result
            image_url.value = e.target.result
          }
          reader.readAsDataURL(store_picture.value)
        } else if (store_picture.value.size <= 25165824) {
          preview.src = null
        } else {
          alert('파일을 다시 선택해 주세요')
          store_picture.value = null
          preview.src = null
        }
      // 파일을 선택하지 않았을 떄
      } else {
        store_picture.value = null
        preview.src = null
      }
    }

    // 별점 가져오기
    const checkStar = () => {
      star.value = $('input[name=reviewStar]:checked').val()
    }

    // 값을 가져와야됨.. 어케 가져오지?
    const checkBtn = () => {
      $('input:checkbox[name="reviewBtn"]').each(function(i) {
        if ($(this).is(':checked') == true) {
          $(this).parent().addClass("selected")
          // 값 변경
          if (storeButton.value[i] == 0) {
            storeButton.value[i] = i + 1
          }
        } else {
          $(this).parent().removeClass("selected")
          if (storeButton.value[i] == i+1) {
            storeButton.value[i] = 0
          }
        }
      })
    }
    
    isSubmit.value = computed(() => {
      if (storeName.value && storeAddress.value && star.value) {
        $('sumbit-btn').removeAttr('disabled')
        return true
      } else {
        $('.submit-btn').add('disabled', 'disabled')
        return false
      }
    })


    const sumbitReview = async() => {
      if ( storeName.value && storeAddress.value && star.value ){
        // Array => [1,4,6] 선택한 인자만 넘어감
        const buttonType = []
        for (let idx = 0; idx < 6; idx++) {
          if (storeButton.value[idx]) {
            buttonType.push(String(idx+1))
          }
        }

        let data = {
          // 값을 생성하는지 아닌지 여부를 확인하기위해서
          isStore: isStore.value,
          store_pk: store_pk.value,
          name: storeName.value,
          region: storeAddress.value,
          star: Number(star.value),
          oneline_review: oneReview.value,
          type: buttonType
        }

        // 이미지 전달
        if (store_picture.value) {
          const form = new FormData()

          form.append('image', store_picture.value)
          form.append('name', storeName.value)
          form.append('region', storeAddress.value)
          
          data = {
            ...data,
            form: form,
          }

        } else {
          const form = new FormData()

          form.append('name', storeName.value)
          form.append('region', storeAddress.value)
          
          data = {
            ...data,
            form: form,
          }
        }
        await store.dispatch('review/makeReviews', data)
        router.push({
            name: 'review',
          })
      } else {
        // 에러 발생시 에러 문구 출력
        storeError.value = storeName.value == '' ? true : false
        starError.value = star.value == 0 ? true : false 
      }
    }

    return {
      isModalOpen,
      selectStore,
      storeName,
      storeAddress,
      checkStar,
      star,
      checkBtn,
      oneReview,
      sumbitReview,
      starError,
      storeError,
      previewFile,
      isStore,
      isSubmit,
      fileUpload
    }
  }
}
</script>

<style scoped>

.wrapper {
  position:fixed;
  width:100%;
  height: 100%;
  overflow:hidden;
}

#myform {
  margin: 0;
  display: flex;
  justify-content: center;
  background-color: #498D6D;
  width: 200px;
  height: 50px;
  border-radius: 30px;
}
#myform fieldset{
    display: inline-block;
    direction: rtl;
    border:0;
}
#myform fieldset legend{
    text-align: right;
}
#myform fieldset label{
    cursor: pointer;
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: white
}

#myform input[type=radio]{
    display: none;
}

input[type=checkbox]{
  display: none;
}
.error {
  color: red;
}

.submit-btn {
  background: #498D6D;
  border-radius: 20px;
  border: 0;
  width: 60px;
  height: 35px;
}

.img-test {
  border: 0;
  border-radius: 50%;
  background-color: black;
}

.isSubmit {
  opacity: 1;
}

.isNotSubmit {
  opacity: 0.5;
}

.store-info {
  margin: 20px 0;
  padding: 0 4px;
  display: grid;
}

.isStoreInfo {
  grid-template-columns: 20% 65% 15%;
}

.isNotStoreInfo {
  grid-template-columns: 85% 15%;
}

.store-info  p {
  height: 30px;
  margin-bottom: 4px;
}

.store-info > button {
  background-color: #EEC95C;
  color: #498D6D;
  border: 0;
  border-radius: 20px;
  font-weight: bold;
  width: 80%;
  height: 60px;
}

.store-picture {
  border-radius: 20px;
}

.button-info {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

#buttonReview {
  display: grid;
  width: 60%;
  background-color: #F8F9FE;
  grid-template-columns: repeat(2, 50%);
  row-gap: 5px;
  column-gap: 5px;
  padding: 20px;
  border-radius: 20px;
}

#buttonReview label {
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
}

.selected {
  background-color:#498D6D;
  color: white;
}

.oneReview {
  margin-top: 25px;
  width: 90%
}

.oneReview textarea {
  border-radius: 20px;
  width:100%;
  height: 100px;
  padding: 20px;
}


#myform label:hover{
    color:rgba(250, 208, 0, 0.99);
}
#myform label:hover ~ label{
    color:rgba(250, 208, 0, 0.99);
}
#myform input[type=radio]:checked ~ label{
    color:rgba(250, 208, 0, 0.99);
}
</style>