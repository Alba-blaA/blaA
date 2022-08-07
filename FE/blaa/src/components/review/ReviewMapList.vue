<template>
  <hr>
    <p>{{ searchChild.place_name }}</p>
    <p>{{ searchChild.address_name }}</p>
</template>

<script>
export default {
  props: {
    searchChild: {
      type: Object
    }
  },
  setup() {
    // console.log(props.searchChild)
  }
}
</script>

<style>

</style>