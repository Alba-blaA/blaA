<template>
  <div>전체 크루</div>
  <table v-for="(crew, i) in allcrew" :key="i" v-bind="crew">
    <tr>
      <th>{{ crew.crew_pk }}</th>
      <td>{{ crew.is_business }}</td>
      <td>{{ crew.crew_name }}</td>
      <td>{{ crew.crew_explain }}</td>
      <td>{{ crew.crew_leader }}</td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
const url =
  "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/allcrewlist";
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

<style></style>
