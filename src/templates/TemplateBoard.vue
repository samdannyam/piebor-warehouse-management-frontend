<script setup>
import ActionSave from "../actions/ActionSave.vue";
import TemplateTextArea from "../templates/TemplateTextArea.vue";
import GetData from "../scripts/GetData";
import TemplateSVGSelect from "./TemplateSVGSelect.vue";
import { utils, writeFile } from "xlsx";
import moment from "moment";
</script>
<template>
  <v-container fluid style="position: relative">
    <v-container fluid class="d-flex justify-space-between">
      <h1 class="text-core">{{ this.key }}</h1>

      <div class="d-flex align-center">
        <ActionSave :receivedData="{ struct: this.receivedData, data: {} }">
          <template #icon>mdi-plus</template>
        </ActionSave>

        <v-btn
          color="transparent"
          icon
          elevation="0"
          @click="downloadExcel()"
          class="ml-2"
        >
          <v-icon> mdi-download </v-icon>
        </v-btn>
        <v-btn
          color="transparent"
          icon
          elevation="0"
          @click="syncAll()"
          class="ml-2"
        >
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </div>
    </v-container>
    <hr />
    <!-- Main -->
    <!-- {{ options }} -->
    <!-- <br> -->
    <!-- {{ fields }} -->
    <v-container fluid>
      <v-table class="bg-second rounded-xl" style="padding: 16px">
        <thead>
          <tr>
            <th
              v-for="(value, key) in fields"
              :key="key"
              style="min-width: 300px"
            >
              <v-select
                v-if="value.type === 'select'"
                v-model="search[key]"
                :label="value.value"
                :items="options[key]"
                item-value="_id"
              ></v-select>
              <v-select
                v-else-if="value.type === 'svg'"
                v-model="search[key]"
                :label="value.value"
                :items="options[key]"
                @click="overlay[key] = true"
                hideNoData
                item-value="_id"
              ></v-select>
              <v-text-field
                v-else
                v-model="search[key]"
                :label="value.value"
                item-value="_id"
              ></v-text-field>
              <!-- <TemplateTextArea
                v-else
                v-model="search[key]"
                :label="value.value"
              /> -->
              <v-overlay
                v-if="value.type === 'svg'"
                v-model="overlay[key]"
                class="align-center justify-center"
                style="max-width: 100vw; max-height: 100vh"
              >
                <TemplateSVGSelect
                  :content="value.content"
                  @value="handleSVGSelect"
                />
              </v-overlay>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in datas" :key="data._id">
            <td v-for="(value, key) in fields" :key="key" style="border: none">
              {{ data[key]?.title ? data[key].title : data[key] }}
            </td>
            <td style="border: none">
              <ActionSave :receivedData="{ struct: receivedData, data: data }">
                <template #icon>mdi-pencil</template>
              </ActionSave>
              <v-btn
                @click="deleteItem(data._id)"
                color="transparent"
                elevation="0"
                size="x-small"
              >
                <v-icon> mdi-account-remove-outline </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-container>
</template>
<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      datas: [],
      search: {},
      key: this.receivedData.key,
      options: {},
      overlay: {},
      fields: this.receivedData.fields,
      test: "",
    };
  },
  async mounted() {
    this.loadData();
  },
  watch: {
    search: {
      handler: "syncAll",
      deep: true,
    },
  },
  methods: {
    async downloadExcel() {
      try {
        var excelData = [];
        const fieldKeys = Object.keys(this.fields);

        this.datas.forEach((data) => {
          var row = {};
          fieldKeys.forEach((fieldKey) => {
            if (this.fields[fieldKey]?.download?.active) {
              row[fieldKey] = data[fieldKey]?.title
                ? data[fieldKey].title
                : data[fieldKey];
            }
          });
          excelData.push(row);
        });

        const ws = utils.json_to_sheet(excelData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, `${this.key}s`);

        const blob = await writeFile(wb, `${this.key}s.xlsx`, {
          bookType: "xlsx",
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${this.key}.xlsx`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Error exporting to Excel", err);
      }
    },
    async loadData() {
      await this.syncAll();
      try {
        this.options = await GetData.getOptions(this.receivedData.fields);
      } catch (error) {
        console.error(error);
      }
    },
    handleSVGSelect(datas) {
      // console.log(datas)
      datas.forEach((data) => {
        this.search[data.key] = data.value;
        this.overlay[data.key] = false;
      });
      // this.test = this.search[data.key]
    },
    async syncAll(search) {
      try {
        const response = await this.axios.post(`/dynamic/${this.key}s`, search);
        if (response.status === 200) {
          this.datas = response.data;
          // this.test = this.datas;
        }
      } catch (err) {
        console.log("syncing error", err);
      }
    },
    async deleteItem(_id) {
      try {
        await this.axios.delete(`/dynamic/${this.key}s/delete/${_id}`);
        console.log(`/dynamic/${this.key}s/delete/${_id}`);
        this.loadData();
      } catch (err) {
        console("Get all Locomotives Error", err);
      }
    },
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

:deep() .v-data-table__expanded__content .v-data-table-locomotiveer {
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
