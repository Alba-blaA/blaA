<template>
  <br />
  <h3><b>리뷰</b></h3>
  <hr />

  <table
    v-for="review in reviewList.results"
    :key="review.results.reviews.review_pk"
    style="width: 100%"
  >
    <tr>
      <td rowspan="2" width="10px"></td>
      <td rowspan="2" id="store">
        <img id="imgStore" :src="review.reviews.store_image" />
      </td>
      <td width="20px"></td>
      <td>
        <b>{{ review.results.reviews.store }}</b>
      </td>
      <td
        rowspan="2"
        @click="
          reviewDetail(
            review.reviews.store_pk,
            review.reviews.store,
            review.reviews.review_pk
          )
        "
      >
        <h3>
          <b>></b>
        </h3>
      </td>
    </tr>
    <tr>
      <td>{{ review.results.reviews.star }}</td>
    </tr>
    <tr>
      <td colspan="100%"><hr /></td>
    </tr>
  </table>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const reviewList = store.state.profile.reviewList;

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
