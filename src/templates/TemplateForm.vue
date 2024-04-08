<script setup>
import MapSVG from "../assets/svgs/MapSVG.vue";
import GetData from "../scripts/GetData";
import TemplateSVGSelect from "../templates/TemplateSVGSelect.vue";
</script>
<template>
  <!-- {{ readData }}
  <br> -->
  {{ test }}
  <form @submit.prevent="save">
    <div
      class="form-group"
      v-for="(value, key) in this.receivedData.struct.fields"
    >
      <v-select
        v-if="value.type === 'svg'"
        :label="value.value"
        v-model="data[key]"
        :items="options[key]"
        @click="overlay[key] = true"
        hideNoData
        item-value="_id"
      />
      <v-overlay
        v-if="value.type === 'svg'"
        v-model="overlay[key]"
        class="align-center justify-center"
        style="max-width: 100vw; max-height: 100vh"
      >
        <TemplateSVGSelect :content="value.content" @value="handleSVGSelect" />
      </v-overlay>

      <v-select
        v-if="value.type === 'select'"
        :label="value.value"
        v-model="data[key]"
        :items="options[key]"
        item-value="_id"
        :readonly="value?.readOnly === true ? true : false"
        @click="value?.readOnly === true ? readOnlyClick(key) : ''"
      />

      <v-text-field
        v-else-if="value.type === 'text'"
        :label="value.value"
        v-model="data[key]"
        item-value="_id"
      />
      <input
        v-else-if="value.type === 'date'"
        :label="value.value"
        name=""
        type="date"
        v-model="data[key]"
      />
      <v-textarea
        v-else-if="value.type === 'area'"
        :label="value.value"
        v-model="data[key]"
        :placeholder="value.value"
      />
      <v-file-input
        v-else-if="value.type === 'file'"
        :label="value.value"
        chips
        multiple
        v-model="data[key]"
      ></v-file-input>
    </div>
    <v-btn color="transparent" class="d-flex" type="submit" elevation="0">
      Save <v-icon class="ml-2">mdi-content-save</v-icon>
    </v-btn>
  </form>
</template>
<script>
export default {
  name: "Form",
  props: {
    receivedData: {
      type: Object,
      required: false,
    },
    readData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      key: this.receivedData.struct.key,
      options: {},
      overlay: {},
      data: this.receivedData.data,
      test: "",
    };
  },
  methods: {
    readOnlyClick(key) {
      this.$emit("readOnlyReturn", key);
    },
    setReadOnly() {
      const fields = this.receivedData.struct.fields;
      const fieldKeys = Object.keys(fields);
      fieldKeys.forEach((fieldKey) => {
        if (fields[fieldKey].readonly === true) {
          this.data[fieldKey] = this.readData[fieldKey]._id;
        }
      });
    },
    handleSVGSelect(datas) {
      datas.forEach((data) => {
        this.data[data.key] = data.value;
        this.overlay[data.key] = false;
      });
      // this.test = this.data[data.key]
    },
    async save() {
      try {
        const response = await this.axios.post(
          `/dynamic/${this.key}s/save`,
          this.data,
        );
        this.$emit("formReturn", response.data);
        this.data = {};
        // location.reload();
      } catch (err) {
        console.error("Saving datas error", err);
      }
    },
  },
  async mounted() {
    // this.test = this.receivedData;
    this.options = await GetData.getOptions(this.receivedData.struct.fields);
    this.setReadOnly();
  },
};
</script>
