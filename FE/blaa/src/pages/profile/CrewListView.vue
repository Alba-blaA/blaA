<template>
  <br />
  <h3><b>크루</b></h3>
  <hr />

  <table
    v-for="crew in crewList.results"
    :key="crew.results.crews.crew_pk"
    style="width: 100%"
  >
    <tr @click="crewDetail(crew.results.crews.crew_pk)">
      <td width="10px"></td>
      <td id="crew">
        <img id="imgCrew" :src="crew.crews.crew_img" />
      </td>
      <td width="20px"></td>
      <td>
        <b>{{ crew.crews.crew_name }}</b>
      </td>
    </tr>
    <tr>
      <td colspan="100%"><hr /></td>
    </tr>
  </table>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const crewDeatil = (crew_pk) => {
      router.push({
        name: "crewdetail",
        params: {
          crew_pk: crew_pk,
        },
      });
    };

    return {
      crewDeatil,
    };
  },
};
</script>

<style>
#crew {
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
}

#imgCrew {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
