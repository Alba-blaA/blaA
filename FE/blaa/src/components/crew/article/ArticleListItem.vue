<template>
  <div class="article" @click="moveToArticle(crew_article_pk)">
    <h4>{{ crew_title }}</h4>
    {{ user }}
    {{ created_at }}
    {{ crew_content }}
  </div>
  <hr />

  <!-- <router-link :to="'/crew/article/detail/'+crew_article_pk">{{ crew_title }}</router-link> --->
  <!-- <router-link :to="{ name: 'articledetail', params: { crew_article_pk: crew_article_pk } }">{{ crew_title }}</router-link> -->
  <!-- {{ crew_title }} -->
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    crew_article_pk: Number,
    crew: Number,
    crew_title: String,
    user: Number,
    created_at: String,
    crew_content: String,
    crew_private: Boolean,
    crew_pin: Boolean,
    isMember: Boolean,
  },
  setup() {
    const router = useRouter();
    const moveToArticle = (crew_article_pk) => {
      router.push({ name: "articledetail", params: { crew_article_pk: crew_article_pk } });
    };
    return {
      moveToArticle,
    };
  },
};
</script>

<style scoped>
.article {
  width: 100%;
  background-color: lightblue;
}
</style>
