<script setup>
import TemplateBoard from "../templates/TemplateBoard.vue";
import MapSVG from "../assets/svgs/MapSVG.vue";
import GetData from "../scripts/GetData";
// import BoardInfo from "../components/BoardInfo.vue";
</script>
<template>
  <!-- <v-container>
    <BoardInfo/>
  </v-container> -->
  <!-- {{ this.$route.fullPath }} -->
  <!-- {{ buildDatas }} -->
  <v-container v-if="loaded" v-for="board in buildDatas">
    <TemplateBoard :receivedData="board" class="with-shadow" />
  </v-container>
</template>
<script>
export default {
  data: () => ({
    buildDatas: {},
    loaded: false,
  }),
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
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
.theme--light .v-timeline::before {
  background: #7c7c7f;
}

.border {
  background: #22222c;
  border-radius: 20px;
}

.grey-text {
  color: #a1a0a4;
}

.white-text {
  color: white;
}

.red-text {
  color: white;
}

.circular-avatar {
  border-radius: 50%;
}

.progress-label {
  color: white;
  margin-right: 10px;
}

.active-off {
  background-color: transparent;
  color: red;
  text-decoration: line-through;
}

.my-menu {
  margin-top: 8px;
  contain: initial;
  overflow: visible;
}

.progress-bar {
  margin: 0 auto;
  min-width: 500px;
}

.current-status {
  margin-right: 10px;
  display: flex;
  justify-content: center;
}

.status-text {
  text-align: center;
  font-weight: bold;
}

.description-text {
  white-space: normal;
  /* Prevent text from wrapping */
  overflow: visible;
  /* Hide overflow */
  text-overflow: ellipsis;
  /* Show an ellipsis (...) when text overflows */
  display: inline-block;
  max-width: 100%;
  /* Adjust the max-width as needed */
  vertical-align: middle;
}

:deep() .v-data-table__expanded__content .v-data-table-header {
  background-color: transparent;
}

:deep()
  .v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none;
}

.my-menu-top {
  margin-bottom: 8px;
  contain: initial;
  overflow: visible;
}

.my-menu-top::before {
  position: absolute;
  content: "";
  bottom: 8px;
  left: 0px;
  transform: translateY(100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 13px solid #fff;
}

.hover:hover {
  cursor: pointer;
  background-color: #ebebeb;
  border-radius: 5px;
}

:deep() .v-btn--disabled.v-btn--variant-elevated .v-btn__overlay {
  opacity: 0;
}

:deep() .v-btn--disabled > .v-btn__content {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>

layout: { name: block, style: [ micns:"" ] data: [ {name: product, data:} ] }
