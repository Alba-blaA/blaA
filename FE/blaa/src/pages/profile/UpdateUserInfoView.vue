<template>
  <br /><br />
  <div>
    <h3>회원정보수정페이지</h3>
    <form>
      <input
        id="update-email"
        type="text"
        v-model="updateInfo.email"
        placeholder="Enter email"
        disabled
      />
      <br />

      <input
        id="update-name"
        type="text"
        v-model="updateInfo.name"
        placeholder="Enter name"
        disabled
      />
      <br />

      <div>
        <input id="update-tel1" v-model="tel1" placeholder="Enter tel" />
        <b> - </b>
        <input id="update-tel2" v-model="tel2" />
        <b> - </b>
        <input id="update-tel3" v-model="tel3" />
      </div>

      <input
        id="update-nickname"
        v-model="updateInfo.nickname"
        placeholder="Enter nickname"
      />
      &nbsp;
      <button @click.prevent="nicknameCheck">중복확인</button>
      <br />

      <div>
        <b>현재 근무 중인 직장이 있습니까?</b> <br />
        <input type="radio" v-model="updateInfo.is_alba" value="true" />
        <label for="true">예</label>
        <input type="radio" v-model="updateInfo.is_alba" value="false" />
        <label for="false">아니오</label>
      </div>

      <select id="update-category" v-model="updateInfo.category">
        <option value="null">업종 카테고리</option>
        <option
          :key="c"
          v-for="(category, c) in category_list"
          :value="category.job_main_category"
        >
          {{ category.job_main_category }}
        </option>
      </select>

      <!-- <div>
        <select id="update-sido" v-model="sido" @change="getGu(sido)">
          <option value="null">시/도</option>
          <option :key="s" v-for="(si, s) in si_list" :value="si.sido_name">
            {{ si.sido_name }}
          </option>
        </select>
        &nbsp;

        <select
          id="update-gugun"
          v-model="gugun"
          @change="getDong(sido, gugun)"
        >
          <option value="null">구/군</option>
          <option :key="g" v-for="(gu, g) in gu_list" :value="gu.gugun_code">
            {{ gu.gugun_name }}
          </option>
        </select>
        &nbsp;

        <select id="signup-dong" v-model="dong">
          <option value="null">동/면/리</option>
          <option
            :key="d"
            v-for="(dong, d) in dong_list"
            :value="dong.dong_code"
          >
            {{ dong.dong_name }}
          </option>
        </select>
      </div> -->

      <div>
        <button @click.prevent="before">이전</button> &nbsp;
        <button @click.prevent="update">수정</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "@/api/axios.js";
import api from "@/api/api.js";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const userInfo = store.state.account.userInfo;
    console.log("userInfo : ", userInfo);

    const tel = userInfo.tel.split("-");
    const tel1 = ref(tel[0]);
    const tel2 = ref(tel[1]);
    const tel3 = ref(tel[2]);

    // const region = userInfo.region.split(" ");
    // const sido = ref("");
    // for (var i = 0; i < store.state.account.si.length; i++) {
    //   if (store.state.account.si[i].sido_name == region[0]) {
    //     sido.value = store.state.account.si[i].sido_code;
    //     console.log("sido.value : ", sido.value);
    //   }
    // }

    // console.log("sido: ", sido.value);
    // const gugun = ref("");
    // for (var j = 0; j < store.state.account.dong.length; j++) {
    //   if (store.state.account.gu[j].gugun_name == region[1]) {
    //     gugun.value = store.state.account.gu[j].gugun_code;
    //   }
    // }

    // const dong = ref("");
    // for (var k = 0; k < store.state.account.dong.length; k++) {
    //   if (store.state.account.gu[k].dong_name == region[2]) {
    //     dong.value = store.state.account.gu[k].dong_code;
    //   }
    // }

    store.dispatch("account/getCategoryList");
    // store.dispatch("account/getSiList");

    const nicknameCheck = () => {
      if (updateInfo.value.nickname == null) {
        alert("먼저 닉네임을 입력해주세요.");
      } else {
        const sendNickname = { nickname: updateInfo.value.nickname };
        axios
          .post(api.accounts.nicknameCheck(), sendNickname)
          .then((response) => {
            console.log("response : ", response);
            console.log("response status : ", response.status);
            if (response.status === 200 || response.status === 201) {
              alert("사용 가능한 닉네임입니다.");
            }
          })
          .catch((error) => {
            console.log("error : ", error);
            alert("이미 사용중인 닉네임입니다.");
            updateInfo.value.nickname = null;
          });
      }
    };

    const category_list = computed(() => {
      return store.state.account.category;
    });

    // const si_list = computed(() => {
    //   return store.state.account.si;
    // });

    // const gu_list = computed(() => {
    //   return store.state.account.gu;
    // });

    // const dong_list = computed(() => {
    //   return store.getters["account/dong_list"];
    // });

    // const getGu = (sido) => {
    //   if (sido != null) {
    //     console.log("selected sido :", sido);
    //     store.dispatch("account/getGuList", sido);
    //     gugun.value = null;
    //     dong.value = null;
    //   }
    // };

    // const getDong = (sido, gugun) => {
    //   if (sido != null && gugun != null) {
    //     store.dispatch("account/getDongList", {
    //       sido: sido,
    //       gugun: gugun,
    //     });
    //     dong.value = null;
    //   }
    // };

    const updateInfo = ref({
      email: userInfo.email,
      name: userInfo.name,
      tel: null,
      nickname: userInfo.nickname,
      category: userInfo.category,
      region: userInfo.region,
      is_alba: userInfo.is_alba,
    });
    console.log("updateInfo", updateInfo.value);

    // const checkPassword = () => {
    //   var password = prompt("비밀번호를 입력해주세요!");

    //   if (password) {
    //     axios
    //       .post(api.accounts.login(), {
    //         email: userInfo.email,
    //         password: password,
    //       })
    //       .then((response) => {
    //         console.log("유저 정보 조회 성공 : ", response);
    //       })
    //       .catch((err) => {
    //         console.log("유저 정보 조회 실패 : ", err);
    //         router.go(-1);
    //         alert("비밀번호가 틀립니다!");
    //         checkPassword();
    //       });
    //   } else {
    //     router.go(-1);
    //   }
    // };

    // if (!store.state.account.kakaoLogin) {
    //   checkPassword();
    // }

    const update = () => {
      // updateInfo.value.region =
      //   sido.value + " " + gugun.value + " " + dong.value;

      updateInfo.value.tel = tel1.value + "-" + tel2.value + "-" + tel3.value;
      console.log("수정완료 전 updateInfo : ", updateInfo.value);
      axios
        .put(api.profile.myInfo(route.params.user_pk), updateInfo.value)
        .then((response) => {
          alert("회원 정보 수정 완료!");
          store.commit("account/USER_INFO", response.data);
          router.push({
            name: "myinfo",
            params: { user_pk: route.params.user_pk },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      userInfo,
      nicknameCheck,
      updateInfo,
      tel1,
      tel2,
      tel3,
      update,
      // sido,
      // gugun,
      // dong,
      category_list,
      // si_list,
      // gu_list,
      // dong_list,
      // getGu,
      // getDong,
      // checkPassword,
    };
  },
};
</script>

<style></style>
