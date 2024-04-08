<script setup></script>
<template>
  <div
    class="diagramTable"
    :style="`z-index: ${isDragging ? 3 : editor.active ? 1 : 0}; top: ${editor.y}px; left: ${editor.x}px; border-radius: 2px !important;`"
    @mousedown="startDrag"
    @mousemove="handleMove"
    @mouseup="stopDrag"
  >
    <div
      @contextmenu.prevent="handleClick($event, 'schema')"
      style="
        cursor: move;
        border-bottom: 1px dashed #7743db;
        text-align: center;
      "
    >
      <v-row>
        <v-col>
          <input
            type="checkbox"
            v-model="editor.active"
            style="position: absolute; left: -15px; top: 5px"
          />
        </v-col>
        <v-col>
          <input
            v-model="key"
            style="border-bottom: 1px solid #7743db"
            label="key"
          />
        </v-col>
        <v-col>
          <input
            v-model="path"
            style="border-bottom: 1px solid #7743db"
            label="path"
          />
        </v-col>
      </v-row>

      <!-- <div :id="`{{key}}.head`" class="dot" style="left: -3px" @click="handleRef($event, index, 'title', ``)"></div> -->
    </div>
    <!-- {{ schema }} -->
    <div
      v-if="editor.active"
      @contextmenu.prevent="handleClick($event, 'schema')"
    >
      <div style="text-align: center">
        <v-row style="flex-wrap: nowrap !important">
          <v-col v-for="(value, key) in table">
            <v-row style="flex-wrap: nowrap !important">
              <v-col>
                {{ key }}
              </v-col>
            </v-row>
            <v-row
              v-if="typeof value === 'object'"
              style="flex-wrap: nowrap !important"
            >
              <v-col v-for="(value, key) in value">
                {{ key }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-row style="flex-wrap: nowrap !important">
        <v-col v-for="col in cols">
          <div style="cursor: move; border-bottom: 1px dashed #7743db">
            <div style="text-align: center">{{ col }}</div>
          </div>
          <div v-for="(value, index) in schema">
            <div v-if="col === 'key'" style="width: fit-content; padding: 5px">
              <input
                v-model="value.key"
                label="key"
                style="border-bottom: 1px solid #7743db"
              />
            </div>
            <div
              v-if="col === 'type'"
              style="padding: 5px; border-left: 1px solid #7743db"
            >
              <v-row style="flex-wrap: nowrap !important">
                <v-col>
                  <select
                    v-model="value.type"
                    label="type"
                    style="border-bottom: 1px solid #7743db"
                  >
                    <option
                      v-for="typeOption in typeOptions"
                      :value="typeOption"
                    >
                      {{ typeOption }}
                    </option>
                  </select>
                </v-col>
                <v-col v-if="value.type === 'ObjectId'">
                  <input
                    v-model="value.ref"
                    label="value"
                    style="border-bottom: 1px solid #7743db"
                  />
                </v-col>
                <v-col v-else></v-col>
              </v-row>
            </div>
            <div
              v-if="col === 'defaultBuild'"
              style="padding: 5px; border-left: 1px solid #7743db"
            >
              <v-row style="flex-wrap: nowrap !important">
                <v-col v-if="value.type === 'Boolean'">
                  <input type="checkbox" v-model="value.defaultBuild" />
                </v-col>
                <v-col v-else>
                  <input
                    v-model="value.defaultBuild"
                    label="value"
                    style="border-bottom: 1px solid #7743db"
                  />
                </v-col>
              </v-row>
            </div>
            <v-container
              v-if="col === 'field'"
              style="padding: 5px; border-left: 1px solid #7743db"
            >
              <v-row v-if="value.type" style="flex-wrap: nowrap !important">
                <v-col style="width: fit-content">
                  <input
                    v-model="value.field.value"
                    label="value"
                    style="border-bottom: 1px solid #7743db"
                  />
                </v-col>
                <v-col>
                  <select
                    v-model="value.field.type"
                    :items="fieldOptions[value.type]"
                    label="type"
                    style="border-bottom: 1px solid #7743db; min-width: 50px"
                  >
                    <option
                      v-for="fieldOption in fieldOptions[value.type]"
                      :value="fieldOption"
                    >
                      {{ fieldOption }}
                    </option>
                  </select>
                </v-col>
                <v-col v-if="value.field.type === 'svg'">
                  <input
                    v-model="value.field.content"
                    label="value"
                    style="border-bottom: 1px solid #7743db"
                  />
                </v-col>
                <v-col v-else> </v-col>
                <v-col>
                  <input
                    type="checkbox"
                    style="
                      color: #7743db;
                      background-color: #7743db;
                      border: 1px solid #7743db;
                    "
                    v-model="value.field.readOnly"
                  />
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>no type</v-col>
              </v-row>
            </v-container>
            <div
              v-if="col === 'download'"
              style="
                position: relative;
                padding: 5px;
                border-left: 1px solid #7743db;
              "
            >
              <v-row style="flex-wrap: nowrap !important">
                <v-col>
                  <input
                    type="checkbox"
                    style="
                      color: #7743db;
                      background-color: #7743db;
                      border: 1px solid #7743db;
                    "
                    v-model="value.field.download.active"
                  />
                </v-col>
                <v-col>
                  {{ value.field.download.tree }}
                </v-col>
                <!-- <v-col>
                  <div class="dot" style="right: -3px" @click="handleRef($event, index, 'body', `{{ value.ref }}`)"></div>
                </v-col> -->
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div
      style="border-top: 1px dashed #7743db; padding: 5px"
      @contextmenu.prevent="handleClick($event, 'links')"
    >
      <v-row>
        <v-col v-for="link in links">
          <input
            v-model="link.fullDir"
            label="value"
            style="border-bottom: 1px solid #7743db"
          />
        </v-col>
      </v-row>
    </div>
  </div>
  <div
    v-if="showMenu"
    :style="`z-index: 2; position: fixed; top: ${my}px; left: ${mx}px; border-radius: 2px !important;`"
  >
    <v-btn v-if="target === 'schema'" @click="addRow"> Add Row </v-btn>
    <v-btn v-if="target === 'links'" @click="addLink"> Add Link </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: false,
    },
    command: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      table: {
        key: "",
        type: "",
        defaultBuild: "",
        field: {
          value: "",
          type: "",
          content: "",
          readOnly: false,
        },
        download: {
          active: false,
          tree: {},
        },
      },
      _id: this.receivedData._id || "",
      key: this.receivedData.key || "none",
      roleGroup: this.receivedData.roleGroup || [],
      links: [],
      path: this.receivedData?.path ? this.receivedData.path : "",
      editor: this.receivedData.editor || { x: 0, y: 0, active: true },
      refLocs: [],
      showMenu: false,
      typeOptions: ["ObjectId", "String", "Number", "Date", "Boolean"],
      fieldOptions: {
        ObjectId: ["select", "svg"],
        String: ["text", "area"],
        Number: ["text"],
        Date: ["date"],
        Boolean: ["checkbox"],
      },
      cols: ["key", "type", "defaultBuild", "field", "download"],
      schema: [],
      isDragging: false,
      itemDragging: false,
      startX: 0,
      startY: 0,
      mx: 0,
      my: 0,
      target: "",
      test: "",
    };
  },
  watch: {
    command: {
      handler: "commandHandler",
    },
  },
  methods: {
    handleRef(event, index, type, ref) {
      this.$emit("ref", {
        key: this.key,
        index: index,
        type: type,
        ref: ref,
        loc: {
          x: event.clientX - this.editor.x,
          y: event.clientY - this.editor.y,
        },
      });
    },
    commandHandler(newValue, OldValue) {
      if (newValue === "save") {
        var schema = {};
        this.schema.forEach((schem) => {
          const { key, ...sche } = schem;
          schema[key] = sche;
        });
        const data = {
          _id: this._id,
          key: this.key,
          roleGroup: this.roleGroup,
          links: this.links,
          editor: this.editor,
          path: this.path,
          schema: schema,
        };
        this.$emit("return", data);
      }
    },
    setup() {
      if (this.receivedData.schema) {
        const schema = this.receivedData.schema;
        const schemaKeys = Object.keys(this.receivedData.schema);
        schemaKeys.forEach((schemaKey) => {
          const data = {
            key: schemaKey ? schemaKey : "",
            type: schema[schemaKey]?.type ? schema[schemaKey].type : "",
            ref: schema[schemaKey]?.ref ? schema[schemaKey].ref : "",
            defaultBuild: schema[schemaKey]?.defaultBuild
              ? schema[schemaKey].defaultBuild
              : "",
            field: {
              readOnly: schema[schemaKey]?.field?.readOnly
                ? schema[schemaKey].field.readOnly
                : false,
              value: schema[schemaKey]?.field?.value
                ? schema[schemaKey].field.value
                : "",
              type: schema[schemaKey]?.field?.type
                ? schema[schemaKey].field.type
                : "",
              content: schema[schemaKey]?.field?.content
                ? schema[schemaKey].field.content
                : "",
              download: {
                active: schema[schemaKey]?.field?.download?.active
                  ? schema[schemaKey].field.download.active
                  : false,
                tree: schema[schemaKey]?.field?.download?.tree
                  ? schema[schemaKey].field.download.tree
                  : {},
              },
            },
          };
          this.schema.push(data);
        });
        try {
          this.receivedData.links.forEach((link) => {
            this.links.push(link);
          });
        } catch (error) {
          this.links.push({ fullDir: "" });
        }
      } else {
        const data = {
          key: "",
          type: "",
          defaultBuild: "",
          field: {
            readOnly: false,
            value: "",
            type: "",
            content: "",
            download: {
              active: false,
              tree: {},
            },
          },
        };
        this.schema.push(data);
        this.links.push({ fullDir: "" });
      }
    },
    handleClick(event, target) {
      this.showMenu = !this.showMenu;
      this.target = target;
      this.mx = event.clientX;
      this.my = event.clientY;
      // console.log(this.showMenu)
    },
    addLink() {
      this.links.push({ fullDir: "" });
      this.showMenu = false;
    },
    addRow() {
      const data = {
        key: "",
        type: "",
        defaultBuild: "",
        field: {
          readOnly: false,
          value: "",
          type: "",
          content: "",
          download: {
            active: false,
            tree: {},
          },
        },
      };
      this.schema.push(data);
      this.showMenu = false;
    },
    handleItemDragging(value) {
      this.itemDragging = value;
    },
    startDrag(event) {
      if (!this.itemDraggring) {
        this.$emit("ItemDragged", true);
        this.isDragging = true;
        this.startX = event.clientX - this.editor.x;
        this.startY = event.clientY - this.editor.y;
      }
    },
    handleMove(event) {
      if (this.isDragging) {
        this.editor.x = event.clientX - this.startX;
        this.editor.y = event.clientY - this.startY;
      }
    },
    stopDrag() {
      this.isDragging = false;
      this.$emit("ItemDragged", false);
    },
  },
  mounted() {
    this.setup();
  },
};
</script>
<style scoped>
.diagramTable {
  cursor: auto;
  position: absolute;
  width: fit-content;
  height: min-content;
  background-color: #fffbf5;
  border: 1px solid #7743db;
}
.dot {
  cursor: auto;
  position: absolute;
  background-color: black;
  top: 20px;
  /* right: -8px; */
  height: 5px;
  width: 5px;
}
.dot:hover {
  /* transform: translate(30%,-20%); */
  background-color: blue;
  /* height: 10px;
  width: 15px; */
}
v-col {
  height: 25px;
}
</style>
