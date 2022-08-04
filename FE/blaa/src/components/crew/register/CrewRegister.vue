<template>
  <div>
    <router-link :to="{ name: 'businesscrew' }" >업무용</router-link><div></div>
    <router-link :to="{ name: 'friendshipcrew' }">친목용</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>