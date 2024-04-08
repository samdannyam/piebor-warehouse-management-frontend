<script setup>
import TemplateForm from "../templates/TemplateForm.vue";
import TemplateModal from "../templates/TemplateModal.vue";
</script>
<template>
  <TemplateModal>
    <TemplateForm :receivedData="receivedData" />
    <template #icon>
      <slot name="icon"></slot>
    </template>
  </TemplateModal>
</template>
<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: false,
    },
  },
};
</script>
