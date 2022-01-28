import { createApp } from 'vue';
import Vuex from 'vuex';
import git from './modules/git';

createApp().use(Vuex);

export default new Vuex.Store({
  modules: {
    git
  }
});
