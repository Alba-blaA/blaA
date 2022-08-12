<template>
  <hr />
  {{ myCrews.crews }}
  <!-- <table>
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
      <template v-if="myCrewCnt == null">
        <p>가입된 크루가 없습니다.</p>
      </template>
      <template v-else>
        <tr v-for="(crew, i) in myCrews" :key="i" v-bind="crew">
          <td>{{ crew.crew_pk }}</td>
          <td>{{ crew.is_business }}</td>
          <td>{{ crew.crew_name }}</td>
          <td>{{ crew.crew_explain }}</td>
          <td>{{ crew.crew_leader }}</td>
        </tr>
      </template>
    </tbody>
  </table> -->
</template>

<script>
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";
export default {
  setup() {
    const store = useStore();
    const myCrews = reactive({
      crews: [],
    });
    // console.log(store.state.account.userInfo.user_pk);
    const myCrewCnt = ref(null);

    onMounted(() => {
      store.dispatch("profile/getMyCrew", store.state.account.userInfo.user_pk);
      myCrews.crews = store.state.profile.myCrew.results;
      // myCrewCnt.value = myCrews.crews.keys("crews").length;
      // console.log(myCrews.crews);
      // console.log(myCrews.crews[0].crews.length);
    });

    // console.log(myCrews.crews);
    const useEffect = () => {
      if (myCrews.crews && myCrews.crews.data.count != 0) {
        // console.log(myCrews.crews[0].crews.length);
      }
    };

    return {
      myCrews,
      myCrewCnt,
    };
  },
};
</script>

<style></style>
