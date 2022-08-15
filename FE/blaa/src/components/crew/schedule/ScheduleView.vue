<template>
  <div>스케줄 보여주는 컴포넌트 입니다.</div>
  <div> {{ crew_pk }}</div>
  <div class="calendarbox" >
    <DatePicker v-model ="date" is-expanded />   
  </div>
  <div> 
    <p>{{ date }}</p> 
  
   <button @click="moveToRegisterSchedule">스케줄 추가하기</button>
   
  
  </div>
     
</template>

<script >
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from 'vue'


export default {
  setup() {    
    const router = useRouter();
    const date = ref(new Date())

    const moveToRegisterSchedule = () => {
      router.push({ name: "scheduleregister" });
    };
    return {
     moveToRegisterSchedule,
     date
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