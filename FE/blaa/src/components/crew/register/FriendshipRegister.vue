<template>
  <div>
    <p>friendship crew 등록</p>
    <div>
      <label for="crew_name">크루명</label><br/>
      <input
        type="text"
        id="crew_name"
        name="crew_name"
        v-model="crew_name"
        ref="crew_name"
      /><br />
      <label for="crew_explain">내용</label><br />
      <textarea
        id="crew_explain"
        name="crew_explain"
        v-model="crew_explain"
        ref="crew_explain"
        cols="35"
        rows="5"
      ></textarea
      ><br />
      <label for="crew_img">크루 이미지</label><br />
      <input multiple @change="onInputImage()" ref="crew_img" type="file" />
      <button @click="checkValue">등록</button>
      <button @click="moveList">목록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/crewregist";
export default {
	data() {
		return {
			crew_name: '',
			crew_explain: '',
			crew_img: '',
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
      !this.crew_name && ((msg = "크루명을 입력하세요."), (error = false), this.$refs.crew_name.focus());
      error && !this.crew_explain && ((msg = "크루 설명을 입력하세요."), (error = false), this.$refs.crew_explain.focus());

      if (!error) alert(msg);
      else this.registCrew();
    },
    registCrew() {
      axios.post(url, {
        crew_name: this.crew_name,
        crew_explain: this.crew_explain,
        crew_img: this.crew_img,
      }).then(({ data }) => {
        console.log(data);
        let msg = "등록 처리 시 문제가 발생했습니다.";
        if (data.message == "success") {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.moveCrewBoard();
      });
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

<style>

</style>