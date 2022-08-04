<template>
  <tr>
    <td>{{ crew_article_pk }}</td>
    <td>{{ crew_pk }}</td>
    <td>
      // 둘 중 하나. 아래 쿼리로 넘기는 거 아직 미확실.
      <router-link :to="'/crew/article/detail/'+crew_article_pk">{{ crew_title }}</router-link>
      <router-link :to="{ name: 'articledetail', query: { crew_article_pk: crew_article_pk } }">{{ crew_title }}</router-link>
      <!-- {{ subject }} -->
    </td>
    <td>{{ crew_content }}</td>
    <td>{{ crew_userName }}</td>
    <td>{{ created_at }}</td>
    <td>{{ crew_private }}</td>
    <td>{{ crew_pin }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    crew_article_pk: Number,
    crew_pk: Number,
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
