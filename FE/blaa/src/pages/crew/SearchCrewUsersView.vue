<template> 
    <div v-if="userInfo">
        <div>여기는 유저검색페이지입니다!</div>
        <div class="search">
            <input v-model="searchText" type="text" placeholder="닉네임 검색" />
        </div>  
        <div v-for="user in filteredUsers" :key="user.user_pk">        
            <br>           
            <b-card>
                <div>
                    <img class= "notiimg" src= "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427__480.jpg" alt="">
                    <div class="chodaeorchatname">
                        <b>
                            {{user.nickname}} 
                        </b>
                    </div>    
        
                        
                   

                </div>
                <div class="d-flex justify-content-end align-items-center chodaeorchatbutton">
                    <button class="w-btn w-btn-yellow" @click="inviteuser(crew_pk, user.user_pk)">초대하기</button>                     
                    <button class="w-btn w-btn-green" @click="gochat(user.user_pk)">채팅하기</button>                                       

                </div>           
            </b-card>
          
                
              
                        
                              
           
        </div>
    </div>
    <div v-else>로그인이 필요합니다.</div>
</template>
<script>
import axios from "@/api/axios.js";
import api from "@/api/api.js";
import { useStore } from "vuex";
import { onMounted, reactive , ref, computed } from "vue";
import router from '@/router';
import { useRoute } from 'vue-router'


export default {
    setup () {
        const store = useStore();
        const route = useRoute();
        const userInfo = store.state.account.userInfo;
        const crew_pk = route.params.crew_pk
        const state = reactive({      
            users: [],    
        })
        const gochat = (from_userpk) => {
        router.push({ name: 'chat',
        params: {
            from_userpk: from_userpk
        }}
        )
        }
        const searchText = ref('');

        const filteredUsers = computed(() => {
        if (searchText.value) {
            return state.users.filter(user => {
            return user.nickname.includes(searchText.value);
            });
        }
        return state.users.filter(user => {
            return user.nickname.includes("!@#$%")
        });
        });        

        onMounted(() => {
            if(userInfo){              
               
                axios.get(api.accounts.searchallusers(),
                 ).then((response) =>{  
                                   
                     state.users = response.data.results                          

                 }                        
                )               
            }
        })
        
        const inviteuser = async (invitingcrew_pk, inviteduser_pk) => {
                   
            try {
                const result = await axios.post(api.crew.inviteuser(invitingcrew_pk, inviteduser_pk),{})
                alert(result.data.message);
            } catch(error) {                
                alert(error.response.data.message)
            }
            }    


        return {
            state,
            searchText,
            gochat,
            filteredUsers,
            userInfo,
            crew_pk,
            inviteuser,
        }

        }
        
    }

</script>


<style>
.w-btn {
    position: relative;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
}
.w-btn-green {
    background-color: #498D6D;
    color: #d7fff1;
}

.w-btn-yellow {
    background-color: #EEC95C;
    color: #6e6e6e;
}
.notiimg{
  width: 70px;
  height : 70px;
  border-radius: 50px;

}
.chodaeorchatbutton{
    width :  340px;
    height : 20px;
    margin-bottom: 10px;
}
.chodaeorchatname {
    margin-left: 10px;
}

</style>