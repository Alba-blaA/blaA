<template>
  <br />
  <h3><b>크루</b></h3>
  <hr />

  <table
    v-for="crew in crews"
    :key="crew.crew_pk"
    style="width: 100%"
    @click.prevent="crewDetail(crew.crew_pk)"
  >
    <tr>
      <td width="10px"></td>
      <td id="crew">
        <img id="imgCrew" :src="crew.crew_img" />
      </td>
      <td width="20px"></td>
      <td>
        <b>{{ crew.crew_name }}</b>
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
import { ref } from "vue";
import axios from "axios";
import api from "@/api/api.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const crewList = store.state.profile.crewList.results;
    const user_pk = ref(-1);
    for (var i = 0; i < crewList.length; i++) {
      if (crewList[i].user_pk == route.params.user_pk) {
        user_pk.value = i;
        console.log("i : ", user_pk.value);
      }
    }

    const crews = store.state.profile.crewList.results[user_pk.value].crews;

    const crewDetail = (crew_pk) => {
      router.push({
        name: "crewboard",
        params: {
          crew_pk: crew_pk,
        },
      });
    };

    return {
      crewList,
      crews,
      crewDetail,
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
