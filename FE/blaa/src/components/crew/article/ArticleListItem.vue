<template>
  <div class="article" @click="moveToArticle(crew_article_pk)">
    <!-- <h4>{{ crew_title }}</h4> -->
    {{ user }}
    {{ created_at }}
    <div v-if="images.length > 0" style="text-align: center">
      <img :src="host + images[0].article_picture" width="200" />
    </div>
    {{ crew_content }}
  </div>
  <hr />

  <!-- <router-link :to="'/crew/article/detail/'+crew_article_pk">{{ crew_title }}</router-link> --->
  <!-- <router-link :to="{ name: 'articledetail', params: { crew_article_pk: crew_article_pk } }">{{ crew_title }}</router-link> -->
  <!-- {{ crew_title }} -->
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  props: {
    crew_article_pk: Number,
    crew: Number,
    crew_title: String,
    user: Number,
    created_at: String,
    crew_content: String,
    images: Array,
    crew_private: Boolean,
    crew_pin: Boolean,
    isMember: Boolean,
  },
  setup(props) {
    const router = useRouter();
    const host = ref("https://i7b209.p.ssafy.io");
    const create_date = ref("");
    const moveToArticle = (crew_article_pk) => {
      router.push({ name: "articledetail", params: { crew_article_pk: crew_article_pk } });
    };

    return {
      moveToArticle,
      host,
    };
  },
};
</script>

<style scoped>
.article {
  width: 100%;
  padding: 30px;
  background-color: white;
}
</style>
