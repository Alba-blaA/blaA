import { createStore } from "vuex";
import test from "./modules/test";
import chat from "./modules/chat";
import crew from "./modules/crew";
import story from "./modules/story";
import account from "./modules/account";
import review from "./modules/review";

export default createStore({
  modules: {
    //
    test,
    chat,
    crew,
    story,
    account,
    review,
  },
});
