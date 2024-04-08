<template>
  <v-app>
    <SideBar />
    <v-main
      :style="`background: ${$vuetify.theme.current.colors.main}`"
      style="min-height: 100vh"
    >
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./SideBar.vue";

export default {
  name: "App",

  components: {
    SideBar,
  },
};
</script>
