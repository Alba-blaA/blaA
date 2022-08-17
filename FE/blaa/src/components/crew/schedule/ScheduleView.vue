<template>
  <div>스케줄 보여주는 컴포넌트 입니다.</div>

  <div class="calendarbox" >
    <DatePicker :attributes='state.schedules' v-model ="date" is-expanded />   
  </div>
  <div>
    <hr>     
   <span @click="moveToRegisterSchedule" class="material-symbols-outlined d-flex justify-content-center">add_circle</span>
   <p>{{ date }}</p>   
   
  
  </div>
     
</template>

<script >
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted } from 'vue'
import axios from "@/api/axios.js"
import api from "@/api/api.js";
import popover from "bootstrap/js/dist/popover";


export default {
  setup() {    
    const router = useRouter();
    const route = useRoute()
    const date = ref(new Date())
    const crew_pk = route.params.crew_pk
    const moveToRegisterSchedule = () => {
      router.push({ name: "scheduleregister" });
    };
    const state = reactive({
      schedules : []
    })

    onMounted( async () => {
      let schedules = [];
      await axios.get(api.crew.registercrewschedule(crew_pk)).then((response)=> {
        response.data.forEach(element => {
          console.log(element);         
          schedules.push({
            dot : element.color,
            dates : element.crew_day, 
            popover : {
              label : element.name+ ":"+ element.crew_starthour + "~" + element.crew_endhour
            }   

          })
          state.schedules = schedules
        });
      })
    })

    const logcon = (() => {
      console.log("hello");
    })

    return {
     moveToRegisterSchedule,
     date,
     crew_pk,
     state,
     logcon
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