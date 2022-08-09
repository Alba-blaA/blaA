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
        <th>가입하기</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(crew, i) in AllCrews.results" :key="i" v-bind="crew">
        <td>{{ crew.crew_pk }}</td>
        <td>
          <router-link :to="{ name: 'crewboard', params: { crew_pk: crew.crew_pk } }">{{ crew.crew_name }}</router-link>
          <!-- <span @click="moveToCrew">{{ crew.crew_name }}</span> -->
        </td>
        <td>{{ crew.crew_explain }}</td>
        <td>{{ crew.is_business }}</td>
        <td>{{ crew.crew_leader }}</td>
        <button @click="crewJoin">가입하기</button>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();
    const AllCrews = ref([]);

    const start = async () => {
      await store.dispatch("crew/allcrewlist");
      AllCrews.value = store.state.crew.AllCrews;
    };
    // console.log(JSON.parse(sessionStorage.getItem("login-userInfo")));
    // console.log(store.state.account.userInfo);

    const crewJoin = () => {
      const userInfo = sessionStorage.getItem("login-userInfo");
    };

    start();

    return {
      AllCrews,
    };
  },
};
</script>

<style></style>
