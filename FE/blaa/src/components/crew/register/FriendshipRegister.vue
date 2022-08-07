<template>
  <div>
    <p>friendship crew 등록</p>
    <div>
      <label for="crew_name">크루명</label><br />
      <input type="text" id="crew_name" name="crew_name" v-model="crew_name" ref="crew_name" /><br />
      <label for="crew_explain">크루 설명</label><br />
      <textarea id="crew_explain" name="crew_explain" v-model="crew_explain" ref="crew_explain" cols="35" rows="5"></textarea><br />
      <label for="crew_region">크루 지역</label><br />
      <input type="text" id="crew_region" name="crew_region" v-model="crew_region" ref="crew_region" /><br />
      <input type="radio" id="is_business" value="true" v-model="is_business">
      <label for="is_business">영업용</label>
      <input type="radio" id="is_not_business" value="false" v-model="is_business">
      <label for="is_not_business">친목용</label>
      <span>{{is_business}}</span>
      <button @click="checkValue">등록</button>
      <button @click="moveList">목록</button>
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
      crew_name: '',
			crew_explain: '',
			crew_region: '',
      is_business: '',
		}
	},
	methods: {
		onInputImage() {
			this.crew_img = this.$refs.crew_img.files;
			console.log(this.crew_img);
    },
    checkValue() {
      let error = true;
      let msg = "";
      console.log("크루명: " + this.crew_name);
      console.log(this.is_business);
      !this.crew_name && ((msg = "크루명을 입력하세요."), (error = false), this.$refs.crew_name.focus());
      error && !this.crew_explain && ((msg = "크루 설명을 입력하세요."), (error = false), this.$refs.crew_explain.focus());

      if (!error) alert(msg);
      else this.registCrew();
    },
    registCrew() {
      
      axios.post(url + "crews/", {
        crew_name: this.crew_name,
        crew_explain: this.crew_explain,
        crew_region: this.crew_region,
        is_business: this.is_business,
      }, {
        headers: {
          Authorization: auth,
        }
      }).then(({ data }) => {
        console.log(data);
        let msg = "등록이 완료되었습니다.";
        alert(msg);
        this.moveList();
      }).catch((error) =>
        console.log(error));
    },
    moveCrewBoard() {
      this.$router.push({ name: 'article' });
    },
    moveList() {
      this.$router.push({ name: 'crewlist' });
    }
	}
};
</script>

<style></style>
