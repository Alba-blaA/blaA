<template>
  <router-link :to="'/crew/list/mylist/'+ user_pk">내 크루</router-link>
  <router-link :to="{ name: 'allcrewlist'}">전체 크루</router-link>
  <router-view></router-view>
  <button @click=createCrew>새 크루 생성하기</button>
</template>

<script>
export default {
  data() {
    return {
      user_pk: 1,
    }
  },
  methods: {
    createCrew() {
      this.$router.push({ name: "crewregist" });
    }
  }
};
</script>

<style></style>
