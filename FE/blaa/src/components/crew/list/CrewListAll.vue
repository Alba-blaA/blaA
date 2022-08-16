<template>
  <hr />
  <!-- <div>
    <button @click="business = true">업무용</button>
    <button @click="business = false">친목용</button>
    {{ business }}
  </div> -->

  <div class="container">
    <div class="card" v-for="(crew, i) in AllCrews.crews" :key="i" v-bind="crew" @click="moveToDetail(crew.crew_pk)">
      <div class="col-4" style="text-align: center">
        <img id="profile" :src="host + crew.crew_img" />
      </div>
      <div class="col-8">
        <div class="row">
          <h5>{{ crew.crew_name }}</h5>
          <div>{{ crew.crew_member_count }} 명 참여중</div>
        </div>
      </div>
    </div>
  </div>
  <!-- <table>
    <thead>
      <tr>
        <th>순번</th>
        <th>크루명</th>
        <th>크루설명</th>
        <th>업무용/친목용</th>
        <th>크루장</th>
        <th>가입하기</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(crew, i) in AllCrews.crews" :key="i" v-bind="crew">
        <td>{{ crew.crew_pk }}</td>
        <td>
          <router-link :to="{ name: 'crewboard', params: { crew_pk: crew.crew_pk } }">{{ crew.crew_name }}</router-link>
        </td>
        <td>{{ crew.crew_explain }}</td>
        <td>{{ crew.is_business }}</td>
        <td>{{ crew.crew_leader }}</td>
      </tr>
    </tbody>
  </table> -->
</template>

<script>
import { useStore } from "vuex";
import { onMounted, computed, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let AllCrews = reactive({
      crews: [],
    });
    const crewMember = ref([]);
    const user_pk = store.state.account.userInfo.user_pk;
    let business = ref(true);
    let isMember = ref(false);
    const host = "https://i7b209.p.ssafy.io/";

    onMounted(async () => {
      await store.dispatch("crew/allcrewlist");
      AllCrews.crews = store.state.crew.AllCrews.results;
    });

    const moveToDetail = async (crew_pk) => {
      await store.dispatch("crew/getCrewMembers", crew_pk);

      Object.assign(crewMember.value, store.state.crew.members);
      if (crewMember.value.length > 0) {
        for (var i = 0; i < crewMember.value.length; i++) {
          if (crewMember.value[i].user_pk == user_pk) {
            isMember.value = true;
            break;
          }
        }
      }
      console.log(isMember.value);
      if (isMember.value) {
        router.push({ name: "crewboardmember", params: { crew_pk: crew_pk } });
      } else if (!isMember.value) {
        router.push({ name: "crewboardnonmember", params: { crew_pk: crew_pk } });
      }
    };

    // const replaceByDefault = (e) => {
    //   e.target.src = "@/assets/crew_default1";
    // };

    // const filtered = computed(() => {
    //   return AllCrews.crews.filter((item) => {
    //     return item.is_business === business.value;
    //   });
    // });

    return {
      AllCrews,
      business,
      moveToDetail,
      // filtered,
      host,
      isMember,
    };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* text-align: center; */
  padding: 0px;

  /* position: absolute; */
  /* width: 320px; */
  /* width: 80%; */
  height: 70px;

  /* Neutral/Light/Light */

  background: #f8f9fe;
  border-radius: 16px;
}

#profile {
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
}
</style>
