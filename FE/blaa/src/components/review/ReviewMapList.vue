<template>
  <hr>
  <div @click="selectStore" style="cursor: pointer">
    <p>{{ searchChild.place_name }}</p>
    <p>{{ searchChild.address_name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    searchChild: {
      type: Object
    }
  },
  setup(props, {emit}) {
    const selectStore = () => {
      const data = {
        name: props.searchChild.place_name,
        region: props.searchChild.address_name
      }
      emit('select-store', data)
    }
    return {
      selectStore
    }
  }
}
</script>

<style>

</style>