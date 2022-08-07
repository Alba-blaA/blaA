<template>
  <hr />
  <table>
    <thead>
      <tr>
        <th>순번</th>
        <th>크루명</th>
        <!-- <th>크루설명</th> -->
        <th>업무용/친목욕</th>
        <th>크루장</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(crew, i) in allcrew" :key="i" v-bind="crew">
        <td>{{ crew.crew_pk }}</td>
        <td><router-link :to="{ name: 'crewboard', params: { crew_pk: crew.crew_pk } }">{{ crew.crew_name }}</router-link></td>
        <!-- <td>{{ crew.crew_explain }}</td> -->
        <td>{{ crew.is_business }}</td>
        <td>{{ crew.crew_leader }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
const url = "http://127.0.0.1:8000/api/v1/";
export default {
  data() {
    return {
      allcrew: [],
    };
  },
  created() {
    axios.get(url+"crews/", {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjY0ODQ4OTgxfQ.JBHgq3KkxPNASpcEfekXs8DVHPBftcTHgj91GZOrKtg`
        },
      }).then((response) => {
      console.log(response.data.results);
      this.allcrew = response.data.results;
    });
  },
  methods: {
  }
};

</script>

<style>
</style>
