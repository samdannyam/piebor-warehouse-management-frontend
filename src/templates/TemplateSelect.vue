<template>
  <v-select
    type="text"
    v-model="modelValue"
    class="content bg-main"
    :label="label"
    :items="options"
    item-value="_id"
    item-title="name"
    hide-details
    rows="1"
    variant="outlined"
  >
  </v-select>
</template>

<script setup>
import { ref, watch } from "vue";

const { model, label, options } = defineProps(["model", "label", "options"]);
const emit = defineEmits();

const modelValue = ref(model);

watch(
  () => model,
  (newValue) => {
    modelValue.value = newValue;
    emit("update:model", newValue);
  },
);
</script>
