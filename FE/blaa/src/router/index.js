import { createRouter, createWebHistory } from "vue-router";
import Home from "@/App.vue";
import Chat from "@/pages/chat/ChatView.vue";
import Profile from "@/pages/profile/ProfileView.vue";
import Login from "@/pages/account/LoginView.vue";
import KakaoLogin from "@/pages/account/KakaoLoginView.vue";
import Signup from "@/pages/account/signup/SignupView.vue";
import SignupChoice from "@/pages/account/signup/FirstSignupView.vue";
import SignupForm from "@/pages/account/signup/SecondSignupView.vue";
import SignupCategory from "@/pages/account/signup/ThirdSignupView.vue";
import Story from "@/pages/story/StoryView.vue";
import StoryMain from '@/pages/story/StoryMain.vue'
import StoryForm from '@/pages/story/StoryForm.vue'
import StoryDetailView from '@/pages/story/StoryDetailView.vue'

import Chat from "@/pages/chat/ChatView.vue";

import Profile from "@/pages/profile/ProfileView.vue";

import Login from "@/pages/account/LoginView.vue";

import Crew from "@/pages/crew/CrewView.vue";

import ReviewMain from "@/pages/review/ReviewMain.vue";
import ReviewView from "@/pages/review/ReviewView.vue";
import ReviewForm from "@/pages/review/ReviewForm.vue";
import ReviewDetail from "@/pages/review/ReviewDetail.vue";
import ReviewCommentDetail from "@/pages/review/ReviewCommentDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      components: Home,
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
          path: '',
          name: 'story',
          component: Story
        },
        {
          path: 'create',
          name: 'createStory',
          component: StoryForm
        },
        {
          path: ':story_pk',
          name: 'detailStory',
          component: StoryDetailView
        },
      ]
    },
    {
      path: "/crew",
      name: "crew",
      component: Crew,
    },
    {
      path: "/review",
      name: "",
      component: ReviewMain,
      children: [
        {
          path: '',
          name: 'review',
          component: ReviewView
        },
        {
          path: 'create',
          name: 'createReview',
          component: ReviewForm
        },
        {
          path: ':store_pk',
          name: 'detailReview',
          component: ReviewDetail
        },
        {
          path: ':store_pk/:review_pk',
          name: 'detailComment',
          component: ReviewCommentDetail
        },
      ]
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
});

export default router;
