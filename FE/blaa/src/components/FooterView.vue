<template>
  <!-- <div style="width: 100%; height: 500px; background-color: #eea236"></div> -->
  <!-- <div style="width: 100%; height: 500px; background-color: #a94442"></div> -->

  <div class="bottom_menu">
    <div>
      <img src="@/assets/Footer/home.png" width="25px" />
    </div>
    <div>
      <img src="@/assets/Footer/group.png" width="25px" />
    </div>
    <div>
      <img src="@/assets/Footer/store.png" width="25px" />
    </div>
    <div>
      <img src="@/assets/Footer/gear.png" width="25px" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bottom_menu {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  bottom: 0;
  width: 360px;
  height: 50px;
  z-index: 100;
  border-top: 1px solid black;
  background-color: white;
}
.bottom_menu > div {
  float: left;
  width: 25%;
  height: 100%;
  text-align: center;
  padding-top: 13px;
}
</style>
