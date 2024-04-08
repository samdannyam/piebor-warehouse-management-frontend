<template>
  <v-btn class="userBtn" @click="toggle" color="primary" icon>
    <v-icon size="x-large" color="white"> <slot name="icon"></slot> </v-icon>
  </v-btn>
  <div
    v-if="showUser"
    class="user-window rounded-xl"
    style="width: 500px"
    :style="`background: linear-gradient(${$vuetify.theme.current.colors.main} 60%, ${$vuetify.theme.current.colors.second})`"
  >
    <div class="user-header bg-main">
      <v-tabs color="primary" density="compact" right>
        <v-tab @click="(selectMenu = 0), load()" class="text-core">Add</v-tab>
        <!-- <v-tab @click="(selectMenu = 1), load()" class="text-core">users</v-tab> -->
      </v-tabs>
      <v-btn elevation="0" color="transparent" icon @click="closeUser">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div v-if="addDiv" class="d-flex flex-column">
      <slot> </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TemplateModal",
  data() {
    return {
      showUser: false,
      selectMenu: 0,
      addDiv: true,
      usersDiv: false,
    };
  },
  methods: {
    toggle() {
      this.openUser();
    },
    openUser() {
      this.showUser = true;
    },
    closeUser() {
      this.usersDiv = false;
      this.addDiv = true;
      this.showUser = false;
      location.reload();
    },

    load() {
      if (this.selectMenu === 0) {
        this.usersDiv = false;
        this.addDiv = true;
      } else if (this.selectMenu === 1) {
        this.addDiv = false;
        this.usersDiv = true;
      }
    },
  },
};
</script>
<style scoped>
.userBtn {
  cursor: pointer;
  /* position: fixed;
  bottom: 23px;
  right: 28px; */
  padding: 15px, 15px;
  border: 1, solid, white;
  border-radius: 50%;
}

.user-window {
  position: fixed;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 1200px;
  z-index: 1000;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.content {
  width: 100%;
  flex-grow: 1;
  background-color: white;
  font-size: 16px;
}

.scrollStyle::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollStyle::-webkit-scrollbar-thumb {
  background: #888;
}

.scrollStyle::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.scrollStyle::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
</style>
