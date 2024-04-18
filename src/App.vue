<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$vuetify.theme.global.name = "light";
    localStorage.setItem("mode", this.$vuetify.theme.name);
    document.title = "WareHouse";
  },
};
</script>

<style>
.v-btn__overlay {
  background-color: transparent !important;
}
.s-container {
  padding: 32px;
  margin: 32px;
}
.with-shadow {
  box-shadow: 8px 16px 32px rgba(169, 221, 216, 0.5);
  height: fit-content;
  border: 1px solid #3aafa9;
  border-radius: 16px;
}
.with-shadow-full {
  box-shadow: 16px 16px 32px rgba(169, 221, 216, 0.5);
}
.without-shadow {
  box-shadow: none !important;
}
.with-border {
  border: 1px solid #3aafa9 !important;
  border-radius: 16px !important;
}
.with-border-bottom {
  border-bottom: 1px solid #3aafa9 !important;
  border-radius: 16px !important;
}
.with-padding {
  padding: 16px;
}
.v-field {
  background-color: rgba(169, 221, 216, 0.2);
}
.v-field__outline::before {
  border-color: #3aafa9 !important;
  border-bottom-width: 2px !important;
}
</style>
