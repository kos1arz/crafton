<template>
  <div class="mt-3 mb-5">
    <form @submit.prevent="submit" class="d-flex justify-content-center">
      <input
        id="name-input"
        class="w-50"
        name="name"
        type="text"
        placeholder="Wpisz użytkowników"
        @input="createUserTab"
      />
      <button type="submit" class="button-submmit">Zatwierdź</button>
    </form>
  </div>

  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li v-for="(user, index) in users" v-bind:key="index" class="nav-item">
      <a
        @click="getUserRepo(user)"
        class="nav-link"
        :id="[`pills-home-tab-${index}`]"
        data-toggle="pill"
        :href="[`#pills-home-${index}`]"
        role="tab"
        :aria-controls="[`pills-home-${index}`]"
        aria-selected="true"
        >{{ user }}</a
      >
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      v-for="(user, index) in users"
      v-bind:key="index"
      class="tab-pane fade"
      :id="[`pills-home-${index}`]"
      role="tabpanel"
      :aria-labelledby="[`pills-home-tab-${index}`]"
    >
      <div
        v-for="(repo, index) in currentUserRepo"
        v-bind:key="index"
        class="mb-2 alert alert-dark"
      >
        <a :href="[`${repo.html_url}`]" target="_blank"
          >{{ index + 1 }}. {{ repo.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      users: [],
      currentUser: null,
      currentUserRepo: null,
    };
  },
  name: "Git",
  watch: {
    allGit: {
      deep: true,
      handler: function () {
        this.findUserRepoInStore(this.currentUser);
      },
    },
  },
  methods: {
    ...mapActions(["getUserGit"]),
    findUserRepoInStore(user) {
      this.allGit.map((value) => {
        if (value[user]) {
          this.currentUserRepo = value[user];
        }
      });
    },
    getUserRepo(user) {
      this.currentUser = user;
      this.currentUserRepo = null;
      this.findUserRepoInStore(user);
      if (!this.currentUserRepo) {
        this.getUserGit(user);
      }
    },
    createUserTab(event) {
      const usersName = event.target.value;
      const usersArray = this.deleteToManywhitespace(usersName);
      usersArray.length > 0 ? (this.users = usersArray) : (this.users = []);
    },
    submit(event) {
      const usersName = event.target.elements.name.value;
      if (!usersName) return;
      const usersArray = this.deleteToManywhitespace(usersName);
      this.getUserRepo(usersArray[0]);
      const pillsTab = document.querySelector("#pills-tab .nav-link.active");
      const pillsTabContent = document.querySelector(
        "#pills-tabContent .tab-pane.active"
      );
      if (pillsTab) {
        pillsTab.classList.remove("active");
        pillsTab.classList.remove("show");
      }
      if (pillsTabContent) {
        pillsTabContent.classList.remove("active");
        pillsTabContent.classList.remove("show");
      }

      const pillsTabFirstChild = document.querySelector(
        "#pills-tab li:first-child a"
      );
      pillsTabFirstChild.classList.add("active");
      pillsTabFirstChild.classList.add("show");

      const pillsHomeFirstChild = document.querySelector("#pills-home-0");
      pillsHomeFirstChild.classList.add("active");
      pillsHomeFirstChild.classList.add("show");
    },
    deleteToManywhitespace(usersName) {
      return usersName.split(/(\s+)/).filter((e) => e.trim().length > 0);
    },
  },
  computed: mapGetters(["allGit"]),
};
</script>

<style>
.button-submmit {
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
}

.button-submmit:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.alert-dark a {
  color: #333;
}
</style>
