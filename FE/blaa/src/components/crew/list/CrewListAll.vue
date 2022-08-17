<template>
  <div class="crew_list" v-for="(crew, i) in AllCrews.crews" :key="i" v-bind="crew" @click="moveToDetail(crew.crew_pk)">
    <div class="col-3" style="text-align: center">
      <img id="profile" :src="host + crew.crew_img" />
    </div>
    <div class="col-8">
      <div class="row">
        <p style="font-size: 16px">{{ crew.crew_name }}</p>
        <div class="row" id="text_line">
          <div class="col">
            <img class="member_icon" src="@/assets/icons/person.png" />
            {{ crew.crew_member_count }}
            &nbsp;&nbsp;| &nbsp; {{ crew.is_business ? "업무용" : "친목용" }}
          </div>
          <!-- <div class="col">|</div>
            <div class="col">
              <div>{{ crew.is_business ? "업무용" : "친목용" }}</div>
            </div> -->
        </div>
      </div>
    </div>
  </div>
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
.crew_list {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;

  height: 80px;

  font-family: "pretendard";
  font-style: normal;
  font-size: 14px;
  line-height: 17px;
}

.member_icon {
  width: 20px;
  height: 18px;
}
#text_line {
  line-height: 0px;
}
#profile {
  width: 60px;
  height: 60px;
  border-radius: 70%;
  overflow: hidden;
}
</style>
