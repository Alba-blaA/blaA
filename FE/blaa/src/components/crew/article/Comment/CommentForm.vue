<template>
  <input type="text" v-model="comment" placeholder="댓글을 입력해주세요" />
  <button @click="CommentCreate">등록</button>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const comment = ref("");
    const store = useStore();
    const route = useRoute();

    const CommentCreate = () => {
      store.dispatch("crew/createComment", {
        comment_content: comment.value,
        crew_article_pk: route.params.crew_article_pk,
      });
    };

    return {
      CommentCreate,
      comment,
    };
  },
};
</script>

<style></style>
