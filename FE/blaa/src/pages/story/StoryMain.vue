<template>
<div v-if="state.notifications">
  <div v-if="state.isUnread">
    <button @click="isModalOpen = true">안읽은 알림있음</button>
  </div >
  <div v-else>
    <button @click="isModalOpen = true">안읽은 알림 없음</button>
  </div>  
</div>
  <div class="black-bg" v-if="isModalOpen">
    <div class="white-bg" ref="modal">
      <h4>알림창임</h4>
      <div v-for="(notification, i) in state.notifications" :key="i">        
          <b-card  @click="clicknotification(notification), isModalOpen = false, deleteclicknotification(notification.pk)" >       
            <b-card-text> 
              <div >
                {{ notification.content }}
              </div>       
             
            </b-card-text>
          </b-card>
      </div>
      <button @click="isModalOpen = false" class="close-btn">close</button>
    </div>

  </div>


  <router-view></router-view>

</template>

<script>
import { onMounted, reactive , ref } from 'vue'
import { useStore } from 'vuex'
import axios from "axios";
import api from "@/api/api.js";
import router from '@/router';
import { onClickOutside } from '@vueuse/core'
export default { 
  
  setup () {
    let isModalOpen = ref(false)
    const modal = ref(null)   
    const store = useStore()
    
    const userInfo = store.state.account.userInfo;
    const state = reactive({      
            notifications: [],
            isUnread : "",    
        })
    onClickOutside(modal, () => (isModalOpen.value = false))    

    onMounted(() => {
          if(userInfo){                
              const token = store.state.story.Token
                    axios.get(api.notification.getnotifications(),{
                    headers : {
                      "Authorization": `Bearer ${token}`
                    }}).then((response) => {
                      state.notifications = response.data.results
                      for (let index = 0; index < state.notifications.length; index++) {
                        const element = state.notifications[index];
                        if (element.view == false) {
                          state.isUnread = true
                          break
                        }
                       
                      }
                    }                       
                                     
              )  
                       
          }
      })

    const clicknotification = ((notification) => {
      if (notification.type == "crew_invite") {
        router.push({name : 'invitedcrewlist'})        
      } else if (notification.type == "follow") {
        router.push({ name : 'userProfile', 
          params : {
            user_pk : notification.redirect_pk
          }
        })
      } else if (notification.type == "story") {
        router.push({name : 'detailStory', 
          params: {
            story_pk: notification.redirect_pk,
        }
        })        
      } else if (notification.type == "crew"){
        console.log("accpet_crew");
        router.push({name : 'crewboard',
          params : {
            crew_pk: notification.redirect_pk
          }
        })
      }

    })

    const deleteclicknotification = (notification_pk) => {
      const token = store.state.story.Token
      axios.delete(api.notification.deletenotification(notification_pk),{
                    headers : {
                      "Authorization": `Bearer ${token}`
                    }})
    }

    const makeviewtrue = () => {

    }
    
    
    return {
      isModalOpen,
      modal,
      onClickOutside,
      state,
      clicknotification,
      deleteclicknotification,
      makeviewtrue
      
    }
    
  }

}
</script>

<style>
body {
  margin: 0
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding:20px;

}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}


</style>