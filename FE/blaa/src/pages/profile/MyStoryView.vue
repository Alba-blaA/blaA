<template>
  <div>
    <h3>내 스토리</h3>

    <div :key="s" v-for="(s, story) in mystory">
      <hr />
      <h5>
        <b>{{ story.created_at }}</b>
      </h5>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const token = sessionStorage.getItem("token");

    const mystory = [
      {
        story_pk: null,
        user_pk: null,
        story_picture: null,
        story_title: null,
        created_at: null,
      },
    ];

    axios
      .get(api.story.myStory(route.params.user_pk), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        const myStoryArray = response.data;

        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].story_pk);
          mystory[i].story_pk = response.data[i].story_pk;
          console.log("user pk : ", response.data[i].user_pk);
          mystory[i].user_pk = response.data[i].user_pk;
          mystory[i].story_picture = response.data[i].story_picture;
          mystory[i].story_title = response.data[i].story_title;
          const date = new Date(response.data[0].created_at);
          mystory[i].created_at =
            date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
          console.log(mystory[i]);
        }
        console.log("배열 : ", mystory);
      })
      .catch((err) => {
        console.log(err);
      });

    return {};
  },
};
</script>

<style></style>
