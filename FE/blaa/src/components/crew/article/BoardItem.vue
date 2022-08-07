<template>
  <tbody>
    <tr>
      <td>{{ crew_article_pk }}</td>
      <!-- <td>{{ crew }}</td> -->
      <td>
        <!-- <router-link :to="'/crew/article/detail/'+crew_article_pk">{{ crew_title }}</router-link> --->
      <!-- <router-link :to="{ name: 'articledetail'}">{{ crew_title }}</router-link> -->
        {{ crew_title }}
      </td>
      <td>{{ crew_content }}</td>
      <td>{{ crew_userName }}</td>
      <td>{{ created_at }}</td>
      <td>{{ crew_private }}</td>
      <td>{{ crew_pin }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    crew_article_pk: Number,
    crew: Number,
    crew_title: String,
    created_at: String,
    crew_content: String,
    crew_userName: String,
    crew_private: Boolean,
    crew_pin: Boolean,
  },
};
</script>

<style></style>
