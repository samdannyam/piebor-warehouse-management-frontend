<template>
  <v-navigation-drawer app color="#14141C" location="right" width="290">
    <v-toolbar color="rgba(0,0,0,0)" flat>
      <!-- Set the content background color to transparent black -->
      <v-icon color="#7C7C7F" class="mr-4">mdi-magnify</v-icon>
      <v-badge bordered overlap color="accent" dot class="mr-8">
        <v-icon color="#7C7C7F">mdi-bell</v-icon>
      </v-badge>
      <v-divider vertical inset color="#7C7C7F"></v-divider>
      <v-spacer></v-spacer>
      <v-badge bordered bottom color="accent" dot offset-x="10" offset-y="10">
        <v-avatar size="30" class="ml-n3">
          <v-img
            src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
          ></v-img>
        </v-avatar>
      </v-badge>
      <v-btn text color="#7C7C7F">Bilguun</v-btn>
      <v-btn icon dark class="ml-n3">
        <v-icon x-small color="#7C7C7F"> mdi-chevron-down </v-icon>
      </v-btn>
    </v-toolbar>
    <strong class="ml-3 white--text">Overall Progress</strong>
    <br />
    <strong class="ml-3 grey-text text-subtitle-1">AAE IdeaPro</strong>
    <div class="text-center mb-5 mt-n5">
      <v-progress-circular
        :size="100"
        :width="12"
        model-value="70"
        color="orange"
        class="mt-5"
      >
        70%
      </v-progress-circular>
    </div>
    <strong class="ml-3 white--text">Comments go down here</strong>
    <br />
    <strong class="ml-3 grey-text text-subtitle-1">task due date</strong>
    <v-list>
      <v-list-item-group>
        <template v-for="item in files" :key="item.title">
          <v-list-item>
            <v-row>
              <v-col cols="4">
                <v-list-item-avatar>
                  <v-img class="circular-avatar" :src="item.avatar" />
                </v-list-item-avatar>
              </v-col>
              <v-col cols="8">
                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.title"
                    class="white--text"
                  ></v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.subtitle
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ item.time }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card
          class="d-flex align-center wl-4"
          height="60px"
          width="120px"
          color="#21212B"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <v-list-item two-line class="text-center">
                <v-list-item-title>550</v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  Total tasks</v-list-item-subtitle
                >
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          class="d-flex align-center"
          height="60px"
          width="120px"
          color="#21212B"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <v-list-item two-line class="text-center">
                <v-list-item-title>250</v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  Upcoming
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card
          class="d-flex align-center wl-4"
          height="60px"
          width="120px"
          color="#21212B"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <v-list-item two-line class="text-center">
                <v-list-item-title>390</v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  In progress</v-list-item-subtitle
                >
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          class="d-flex align-center"
          height="60px"
          width="120px"
          color="#3aafa9"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <v-list-item two-line class="text-center">
                <v-list-item-title>125</v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  Complete
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    files: [
      {
        avatar:
          "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        time: "5 Mins Ago",
        subtitle: "Backend Developer",
        title: "<strong> Bilguun </strong>",
      },
      {
        avatar:
          "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        time: "15 Mins Ago",
        subtitle: "Accountant",
        title: "<strong> Munkhzaya </strong>",
      },
      {
        avatar:
          "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        time: "20 Mins Ago",
        subtitle: "Frontend Developer",
        title: "<strong> Nyamtaiwan </strong>",
      },
    ],
  }),
};
</script>

<style scoped>
.circular-avatar {
  border-radius: 50%;
}
.grey-text {
  color: #a1a0a4;
}
</style>
