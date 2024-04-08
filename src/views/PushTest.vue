<script setup>
import axios from "axios";
</script>
<template>
  <!-- {{ test }} -->
  <div
    style="width: 100px; height: 100px; background-color: green"
    @click="click"
  >
    test
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: "",
    };
  },
  methods: {
    async click() {
      const response = await axios.post("/bus/save", {
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
    async getBusData() {
      const response = await axios.post("/bus/get");
      this.test = response.data;
    },
  },
  mounted() {
    this.getBusData();
  },
};
</script>
