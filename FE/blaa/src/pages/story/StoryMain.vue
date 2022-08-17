<template>
<!-- <div v-if="state.notifications">
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
          <b-card >       
            <b-card-text  @click="clicknotification(notification), isModalOpen = false, deleteclicknotification(notification.pk)"> 
              <div >
                {{ notification.content }}
              </div>             
            </b-card-text>
            <b-card-text>
              <div v-if="notification.type == 'crew_invite'">
                <button @click="acceptinvitation(notification.redirect_pk), deleteclicknotification(notification.pk)">수락하기</button>
                <button @click="refuseinvitation(notification.redirect_pk), deleteclicknotification(notification.pk)">거절하기</button>
              </div>    

            </b-card-text>
          </b-card>
      </div>
      <button @click="isModalOpen = false" class="close-btn">close</button>
    </div>

  </div> -->
  <div class="notification">
    <div v-if="state.isUnread">   
      <span @click="gotonotification" class="material-symbols-outlined">
        notification_important
        </span>
    </div >
    <div v-else>
      <div v-if="state.notifications.length != 0 ">
        <span @click="gotonotification" class="material-symbols-outlined">
          notifications_active
          </span>
      </div>
      <div v-else>
        <span  @click="gotonotification" class="material-symbols-outlined">
          notifications
          </span>
      </div>    
    </div> 

  </div>
  <router-view></router-view>

</template>

<script>
import { onMounted, reactive , ref } from 'vue'
import { useStore } from 'vuex'
import axios from "@/api/axios.js";
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
                    axios.get(api.notification.getnotifications()).then((response) => {
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
      axios.delete(api.notification.deletenotification(notification_pk))
    }

    const acceptinvitation =  ((crew_pk) => {
          console.log("들어간크루pk", crew_pk);
          try {
              axios.post(api.crew.acceptcrew(crew_pk),{})                  
                  alert("가입이 완료되었습니다! 크루원님의 활발한 활동을 응원합니다")                  
              
          } catch(error) {
              alert("가입에 실패하셨습니다.")
              
          }
      refreshAll()
      })

    
    const refreshAll= (() => {
            // 새로고침
            router.push({
                path: '/crew/list/alllist'
            })
        })

    const refuseinvitation = ( async(crew_pk) => {            
            try {
                await axios.post(api.crew.refusecrew(crew_pk),{}).then(
                    axios.get(api.notification.getinvitedcrewlist()).then((response) =>                        
                    state.crews = response.data          
                )                    
                )
                    
            } catch(error){
                alert("가입거절에 성공하셨습니다.")
            }
        })

    const gotonotification = () => {
      router.push({ name : 'notifications'})
    }
    
    
    return {
      isModalOpen,
      modal,
      onClickOutside,
      state,
      clicknotification,
      deleteclicknotification,
      acceptinvitation,
      refuseinvitation,
      gotonotification,      
    }
    
  }

}
</script>

<style>
</style>