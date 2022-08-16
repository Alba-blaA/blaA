<template>

</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['search-store'],
  setup(props, {emit}) {
    const searchText = ref('')    

    const search = () => {
      emit('search-store', searchText.value)
    }

    return {
      searchText,
      search
    }
  }
}
</script>

<style>

</style>