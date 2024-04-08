<template>
  <v-card class="px-5 bg-main rounded-xl">
    <v-card-title class="pt-4 pl-1 text-core"> Create Task </v-card-title>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="newTask.name"
          label="Task Name"
          class="text-core"
          outlined
          dense
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="newTask.owner"
          label="Owner"
          class="text-core"
          :items="workersComputed"
          outlined
          return-object
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          class="text-core"
          label="Task description"
          v-model="newTask.description"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="Due Date"
          v-model="newTask.dueDate"
          type="date"
          class="text-core"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="newTask.taskType"
          label="Task type"
          class="text-core"
          :items="taskTypes"
          outlined
          return-object
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="newTask.importance"
          label="Task importance"
          class="text-core"
          :items="importance"
          outlined
          return-object
          dense
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="newTask.workers"
          label="Workers"
          class="text-core"
          :items="workersComputed"
          outlined
          return-object
          dense
          multiple
        />
      </v-col>
    </v-row>
    <v-btn
      @click="saveNewTask"
      color="primary"
      class="mb-5 rounded-xl"
      elevation="0"
    >
      <v-icon small> mdi-plus </v-icon>
      Create Task
    </v-btn>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  emits: ["filter", "dialogClose"],
  name: "createTaskDialog",
  props: {
    workers: { type: Array },
  },
  data: () => ({
    createTaskDialog: false,
    newTask: {
      dueDate: moment().add(1, "day").format("dd/mm/yyyy"),
    },
    taskTypes: [
      { title: "Design", value: "design" },
      { title: "Development", value: "development" },
      { title: "Sale Marketing", value: "marketing" },
      { title: "Accounting", value: "accounting" },
      { title: "Culture", value: "culture" },
    ],
    importance: [
      { title: "A", value: "a" },
      { title: "B", value: "b" },
      { title: "C", value: "c" },
    ],
    currentTaskDueDate: "",
    taskStatus: [
      { title: "Awaiting", value: "awaiting" },
      { title: "In progress", value: "inprogress" },
      { title: "In review", value: "review" },
      { title: "Complete", value: "complete" },
    ],
  }),
  created() {
    this.newTask.dueDate = this.getDefaultDueDate();
  },
  computed: {
    workersComputed() {
      const retValue = this.workers.map((worker) => ({
        title: worker.firstName,
        value: worker._id,
      }));
      return new Array(...retValue);
    },
  },
  methods: {
    async saveNewTask() {
      try {
        const query = {
          taskName: this.newTask.name ? this.newTask.name : "",
          owner: this.newTask.owner ? this.newTask.owner.value : "",
          taskDescription: this.newTask.description
            ? this.newTask.description
            : "",
          dueDate: this.newTask.dueDate ? this.newTask.dueDate : moment(),
          assignedUser: this.newTask.workers.map((worker) => {
            return worker.value;
          }),
          taskType: this.newTask.taskType.value,
          importance: this.newTask.importance.value,
          assignedBy: localStorage.getItem("user_Id"),
          parentTask: this.newTask.ParentTask,
        };
        const response = await this.axios.post("/v1/task/create", query);
        if (response.status === 201) {
          (this.newTask = {}), (this.createTaskDialog = false);
          this.success = true;
          this.filter();
        }
      } catch (error) {
        console.log("saving new task error: ", error);
      }
    },
    filter() {
      this.$emit("dialogClose", {});
      this.$emit("filter", {});
    },
    getDefaultDueDate() {
      const tomorrow = moment().add(1, "day");
      return tomorrow.format("YYYY-MM-DD");
    },
  },
};
</script>
