<template>
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
      <!-- <template v-if="myCrewCnt == null">
        <p>가입된 크루가 없습니다.</p>
      </template> -->
      <template>
        <tr v-for="(crew, i) in myCrews" :key="i">
          <td>{{ crew.crew_pk }}</td>
          <td>{{ crew.is_business }}</td>
          <td>{{ crew.crew_name }}</td>
          <td>{{ crew.crew_explain }}</td>
          <td>{{ crew.crew_leader }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const myCrews = ref([]);
    const myCrewCnt = ref(null);
    const user_pk = store.state.account.userInfo.user_pk;

    onMounted(() => {
      store.dispatch("crew/getMyCrews", user_pk);
      console.log(myCrews.value);
    });

    myCrews.value = store.state.crew.myCrews[0].crews;
    console.log(myCrews.value);
    // const useEffect = () => {
    //   if (myCrews.value.crews && myCrews.value.crews.data.count != 0) {
    //     // console.log(myCrews.crews[0].crews.length);
    //   }
    // };

    return {
      myCrews,
      myCrewCnt,
    };
  },
};
</script>

<style></style>
