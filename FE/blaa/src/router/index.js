import { createRouter, createWebHistory } from "vue-router";
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
      component: Crew,
      redirect: "/crew/board/list",
      children: [
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
