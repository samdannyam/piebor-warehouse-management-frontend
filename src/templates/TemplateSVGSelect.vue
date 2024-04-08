<script setup></script>
<template>
  <!-- <MapSVG @svgReturn="SVGReturn" /> -->
  <component
    class="with-shadow"
    style="background-color: white"
    :receivedData="receivedData"
    :is="content"
    @svgReturn="SVGReturn"
  />
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    receivedData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      test: "",
    };
  },
  methods: {
    async SVGReturn(input) {
      this.$emit("value", input);
    },
  },
};
</script>

<style></style>
