<script setup>
import axios from "axios";
import Spinner from "vue-spinner/src/ScaleLoader.vue";
</script>
<template>
  <!-- <div
    style="width: 100px; height: 100px; background-color: green"
    @click="click"
  >
    test
  </div> -->
  <!-- {{ datas }}
  filter: {{ filter }}
  <hr />
  {{ filt }} -->
  <v-table>
    <thead>
      <tr>
        <th v-for="key in keys" class="text-left">
          {{ key.value }}
        </th>
        <th>
          <!-- <v-date-picker v-model="filter.date">
                    </v-date-picker> -->
          <input type="date" v-model="filter.date" name="" id="" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, key) in datas" :key="key">
        <td v-for="key in keys">{{ value[key.key] }}</td>
        <td>{{ value.date }}</td>
      </tr>
    </tbody>
  </v-table>
  <div v-if="loading" class="loading-overlay">
    <spinner :color="'#5cb85c'" :size="'medium'" :thickness="'4px'"></spinner>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      test: "",
      filter: {
        date: null,
      },
      filt: {},
      datas: [],
      keys: [
        { key: "route", value: "Чиглэл" },
        { key: "busId", value: "Автобусын дугаар" },
        { key: "res", value: "Рейс" },
        { key: "km", value: "Туулсан зай" },
        { key: "resRange", value: "Рейсийн урт" },
        { key: "stop_time", value: "Зогсолтын хугацаа" },
      ],
    };
  },
  watch: {
    filter: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
  methods: {
    async init() {
      this.loading = true; // Show loading indicator
      try {
        const filter = {
          date: this.filter.date
            ? new Date(this.filter.date).toISOString()
            : "",
        };
        this.filt = filter;
        const response = await axios.post("/bus/get", filter);
        this.datas = response.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.loading = false;
      }
    },
    async click() {
      const response = await axios.post("/bus/save", {
        test: true,
        applicationID: "28",
        applicationName: "GPS",
        deviceName: "6820210907000006",
        devEUI: "aCAhCQcAAAY=",
        rxInfo: [],
        txInfo: {
          frequency: 920400000,
          modulation: "LORA",
          loRaModulationInfo: {
            bandwidth: 125,
            spreadingFactor: 12,
            codeRate: "4/5",
            polarizationInversion: false,
          },
        },
        adr: true,
        dr: 0,
        fCnt: 3,
        fPort: 2,
        // "data": "QAwAAAAAAAAAAAA=",
        data: "AQ0gIAcDExUQAQEC",
        objectJSON: "",
        tags: {},
        confirmedUplink: false,
        devAddr: "AT6Q4Q==",
        publishedAt: "2023-11-22T11:55:27.378305606Z",
        deviceProfileID: "7e7cd0b1-fe60-4a83-9b63-19a44629ae5e",
        deviceProfileName: "Test OTAA",
      });
      // this.test = response.data
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
