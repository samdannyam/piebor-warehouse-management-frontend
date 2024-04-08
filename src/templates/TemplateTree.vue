<script setup></script>
<template>
  {{ test }}
  <v-container class="with-padding">
    <div v-for="(item, index) in receivedData">
      <div v-if="item && item.content">
        <component
          v-if="index === receivedData.length - 1"
          :is="item.content"
          :receivedData="item.data"
          :readData="backData"
          @formReturn="FormReturn"
          @readOnlyReturn="ReadOnlyReturn"
        ></component>
        <v-overlay
          v-if="item.data.struct.key === subTree"
          v-model="overlay[item.data.struct.key]"
          class="align-center justify-center"
          style="max-width: 100vw; max-height: 100vh"
        >
          <v-container
            class="with-shadow s-container"
            style="background-color: #fff; width: fit-content; min-width: 500px"
          >
            <component
              :is="item.content"
              :receivedData="item.data"
              :readData="backData"
              @formReturn="FormReturn"
              @readOnlyReturn="ReadOnlyReturn"
            ></component>
          </v-container>
        </v-overlay>
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
      backData: {},
      test: "",
      subTree: "",
      overlay: [],
    };
  },
  methods: {
    FormReturn(data) {
      this.$emit("StepbyStepReturn", { index: this.current, data: data });
      //   this.test = this.current
      this.backData[this.subTree] = data;
      this.overlay[this.subTree] = false;
      this.test = this.backData;
    },
    ReadOnlyReturn(key) {
      this.subTree = key;
      this.overlay[key] = true;
    },
  },
};
</script>

<style scoped></style>
