<template>
  <button @click="isModalOpen = true">임시알림버튼</button>
  <div class="black-bg" v-if="isModalOpen">
    <div class="white-bg" ref="modal">
      <h4>알림창임</h4>
      <button @click="isModalOpen = false" class="close-btn">close</button>
    </div>

  </div>


  <router-view></router-view>

</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default { 
  
  setup () {
    const isModalOpen = ref(false)
    const modal = ref(null)

    onClickOutside(modal, () => (isModalOpen.value = false))
    
    return {
      isModalOpen,
      modal,
      onClickOutside
    }
    
  }

}
</script>

<style>
body {
  margin: 0
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding:20px;

}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}


</style>