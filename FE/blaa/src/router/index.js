import { createRouter, createWebHistory } from "vue-router";
import Home from "@/App.vue";
import Chat from "@/pages/chat/ChatView.vue";
import Profile from "@/pages/profile/ProfileView.vue";
import Login from "@/pages/account/LoginView.vue";
import Signup from "@/pages/account/signup/SignupView.vue";
import SignupChoice from "@/pages/account/signup/FirstSignupView.vue";
import SignupForm from "@/pages/account/signup/SecondSignupView.vue";
import SignupCategory from "@/pages/account/signup/ThirdSignupView.vue";
import Story from "@/pages/story/StoryView.vue";
import Crew from "@/pages/crew/CrewView.vue";
import Review from "@/pages/review/ReviewView.vue";

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
