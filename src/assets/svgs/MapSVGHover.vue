<script setup>
import GetData from "../../scripts/GetData";
</script>

<template>
  <v-container
    v-if="active"
    class="with-border MapSVGHover"
    :style="`top: ${y - 120}px; left: ${x + 20}px;`"
    @mouseleave="mouseLeaveHandler"
  >
    {{ receivedData }}
    <br />
    {{ x }}
    <br />
    {{ y }}
  </v-container>
</template>

<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: true,
    },
    x: {
      type: Number,
      required: false,
    },
    y: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      active: true,
      size: 0,
    };
  },
  watch: {
    receivedData: {
      handler() {
        this.active = true;
      },
      implement: true,
    },
  },
  mounted() {
    this.getAll();
  },
  methods: {
    mouseLeaveHandler() {
      this.active = false;
    },
    async getAll() {
      const route = await GetData.getAll("location", {
        route: this.receivedData,
      });
      const response = await GetData.getAll("info", { location: route[0]._id });
      this.size = response.length;
    },
  },
};
</script>

<style scoped>
.MapSVGHover {
  position: absolute;
  width: fit-content;
  height: fit-content;
  background-color: white;
}
</style>
