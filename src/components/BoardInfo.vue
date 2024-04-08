<script setup>
// import ActionInfoSave from "../actions/ActionInfoSave.vue";
// import TemplateTextArea from "../templates/TemplateTextArea.vue";
import { utils, writeFile } from "xlsx";
import moment from "moment";
</script>
<template>
  <v-container fluid style="position: relative">
    <!-- Header -->
    <v-container fluid class="d-flex justify-space-between">
      <h1 class="text-core">Infos</h1>

      <div class="d-flex align-center">
        <v-btn
          color="transparent"
          icon
          elevation="0"
          @click="downloadExcel()"
          class="ml-2"
        >
          <v-icon> mdi-download </v-icon>
        </v-btn>

        <!-- <ActionInfoSave :receivedData="{}">
          <template #icon>mdi-account-plus-outline</template>
        </ActionInfoSave> -->

        <v-btn
          color="transparent"
          icon
          elevation="0"
          @click="syncAllInfos()"
          class="ml-2"
        >
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </div>
    </v-container>
    <hr />
    <!-- Main -->
    <v-container fluid>
      <v-table class="bg-second rounded-xl">
        <thead>
          <tr>
            <th v-for="(value, key) in searchFields" :key="key">
              <!-- <TemplateTextArea v-model="search[key]" :label="value" /> -->
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="info in infos" :key="info._id">
            <td
              v-for="(value, key) in searchFields"
              :key="key"
              style="border: none"
            >
              {{ info[key] }}
            </td>
            <td style="border: none">
              <!-- <ActionInfoSave :receivedData="info">
                <template #icon>mdi-pencil</template>
              </ActionInfoSave> -->
              <v-btn
                @click="deleteInfo(info._id)"
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
  data: () => ({
    infos: [],
    test: "",
    search: {
      lok: "",
      locomotive: "",
      train: "",
      driver: "",
      location: "",
      damage: "",
      breakType: "",
      extraTime: "",
      checker: "",
      date: "",
    },
    searchFields: {
      lok: "Lok",
      locomotive: "Locomotive",
      train: "Train",
      driver: "Driver",
      location: "Location",
      damage: "Damage",
      breakType: "Break Type",
      extraTime: "Extra Time",
      checker: "Checker",
      date: "Date",
    },
  }),
  mounted() {
    this.syncAllInfos();
  },
  watch: {
    search: {
      handler: "syncAllInfos",
      deep: true,
    },
  },
  methods: {
    async downloadExcel() {
      try {
        const data = this.infos.map((info) => {
          return {
            Лок: info ? info.lok.name : "",
            Огноо: info ? info.date : "",
            "Loco Эзэмшигч": info.locomotive.owner
              ? `${info.locomotive.owner.serial} ${info.locomotive.owner.name}`
              : "",
            "Loco Сериал": info.locomotive ? info.locomotive.serial : "",
            "Train Дугаар": info.train ? info.train.serial : "",
            "Гүйлт хугацаа": info.train ? info.train.range : "",
            Гол: info.train ? info.train.container : "",
            Жин: info.train ? info.train.mass : "",
            "Хэсэг Нэгж": info.driver
              ? `${info.driver.owner.serial} ${info.driver.owner.name}`
              : "",
            "Овог Нэр": info.driver
              ? `${info.driver.user.firstName} ${info.driver.user.lastName}`
              : "",
            "Үүсэн Нөхцөл Байдал Байршил": info.location ? info.location : "",
            "Гэмтлийн Групп": info.damage ? info.damage.group.name : "",
            "Тохиолдсон Эвдрэл": info.damage ? info.damage.problem : "",
            "Шийдвэрлэсэн Байдал": info.damage ? info.damage.solution : "",
            Хавсралт: info.damage ? info.damage.attachment : "",
            "Бүртгэсэн Ажилтан": info.checker
              ? `${info.checker.user.firstName} ${info.checker.user.lastName}`
              : "",
            "Бүртгэсэн Огноо": info
              ? moment(info.updateAt).format("YYYY-MM-DD HH:mm:ss")
              : "",
          };
        });

        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Infos");

        const blob = await writeFile(wb, "Infos.xlsx", {
          bookType: "xlsx",
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Infos.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Error exporting to Excel", err);
      }
    },
    async syncAllInfos(search) {
      try {
        if (!search) {
          this.search = {
            lok: "",
            locomotive: "",
            train: "",
            driver: "",
            location: "",
            damage: "",
            breakType: "",
            extraTime: "",
            checker: "",
            date: "",
          };
        }
        this.infos = [];
        const response = await this.axios.post("/auth/infos", search);
        if (response.status === 200) {
          this.infos = response.data;
        }
        // if (response.status === 200) {
        //   await Promise.all(response.data.map(async (element) => {
        //     const locomotive = await this.axios.post("/auth/locomotives",{_id: element.locomotive });
        //     const train = await this.axios.post("/auth/trains", { _id: element.train });
        //     const driver = await this.axios.post("/auth/users", { _id: element.driver });
        //     const checker = await this.axios.post("/auth/users", { _id: element.checker })
        //     const damage = await this.axios.post("/auth/damages", { _id: element.damage });
        //     this.infos.push({
        //       _id: element._id,
        //       lok: element.lok,
        //       locomotive: locomotive.data.serial,
        //       train: train.data.train,
        //       driver: driver.data.lastName,
        //       location: element.location,
        //       checker: checker.data.lastName,
        //       damage: damage.data.problem,
        //       date: element.date,
        //     })
        //   }));
        // }
      } catch (err) {
        console.log("syncing error", err);
      }
    },
    async deleteInfo(_id) {
      try {
        await this.axios.delete("/auth/infos/" + _id);
        location.reload();
      } catch (err) {
        console("Get all Infos Error", err);
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
