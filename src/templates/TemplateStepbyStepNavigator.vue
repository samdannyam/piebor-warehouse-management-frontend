<template>
  <!-- <v-col v-for="(item, index) in receivedData" :key="index" :style=" index === current ? 'background-color: green' : index <= max ? 'border: green 1px solid' : '' " @click="submit(index)"> -->
  <!-- {{ current }} -->
  <v-stepper
    :model-value="current"
    class="without-shadow"
    style="background-color: transparent"
  >
    <v-stepper-header>
      <template v-for="(item, index) in receivedData">
        <v-stepper-item
          :title="item.title"
          :value="index"
          @click="submit(index)"
          :editable="index <= max ? true : false"
        ></v-stepper-item>
        <v-divider
          :color="index <= max - 1 ? '#3aafa9' : 'blue-lighten-5'"
          :thickness="index <= max - 1 ? 2 : 1"
          class="border-opacity-100"
          :style="
            index <= max - 1
              ? 'box-shadow: 3px 3px 3px 3px rgba(169, 221, 216, 0.5);'
              : ''
          "
          v-if="index !== receivedData.length - 1"
        ></v-divider>
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  // data() {
  //   return {
  //     test: []
  //   }
  // },
  methods: {
    submit(index) {
      this.$emit("StepbyStepReturn", index);
    },
  },
};
</script>
<style></style>
