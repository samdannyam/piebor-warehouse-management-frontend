<template>
  <v-container fluid>
    <v-snackbar v-model="errorSnack">
      Алдаа гарлаа
      <v-icon>mdi-alert</v-icon>
      <template #action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="errorSnack = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Header -->
    <v-container fluid class="d-flex justify-space-between">
      <h1 class="text-core text-center">Attendance Management</h1>
      <v-btn
        @click="getWorkers(), goToLink('/attendance/' + user_id, $event)"
        icon
        elevation="0"
        color="#3aafa9"
        ><v-icon>mdi-account-multiple</v-icon></v-btn
      >
    </v-container>
    <!-- Main -->
    <v-container fluid>
      <v-row>
        <!-- Attendance -->
        <v-col cols="12" lg="3" class="">
          <div
            class="bg-second h-100 rounded-xl pa-4"
            v-if="correctUser() && getMonthToday() === getMonth(filter.month)"
          >
            <p class="ma-0" style="font-weight: 600; font-size: 18px">
              Today's attendance
            </p>
            <p class="" style="font-weight: 400; font-size: 12px; opacity: 0.5">
              {{ getMonthToday() + " " + getDate() + ", " + getDay() }}
            </p>
            <div class="d-flex mt-4 w-100">
              <v-btn
                style="text-transform: none"
                :style="
                  clockCheck()
                    ? 'background-color: #3aafa9; color: white; min-width: 36px; padding: 0px'
                    : 'flex: 1; background-color: #3aafa9; color: white;'
                "
                @click="recordArrival"
                elevation="0"
                class="rounded-xl"
              >
                <v-icon small>mdi-login</v-icon>
                <p :class="clockCheck() ? 'd-none' : ''" class="ml-1">
                  Clock In
                </p>
              </v-btn>
              <v-btn
                style="text-transform: none"
                :style="
                  clockCheck()
                    ? 'flex: 1; background-color: #E74C3C; color: white;'
                    : 'background-color: #E74C3C; color: white; min-width: 36px; padding: 0px'
                "
                class="ml-2 rounded-xl"
                @click="addDeparture"
                elevation="0"
              >
                <v-icon small>mdi-logout</v-icon>
                <p :class="clockCheck() ? '' : 'd-none'" class="ml-1">
                  Clock Out
                </p>
              </v-btn>
            </div>
            <div class="mt-4 w-100">
              <div v-for="time in clockToday()" :key="time">
                <div class="d-flex align-center rounded-xl mb-4 bg-third">
                  <div class="mr-3 pa-2 rounded-xl ma-1 bg-fourth">
                    <v-icon color="core">{{
                      time.type === "arrival" ? "mdi-login" : "mdi-logout"
                    }}</v-icon>
                  </div>
                  <div class="text-core">
                    <p
                      class="mb-n1"
                      style="font-weight: 400; font-size: 12px; opacity: 0.5"
                    >
                      {{
                        time.type === "arrival" ? "Clocked In" : "Clocked Out"
                      }}
                    </p>
                    <p class="ma-0" style="font-weight: 600; font-size: 18px">
                      {{ formatTime(time.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p class="ma-0" style="font-weight: 600; font-size: 18px">Total</p>
            <p class="" style="font-weight: 400; font-size: 12px; opacity: 0.5">
              {{
                formatDate(selectedDates[0]) +
                " - " +
                formatDate(selectedDates[1])
              }}
            </p>
            <div
              class="d-flex align-center justify-space-between mt-4"
              style="gap: 10px; font-weight: 700"
            >
              <v-card
                elevation="0"
                class="pa-2 rounded-lg w-100 text-center"
                style="font-size: 10px"
                color="second"
              >
                <p style="font-size: 20px">{{ totalHours.hours }}</p>
                Hours
              </v-card>
              <v-divider vertical class="border-opacity-100" />
              <v-card
                elevation="0"
                class="pa-2 rounded-lg w-100 text-center"
                style="font-size: 10px"
                color="second"
              >
                <p style="font-size: 20px">{{ totalHours.minutes }}</p>
                Minutes
              </v-card>
              <v-divider vertical class="border-opacity-100" />
              <v-card
                elevation="0"
                class="pa-2 rounded-lg w-100 text-center"
                style="font-size: 10px"
                color="second"
              >
                <p style="font-size: 20px">{{ totalHours.seconds }}</p>
                Seconds
              </v-card>
            </div>
          </div>
          <div class="bg-second h-100 rounded-xl pa-4" v-else>
            <p class="ma-0" style="font-weight: 600; font-size: 18px">Total</p>
            <p class="" style="font-weight: 400; font-size: 12px; opacity: 0.5">
              {{
                formatDate(selectedDates[0]) +
                " - " +
                formatDate(selectedDates[1])
              }}
            </p>
            <div
              class="d-flex align-center justify-space-between mt-4"
              style="gap: 10px; font-weight: 700"
            >
              <v-card
                elevation="0"
                class="pa-2 rounded-lg w-100 text-center"
                style="font-size: 10px"
                color="second"
              >
                <p style="font-size: 20px">{{ totalHours.hours }}</p>
                Hours
              </v-card>
              <v-divider vertical class="border-opacity-100" />
              <v-card
                elevation="0"
                class="pa-2 rounded-lg w-100 text-center"
                style="font-size: 10px"
                color="second"
              >
                <p style="font-size: 20px">{{ totalHours.minutes }}</p>
                Minutes
              </v-card>
              <v-divider vertical class="border-opacity-100" />
              <v-card
                elevation="0"
                class="pa-2 rounded-lg w-100 text-center"
                style="font-size: 10px"
                color="second"
              >
                <p style="font-size: 20px">{{ totalHours.seconds }}</p>
                Seconds
              </v-card>
            </div>
            <div v-if="!correctUser()" class="mt-10">
              <v-card
                @click="goToLink('/attendance/' + worker._id, $event)"
                v-for="worker in workers"
                class="py-2 px-6 rounded-xl my-2 bg-third"
                elevation="0"
                :style="
                  $route.params.id == worker._id
                    ? `background: ${$vuetify.theme.current.colors.fourth} !important; color: ${$vuetify.theme.current.colors.core} !important`
                    : ''
                "
                >{{ worker.firstName }}</v-card
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="9">
          <v-row class="pa-0 pt-2">
            <!-- Month Selection -->
            <v-col cols="12" class="d-flex justify-center pb-0">
              <v-icon
                color="core"
                style="opacity: 0.5; cursor: pointer"
                @click="prevStep(), (selectedDates = [])"
                >mdi-chevron-left</v-icon
              >
              <p
                class="text-core text-center mx-2"
                style="font-weight: 600; width: 200px; font-size: 18px"
              >
                {{ getMonth(filter.month) + " " + filter.year }}
              </p>
              <v-icon
                color="core"
                style="opacity: 0.5; cursor: pointer"
                @click="nextStep(), (selectedDates = [])"
                >mdi-chevron-right</v-icon
              >
            </v-col>
            <!-- Monday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Mon</h3>
              <v-row>
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Monday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- Tuesday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Tue</h3>
              <v-row>
                <!-- Arrival column -->
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Tuesday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- Wednesday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Wed</h3>
              <v-row>
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Wednesday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- Thursday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Thu</h3>
              <v-row>
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Thursday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- Friday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Fri</h3>
              <v-row>
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Friday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- Saturday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Sat</h3>
              <v-row>
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Saturday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- Sunday -->
            <v-col class="custom7cols pa-1">
              <h3 class="text-core text-center customSizeBigger">Sun</h3>
              <v-row>
                <v-col cols="12" class="d-flex flex-column jusitfy-center">
                  <div
                    v-for="day in specificDay(attendance, 'Sunday')"
                    :key="day"
                    class="mt-2"
                  >
                    <v-card
                      class="d-flex flex-column justify-start align-center pa-0 pa-lg-2 customBg bg-second"
                      style="height: 125px"
                      elevation="0"
                      :class="inSelectedDates(day.date) ? 'bg-third' : ''"
                      :style="
                        day.type == 'disabled'
                          ? 'opacity: 0.5; cursor: default'
                          : ''
                      "
                      :ripple="day.type !== 'disabled'"
                      @click="
                        day.type == 'disabled'
                          ? ''
                          : selectedDates.length == 2
                            ? (selectedDates = [])
                            : selectedDates.push(day.date)
                      "
                    >
                      <div
                        class="w-100 d-flex justify-end"
                        style="font-weight: 600"
                        :style="
                          day.type == 'today'
                            ? inSelectedDates(day.date)
                              ? 'color: #3aafa9'
                              : 'color: white'
                            : day.type == 'later'
                              ? inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}; opacity: 0.3`
                                : 'opacity: 0.3'
                              : inSelectedDates(day.date)
                                ? `color: ${$vuetify.theme.current.colors.core}`
                                : ''
                        "
                      >
                        <p
                          style="width: 25px; height: 25px"
                          class="text-center d-flex justify-center align-center customSize"
                          :style="
                            day.type == 'today'
                              ? inSelectedDates(day.date)
                                ? 'background-color: #fff; border-radius: 50px;'
                                : 'background-color: #3aafa9; border-radius: 50px;'
                              : ''
                          "
                        >
                          {{ getNum(day.date) }}
                        </p>
                      </div>
                      <div
                        class="scrollStyle"
                        style="overflow-y: auto; width: 100%"
                      >
                        <v-card
                          v-for="attend in day.attendance"
                          :key="attend"
                          class="w-100 text-center rounded-xl mt-2 customSize"
                          elevation="0"
                          :color="
                            attend.type === 'arrival' ? '#3aafa9' : '#e74c3c'
                          "
                        >
                          {{ formatTime(attend.date) }}
                        </v-card>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      userIP: null,
      arrivalTime: "",
      departureTime: "",
      attendanceEntries: [],
      isArrival: null,
      attendance: [],
      filter: {
        year: moment().year(),
        month: moment().month() + 1,
        date: moment().date(),
      },
      totalHours: {},
      selectedDates: [],
      workers: [],
      user_id: "",
      errorSnack: false,
    };
  },
  watch: {
    $router: {
      handler() {
        this.load();
      },
      deep: true,
    },
    selectedDates: {
      handler() {
        if (this.selectedDates.length == 2) {
          if (
            moment(this.selectedDates[1]).isBefore(
              moment(this.selectedDates[0]),
            )
          ) {
            this.selectedDates = [];
          } else {
            this.calculateHours();
          }
        } else if (this.selectedDates.length == 0) {
          this.calculateHours();
        }
      },
      deep: true,
    },
  },
  methods: {
    async fetchIP() {
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        const data = await response.json();
        this.userIP = data.ip;
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    },
    correctUser() {
      const id = this.$route.params.id;
      if (!id) {
        return true;
      }
      return false;
    },
    inSelectedDates(date) {
      const start = moment(this.selectedDates[0], "YYYY-MM-DD");
      let end;
      if (this.selectedDates[1]) {
        end = moment(this.selectedDates[1], "YYYY-MM-DD");
      } else {
        end = start;
      }
      const itemDate = moment(date, "YYYY-MM-DD");
      return itemDate.isSameOrAfter(start) && itemDate.isSameOrBefore(end);
    },
    calculateHours() {
      let attendanceEntries = this.attendanceEntries;
      if (this.selectedDates.length == 2) {
        const start = moment(this.selectedDates[0], "YYYY-MM-DD");
        const end = moment(this.selectedDates[1], "YYYY-MM-DD");
        attendanceEntries = this.attendanceEntries.filter((item) => {
          const itemDate = moment(item.date, "YYYY-MM-DD");
          return itemDate.isSameOrAfter(start) && itemDate.isSameOrBefore(end);
        });
      }
      let arrival = null;
      let totalDuration = moment.duration();
      for (let i in attendanceEntries) {
        const entry = attendanceEntries[i];
        if (entry.type === "arrival") {
          if (arrival) {
            const arr = moment(arrival.date);
            const dep = moment(arrival.date).hour(18).minute(0).second(0);
            const duration = moment.duration(dep.diff(arr));
            totalDuration.add(duration);
            arrival = entry;
          } else {
            arrival = entry;
          }
        } else if (entry.type === "departure" && arrival) {
          const arr = moment(arrival.date);
          const dep = moment(entry.date);
          const duration = moment.duration(dep.diff(arr));
          totalDuration.add(duration);
          arrival = null;
        }
      }
      const hours = Math.floor(totalDuration.asHours());
      const minutes = totalDuration.minutes();
      const seconds = totalDuration.seconds();
      const formattedDuration = {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };

      this.totalHours = formattedDuration;
    },
    getMonth(month) {
      return moment()
        .month(month - 1)
        .format("MMMM");
    },
    getMonthToday() {
      return moment().format("MMMM");
    },
    getDate() {
      return moment().date();
    },
    getDay() {
      return moment().format("dddd");
    },
    prevStep() {
      const filterDate = moment([
        this.filter.year,
        this.filter.month - 1,
        this.filter.date,
      ]).subtract(1, "months");
      this.filter.year = moment(filterDate).year();
      this.filter.month = moment(filterDate).month() + 1;
      this.filter.date = moment(filterDate).date();

      this.fetchAttendance();
    },
    nextStep() {
      const filterDate = moment([
        this.filter.year,
        this.filter.month - 1,
        this.filter.date,
      ]).add(1, "months");
      this.filter.year = moment(filterDate).year();
      this.filter.month = moment(filterDate).month() + 1;
      this.filter.day = moment(filterDate).date();

      this.fetchAttendance();
    },
    clockCheck() {
      if (
        this.attendanceEntries &&
        this.attendanceEntries[this.attendanceEntries.length - 1]
      ) {
        const lastEntry = moment(
          this.attendanceEntries[this.attendanceEntries.length - 1].date,
        ).startOf("day");
        const startOfToday = moment().startOf("day");
        const endOfToday = moment().endOf("day");
        return (
          lastEntry.isBetween(startOfToday, endOfToday, "day", "[]") &&
          this.attendanceEntries[this.attendanceEntries.length - 1].type ==
            "arrival"
        );
      }
      return false;
    },
    clockToday() {
      if (this.attendanceEntries && this.attendanceEntries.length) {
        const startOfToday = moment().startOf("day");
        const endOfToday = moment().endOf("day");
        return this.attendanceEntries.filter((item) => {
          const itemMoment = moment(item.date);
          return itemMoment.isBetween(startOfToday, endOfToday, "day", "[]");
        });
      }
      return [];
    },
    formatTime(time) {
      return moment(time).format("HH:mm:ss");
    },
    async recordArrival() {
      const query = {
        date: moment(),
        userId: localStorage.getItem("user_Id"),
        type: "arrival",
        userIP: this.userIP,
      };
      console.log(query);
      try {
        const response = await this.axios.post("/v1/attendance/arrival", query);
        if (response.status === 201) {
          this.load();
        } else {
          this.errorSnack = true;
        }
      } catch (error) {
        console.error("Error recording arrival:", error);
      }
    },
    async addDeparture() {
      const query = {
        date: moment(),
        userId: localStorage.getItem("user_Id"),
        type: "departure",
        userIP: this.userIP,
      };
      try {
        const response = await this.axios.post(
          "/v1/attendance/departure",
          query,
        );
        if (response.status === 201) {
          this.load();
        } else {
          this.errorSnack = true;
        }
      } catch (error) {
        console.error("Error recording departure:", error);
      }
    },

    async fetchAttendance() {
      try {
        let id = this.$route.params.id;
        if (!id) {
          id = localStorage.getItem("user_Id");
        }
        const query = {
          userId: id,
          month: this.filter.month,
          year: this.filter.year,
        };
        const response = await this.axios.post(
          "/v1/attendance/getAttendance",
          query,
        );
        if (response.status === 200) {
          this.attendanceEntries = response.data.userAttendance;
          this.calculateHours();
          let startOfMonth = moment([
            this.filter.year,
            this.filter.month - 1,
            1,
          ]).startOf("month");
          let endOfMonth = moment([
            this.filter.year,
            this.filter.month - 1,
            1,
          ]).endOf("month");
          const today = moment().startOf("day");
          const monthDays = [];
          for (
            let day = startOfMonth;
            day.isBefore(endOfMonth);
            day.add(1, "days")
          ) {
            let type;
            if (moment(day).isBefore(today)) {
              type = "older";
            } else if (moment(day).isAfter(today)) {
              type = "later";
            } else {
              type = "today";
            }
            monthDays.push({
              day: day.format("dddd"),
              date: day.clone().format("YYYY-MM-DD"),
              type: type,
              attendance: [],
            });
          }

          const i = moment(monthDays[0].date).day();

          startOfMonth = moment(monthDays[0].date);
          endOfMonth = moment(monthDays[monthDays.length - 1].date);

          while (moment(startOfMonth).day() !== 1) {
            startOfMonth = moment(startOfMonth).subtract(1, "days");

            monthDays.unshift({
              day: moment(startOfMonth).format("dddd"),
              date: moment(startOfMonth).clone().format("YYYY-MM-DD"),
              type: "disabled",
            });
          }

          while (moment(endOfMonth).day() !== 0) {
            endOfMonth = moment(endOfMonth).add(1, "days");
            monthDays.push({
              day: moment(endOfMonth).format("dddd"),
              date: moment(endOfMonth).clone().format("YYYY-MM-DD"),
              type: "disabled",
            });
          }

          this.attendanceEntries.forEach((entry) => {
            const dayOfWeek = moment(entry.date).format("DD");
            monthDays[dayOfWeek - 2 + i].attendance?.push(entry);
          });

          this.attendance = monthDays;
        }
      } catch (err) {
        console.log("fetch error", err);
      }
    },
    async load() {
      await this.fetchAttendance();
      let temp = JSON.parse(localStorage.getItem("init"));
      if (temp.attendance && temp.attendance[0].type === "departure") {
        this.isArrival = false;
      } else {
        this.isArrival = true;
      }
    },
    async getWorkers() {
      try {
        const response = await this.axios.post("/v1/users/all", {});
        if (response.status === 200) {
          this.workers = response.data;
        }
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    },
    goToLink(link, event) {
      if (event.ctrlKey) {
        window.open(link, "_blank");
      } else {
        this.$router.push(link);
      }
    },
    action() {
      try {
        if (!this.isArrival) {
          this.isArrival = false;
          this.load();
          this.recordArrival();
        } else if (this.isArrival) {
          this.isArrival = true;
          this.addDeparture();
          this.load();
        }
      } catch (err) {
        console.log("button error", err);
      }
    },

    getDayOfWeek(date) {
      return moment(date).format("dddd");
    },
    formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD");
    },
    specificDay(date, day) {
      return date.filter((i) => i.day === day);
    },
    getNum(date) {
      return moment(date).format("DD");
    },
  },
  mounted() {
    this.user_id = localStorage.getItem("user_Id");
    this.load();
    if (this.$route.params.id) {
      this.getWorkers();
    }
    this.fetchIP();
  },
  computed: {
    actionLabel() {
      return this.isArrival ? "Record Departure" : "Record Arrival";
    },
  },
};
</script>

<style scoped>
.custom7cols {
  width: 14%;
  max-width: 14%;
  flex-basis: 14%;
}
.theme--light .v-timeline::before {
  background: #7c7c7f;
}

.border {
  background: #22222c;
  border-radius: 20px;
}

.grey-text {
  color: #a1a0a4;
}

.red-text {
  color: white;
}

.circular-avatar {
  border-radius: 50%;
}

.progress-label {
  color: white;
  margin-right: 10px;
}

.active-off {
  background-color: transparent;
  color: red;
  text-decoration: line-through;
}

.my-menu {
  margin-top: 8px;
  contain: initial;
  overflow: visible;
}

.my-menu::before {
  position: absolute;
  content: "";
  top: 1px;
  right: 8px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}

.hover:hover {
  cursor: pointer;
  background-color: #ebebeb;
  border-radius: 10px;
}

.progress-bar {
  margin: 0 auto;
  min-width: 500px;
}

.current-status {
  margin-right: 10px;
  display: flex;
  justify-content: center;
}

.status-text {
  text-align: center;
  font-weight: bold;
}

.description-text {
  white-space: normal;
  /* Prevent text from wrapping */
  overflow: visible;
  /* Hide overflow */
  text-overflow: ellipsis;
  /* Show an ellipsis (...) when text overflows */
  display: inline-block;
  max-width: 100%;
  /* Adjust the max-width as needed */
  vertical-align: middle;
}

:deep() .v-data-table__expanded__content .v-data-table-header {
  background-color: transparent;
}

:deep()
  .v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none;
}

.scrollStyle::-webkit-scrollbar-track {
  background: transparent;
}

.scrollStyle::-webkit-scrollbar-thumb {
  background: #8c8cb0;
  border-radius: 10px;
}

.scrollStyle::-webkit-scrollbar-thumb:hover {
  background: #505064;
}

.scrollStyle::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.customBg {
  border-radius: 24px;
}

@media (max-width: 1279px) {
  .customSizeBigger {
    font-size: 12px;
    font-weight: 500;
  }

  .customSize {
    font-size: 10px;
    font-weight: 500;
  }

  .customBg {
    border-radius: 10px;
  }

  .customColor {
    color: white;
  }
}
</style>
