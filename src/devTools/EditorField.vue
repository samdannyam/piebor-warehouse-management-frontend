<script setup>
// import DiagramTable from "./DiagramTable.vue";
</script>
<template>
  <div
    class="editorField"
    :style="`top: ${y}px; left: ${x}px;`"
    @dragover.prevent
    @drop="handleDrop"
    @mousedown="startDrag"
    @mousemove="handleMove"
    @mouseup="stopDrag"
  >
    <!-- {{ gocommand }} -->
    <!-- <br /> -->
    <!-- {{ test }} -->
    <!-- <br /> -->
    <!-- {{ items }} -->
    <!-- <DiagramTable @ItemDragged="handleItemDragging" /> -->
    <component
      v-for="(item, index) in items"
      :is="item.content"
      :receivedData="item.data"
      :command="gocommand"
      @ref="refController"
      @ItemDragged="handleItemDragging"
      @click="handleItemClick(index)"
      :class="selected == index ? 'with-shadow' : ''"
      @return="handleReturn"
    >
    </component>
    <svg>
      <path
        v-for="ref in refs"
        :d="`M {{}}`"
        fill="none"
        stroke="black"
        stroke-miterlimit="10"
        pointer-events="stroke"
        stroke-width="1"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: false,
    },
    tools: {
      type: Object,
      required: false,
    },
    command: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      refs: [],
      gocommand: "",
      selected: "",
      items: this.receivedData,
      tools: this.tools,
      isDragging: false,
      itemDragging: false,
      startX: 0,
      startY: 0,
      test: this.receivedData,
      returnDatas: [],
      x: 0,
      y: 0,
    };
  },
  watch: {
    command: {
      handler: "commandHandler",
    },
  },
  methods: {
    refController(data) {},
    handleReturn(data) {
      this.returnDatas.push(data);
      if (this.returnDatas.length === this.items.length) {
        this.$emit("return", this.returnDatas);
      }
    },
    commandHandler(newValue, OldValue) {
      if (newValue === "save") {
        this.returnDatas = [];
        this.gocommand = "save";
      } else if (newValue === "") {
        this.gocommand = "";
      }
    },
    handleItemClick(index) {
      this.selected = index;
    },
    handleItemDragging(value) {
      this.itemDragging = value;
    },
    handleDrop(event) {
      event.preventDefault();
      const draggedItem = event.dataTransfer.getData("text/plain");
      this.tools.forEach((tool) => {
        if (draggedItem === tool.key) {
          this.items.push(tool);
          this.$emit("editorField-dropped"); // Emit a custom event when ToolBar is dropped
        }
      });
    },
    startDrag(event) {
      if (!this.itemDragging) {
        this.$emit("ItemDragged", true);
        this.isDragging = true;
        this.startX = event.clientX - this.x;
        this.startY = event.clientY - this.y;
      }
    },
    handleMove(event) {
      if (this.isDragging) {
        this.x = event.clientX - this.startX;
        this.y = event.clientY - this.startY;
      }
    },
    stopDrag() {
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.editorField {
  cursor: move;
  height: 100%;
  width: 100%;
  /* background-color: green; */
  position: absolute;
  border: 1px solid #c3acd0;
  background-color: #f7efe5;
  /* transform: translate(50%,50%); */
}
</style>
