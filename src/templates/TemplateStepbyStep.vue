<script setup>
import TemplateStepbyStepNavigator from "./TemplateStepbyStepNavigator.vue";
</script>
<template>
  <!-- {{receivedData}} -->
  <v-container class="with-padding">
    <TemplateStepbyStepNavigator
      :receivedData="receivedData"
      :current="this.current"
      :max="this.max"
      @stepbyStepReturn="StepbyStepReturn"
      class="with-border-bottom"
      style="margin-bottom: 16px"
    />
    <div v-for="(item, index) in receivedData">
      <div v-if="item && item.content">
        <component
          v-if="index == this.current"
          :is="item.content"
          :receivedData="item.data"
          :readData="backData"
          @formReturn="FormReturn"
        ></component>
      </div>
    </div>
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
      current: 0,
      max: 0,
      backData: {},
    };
  },
  methods: {
    FormReturn(data) {
      this.$emit("StepbyStepReturn", { index: this.current, data: data });
      this.backData[this.receivedData[this.current].data.struct.key] = data;
      this.current++;
      if (this.current > this.max) {
        this.max = this.current;
      }
    },
    StepbyStepReturn(data) {
      this.current = data;
      if (this.current > this.max) {
        this.current = this.max;
      }
    },
  },
};
</script>

<style scoped></style>
