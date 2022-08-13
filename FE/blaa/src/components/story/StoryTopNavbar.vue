<template>
<div class="nav">
  <div class="page-change">
    <router-link :to="{name: 'followStory'}" :class="{activate: isFollow, deactivate: isStory}">팔로우</router-link>
    <router-link :to="{name: 'story'}" :class="{activate: isStory, deactivate: isFollow}">오출완</router-link>
  </div>
  <div class="alpha-feature">
    <div class="plus-btn" @click="change" v-if="isStory">검색</div>
    <router-link :to="{name: 'createStory'}"><i class="fa fa-regular fa-plus fa-2x"></i></router-link>
  </div>
</div>
  
</template>

<script>
export default {
  props: {
    isStory: Boolean,
    isFollow: Boolean,
    isFilter: Boolean
  },
  setup(props, {emit}) {
    const change= () =>{
      emit('change')
    }

    return {
      change
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.page-change > a {
  text-decoration: none;
  margin-right: 0.5rem;
  font-size: 1.5rem;
}
.alpha-feature {
  margin-left: 0.5rem;
  height: 1.5rem;
}

.plus-btn {
  display: inline-block;
}

.fa-plus {
  color: black;
}

.activate {
  color: black;
}

.deactivate {
  color: gray
}
</style>