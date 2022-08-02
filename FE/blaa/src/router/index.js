import { createRouter, createWebHistory } from "vue-router";
import Chat from "@/pages/chat/ChatView.vue";
import Profile from "@/pages/profile/ProfileView.vue";
import Login from "@/pages/account/LoginView.vue";
import Signup from "@/pages/account/signup/SignupView.vue";
import SignupChoice from "@/pages/account/signup/FirstSignupView.vue";
import SignupForm from "@/pages/account/signup/SecondSignupView.vue";
import SignupAlba from "@/pages/account/signup/ThirdAlbaSignupView.vue";
import SignupPublic from "@/pages/account/signup/ThirdPublicSignupView.vue";
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
      path: "/signup",
      name: "signup",
      component: Signup,
      redirect: "/signup/choice",
      children: [
        {
          path: "choice",
          name: "choice",
          component: SignupChoice,
        },
        {
          path: "form",
          name: "form",
          component: SignupForm,
        },
        {
          path: "alba",
          name: "alba",
          component: SignupAlba,
        },
        {
          path: "public",
          name: "public",
          component: SignupPublic,
        },
      ],
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
