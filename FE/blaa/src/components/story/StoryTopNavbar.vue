<template>
<div class="nav">
  <div class="page-change">
    <router-link :to="{name: 'followStory'}" :class="{activate: isFollow, deactivate: isStory}" style="font-weight:700;">팔로우</router-link>
    <router-link :to="{name: 'story'}" :class="{activate: isStory, deactivate: isFollow}" style="font-weight:700;">오출완</router-link>
  </div>
  <div class="alpha-feature">
    <div class="plus-btn" @click="change" v-if="isStory"><span class="material-symbols-outlined" style="font-size: 32px;" @click="isSearch=!isSearch">search</span></div>
    <router-link :to="{name: 'createStory'}"><i class="fa fa-regular fa-plus fa-2x"></i></router-link>
  </div>
</div>
  
</template>

<script>
export default {
  components: {},
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  height: 32px;
}

.plus-btn {
  display: inline-block;
  margin-right: 5px;
  height: 32px;
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