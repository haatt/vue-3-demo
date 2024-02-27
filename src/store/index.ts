import { createStore } from "vuex";
import modalStorage from "@/store/modules/modalStorage";
import messagesStorage from "@/store/modules/messagesStorage";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    modal: modalStorage,
    messages: messagesStorage,
  },
});
