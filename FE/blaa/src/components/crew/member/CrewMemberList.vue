<template>
  <div>
    <div>크루 멤버 입니다.</div>
    <table>
      <thead>
        <th>번호</th>
        <th>닉네임</th>
      </thead>
      <!-- {{
        All.members.results[0].user_pk
      }} -->
      <tbody>
        <tr v-for="(member, i) in All.members" :key="i" v-bind="member">
          <td>{{ member.user_pk }}</td>
          <td>{{ member.nickname }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { reactive } from "vue";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const All = reactive({
      members: [],
    });

    const getMembers = async () => {
      await store.dispatch("crew/getCrewMembers", route.params.crew_pk);
      All.members = store.state.crew.members.results;
    };

    getMembers();

    console.log(All);
    return {
      All,
    };
  },
};
</script>

<style></style>
