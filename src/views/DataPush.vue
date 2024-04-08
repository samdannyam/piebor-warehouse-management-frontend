<script setup>
import TemplateStepbyStep from "../templates/TemplateStepbyStep.vue";
import TemplateForm from "../templates/TemplateForm.vue";
import MapSVG from "../assets/svgs/MapSVG.vue";
import TemplateTree from "../templates/TemplateTree.vue";
import GetData from "../scripts/GetData";
</script>
<template>
  <!-- {{ items }} -->
  <v-container>
    <v-row>
      <v-col v-for="(obj, key) in toggleDatas">
        <v-btn-toggle
          class="with-border"
          style="padding: 5px; background-color: rgb(169, 221, 216)"
          :rounded="toggleDatas[key].rounded"
        >
          <v-btn
            v-for="(data, index) in obj.datas"
            :rounded="toggleDatas[key].rounded"
            @click="SelectToggle(key, index)"
            :style="
              toggleDatas[key].value == index
                ? 'color: #000;'
                : 'background-color: rgb(169, 221, 216);'
            "
            :class="toggleDatas[key].value == index ? 'with-border' : ''"
            :icon="data.icon"
          ></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="s-container with-shadow">
    <TemplateStepbyStep
      v-if="toggleDatas.type.value == 0"
      :receivedData="items"
      @stepbyStepReturn="StepbyStepReturn"
    />
    <TemplateTree
      v-if="toggleDatas.type.value == 1"
      :receivedData="items"
      @treeReturn="TreeReturn"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      buildDatas: {},
      items: [],
      test: "",
      toggleDatas: {
        type: {
          value: -1,
          rounded: "xl",
          datas: [
            { icon: "mdi-fast-forward" },
            { icon: "mdi-file-tree-outline" },
          ],
        },
      },
      loaded: false,
    };
  },
  methods: {
    async load() {
      this.buildDatas = await GetData.getViews({ key: this.$route.fullPath });

      const buildKeys = Object.keys(this.buildDatas);
      buildKeys.forEach((buildKey) => {
        const fields = this.buildDatas[buildKey].fields;
        const fieldKeys = Object.keys(fields);
        fieldKeys.forEach((fieldKey) => {
          if (fields[fieldKey].type === "svg") {
            if (fields[fieldKey].content === "MapSVG") {
              this.buildDatas[buildKey].fields[fieldKey].content = MapSVG;
            }
          }
        });
      });

      this.loaded = true;
      this.LoadToggleData();
      this.CreateForms();
    },
    comparePaths(a, b) {
      const pathA = a.data.struct.path.split(".").map(Number);
      const pathB = b.data.struct.path.split(".").map(Number);
      console.log(pathA + " " + pathB);

      let i = 0;
      while (i < pathA.length && i < pathB.length && pathA[i] === pathB[i]) {
        i++;
      }

      return (
        (i < pathB.length ? pathB[i] : 0) - (i < pathA.length ? pathA[i] : 0)
      );
    },
    SelectToggle(key, index) {
      this.toggleDatas[key].value = index;
      localStorage.setItem(`DataPush.Toggle.${key}`, `${index}`);
    },
    StepbyStepReturn(data) {
      // this.items[data.index].data.data = data.data;
    },
    TreeReturn() {},
    CreateForms() {
      const keys = Object.keys(this.buildDatas);
      keys.forEach((key) => {
        this.items.push({
          content: TemplateForm,
          title: `${this.buildDatas[key].key}`,
          data: { struct: this.buildDatas[key], data: {} },
        });
      });
      this.items = this.items.slice().sort(this.comparePaths);
      // this.test = this.items[0].data;
    },
    LoadToggleData() {
      const toggleKeys = Object.keys(this.toggleDatas);
      toggleKeys.forEach((toggleKey) => {
        const index = localStorage.getItem(`DataPush.Toggle.${toggleKey}`);
        this.toggleDatas[toggleKey].value = index;
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style></style>
