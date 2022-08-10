<template>
  <div>
    
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import axios from "axios";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();

    const token = sessionStorage.getItem("token");

    axios.get(api.profile.myCrew(route.params.user_pk), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {

    }
  }
}
</script>

<style>

</style>