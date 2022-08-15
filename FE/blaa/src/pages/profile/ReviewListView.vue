<template>
  <br />
  <h3><b>리뷰</b></h3>
  <hr />
  {{reviews}}
  <table v-for="review in reviews" :key="review.review_pk" style="width: 100%">
    <tr>
      <td width="10px"></td>
      <td id="store">
        <img id="imgStore" :src="review.store_image" />
      </td>
      <td width="20px"></td>
      <td>
        <b>{{ review.store_name }}</b>
      </td>
      <td
        rowspan="2"
        @click="
          reviewDetail(review.store_pk, review.store_name, review.review_pk)
        "
      >
        <h3>
          <b>></b>
        </h3>
      </td>
    </tr>
    <tr>
      <td colspan="100%"><hr /></td>
    </tr>
  </table>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const reviewList = store.state.profile.reviewList.results;
    console.log("reviewList : ", reviewList);
    console.log("reviewList length: ", reviewList.length);
    const user_pk = ref(-1);
    for (var i = 0; i < reviewList.length; i++) {
      if (reviewList[i].user_pk == route.params.user_pk) {
        user_pk.value = i;
        console.log("i ; ", user_pk.value);
      }
    }

    const reviews =
      store.state.profile.reviewList.results[user_pk.value].reviews;
    console.log("user_pk : ", user_pk.value);
    console.log("reviewList[user_pk]", reviews);

    const reviewDetail = (store_pk, store_name, review_pk) => {
      router.push({
        name: "detailComment",
        params: {
          store_pk: store_pk,
          store_name: store_name,
          review_pk: review_pk,
        },
      });
    };

    return {
      reviewList,
      user_pk,
      reviews,
      reviewDetail,
    };
  },
};
</script>

<style>
#store {
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
}

#imgStore {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
