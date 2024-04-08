<script setup>
import axios from "axios";
import ToolBar from "./ToolBar.vue";
import EditorField from "./EditorField.vue";
import DiagramTable from "./DiagramTable.vue";
</script>
<template>
  {{ test }}
  <div v-if="loaded" class="bigArea">
    <div class="editorFieldMaster">
      <div class="areaMaster" style="overflow: scroll">
        <EditorField
          :receivedData="items"
          :tools="tools"
          :command="gocommand"
          @return="editorFieldReturn"
          @editorField-dropped="handleToolBarDrop"
        />
      </div>
    </div>
    <!-- {{ items }} -->
    <div class="toolBarMaster">
      <div class="areaMaster">
        <v-btn @click="save">save</v-btn>
        <ToolBar :tools="tools" @toolbar-dropped="handleToolBarDrop" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gocommand: "",
      loaded: false,
      items: [],
      tools: [
        { icon: "mdi-table", key: "AddTable", content: DiagramTable, data: {} },
      ],
      test: "",
    };
  },
  methods: {
    async editorFieldReturn(data) {
      if (this.gocommand === "save") {
        this.test = data;
        console.log("data");
        const response = await axios.post("/dev/save", data);
        this.test = response.data;
      }
      this.gocommand = "";
    },
    async setup() {
      var response = await axios.get("/dev/get");
      response.data.forEach((item) => {
        this.items.push({ data: item, content: DiagramTable });
      });
      this.loaded = true;
    },
    async save() {
      // const response = await axios.post("/test/save", this.items);
      this.gocommand = "save";
      // this.command = ''
      // this.$emit("globalCommand",'save')
      // console.log('ok1')
    },
    handleToolBarDrop() {
      // console.log("ToolBar dropped!");
    },
  },
  mounted() {
    document.title = "Dev Option";
    this.setup();
  },
};
</script>
<style scoped>
.bigArea {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #fffbf5;
  overflow-y: hidden;
}
.toolBarMaster {
  position: absolute;
  width: 100px;
  height: 100%;
  border-right: 3px dashed #7743db;
}
.editorFieldMaster {
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 100px;
}
.areaMaster {
  width: 100%;
  height: 100%;
  position: relative;
  /* border: 8px solid white; */
}
</style>
<style>
html {
  overflow: auto;
}
</style>

<!-- ErrorCaptureStackTrace(err);
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:405:5)
    at ServerResponse.setHeader (node:_http_outgoing:648:11)
    at ServerResponse.header (C:\Users\samda\OneDrive\Documents\Work\Project\Train\backend\node_modules\express\lib\response.js:794:10)
    at ServerResponse.send (C:\Users\samda\OneDrive\Documents\Work\Project\Train\backend\node_modules\express\lib\response.js:174:12)
    at ServerResponse.json (C:\Users\samda\OneDrive\Documents\Work\Project\Train\backend\node_modules\express\lib\response.js:278:15)
    at updateModelBase (C:\Users\samda\OneDrive\Documents\Work\Project\Train\backend\src\models\modelBuilder.js:34:21) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

Node.js v18.18.0
[nodemon] app crashed - waiting for file changes before starting... -->
