<template>
  <hr />
  <table>
    <thead>
      <tr>
        <th>순번</th>
        <th>업무용/친목욕</th>
        <th>크루명</th>
        <th>크루설명</th>
        <th>크루장</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(crew, i) in allcrew" :key="i" v-bind="crew">
        <td>{{ crew.crew_pk }}</td>
        <td>{{ crew.is_business }}</td>
        <td>{{ crew.crew_name }}</td>
        <td>{{ crew.crew_explain }}</td>
        <td>{{ crew.crew_leader }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
const url = "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/allcrewlist";
export default {
  data() {
    return {
      allcrew: [],
    };
  },
  created() {
    axios.get(url).then((response) => {
      console.log(response.data);
      this.allcrew = response.data;
    });
  },
};
</script>

<style>
</style>
