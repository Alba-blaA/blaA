<template>
  <div>
    <div>
      <h3>글 작성하기</h3>
    </div>
    <div>
      <h1>글 등록</h1>
      <div>
        <label for="crew_title">제목</label>
        <input type="text" id="crew_title" name="crew_title" v-model="crew_title" ref="crew_title" /><br />
        <label for="crew_content">내용</label><br />
        <textarea id="crew_content" name="crew_content" v-model="crew_content" ref="crew_content" cols="35" rows="5"></textarea><br />
        <input type="radio" id="crew_private" name="crew_private" value="public" v-model="crew_private" />공개<br />
        <input type="radio" id="crew_private" name="crew_private" value="private" v-model="crew_private" />비공개<br />
        <input type="radio" id="crew_pin" name="crew_pin" value="true" v-model="crew_pin" />핀 고정<br />
        {{ crew_pin }}
        <button @click="checkValue">등록</button>
        <button @click="moveCrew">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://127.0.0.1:8000/api/v1/";
const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0ODQ4OTgxfQ.JBHgq3KkxPNASpcEfekXs8DVHPBftcTHgj91GZOrKtg"

export default {
  data() {
    return {
      crew_title: "",
      crew_content: "",
      crew_private: "",
      crew_pin: "false",
    };
  },
  props: {
    crew_pk: Number,
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registBook 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // isbn, 제목, 저자, 가격, 설명이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      console.log("유저: " + this.userName);
      err && !this.crew_title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.crew_title.focus());
      err && !this.crew_content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.crew_content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registBook 호출
      else this.registArticle();
    },

    registArticle() {
      console.log(this.$route.params.crew_pk);
      axios
        .post(
          url + "crews/article/" + this.$route.params.crew_pk + "/",
          {
            crew_title: this.crew_title,
            crew_content: this.crew_content,
            crew_private: this.crew_private,
            crew_pin: this.crew_pin,
          },
          {
            headers: {
              auth,
            },
          }
        )
        .then(({data}) => {
          console.log(data);
          // 서버에서 정상적인 값이 넘어 왔을경우 실행.
          let msg = "등록이 완료되었습니다.";
          alert(msg);
          this.moveCrew();
        })
        .catch((error) => console.log(error));
    },
    moveCrew() {
      this.$router.push({ name: "articlelist", params: { crew_pk: this.$route.params.crew_pk } });
    },
  },
};
</script>

<style></style>
