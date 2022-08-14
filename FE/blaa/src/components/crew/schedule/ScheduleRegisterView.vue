<template>
  <div>스케줄 작성 컴포넌트 입니다.</div>
  <div> {{ crew_pk }}</div>
    
    <div class="calendarbox">
      <DatePicker v-model="range" mode = "dateTime" is-range  is-expanded>
        <template v-slot = "{ inputValue, inputEvents }">
          <div class="group">
            <label class="button groupItem" for="start">Start</label>
            <input type="text" id="start" :value="inputValue.start" v-on="inputEvents.start" class="input">
            <hr>
            <label class="button groupItem" for="end">End</label>
            <input type="text" id="end" :value="inputValue.end" readonly class="input">  
          </div>
          <button @click.prevent="showtime(inputValue.start, inputValue.end)">등록하기</button>  
        </template>
      </DatePicker>   
        
    </div>

  <br>
  <hr>
  <form style="m">  
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
      <textarea v-model = "info.content" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="간단 메모"></textarea>
    </div>
   
  </form>
   <button @click="moveToSchedule">뒤로가기</button>
 
     
</template>

<script>

import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { useStore } from "vuex";
import axios from "@/api/axios.js"


export default {
   
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter();
    const input = ref("")
    const crew_pk = route.params.crew_pk
    const date = ref(new Date())
    const userInfo = store.state.account.userInfo;
    date.value.setDate(Number(date.value.getDate()))

    const range = reactive({
      start : new Date(),
      end : date.value,     

    })

    const info = reactive({
      color : "",
      crew_pk : crew_pk,
      user_pk : userInfo.user_pk,
      content : "",
    })
    const showtime =  ((a,b) => {
      console.log("start : "+ a.slice(0,4) + a.slice(5));
      console.log("end : "+ b);
      // await axios.post(api.crew.registercrewschedule(range.crew_pk), {
      //   crew_day : range.day,
      //   color : range.color,
      //   crew_starthour : range.starthour,
      //   crew_endhour : range.endhour,
      // }).then((response) => {

      // })
    })
    const putcolor = ((event) => {
      info.color = event.target.value
    })

    const moveToSchedule = (() => {
      router.push({ name: "schedule" });   
    })
    
    // const showresult = (() => {
    //   console.log(state.date);
    // })

    return {
      crew_pk,
      range,
      showtime,
      putcolor,
      input,
      moveToSchedule,
      info,
      date
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