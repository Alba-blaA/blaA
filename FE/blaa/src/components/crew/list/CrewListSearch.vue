<template>
  <div>크루 검색하기</div>
  <label id="search">크루 검색</label>
  <input type="text" id="crew_search" name="crew_search" v-model="crew_search" />

  <div>
    <button @click="business = true">업무용</button>
    <button @click="business = false">친목용</button>
    {{ business }}
  </div>

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
    let business = ref(true);

    onMounted(() => {
      AllCrews.crews = store.state.crew.AllCrews.results;
    });

    console.log(crew_search);

    const filtered = computed(() => {
      return AllCrews.crews.filter((item) => {
        if (crew_search.value) {
          return item.crew_name.includes(crew_search.value);
        }
        return item.is_business === business.value;
      });
    });

    const moveToCrew = (crew_pk) => {
      router.push({ name: "crewboard", params: { crew_pk: crew_pk } });
    };

    return {
      AllCrews,
      filtered,
      crew_search,
      moveToCrew,
      business,
    };
  },
};
</script>

<style></style>
