import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home/HomeView.vue";
import Chat from "@/pages/chat/ChatView.vue";
import MyProfile from "@/pages/profile/ProfileView.vue";
import Login from "@/pages/account/LoginView.vue";
import KakaoLogin from "@/pages/account/KakaoLoginView.vue";
import Signup from "@/pages/account/signup/SignupView.vue";
import SignupChoice from "@/pages/account/signup/FirstSignupView.vue";
import SignupForm from "@/pages/account/signup/SecondSignupView.vue";
import SignupCategory from "@/pages/account/signup/ThirdSignupView.vue";

import Story from "@/pages/story/StoryView.vue";
import StoryFollow from '@/pages/story/StoryFollowView.vue'
import StoryMain from "@/pages/story/StoryMain.vue";
import StoryForm from "@/pages/story/StoryForm.vue";
import StoryDetailView from "@/pages/story/StoryDetailView.vue";

import Crew from "@/pages/crew/CrewView.vue";

import ReviewMain from "@/pages/review/ReviewMain.vue";
import ReviewView from "@/pages/review/ReviewView.vue";
import ReviewForm from "@/pages/review/ReviewForm.vue";
import ReviewDetail from "@/pages/review/ReviewDetail.vue";
import ReviewCommentDetail from "@/pages/review/ReviewCommentDetail.vue";
import Chatroom from "@/pages/chat/ChatroomView.vue";
import SearchAllUsers from "@/pages/crew/SearchAllUsersView.vue"

import ProfileMain from "@/pages/profile/ProfileMainView.vue";
import UpdateUserInfo from "@/pages/profile/UpdateUserInfoView.vue";
import MyFollow from "@/pages/profile/MyFollowView.vue";
import MyStory from "@/pages/profile/MyStoryView.vue";
import MyReview from "@/pages/profile/MyReviewView.vue";
import MyCrew from "@/pages/profile/MyCrewView.vue";
import MyInfo from "@/pages/profile/MyInfoView.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/kakao",
      name: "kakao",
      component: KakaoLogin,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      redirect: "/signup/1",
      children: [
        {
          path: "1",
          name: "choice",
          component: SignupChoice,
        },
        {
          path: "2",
          name: "form",
          component: SignupForm,
        },
        {
          path: "3",
          name: "category",
          component: SignupCategory,
        },
      ],
    },
    {
      path: "/story",
      name: "",
      component: StoryMain,
      children: [
        {
          path: "",
          name: "story",
          component: Story,
        },
        {
          path: "/follow",
          name: "followStory",
          component: StoryFollow,
        },
        {
          path: "create",
          name: "createStory",
          component: StoryForm,
        },
        {
          path: ":story_pk",
          name: "detailStory",
          component: StoryDetailView,
        },
      ],
    },

    {
      path: "/crew",
      name: "crew",
      redirect: "/crew/list/alllist",
      component: Crew,
      children: [
        {
          path: "regist",
          name: "crewregist",
          component: () => import("@/components/crew/register/CrewRegistView.vue"),
          children: [
            {
              path: "business",
              name: "businesscrew",
              component: () => import("@/components/crew/register/CrewRegistBusiness.vue"),
            },
            {
              path: "friendship",
              name: "friendshipcrew",
              component: () => import("@/components/crew/register/CrewRegistFriendship.vue"),
            },
          ],
        },
        {
          path: "list",
          name: "crewlist",
          component: () => import("@/components/crew/list/CrewListView.vue"),
          children: [
            {
              path: "alllist",
              name: "allcrewlist",
              component: () => import("@/components/crew/list/CrewListAll.vue"),
            },
            {
              path: "mylist/:user_pk",
              name: "mycrewlist",
              component: () => import("@/components/crew/list/CrewListMy.vue"),
            },
          ],
        },
        {
          path: ":crew_pk",
          name: "crewboard",
          redirect: { name: "articlelist" },
          component: () => import("@/components/crew/CrewBoard.vue"),
          children: [
            {
              path: "list",
              name: "articlelist",
              component: () => import("@/components/crew/article/ArticleList.vue"),
            },
            {
              path: "regist",
              name: "articleregist",
              component: () => import("@/components/crew/article/ArticleRegist.vue"),
            },
            {
              path: ":crew_article_pk",
              name: "articledetail",
              component: () => import("@/components/crew/article/ArticleDetail.vue"),
            },
            {
              path: ":crew_article_pk",
              name: "articlemodify",
              component: () => import("@/components/crew/article/ArticleModify.vue"),
            },
            {
              path: ":crew_article_pk",
              name: "articledelete",
              component: () => import("@/components/crew/article/ArticleDelete.vue"),
            },
            {
              path: "schedule",
              name: "schedule",
              component: () => import("@/components/crew/schedule/ScheduleView.vue"),
              // children: [
              //   {
              //     path: "calendar",
              //     name: "calendar",
              //     component: () => import("@/components/crew/schedule/ScheduleView.vue"),
              //   },
              // ],
            },
          ],
        },
      ],
    },
    {
      path: "/review",
      name: "",
      component: ReviewMain,
      children: [
        {
          path: "",
          name: "review",
          component: ReviewView,
        },
        {
          path: "create",
          name: "createReview",
          component: ReviewForm,
        },
        {
          path: ":store_pk/:store_name",
          name: "detailReview",
          component: ReviewDetail,
        },
        {
          path: ":store_pk/:store_name/:review_pk",
          name: "detailComment",
          component: ReviewCommentDetail,
        },
      ],
    },
    {
      path: "/chat/:from_userpk",
      name: "chat",
      component: Chat,
    },
    {
      path: "/profile",
      name: "",
      component: ProfileMain,
      children: [
        {
          path: "",
          name: "Profile",
          component: MyProfile,
        },
        {
          path: ":user_pk/update",
          name: "updateInfo",
          component: UpdateUserInfo,
        },
        {
          path: ":user_pk/follower",
          name: "myfollower",
          component: MyFollow,
        },
        {
          path: ":user_pk/followingk",
          name: "myfollowing",
          component: MyFollow,
        },
        {
          path: ":user_pk/mystory",
          name: "mystory",
          component: MyStory,
        },
        {
          path: ":user_pk/myreview",
          name: "myreview",
          component: MyReview,
        },
        {
          path: ":user_pk/mycrew",
          name: "mycrew",
          component: MyCrew,
        },
        {
          path: ":user_pk/myinfo",
          name: "myinfo",
          component: MyInfo,
        }
      ],
    },
    {
      path: "/chatroom",
      name: "chatroom",
      component: Chatroom,
    },
    {
      path: "/searchusers",
      name: "searchusers",
      component: SearchAllUsers,
    },
  ],
});

export default router;
