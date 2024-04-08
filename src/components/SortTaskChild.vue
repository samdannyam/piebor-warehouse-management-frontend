<template>
  <template v-for="(task, index) in tasks" :key="index">
    <tr
      @click="editTask(task)"
      :style="
        $vuetify.theme.name == 'dark'
          ? 'background: rgb(' +
            (80 - 10 * stage) +
            ',' +
            (80 - 10 * stage) +
            ',' +
            (100 - 10 * stage) +
            ')'
          : 'background: rgb(' +
            (217 + 10 * stage) +
            ',' +
            (217 + 10 * stage) +
            ',' +
            (253 + 10 * stage) +
            ')'
      "
    >
      <td :style="'padding-left:' + stage * 40 + 'px'" style="border: none">
        {{ index + 1 + ". " }} {{ task?.taskName }}
      </td>
      <td style="border: none">
        {{ task?.taskType }}
      </td>
      <td style="border: none">
        {{ task?.status }}
      </td>
      <td style="border: none; text-transform: uppercase">
        {{ task?.importance }}
      </td>
      <td style="border: none">
        {{
          task?.assignedUser
            .map((m) => workers.find((a) => a._id == m).firstName)
            .join(",")
        }}
      </td>
      <td style="border: none">
        {{ currentTaskAssignedBy(task).join(",") }}
      </td>
      <td style="border: none">
        <v-chip :class="callClass(task)">
          {{ formatDate(task.dueDate) }}
        </v-chip>
      </td>
      <td class="d-flex align-center" style="border: none">
        <v-btn
          elevation="0"
          color="transparent"
          icon
          size="x-small"
          @click="
            parentId = task._id;
            createSubTaskDialog = true;
          "
        >
          <v-icon> mdi-plus</v-icon>
        </v-btn>
        <v-btn
          elevation="0"
          color="transparent"
          icon
          size="x-small"
          v-if="showDelete"
          @click="(taskId = task._id), (deleteAlert = !deleteAlert)"
        >
          <v-icon> mdi-delete</v-icon>
        </v-btn>
      </td>
    </tr>
    <SortTaskChild
      v-if="task?.childTasks.length > 0"
      :tasks="task?.childTasks"
      :workers="workers"
      :stage="stage + 1"
      @editTask="editTask"
      :showDelete="showDelete"
    />
  </template>
  <v-dialog v-model="createSubTaskDialog" max-width="800" style="color: white">
    <SubtaskCreate
      @filter="filter"
      @dialogClose="createSubTaskDialog = false"
      :workers="workers"
      :parentId="parentId"
    />
  </v-dialog>
  <v-dialog v-model="deleteAlert" max-width="600">
    <v-card style="background-color: #22222c" class="px-5 text-white">
      <v-card-title>
        <span>Delete task?</span>
      </v-card-title>
      <v-btn @click="deleteTask(taskId)"> Yes </v-btn>
      <v-btn @click="deleteAlert = !deleteAlert"> No </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import SubtaskCreate from "./SubtaskCreate.vue";
export default {
  emits: ["editTask", "filter", "dialogClose"],
  name: "SortTaskChild",
  components: {
    SubtaskCreate,
  },
  props: {
    tasks: { type: Array },
    workers: { type: Array },
    stage: { type: Number },
    showDelete: { type: Boolean },
  },
  data: () => ({
    openSubTask: false,
    parentId: "",
    taskId: "",
    deleteAlert: false,
    createSubTaskDialog: false,
  }),
  methods: {
    currentTaskAssignedBy(task) {
      const retValue = this.workers
        .filter((f) => task?.assignedBy.includes(f._id))
        .map((m) => m.firstName);
      return new Array(...retValue);
    },
    openSubTaskDialog(parentId) {
      this.parentId = parentId;
      this.openSubTask = !this.openSubTask;
    },
    editTask(task) {
      if (this.createSubTaskDialog === true || this.deleteAlert === true) {
      } else {
        this.$emit("editTask", task);
      }
    },
    filter() {
      this.$emit("filter");
    },
    async deleteTask(taskId) {
      try {
        const response = await this.axios.post("/v1/task/deleteById/" + taskId);
        this.deleteAlert = false;
        this.load();
        if (response.status === 204) {
          this.load();
          this.deleteAlert = false;
        }
      } catch (err) {
        console.log("delete task err", err);
      }
    },
    currentTaskAssignedUsers(task) {
      const retValue = this.worker
        .filter((f) => task?.assignedUser.includes(f))
        .map((m) => m.firstName);
      return new Array(...retValue);
    },
    formatDate(dateString) {
      const formattedDate = moment(dateString).format("YYYY/MM/DD");
      return formattedDate;
    },
    dateCompare(dateString) {
      const nextDay = moment().add(1, "day").startOf("day");
      const date = moment(dateString);
      return nextDay.isAfter(date); // Compare nextDay to the date object
    },
    callClass(task) {
      const isOverdue = this.dateCompare(task.dueDate);

      if (task.status === "complete" && task.childTasks.length > 0) {
        //has a child and is complete
        return "bg-primary ";
      } else if (task.status === "complete" && task.childTasks.length === 0) {
        // has no child but is complete
        return "bg-primary text-white ";
      } else if (task.childTasks.length > 0) {
        // Task is a child task
        return isOverdue ? "bg-accent text-white" : "";
      } else {
        // Task is not a child task
        return isOverdue ? " bg-accent text-white" : "";
      }
    },
  },
};
</script>

<style scoped></style>
