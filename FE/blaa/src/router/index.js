import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home/HomeView.vue";
import Chat from "@/pages/chat/ChatView.vue";
import Profile from "@/pages/profile/ProfileView.vue";
import Login from "@/pages/account/LoginView.vue";
import Story from "@/pages/story/StoryView.vue";
import Crew from "@/pages/crew/CrewView.vue";
import Review from "@/pages/review/ReviewView.vue";

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
      path: "/story",
      name: "story",
      component: Story,
    },
  
    {
      path: "/crew",
      name: "crew",
      redirect: "/crew/list",
      component: Crew,
      children: [
        {
          path: "regist",
          name: "crewregist",
          component: () => import("@/components/crew/register/CrewRegister.vue"),
          children: [
            {
              path: "business",
              name: "businesscrew",
              component: () => import("@/components/crew/register/BusinessRegister.vue"),
            },
            {
              path: "friendship",
              name: "friendshipcrew",
              component: () => import("@/components/crew/register/FriendshipRegister.vue"),
            },
          ]
        },
        {
          path: "list",
          name: "crewlist",
          component: () => import("@/components/crew/list/CrewList.vue"),
          children: [
            {
              path: "alllist",
              name: "allcrewlist",
              component: () => import("@/components/crew/list/AllCrewItem.vue"),
            },
            {
              path: "mylist/:user_pk",
              name: "mycrewlist",
              component: () => import("@/components/crew/list/MyCrewItem.vue"),
            },
          ]
        },
        {
          path: "board",
          name: "board",
          redirect: "/crew/board/list",
          component: () => import ("@/components/crew/board/BoardView.vue"),
          children: [
            {
              path: "list",
              name: "boardlist",
              component: () => import("@/components/crew/board/BoardList.vue"),
            },
            {
              path: "regist",
              name: "boardregist",
              component: () => import("@/components/crew/board/BoardRegister.vue"),
            },
          ]
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
          // ]
        },
      ]
    },
    {
      path: "/review",
      name: "review",
      component: Review,
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
