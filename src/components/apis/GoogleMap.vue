<script setup>
import { Client } from "@googlemaps/google-maps-services-js";
import { onMounted } from "vue";
</script>
<template>
  <!-- <div ref="map" style="width: 100%; height: 400px;"></div> -->

  <gmp-map
    center="47.92550277709961,106.9148178100586"
    zoom="14"
    map-id="DEMO_MAP_ID"
  >
    <!-- <gmp-advanced-marker position="47.92550277709961,106.9148178100586" title="My location"></gmp-advanced-marker> -->
  </gmp-map>
</template>

<script>
export default {
  mounted() {
    const client = new Client({});
    client
      .elevation({
        params: {
          locations: [{ lat: 45, lng: -110 }],
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        console.log(r.data.results[0].elevation);
      })
      .catch((e) => {
        console.log(e.response.data.error_message);
      });
  },
};
</script>

<style>
gmp-map {
  height: 100%;
}
</style>
