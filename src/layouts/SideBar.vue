<template>
  <v-app-bar
    v-if="screenWidth < 1280"
    color="main"
    scroll-behavior="hide"
    scroll-threshold="1"
    elevation="0"
  >
    <v-container fluid class="d-flex d-lg-none py-0 justify-space-between">
      <v-btn
        elevation="0"
        color="transparent"
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon color="core">mdi-menu</v-icon>
      </v-btn>
      <v-btn elevation="0" color="transparent" icon @click.stop="attendance()">
        <v-icon color="core">mdi-account-outline</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer
    touchless
    v-model="drawer"
    app
    dark
    color="main"
    class="pa-0"
    width="100"
    style="overflow: hidden; border: none"
  >
    <div
      class="d-flex flex-column justify-space-between py-4 scrollStyle"
      style="height: 100vh; width: 100px; overflow-y: auto; direction: rtl"
    >
      <div>
       <v-list flat class="mt-5">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :class="{ selected: selectItem === i }"
            :ripple="false"
            @click="navigateTo(item.link, item.index)"
            class="py-3 mb-4 px-0 listStyle"
          >
            <div class="d-flex flex-column align-center">
              <v-btn
                :color="selectItem === i ? 'white' : '#3aafa9'"
                icon
                elevation="0"
                size="small"
              >
                <v-icon
                  size="x-large"
                  :color="selectItem === i ? '#3aafa9' : 'white'"
                  >{{ item.icon }}</v-icon
                >
              </v-btn>
              <p
                style="font-size: 12px; font-weight: 400; opacity: 0.6"
                class="mt-1"
              >
                {{ item.text }}
              </p>
            </div>
          </v-list-item>
        </v-list>
      </div>

      <div class="mt-16">
        <v-list flat class="">

          <v-list-item @click="logout()" class="py-3 mb-4 px-0 listStyle">
            <div class="d-flex flex-column align-center">
              <v-icon size="x-large" color="core">mdi-logout</v-icon>
              <p
                style="font-size: 12px; font-weight: 400; opacity: 0.6"
                class="mt-1"
              >
                Log out
              </p>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    topMenu: false,
    screenWidth: window.innerWidth,
    selectItem: 0,
    drawer: null,
    items: [
      {
        icon: "mdi-view-dashboard",
        text: "DashBoard",
        link: "/",
        index: 0,
      },
    ],
  }),
  watch: {
    $route() {
      if (this.$route.name === "/v2") {
        this.selectItem = 0;
      }
    },
  },
  mounted() {
    const theme = localStorage.getItem("mode");
    if (theme) this.$vuetify.theme.global.name = theme;
    window.addEventListener("resize", this.updateScreenWidth);
    if (this.$route.name === "/v2") {
      this.selectItem = 0;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    navigateTo(link, index) {
      this.selectItem = index;
      this.$router.push(link);
    },
    handleItemClick(item) {
      if (item.title === "Ирц Бүртгэл") {
        this.attendance();
      } else if (item.title === "Гарах") {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem("user_Id"),
        localStorage.removeItem("token"),
        localStorage.removeItem("init"),
        this.$router.push("/login");
    },
    attendance() {
      this.$router.push("/attendance");
    },
    changeTheme() {
      this.$vuetify.theme.name == "dark"
        ? (this.$vuetify.theme.global.name = "light")
        : (this.$vuetify.theme.global.name = "dark");
      localStorage.setItem("mode", this.$vuetify.theme.name);
    },
  },
};
</script>

<style scoped>
.listStyle {
  background: transparent;
  border-left: 3px solid transparent;
  padding-right: 3px;
  font-size: 12px;
  font-weight: 700;
}
.selected {
  background: linear-gradient(to right, rgba(169, 221, 216, 0.5), transparent);
  border-left: 3px solid #3aafa9;
  opacity: 1;
}
.theme--light .v-list-item--active .v-list-item_subtitle,
.theme--light .v-list-item .v-list-item__action-text {
  color: white !important;
}

.scrollStyle::-webkit-scrollbar-track {
  background: rgba(59, 176, 170, 0.3);
}

.scrollStyle::-webkit-scrollbar-thumb {
  background: #3aafa9;
  border-radius: 12px;
}

.scrollStyle::-webkit-scrollbar-thumb:hover {
  background: #2c9893;
}

.scrollStyle::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
</style>
