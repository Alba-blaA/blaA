<template>
  
<div class="search">
     <input v-model="searchText" type="text" placeholder="닉네임 검색" />
</div>  
<div v-for="user in filteredUsers" :key="user.user_pk">
    <!-- <img :src= "user.image" alt="#"> -->
    <div>{{user.nickname}}</div>
    <button>초대하기</button>
    <button @click="gochat(user.user_pk)">채팅하기</button>
</div>
</template>

<script>
import axios from "axios";
import api from "@/api/api.js";
import { useStore } from "vuex";
import { onMounted, reactive , ref, computed } from "vue";
import router from '@/router';


export default {
    setup () {
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
            return state.users.filter( user => {
            return user.nickname.includes(searchText.value);
            });
        }
        return state.users;
        });


        const store = useStore();
        const state = reactive({      
            users: [],    
        })
        onMounted(() => {
            let token = store.state.chat.token
            axios.get(api.accounts.searchallusers(),
             {
              headers : {"Authorization": `Bearer ${token}`}
            }).then((response) =>
            store.state.chat.allusers = response.data.results
            )
            state.users = store.state.chat.allusers
            console.log(state.users);

        })


        return {
            state,
            searchText,
            gochat,
            filteredUsers
        }

        }
        
    }

</script>

<style>

</style>