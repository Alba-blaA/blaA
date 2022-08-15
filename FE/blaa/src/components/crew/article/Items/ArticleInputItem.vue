<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <label for="crew_title">제목</label><br />
    <input type="text" id="crew_title" name="crew_title" v-model="article.crew_title" /><br />
    <label for="crew_content">내용</label><br />
    <textarea id="crew_content" name="crew_content" v-model="article.crew_content" cols="35" rows="5"></textarea><br />
    <input type="radio" id="crew_private" name="crew_private" value="false" v-model="article.crew_private" />공개<br />
    <input type="radio" id="crew_private" name="crew_private" value="true" v-model="article.crew_private" />비공개<br />
    <input type="checkbox" id="crew_pin" name="crew_pin" value="true" v-model="article.crew_pin" />핀 고정 {{ article.crew_pin }}<br />
    <label for="images">이미지 첨부</label>
    <input type="file" id="images" name="images" multiple="multiple" @change="previewFile" /><br />
    <button type="submit">등록</button>
    <button @click="moveList">목록</button>
  </form>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    type: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const article = reactive({
      image_update: false,
      crew_title: "",
      crew_content: "",
      crew_private: false,
      crew_pin: false,
      images: [],
    });

    if (props.type === "modify") {
      Object.assign(article, store.state.crew.article);
    }

    const submitForm = () => {
      let error = true;
      let msg = "";
      console.log("제목: " + article.crew_title);
      !article.crew_title && ((msg = "제목을 입력하세요."), (error = false));
      error && !article.crew_content && ((msg = "내용을 입력하세요."), (error = false));
      error && article.crew_private == "null" && ((msg = "공개 여부를 선택하세요."), (error = false));

      if (!error) alert(msg);
      else processingArticle();
    };

    const previewFile = (e) => {
      if (e.target.files) {
        article.images = e.target.files;
      } else {
        alert("파일을 다시 선택해 주세요");
        article.images = null;
      }
    };

    const processingArticle = async () => {
      const articleData = new FormData();
      console.log("이미지 어케 받는겨", article.images);
      articleData.append("crew_title", article.crew_title);
      articleData.append("crew_content", article.crew_content);
      articleData.append("crew_private", article.crew_private);
      articleData.append("crew_pin", article.crew_pin);
      for (var i = 0; i < article.images.length; i++) {
        // console.log("이미지들", article.images[i]);
        articleData.append("images", article.images[i]);
      }

      if (props.type === "regist") {
        console.log("글 등록");
        await store.dispatch("crew/registArticle", {
          crew_pk: route.params.crew_pk,
          article: articleData,
        });
      } else {
        console.log("글 수정");
        await store.dispatch("crew/modifyArticle", {
          crew_article_pk: route.params.crew_article_pk,
          article: articleData,
        });
      }
    };

    const moveList = () => {
      router.push({ name: "articlelist" });
    };

    const reload = computed(() => {
      return article;
    });

    return {
      article,
      submitForm,
      moveList,
      previewFile,
    };
  },
};
</script>

<style></style>
