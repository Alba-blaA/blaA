<template>
  <div>스케줄 content 입니다.</div>
  <div> {{ crew_pk }}</div>
  <div class="calendarbox">
    <DatePicker v-model="range" mode = "dateTime" is-range is-expanded/>    
  </div>
  <div>
   
  <form @submit.prevent = "showtime" style="m">  
    <div class="form-group">
      <select  name="color" @change="putcolor($event)" class="form-control" id="exampleFormControlSelect1">
        <option value="">근무 선택</option>
        <option value="grey">휴가</option>
        <option value="red">오전 근무</option>
        <option value="blue">오후 근무</option>
        <option value="purple">풀타임</option>
        <option value="teal">대타</option>
      </select>
    </div>
    <div class="form-group">
      <textarea @value = "input" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
   <button @click="showtime">등록하기</button>
  </form>
  </div>
     
</template>

<script>

import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { useStore } from "vuex";



export default {
   
  setup() {
    const store = useStore()
    const route = useRoute()
    const input = ref("")
    const crew_pk = route.params.crew_pk
    const date = ref(new Date())
    const userInfo = store.state.account.userInfo;

    date.value.setDate(Number(date.value.getDate()))
    const range = reactive({
      start : new Date(),
      end: date.value,
      color : "",
      crew_pk : crew_pk,
      user_pk : userInfo.user_pk,
      content : input.value

    })
    const showtime = (() => {
      console.log(range);
    })
    const putcolor = ((event) => {
      range.color = event.target.value
    })
    
    // const showresult = (() => {
    //   console.log(state.date);
    // })

    return {
      crew_pk,
      range,
      showtime,
      putcolor,
      input
      // showresult
    }
  
}
}
</script>

<style>
.calendarbox{
  display : flex;
  justify-content: center;
  margin-left : 20px;
  margin-right: 20px;
}

</style>