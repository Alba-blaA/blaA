// 기본 url
const HOST = "http://localhost:8000/api/v1/";

// ===================================
// 세부 url
const ACCOUNTS = "accounts/";

const CATEGORYS = "categorys/";
// const STORY = 'story/'
// const REVIEWS = 'reviews/'
const STORY = 'stories/'
const COMMENT = 'comment/'
const REVIEW = 'reviews/'
const STORE = 'store/'

// const CREW = 'crew/'
// const CHAT = 'chat/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + "login/",
    logout: () => HOST + ACCOUNTS + "logout/",
    signup: () => HOST + ACCOUNTS + "signup/",
    emailCheck: () => HOST + ACCOUNTS + "unique/email/",
    nicknameCheck: () => HOST + ACCOUNTS + "unique/nickname/",
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + "user/",
    // username으로 프로필 제공
    profile: (username) => HOST + ACCOUNTS + "profile/" + username,
  },

  categorys: {
    job: () => HOST + CATEGORYS + "job/",
    region: () => HOST + CATEGORYS + "region/",
  },
  // 예시
  // movies: {
  //   // /articles/
  //   movies: () => HOST + MOVIES,
  //   // /articles/1/
  //   movie: moviePk => HOST + MOVIES + ${moviePk},
  //   reviews: moviePk => HOST + MOVIES + ${moviePk}/ + REVIEWS,
  //   recommendations: moviePk => HOST2 + ${moviePk}/ + RECOMMENDATIONS + "?api_key=87931dd6e8327ea04518e5e2a6836196&language=ko",
  //   search: value => HOST3 + ${value}& + "api_key=87931dd6e8327ea04518e5e2a6836196&language=ko",
  //   review: (moviePk, reviewPk) =>
  //     HOST + MOVIES + ${moviePk}/ + REVIEWS + ${reviewPk}/,
  // },
  // articles: {
  //   // /articles/
  //   articles: () => HOST + ARTICLES,
  //   // /articles/1/
  //   article: articlePk => HOST + ARTICLES + ${articlePk}/,
  //   likeArticle: articlePk => HOST + ARTICLES + ${articlePk}/ + 'like/',
  //   comments: articlePk => HOST + ARTICLES + ${articlePk}/ + COMMENTS,
  //   comment: (articlePk, commentPk) =>
  //     HOST + ARTICLES + ${articlePk}/ + COMMENTS + ${commentPk}/,
  // },
  story: {
    host: () => HOST,
    story: () => HOST + STORY,
    detail: (story_pk) => HOST + STORY + story_pk + '/',
    like: (story_pk) => HOST + STORY + 'like/' + story_pk,
    comment:(story_pk) => HOST + STORY + COMMENT + story_pk +'/',
    commentChange: (comment_pk) => HOST + STORY + COMMENT + 'ud/' + comment_pk
  },
  review: {
    store: () => HOST + REVIEW + STORE,
    review: (store_pk) => HOST + REVIEW + store_pk + '/',
    reviewDetail: (review_pk) => HOST + REVIEW + 'detail/' + review_pk + '/',
    like: (review_pk) => HOST + REVIEW + 'like/' + review_pk
  }
};
