import axios from "@/api/axios.js";
import api from "@/api/api.js";

const profileStore = {
  namespaced: true,
  state: {
    updateMyInfo: [],
    followerList: [],
    totalFollowers: 0,
    followingList: [],
    myStory: [],
    reviewList: [],
    crewList: [],
    myInfo: [],
  },
  mutations: {
    UPDATE_MY_INFO: (state, myInfo) => {
      state.myInfo = myInfo;
    },
    GET_FOLLOWER_LIST: (state, followerList) => {
      state.followerList = followerList;
      // if (state.followerList.next != followerList.next) {
      //   state.followerList.next = followerList.data.next;
      //   state.followerList.previous = followerList.data.previous;
      //   console.log("followerList result : ", followerList.data.results);
      //   console.log("list length : ", followerList.data.results.length);
      //   for (let i = 0; i < followerList.data.results.length; i++) {
      //     state.followerList.push(followerList.data[i]);
      //   }
      // }
    },
    UPDATE_TOTAL_FOLLOWERS: (state, followers) => {
      state.totalFollowers = followers;
    },
    GET_FOLLOWING_LIST: (state, followingList) => {
      state.followingList = followingList;
    },
    GET_MY_STORY: (state, myStory) => {
      state.myStory = myStory;
    },
    GET_REVIEW_LIST: (state, reviewList) => {
      state.reviewList = reviewList;
    },
    GET_CREW_LIST: (state, crewList) => {
      state.crewList = crewList;
    },
    GET_MY_INFO: (state, myInfo) => {
      state.myInfo = myInfo;
    },
  },
  actions: {
    async updateMyInfo(context, user_pk) {
      axios
        .put(api.profile.updateMyInfo(user_pk))
        .then((response) => {
          context.commit("");
        })
        .catch((err) => {});
    },
    async getFollowerList(context, user_pk) {
      await axios
        .get(api.profile.myFollow(user_pk), {
          params: {
            type: "follower",
          },
        })
        .then((response) => {
          const followerData = {
            count: null,
            next: null,
            previous: null,
            results: [],
          };
          console.log(response.data.count);
          followerData.count = response.data.count;
          followerData.next = response.data.next;
          followerData.previous = response.data.previous;
          followerData.results = response.data.results;

          context.commit("GET_FOLLOWER_LIST", followerData);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getFollowingList(context, user_pk) {
      await axios
        .get(api.profile.myFollow(user_pk), {
          params: {
            type: "following",
          },
        })
        .then((response) => {
          console.log("팔로잉 response", response);
          console.log("response data : ", response.data);
          const followingData = {
            count: null,
            next: null,
            previous: null,
            results: [],
          };
          console.log(response.data.count);
          followingData.count = response.data.count;
          followingData.next = response.data.next;
          followingData.previous = response.data.previous;
          followingData.results = response.data.results;

          context.commit("GET_FOLLOWING_LIST", followingData);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMyStory(context, user_pk) {
      await axios.get(api.profile.myStory(user_pk)).then((response) => {
        console.log("response : ", response);
        console.log("response data : ", response.data);

        context.commit("GET_MY_STORY", response.data);
        console.log("state myStory", context.state.myStory);
      });
    },
    async getReviewList(context, user_pk) {
      await axios
        .get(api.profile.myReview(user_pk))
        .then((response) => {
          console.log("review response :  ", response);
          context.commit("GET_REVIEW_LIST", response.data);
        })
        .catch((err) => {
          console.log("review err : ", err);
        });
    },
    async getCrewList(context, user_pk) {
      await axios
        .get(api.profile.myCrew(user_pk), {})
        .then((response) => {
          console.log("crew response", response);
          context.commit("GET_CREW_LIST", response.data);
        })
        .catch((err) => {
          console.log("crew error : ", err);
        });
    },
    getMyInfo(context, user_pk) {
      axios.get(api.profile.myInfo());
    },
  },
};

export default profileStore;
