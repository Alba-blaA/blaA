<template>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li v-if="currentPage > 5" class="page-item"><a class="page-link" href="#" @click="Onclick(1)">&lt;&lt;</a></li>
    <li v-if="currentPage !== 1" class="page-item"><a class="page-link" href="#" @click="Onclick(currentPage - 1)">&lt;</a></li>
    <!-- 페이지네이션 5개씩 쪼개서 만들기 -->
    <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''"><a class="page-link" href="#" @click="Onclick(page)">{{ page }}</a></li>
    <li v-if="numberOfPages / 5 > (currentPage - 1) / 5" class="page-item"><a class="page-link" href="#" @click="Onclick(currentPage + 1)">&gt;</a></li>
    <li v-if="numberOfPages !== currentPage" class="page-item"><a class="page-link" href="#" @click="Onclick(numberOfPages)">&gt;&gt;</a></li>
  </ul>
</nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    numberOfPages: {
      type: Number,
      required: true
    }
  },
  emits: ['click'],
  setup(props, {emit}) {
    const Onclick = (page) => {
      emit('click', page)
    }
    return {
      Onclick
    }
  }
}
</script>

<style>

</style>