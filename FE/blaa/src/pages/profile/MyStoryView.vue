<template>
  <h3>내 스토리</h3>

  <div v-for="myStory in myStoryList" :key="myStory.story_pk">
    <hr />
    <h5>
      <b>{{ myStory.created_at }}</b>
    </h5>
    <img
      id="imgStory"
      :src="HOST + myStory.story_picture"
      @click="storyDetail(myStory.story_pk)"
    />
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "@/api/axios.js";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const HOST = "http://localhost:8000";

    const myStoryList = store.state.profile.myStory;
    console.log("myStory : ", myStoryList);

    const storyDetail = (story_pk) => {
      router.push({
        name: "detailStory",
        params: {
          story_pk: story_pk,
        },
      });
    };

    return {
      HOST,
      myStoryList,
      storyDetail,
    };
  },
};
</script>

<style>
#imgStory {
  width: 100px;
  height: 80px;
}
</style>
