// 기본 url
const HOST = "http://127.0.0.1:8000/api/v1/";

// ===================================
// 세부 url
const ACCOUNTS = "accounts/";
const CATEGORYS = "categorys/";
const STORY = "stories/";
const COMMENT = "comment/";
const REVIEW = "reviews/";
const STORE = "store/";
const CREW = "crews/";
// const CHAT = 'chat/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + "login/",
    kakaoLogin: () => HOST + ACCOUNTS + "kakao/",
    logout: () => HOST + ACCOUNTS + "logout/",
    signup: () => HOST + ACCOUNTS + "signup/",
    emailCheck: () => HOST + ACCOUNTS + "unique/email/",
    nicknameCheck: () => HOST + ACCOUNTS + "unique/nickname/",
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + "user/",
    // username으로 프로필 제공
    profile: (username) => HOST + ACCOUNTS + "profile/" + username,
    myInfo: (user_pk) => HOST + ACCOUNTS + user_pk + "/",
    searchallusers: () => HOST + ACCOUNTS + "users/",
  },

  crew: {
    crew: () => HOST + CREW,
    crewInfo: (crew_pk) => HOST + CREW + crew_pk + "/",
    article: (crew_article_pk) => HOST + CREW + "article/edit/" + crew_article_pk + "/",
    articles: (crew_pk) => HOST + CREW + "article/" + crew_pk + "/",
    members: (crew_pk) => HOST + CREW + "user/" + crew_pk + "/",
    sign: (crew_pk) => HOST + CREW + "sign/" + crew_pk + "/",
    invitelist: (crew_pk, type) => HOST + CREW + "invitelist/" + crew_pk + "/?type=" + type,
    accept: (crew_pk, user_pk) => HOST + CREW + "accept_user/" + crew_pk + "/" + user_pk + "/",
    deny: (crew_pk, user_pk) => HOST + CREW + "deny_user/" + crew_pk + "/" + user_pk + "/",

    // myCrew: (user_pk) => HOST + CREW + user_pk + "/",
  },
  categorys: {
    job: () => HOST + CATEGORYS + "job/",
    region: () => HOST + CATEGORYS + "region/",
  },
  story: {
    host: () => HOST,
    story: () => HOST + STORY,
    detail: (story_pk) => HOST + STORY + story_pk + "/",
    like: (story_pk) => HOST + STORY + "like/" + story_pk + "/",
    comment: (story_pk) => HOST + STORY + COMMENT + story_pk + "/",
    commentChange: (comment_pk) => HOST + STORY + COMMENT + "ud/" + comment_pk + "/",
    myStory: (user_pk) => HOST + STORY + "mystory/" + user_pk + "/",
  },
  review: {
    store: () => HOST + REVIEW + STORE,
    review: (store_pk) => HOST + REVIEW + store_pk + "/",
    reviewDetail: (review_pk) => HOST + REVIEW + "detail/" + review_pk + "/",
    like: (review_pk) => HOST + REVIEW + "like/" + review_pk + "/",
  },
  profile: {
    updateMyInfo: (user_pk) => HOST + ACCOUNTS + user_pk + "/",
    updateMyPW: (user_pk) => HOST + ACCOUNTS + "change_password/" + user_pk + "/",
    myFollow: (user_pk) => HOST + ACCOUNTS + "followlist/" + user_pk + "/",
    myStory: (user_pk) => HOST + STORY + "mystory/" + user_pk + "/",
    myReview: (user_pk) => HOST + ACCOUNTS + "review/" + user_pk + "/",
    myCrew: (user_pk) => HOST + ACCOUNTS + "crew/" + user_pk + "/",
    myInfo: (user_pk) => HOST + ACCOUNTS + user_pk + "/",
  },
};
