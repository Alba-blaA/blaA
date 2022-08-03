<template>
  <div>내 크루</div>
  <div v-if="mycrews.length == 0">
    <p>가입된 크루가 없습니다.</p>
  </div>
  <div v-else>
    <table v-for="(mycrew, i) in mycrews" :key="i" v-bind="mycrew">
      <tr>
        <th>{{ mycrew.crew_pk }}</th>
        <td>{{ mycrew.is_business }}</td>
        <td>{{ mycrew.crew_name }}</td>
        <td>{{ mycrew.crew_explain }}</td>
        <td>{{ mycrew.crew_leader }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
const url =
  "https://63136029-bc5c-4b91-b1d9-202db7d1ad44.mock.pstmn.io/mycrewlist";
export default {
  data() {
    return {
      mycrews: [],
    };
  },
  created() {
    axios.get(url).then((response) => {
      console.log(response.data[0].mycrewlist);
      this.mycrews = response.data[0].mycrewlist;
    });
  },
  props: {
    user_pk: Number,
  },
};
</script>

<style></style>
