<script setup>
import axios from "axios";
import io from "socket.io-client";
</script>
<template>  
  <div style="margin: 50px;">
    <v-container class="with-shadow">
      <div style="margin: 8px; display: flex;">
        <div class="with-border" style="margin: 8px; padding: 8px; width: fit-content;">
          SERIAL: {{ received.serial }}
        </div>
      </div>
      <v-container class="with-border">
        <v-table>
          <thead>
            <tr>
              <th v-for="key in keys" class="text-left">
                {{ key.value }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in received.datas" :key="key">
              <td v-for="key in keys">{{ key?.if ? key.if(value[key.key]) : value[key.key] }}{{ key?.tail }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // socketUrl: "http://82.197.92.248",
      socketUrl: "http://localhost:3001",
      devices: [],
      received: "",
      keys: [
        { key: "index", value: "Дугаар" },
        { key: "type", value: "Төрөл", if: (type) => { return type==='t' ? 'Дулаан мэдрэгч' : 'Бусад' } },
        { key: "value", value: "Утга", tail: '°C' },
      ],
    };
  },
  methods: {
    initSocket() {
      const socket = io(this.socketUrl);
      socket.on("v2", (datas) => {
        this.received = datas;
      });
    },
  },
  mounted() {
    this.initSocket();
  },
};
</script>
<style>
.mapInfo {
  background-color: #fff;
}

.custom-marker {
  font:
    400 11px Roboto,
    Arial,
    sans-serif;
  background-color: #fff;
  border: #fff solid 1px;
  height: 28px;
  border-radius: 5px;
  transform: translate(-50%, calc(-50% - 33px));
  padding: 8px;

  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
}

.custom-marker::before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #fff;
  border-bottom: 10px solid transparent;
  left: calc(50% - 10px);
  top: 100%;
}
</style>
<style scoped>
#map {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

#panel {
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -180px;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
}

#bar {
  width: 240px;
  background-color: rgba(255, 255, 255, 0.75);
  margin: 8px;
  padding: 4px;
  border-radius: 4px;
}

#autoc {
  width: 100%;
  box-sizing: border-box;
}
</style>
