<template>
  <div>
    <h2>{{store_name}}</h2>
    {{types}}
    <div v-for="type in types" :key="type.id">
      <p>{{type}}</p>
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  </div>
  
  

</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const review = ref([])
    const types = ref([])
    const star = ref(0)
    const store_name = route.params.store_name

    const start = async() => {
      await store.dispatch('review/getReview', route.params.store_pk)
      review.value = store.state.review.review
      star.value = review.value.splice(-1, 1)
      types.value =  review.value.splice(-1, 1)[0].review_button_static
      console.log(review.value.length)
      if (review.value.length) {
        for (let type in types.value) {
          types.value[type] = types.value[type] / review.value.length
        }
      }
    }

    start()

    return {
      star,
      types,
      store_name
    }
  }
}
</script>

<style>

</style>