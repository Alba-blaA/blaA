<template>
  <div>
    <p>business crew 등록</p>
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
		}
	}
};
</script>

<style></style>
