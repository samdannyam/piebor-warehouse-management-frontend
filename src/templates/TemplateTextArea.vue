<template>
  <v-textarea
    type="text"
    v-model="modelValue"
    class="content bg-main"
    :label="label"
    hide-details
    rows="1"
    variant="outlined"
  >
  </v-textarea>
</template>

<script setup>
import { ref, watch } from "vue";

const { model, label } = defineProps(["model", "label"]);
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
