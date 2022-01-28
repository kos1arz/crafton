import axios from 'axios';

const url = (userName) => `https://api.github.com/users/${userName}/repos`;

const state = {
    git: []
};

const getters = {
    allGit: (state) => state.git
};

const actions = {
    async getUserGit({ commit }, userName) {
        const response = await axios.get(url(userName));
        const userRepos = response.data;
        commit('setUsersRepos',  { userRepos, userName });
      },
};

const mutations = {
    setUsersRepos: (state, { userRepos, userName }) => {
        const innerObj = {};
        innerObj[userName] = userRepos;
        state.git.push(innerObj);
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
