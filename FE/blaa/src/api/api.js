// 기본 url
const HOST = "http://localhost:8000/api/v1/";

// ===================================
// 세부 url
const ACCOUNTS = "accounts/";
const STORY = 'stories/'
const COMMENT = 'comment/'
const REVIEW = 'reviews/'
const STORE = 'store/'
// const CREW = 'crew/'
// const CHAT = 'chat/'

export default {
  accounts: {
    login: () => HOST,
    logout: () => HOST + ACCOUNTS + "logout/",
    signup: () => HOST + ACCOUNTS + "signup/",
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + "user/",
    // username으로 프로필 제공
    profile: (username) => HOST + ACCOUNTS + "profile/" + username,
  },
  story: {
    host: () => HOST,
    story: () => HOST + STORY,
    detail: (story_pk) => HOST + STORY + story_pk + '/',
    like: (story_pk) => HOST + STORY + 'like/' + story_pk,
    comment:(story_pk) => HOST + STORY + COMMENT + story_pk +'/',
    commentChange: (comment_pk) => HOST + STORY + COMMENT + 'ud/' + comment_pk
  },
  review: {
    review: () => HOST + REVIEW + STORE,
    searchReview: (search_name) => HOST + REVIEW + search_name,
    storeDetail: (store_pk) => HOST + REVIEW + store_pk,
    addStore: () => HOST + 'store/',
    reviewDetail: (review_pk) => HOST + REVIEW + review_pk,
    like: (review_pk) => HOST + REVIEW + 'like/' + review_pk
  }
};
