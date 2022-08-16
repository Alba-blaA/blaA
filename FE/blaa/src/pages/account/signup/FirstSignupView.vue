<template>
  <!-- <div @click.prevent="back" style="border: 1px solid red"> -->
  <!-- <button @click.prevent="back"> -->
  <img
    class="back"
    src="@/img/back.png"
    @click="back()"
    style="border: 1px solid red"
  />
  <!-- </button> -->
  <!-- </div> -->

  <div id="signup">
    <div id="signup-top">
      <h1 class="signup-text">회원가입</h1>
      <div class="signup-step">
        <div class="yellow-circle"><b class="signup-num">1</b></div>
        <img class="arrow" src="@/img/yellow_arrow.png" />
        <div class="gray-circle"><b class="signup-num">2</b></div>
        <img class="arrow" src="@/img/gray_arrow.png" />
        <div class="gray-circle"><b class="signup-num">3</b></div>
      </div>
    </div>

    <div id="signup1-form">
      <br /><br />

      <div id="is-alba-true" @click.prevent="isAlba">
        <b class="is-alba-text">아르바이트를 하고 있어요</b>
      </div>

      <div id="is-alba-false" @click.prevent="isPublic">
        <b class="is-alba-text">아르바이트를 안 하고 있어요</b>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const back = () => {
      console.log("뒤로가기");
      router.push({ name: "login" });
    };

    const isAlba = () => {
      store.commit("account/SET_SIGNUP_ALBA", true);
      console.log("isAlba : ", store.state.account.signupUser.is_alba);
      router.push({ name: "form" });
    };

    const isPublic = () => {
      store.commit("account/SET_SIGNUP_ALBA", false);
      console.log("isAlba : ", store.state.account.signupUser.is_alba);
      router.push({ name: "form" });
    };

    return {
      back,
      isAlba,
      isPublic,
    };
  },
};
</script>

<style scoped>
.back {
  margin-left: 10px;
  margin-top: 10px;
}

#signup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 70px;
  border: 3px solid yellow;
}

#signup-top {
  margin-top: 40px;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
}

.signup-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 30px;
}

.signup-step {
  text-align: center;
  display: inline-block;
  height: 50px;
  line-height: 50px;
}

.yellow-circle {
  width: 50px;
  height: 50px;
  background-color: #eec95c;
  border-radius: 50%;
  float: left;
  position: relative;
}

.gray-circle {
  width: 50px;
  height: 50px;
  background-color: #d9d9d9;
  border-radius: 50%;
  float: left;
  position: relative;
}

.signup-num {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

.arrow {
  float: left;
  max-height: 100%;
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 10px;
}

#signup1-form {
  vertical-align: middle;
  width: 100%;
}

#is-alba-true {
  float: right;
  width: 65%;
  height: 177px;
  left: 102px;
  top: 261px;
  background: #d9d9d9;
  border-radius: 50px 0px 0px 50px;
  text-align: center;
  line-height: 177px;
  margin-bottom: 25px;
  margin-top: 20px;
}

#is-alba-false {
  float: left;
  width: 65%;
  height: 177px;
  left: 102px;
  top: 261px;
  background: #d9d9d9;
  border-radius: 0px 50px 50px 0px;
  text-align: center;
  line-height: 177px;
  margin-top: 25px;
}

.is-alba-text {
  font-family: "Inter";
  font-style: normal;
  text-align: center;
  font-size: 17px;
}
</style>
