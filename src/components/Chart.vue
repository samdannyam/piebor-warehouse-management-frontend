<template>
  <div>
    {{ test }}
    <div ref="chart"></div>
  </div>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

export default {
  name: "Chart",
  props: {
    data: Object,
    title: String,
    type: String,
    height: Number,
    colors: Array,
  },
  data() {
    return {
      rdata: this.data,
      // test: this.data
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {
    data: {
      handler(newData, oldData) {
        this.rdata = newData;
        // this.test = this.rdata
        this.initChart();
      },
    },
  },
  methods: {
    initChart() {
      const chart = new Chart(this.$refs.chart, {
        title: this.title || "",
        data: this.rdata || {},
        type: this.type || "axis-mixed",
        height: this.height || 170,
        colors: this.colors || ["#7cd6fd", "#743ee2"],
      });
    },
  },
};
</script>

<style scoped>
/* Add your component styles here if needed */
</style>
