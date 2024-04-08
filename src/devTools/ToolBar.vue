<template>
  <div class="toolBar">
    <v-icon
      v-for="item in items"
      class="toolBarItem"
      @dragstart="handleDragStart($event, item.key)"
      draggable="true"
    >
      {{ item.icon }}
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      items: this.tools,
    };
  },
  methods: {
    handleDragStart(event, key) {
      event.dataTransfer.setData("text/plain", `${key}`); // Set the data to be transferred
    },
  },
};
</script>

<style scoped>
/* Add your ToolBar styles here */
.toolBar {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.toolBarItem {
  cursor: move;
  color: black;
  width: 100%;
  height: auto;
}
</style>
