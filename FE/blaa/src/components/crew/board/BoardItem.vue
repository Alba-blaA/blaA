<template>
  <tr>
    <th>
      <!-- <router-link :to="{ name: 'BoardDetail' }">{{ article.subject }}</router-link> -->
      {{ subject }}
    </th>
    <td>{{ date }}</td>
    <td>{{ contents }}</td>
    <td>{{ userName }}</td>
    <td>{{ pubpriv }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    subject: String,
    date: String,
    contents: String,
    userName: String,
    pubpriv: Boolean,
  },
};
</script>

<style></style>
