<template>
  <div>크루 검색하기</div>
  <label id="search">크루 검색</label>
  <input type="text" id="crew_search" name="crew_search" v-model="crew_search" />

  <div v-for="(crew, i) in filtered" :key="i" v-bind="crew">
    <div @click="moveToCrew(crew.crew_pk)">{{ crew.crew_name }}</div>
  </div>
  <hr />
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let AllCrews = reactive({
      crews: [],
    });
    const crew_search = ref("");

    onMounted(() => {
      AllCrews.crews = store.state.crew.AllCrews.results;
    });

    console.log(crew_search);

    const filtered = computed(() => {
      if (crew_search.value) {
        return AllCrews.crews.filter((item) => {
          return item.crew_name.includes(crew_search.value);
        });
      }
      return AllCrews.crews;
    });

    const moveToCrew = (crew_pk) => {
      router.push({ name: "crewboard", params: { crew_pk: crew_pk } });
    };

    return {
      AllCrews,
      filtered,
      crew_search,
      moveToCrew,
    };
  },
};
</script>

<style></style>
