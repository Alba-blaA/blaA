<template>
  <div>{{ crewInfo.crew_name }}의 CREW DETAIL</div>
  <div>
    <li>크루 생성일 : {{crewInfo.created_at}}</li>
    <li>크루 소개 : {{crewInfo.crew_explain}}</li>
    <li>크루 인원수 : {{crewInfo.crew_member_count}}</li>
    <li>크루 지역 : {{crewInfo.crew_region}}</li>
    <li>크루장</li>
    <li><router-link :to="{ name: 'crewmodify', params: { crew_pk : crewInfo.crew_pk } }">크루 정보 수정</router-link></li>
    <div @click="delcrew">
        <li style="color: red">크루 삭제</li>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
	setup() {
		const store = useStore();
		const router = useRouter();

		let crewInfo = reactive({
				crew_pk: "",
				crew_name: "",
				crew_explain: "",
				crew_region: "",
				crew_img: "",
				crew_member_count: "",
				created_at: "",
		});

		const getCrewInfo = () => {
				console.log(store.state.crew.crewInfo);
				Object.assign(crewInfo, store.state.crew.crewInfo);
		}

		const delcrew = () => {
				if (confirm("크루를 삭제하시겠습니까?")) {
						router.replace({
								name: 'crewdelete', 
								params: { crew_pk : crewInfo.crew_pk },
						});
				}
		};

		getCrewInfo();

		return {
				crewInfo,
				delcrew,
		}
			
	}

}
</script>

<style>

</style>