<script setup>
import Chart from "../components/Chart.vue";
import GetData from "../scripts/GetData";
</script>

<template>
  <!-- {{ test }} -->
  <v-container class="with-shadow" :key="reloadKey">
    <template v-if="!dataEmpty">
      <template v-for="(chart, index) in charts">
        <Chart
          :data="chart.data"
          :title="chart.key"
          type="pie"
          :colors="['#7cd6fd', '#743ee2']"
        />
        <v-divider v-if="index !== charts.length - 1" />
      </template>
    </template>
    <template v-else>
      <h3>Data not found</h3>
    </template>
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
      received: this.receivedData,
      charts: [],
      test: {},
      current: "",
      dataEmpty: false,
    };
  },
  watch: {
    received: {
      async handler(newValue, oldValue) {
        this.charts = [];
        if (this.current !== JSON.stringify(newValue)) {
          this.current = JSON.stringify(newValue);
          await this.dataConvert(newValue);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async dataConvert(input) {
      const chart = input;
      const data = await GetData.getAll(chart.key, chart.filter);
      // this.test["data"] = data
      // this.test["options"] = []
      if (data.length !== 0) {
        this.dataEmpty = false;
        const fieldKeys = Object.keys(chart.fields);
        const fields = chart.fields;
        // this.test = fields
        const options = await GetData.getOptions(fields);
        // this.test["options"].push(options)
        fieldKeys.forEach((fieldKey) => {
          const field = fields[fieldKey];
          if (field.type === "select" && !field.readOnly) {
            let counts = [];
            let labels = [];
            try {
              options[fieldKey].forEach((option) => {
                var count = 0;
                data.forEach((dat) => {
                  if (
                    dat[fieldKey]?._id === option._id ||
                    dat[fieldKey] === option._id
                  ) {
                    count++;
                  }
                });
                counts.push(count);
                labels.push(option.title);
              });
            } catch (error) {}
            const outField = {
              labels: labels,
              datasets: [{ name: fieldKey, values: counts }],
            };
            this.charts.push({ key: field.value, data: outField });
          }
        });
      } else {
        this.dataEmpty = true;
      }
      // this.test = this.charts;
    },
  },
  async mounted() {
    // await this.dataConvert(this.receivedData);
  },
};
</script>
