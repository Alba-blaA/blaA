<template>
  <div>
    <p>business crew 등록</p>
    <div>
      <label for="crew_name">크루명</label><br />
      <input type="text" id="crew_name" name="crew_name" v-model="crew_name" ref="crew_name" /><br />
      <label for="crew_explain">내용</label><br />
      <textarea id="crew_explain" name="crew_explain" v-model="crew_explain" ref="crew_explain" cols="35" rows="5"></textarea><br />
      <label for="crew_img">크루 이미지</label><br />
      <input multiple @change="onInputImage()" ref="crew_img" type="file" />
      <button @click="checkValue">등록</button>
      <button @click="moveList">목록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://127.0.0.1:8000/api/v1/";
const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0ODQ4OTgxfQ.JBHgq3KkxPNASpcEfekXs8DVHPBftcTHgj91GZOrKtg";
export default {
  data() {
    return {
      crew_name: "",
      crew_explain: "",
      crew_img: "",
    };
  },
  created() {
    axios
      .post(url + "crews/", {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        this.allcrew = response.data.results;
      });
  },
  methods: {
    onInputImage() {
      this.crew_img = this.$refs.crew_img.files;
      console.log(this.crew_img);
    },
    moveList() {
      this.$router.push({ name: "crewlist" });
    },
  },
};
</script>

<style></style>
