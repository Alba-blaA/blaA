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
