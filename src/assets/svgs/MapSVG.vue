<script setup>
import { computed, ref, watch } from "vue";
import MapSVGHover from "./MapSVGHover.vue";
import MapSVGSelectMenu from "./MapSVGSelectMenu.vue";
import GetData from "../../scripts/GetData";

const locationSide = ref("top");
const locationAlign = ref("center");
const originSide = ref("auto");
const originAlign = ref("");

const location = computed(() => {
  return `${locationSide.value} ${locationAlign.value}`;
});
const origin = computed(() => {
  return originDisabled.value
    ? originSide.value
    : `${originSide.value} ${originAlign.value}`;
});
const code = computed(() => {
  return `<v-tooltip location="${location.value}" origin="${origin.value}" />`;
});
const originDisabled = computed(() => {
  return ["auto", "overlap"].includes(originSide.value);
});

watch(locationSide, (val) => {
  if (["top", "bottom"].includes(val)) {
    locationAlign.value =
      {
        top: "start",
        bottom: "end",
      }[locationAlign.value] || locationAlign.value;
  } else {
    locationAlign.value =
      {
        start: "top",
        end: "bottom",
      }[locationAlign.value] || locationAlign.value;
  }
});
watch(originDisabled, (val) => {
  if (!val && !originAlign.value) {
    originAlign.value = "center";
  }
});
</script>
<template>
  <!-- {{ receivedData }} -->
  {{ selects }}
  <div class="with-shadow">
    <MapSVGHover
      v-if="mouseOverIndicator"
      :receivedData="hoverValue.route"
      :x="hoverValue.x"
      :y="hoverValue.y"
    />
    <MapSVGSelectMenu
      v-if="SelectMenu"
      :receivedData="{ inp: inp, options: options }"
      :x="hoverValue.x"
      :y="hoverValue.y"
    />
    <svg
      :width="this.width"
      :height="this.height"
      viewBox="0 0 257.96875 317.5"
      version="1.1"
      id="svg1"
      xml:space="preserve"
      inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
      sodipodi:docname="drawing.svg"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <sodipodi:namedview
        id="namedview1"
        pagecolor="#ffffff"
        bordercolor="#000000"
        borderopacity="0.25"
        inkscape:showpageshadow="2"
        inkscape:pageopacity="0.0"
        inkscape:pagecheckerboard="0"
        inkscape:deskcolor="#d1d1d1"
        inkscape:document-units="mm"
        inkscape:zoom="6.1361953"
        inkscape:cx="239.48064"
        inkscape:cy="631.58028"
        inkscape:window-width="1920"
        inkscape:window-height="1057"
        inkscape:window-x="-8"
        inkscape:window-y="-8"
        inkscape:window-maximized="1"
        inkscape:current-layer="layer1"
        showborder="true"
      />
      <defs id="defs1">
        <linearGradient id="swatch2" inkscape:swatch="solid">
          <stop
            style="stop-color: #000000; stop-opacity: 1"
            offset="0"
            id="stop2"
          />
        </linearGradient>
      </defs>
      <g
        inkscape:label="Layer 1"
        id="layer1"
        transform="translate(132.95128,9.5601044)"
      >
        <!-- <text v-for="circle in circles" :key="circle.route + '_label'" :x="circle.cx" :y="circle.cy" text-anchor="left" dy=".3em" fill="white" font-size="4px" @click="clickRoute(circle.route)"> {{ circle.route }} </text> -->

        <path
          class="line"
          d="m -90.680054,0.72455849 -0.7837,-1.91449369"
          id="path12"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9"
          inkscape:connection-end="#path10"
        />
        <path
          class="line"
          d="m -89.318384,4.9983741 0.865361,3.7237512"
          id="path13"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9"
        />
        <path
          class="line"
          d="M -89.291334,12.423914 -88.68622,9.5496274"
          id="path14"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-2"
          inkscape:connection-end="#path10-0"
        />
        <path
          class="line"
          d="m -89.444776,14.597855 0.118243,1.773664"
          id="path15"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-2"
          inkscape:connection-end="#path10-4"
        />
        <path
          class="line"
          d="m -89.086105,18.556252 0.194648,1.265205"
          id="path16"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-4"
          inkscape:connection-end="#path10-44"
        />
        <path
          class="line"
          d="m -89.423469,21.757762 -2.30562,2.799685"
          id="path17"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-44"
          inkscape:connection-end="#path10-9"
        />
        <path
          class="line"
          d="m -92.915798,26.392646 -1.005845,2.034812"
          id="path18"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-9"
          inkscape:connection-end="#path9"
        />
        <path
          class="line"
          d="m -94.766709,33.154664 0.09047,0.856002"
          id="path19"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path9"
          inkscape:connection-end="#g9-3"
        />
        <path
          class="line"
          d="m -92.362301,37.112198 14.748574,6.134047"
          id="path20"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-3"
          inkscape:connection-end="#g9-6"
        />
        <path
          class="line"
          d="m -94.224112,38.48778 0.367399,3.815524"
          id="path21"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-3"
          inkscape:connection-end="#path10-7"
        />
        <path
          class="line"
          d="m -93.795439,44.497325 -0.130544,3.249274"
          id="path22"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-7"
          inkscape:connection-end="#g9-31"
        />
        <path
          class="line"
          d="m -95.40037,51.76869 -2.701342,3.462279"
          id="path23"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-31"
          inkscape:connection-end="#path10-41"
        />
        <path
          class="line"
          d="m -99.398029,57.007066 -2.729431,4.00316"
          id="path24"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-41"
          inkscape:connection-end="#path10-8"
        />
        <path
          class="line"
          d="m -103.73098,62.410992 -9.14477,4.57239"
          id="path25"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-8"
          inkscape:connection-end="#path10-76"
        />
        <path
          class="line"
          d="m -114.40536,68.430363 -4.20018,7.350318"
          id="path26"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-76"
          inkscape:connection-end="#path10-75"
        />
        <path
          class="line"
          d="m -122.85545,83.879478 v 0"
          id="path27"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-3"
          inkscape:connection-end="#path10-3"
        />
        <path
          class="line"
          d="m -119.65763,77.712261 -2.69147,5.190689"
          id="path28"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-75"
          inkscape:connection-end="#path10-3"
        />
        <path
          class="line"
          d="m -123.01417,84.967954 -0.72639,4.981463"
          id="path29"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-3"
          inkscape:connection-end="#path9-2"
        />
        <path
          class="line"
          d="m -92.90262,51.949766 1.517285,2.66351"
          id="path30"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-31"
          inkscape:connection-end="#path10-5"
        />
        <path
          class="line"
          d="m -90.246043,56.49434 1.19161,1.853609"
          id="path31"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-5"
          inkscape:connection-end="#path10-03"
        />
        <path
          class="line"
          d="m -80.501055,62.082134 -6.921284,-2.44281"
          id="path32"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-45"
          inkscape:connection-end="#path10-03"
        />
        <path
          class="line"
          d="m -78.389989,62.686851 4.996165,1.110257"
          id="path33"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-45"
          inkscape:connection-end="#path10-77"
        />
        <path
          class="line"
          d="m -71.392779,64.627478 2.29485,1.46452"
          id="path34"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-77"
          inkscape:connection-end="#g9-0"
        />
        <path
          class="line"
          d="m -66.448746,69.422789 2.227478,6.276307"
          id="path35"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-0"
          inkscape:connection-end="#path10-1"
        />
        <path
          class="dkn2"
          d="m -67.066262,72.968641 3.578832,-1.164199"
          id="path36"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m -64.057841,77.816546 -1.443125,7.627956"
          id="path37"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-1"
          inkscape:connection-end="#path10-37"
        />
        <path
          class="line"
          d="m -66.764434,81.204268 4.268729,0.689895"
          id="path38"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m -66.007633,87.582973 -1.512291,5.293015"
          id="path39"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-37"
          inkscape:connection-end="#path10-15"
        />
        <path
          class="line"
          d="m -68.052592,95.009217 -1.126543,5.257193"
          id="path40"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-15"
          inkscape:connection-end="#path10-417"
        />
        <path
          class="line"
          d="m -69.033338,102.3756 1.191646,3.27342"
          id="path41"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-417"
          inkscape:connection-end="#path10-34"
        />
        <path
          class="line"
          d="m -70.084556,105.0919 3.535715,-1.50915"
          id="path42"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m -68.109057,107.57467 -3.831912,5.31069"
          id="path43"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-34"
          inkscape:connection-end="#path10-38"
        />
        <path
          class="line"
          d="m -72.503352,114.87438 0.366644,4.94977"
          id="path44"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-38"
          inkscape:connection-end="#path10-12"
        />
        <path
          class="line"
          d="m -71.766176,109.01568 3.233886,2.28528"
          id="path45"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m -74.525759,117.85496 4.872387,-0.21559"
          id="path46"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m -71.006515,121.25238 2.929213,0.92501"
          id="path47"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-12"
          inkscape:connection-end="#path10-10"
        />
        <path
          class="line"
          d="m -65.947145,122.71099 0.945958,0.17705"
          id="path48"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-10"
          inkscape:connection-end="#g9-34"
        />
        <path
          class="line"
          d="m -62.500949,125.53332 0.272314,2.10508"
          id="path49"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-34"
          inkscape:connection-end="#path10-93"
        />
        <path
          class="line"
          d="m -62.984697,129.36571 -4.112706,2.91738"
          id="path50"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-93"
          inkscape:connection-end="#path10-6"
        />
        <path
          class="line"
          d="m -60.55707,123.58162 0.903912,0.11323"
          id="path51"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-34"
          inkscape:connection-end="#path10-16"
        />
        <path
          class="line"
          d="m -57.464446,123.90904 1.248574,0.0881"
          id="path52"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-16"
          inkscape:connection-end="#path9-6"
        />
        <path
          class="line"
          d="m -51.243815,124.50164 1.391234,0.18436"
          id="path53"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path9-6"
          inkscape:connection-end="#g9-8"
        />
        <path
          class="line"
          d="m -45.760132,126.24463 2.163132,1.46735"
          id="path54"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-8"
          inkscape:connection-end="#path10-48"
        />
        <path
          class="line"
          d="m -42.120755,129.27272 1.249364,2.08227"
          id="path55"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-48"
          inkscape:connection-end="#path10-00"
        />
        <path
          class="line"
          d="m -39.205447,132.29823 h 3.356248"
          id="path56"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-00"
          inkscape:connection-end="#path10-31"
        />
        <path
          class="line"
          d="m -39.52763,133.07605 1.619366,1.61937"
          id="path57"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-00"
          inkscape:connection-end="#path10-28"
        />
        <path
          class="line"
          d="m -36.197666,136.05622 2.367771,1.47986"
          id="path58"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-28"
          inkscape:connection-end="#path10-53"
        />
        <path
          class="line"
          d="m -32.200558,138.97041 0.988138,1.20772"
          id="path59"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-53"
          inkscape:connection-end="#path10-46"
        />
        <path
          class="line"
          d="m -29.693917,141.76049 1.580099,1.40528"
          id="path60"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-46"
          inkscape:connection-end="#path10-82"
        />
        <path
          class="line"
          d="m -26.460418,144.61695 3.579766,3.10069"
          id="path61"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-82"
          inkscape:connection-end="#path10-61"
        />
        <path
          class="line"
          d="m -21.190562,149.12538 1.371492,1.09824"
          id="path62"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-61"
          inkscape:connection-end="#path10-05"
        />
        <path
          class="line"
          d="m -18.073314,151.56154 0.693247,0.50823"
          id="path63"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-05"
          inkscape:connection-end="#path10-32"
        />
        <path
          class="line"
          d="m -15.797975,153.57277 0.726724,0.89159"
          id="path64"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-32"
          inkscape:connection-end="#path10-81"
        />
        <path
          class="line"
          d="m -13.483074,155.95898 6.6802547,4.80142"
          id="path65"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-81"
          inkscape:connection-end="#path10-385"
        />
        <path
          class="line"
          d="m -4.8169951,161.27534 9.1918467,-1.06881"
          id="path66"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-385"
          inkscape:connection-end="#path10-124"
        />
        <path
          class="line"
          d="m 6.3805393,159.46607 1.8088723,-1.21522"
          id="path67"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-124"
          inkscape:connection-end="#g9-2"
        />
        <path
          class="line"
          d="m -14.179509,156.39922 0.664791,3.65636"
          id="path68"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-81"
          inkscape:connection-end="#path10-26"
        />
        <path
          class="line"
          d="m -12.630784,161.99677 6.0340074,7.54251"
          id="path69"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-26"
          inkscape:connection-end="#path10-97"
        />
        <path
          class="line"
          d="m -5.1412234,171.18537 9.3111361,9.53823"
          id="path70"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-97"
          inkscape:connection-end="#path10-20"
        />
        <path
          class="line"
          d="m -11.443442,166.49259 3.2770026,-2.41463"
          id="path71"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m -1.6986681,177.57404 2.8889377,-2.58711"
          id="path72"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 5.8221689,182.16553 3.7440214,2.77374"
          id="path73"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-20"
          inkscape:connection-end="#g9-5"
        />
        <path
          class="line"
          d="m 13.25827,187.50841 6.104719,3.98444"
          id="path74"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-5"
          inkscape:connection-end="#path10-79"
        />
        <path
          class="line"
          d="M 14.772586,191.11324 17.316576,187.75"
          id="path75"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 21.281832,192.55728 5.412947,2.51315"
          id="path76"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-79"
          inkscape:connection-end="#path10-65"
        />
        <path
          class="line"
          d="m 28.535894,196.23977 9.690232,8.11275"
          id="path77"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-65"
          inkscape:connection-end="#path10-71"
        />
        <path
          class="line"
          d="m 32.537393,202.53963 3.104531,-3.32012"
          id="path78"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="M 68.046102,203.27829 51.632586,213.98276"
          id="path79"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-008"
          inkscape:connection-end="#path10-205"
        />
        <path
          class="line"
          d="m 39.920896,205.7552 9.938978,8.13189"
          id="path80"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-71"
          inkscape:connection-end="#path10-205"
        />
        <path
          class="line"
          d="m 42.49776,210.25784 2.328397,-2.63023"
          id="path81"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 45.559172,212.5 2.328396,-2.75958"
          id="path82"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 51.257027,215.53866 9.848411,17.23209"
          id="path83"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-205"
          inkscape:connection-end="#path10-814"
        />
        <path
          class="line"
          d="m 51.293928,219.70078 3.406357,-1.98345"
          id="path84"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 53.104903,223.2365 3.708188,-2.24216"
          id="path85"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 54.958997,226.29791 3.578834,-1.94033"
          id="path86"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="M 57.201156,230.52352 60.909344,228.152"
          id="path87"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 62.025939,234.75997 5.473031,15.10619"
          id="path88"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-814"
          inkscape:connection-end="#g9-9"
        />
        <path
          class="line"
          d="m 61.168056,238.11237 3.535715,-1.20732"
          id="path89"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 62.246016,241.08754 3.535715,-1.25043"
          id="path90"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 63.28086,243.804 3.708188,-1.37979"
          id="path91"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 64.401942,246.86542 3.535714,-1.33668"
          id="path92"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 56.643816,259.99665 9.769382,-6.73768"
          id="path93"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-87"
          inkscape:connection-end="#g9-9"
        />
        <path
          class="line"
          d="m 70.442903,252.54794 17.789806,4.62719"
          id="path94"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-9"
          inkscape:connection-end="#path10-90"
        />
        <path
          class="line"
          d="m 72.766924,251.30662 -0.948606,3.44947"
          id="path95"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 76.087384,252.41247 -0.948606,3.44947"
          id="path95-6"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 78.997801,252.94164 -0.948606,3.44947"
          id="path95-1"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 82.437384,253.99997 -0.948606,3.44947"
          id="path95-5"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 85.876967,254.79372 -0.948606,3.44947"
          id="path95-65"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 89.498545,258.53346 2.550983,13.70625"
          id="path100"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-90"
          inkscape:connection-end="#path10-21"
        />
        <path
          class="line"
          d="m 88.677637,262.90548 3.190766,-0.6899"
          id="path101"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 89.326677,266.69035 3.190766,-0.6899"
          id="path101-3"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 92.770896,274.2904 4.780649,8.9094"
          id="path102"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-21"
          inkscape:connection-end="#path10-66"
        />
        <path
          class="line"
          d="m 98.751263,285.03398 8.605237,10.95136"
          id="path104"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-66"
          inkscape:connection-end="#g9-7"
        />

        <path
          class="dkn1"
          d="m 104.54523,303.43684 11.34016,-6.64025"
          id="path106"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="dkn"
          d="m 110.02601,299.6053 0.38333,0.55455"
          id="path107"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#g9-7"
        />
        <path
          class="dkn2"
          d="m 103.13969,293.35201 2.8027,-2.24215"
          id="path105"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="dkn2"
          d="m 100.22928,289.64784 2.8027,-2.24215"
          id="path105-7"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 93.595625,279.88271 3.147647,-1.72472"
          id="path103"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 92.537292,278.03063 3.147647,-1.72472"
          id="path103-7"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="line"
          d="m 94.918542,281.99938 3.147647,-1.72472"
          id="path103-6"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <path
          class="dkn"
          d="m -92.303694,-3.223237 -0.224024,-0.5374336"
          id="path108"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10"
        />
        <path
          class="dkn"
          d="m -98.305593,-1.7987804 12.073171,-3.9022213"
          id="path110"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />

        <text
          xml:space="preserve"
          class="small"
          x="-96.938034"
          y="4.0918994"
          id="text115"
        >
          <tspan
            sodipodi:role="line"
            id="tspan115"
            style="stroke-width: 0.0352778"
            x="-96.938034"
            y="4.0918994"
          >
            23
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-90.026848"
          y="-1.7125434"
          id="text116"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116"
            style="stroke-width: 0.0352778"
            x="-90.026848"
            y="-1.7125434"
          >
            12 ХОЙТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-90.026848"
            y="1.8152443"
            id="tspan117"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-86.440933"
          y="9.3533478"
          id="text116-7"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-86.440933"
            y="9.3533478"
            id="tspan119"
          >
            34 ШААМАР
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-86.440933"
            y="12.881135"
            id="tspan117-2"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-87.541039"
          y="14.59368"
          id="text116-2"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7"
            style="stroke-width: 0.0352778"
            x="-87.541039"
            y="14.59368"
          >
            49 ДУЛААН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-87.541039"
            y="18.121468"
            id="tspan117-7"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-103.51834"
          y="18.33021"
          id="text116-2-1"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-0"
            style="stroke-width: 0.0352778"
            x="-103.51834"
            y="18.33021"
          >
            52 ЕРӨӨ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-103.51834"
            y="21.857998"
            id="tspan117-7-6"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-86.379379"
          y="21.846495"
          id="text116-2-0"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-6"
            style="stroke-width: 0.0352778"
            x="-86.379379"
            y="21.846495"
          >
            73 ОРХОН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-86.379379"
            y="25.374283"
            id="tspan117-7-5"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-90.143654"
          y="26.744585"
          id="text116-2-10"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-4"
            style="stroke-width: 0.0352778"
            x="-90.143654"
            y="26.744585"
          >
            96 ЭНХТАЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-90.143654"
            y="30.272373"
            id="tspan117-7-0"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-91.498657"
          y="50.758907"
          id="text116-2-07"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-65"
            style="stroke-width: 0.0352778"
            x="-91.498657"
            y="50.758907"
          >
            157 САЛХИТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-91.498657"
            y="54.286694"
            id="tspan117-7-4"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-72.091873"
          y="46.18816"
          id="text116-2-8"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-5"
            style="stroke-width: 0.0352778"
            x="-72.091873"
            y="46.18816"
          >
            64 ШАРЫН ГОЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-72.091873"
            y="49.715946"
            id="tspan117-7-05"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-113.29868"
          y="44.105972"
          id="text116-2-070"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-113.29868"
            y="44.105972"
            id="tspan120"
          >
            144 ЦАЙДАМ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-113.29868"
            y="47.633759"
            id="tspan117-7-48"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-110.19188"
          y="55.977745"
          id="text116-2-01"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-9"
            style="stroke-width: 0.0352778"
            x="-110.19188"
            y="55.977745"
          >
            ХӨТӨЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-110.19188"
            y="59.505531"
            id="tspan117-7-51"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-106.24012"
          y="66.093033"
          id="text116-2-3"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-106.24012"
            y="66.093033"
            id="tspan121"
          >
            №2 БЭЛЭНДАЛАЙ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-106.24012"
            y="69.620819"
            id="tspan117-7-7"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-114.78585"
          y="71.779915"
          id="text116-2-4"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-67"
            style="stroke-width: 0.0352778"
            x="-114.78585"
            y="71.779915"
          >
            №4 ОРХОНТУУЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-114.78585"
            y="75.307701"
            id="tspan117-7-69"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-116.80646"
          y="78.202744"
          id="text116-2-6"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-3"
            style="stroke-width: 0.0352778"
            x="-116.80646"
            y="78.202744"
          >
            №6 ХАНГАЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-116.80646"
            y="81.73053"
            id="tspan117-7-1"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-120.77521"
          y="85.346497"
          id="text116-2-40"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-1"
            style="stroke-width: 0.0352778"
            x="-120.77521"
            y="85.346497"
          >
            №8 УЛААНТОЛГОЙ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-120.77521"
            y="88.874283"
            id="tspan117-7-8"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-84.546654"
          y="59.405712"
          id="text116-2-2"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-00"
            style="stroke-width: 0.0352778"
            x="-84.546654"
            y="59.405712"
          >
            191
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-84.546654"
            y="62.933498"
            id="tspan117-7-64"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-78.902092"
          y="60.694149"
          id="text116-2-19"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-2"
            style="stroke-width: 0.0352778"
            x="-78.902092"
            y="60.694149"
          >
            201 БАРУУН ХАРАА
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-78.902092"
            y="64.221939"
            id="tspan117-7-61"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-84.171265"
          y="68.455383"
          id="text116-2-404"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-62"
            style="stroke-width: 0.0352778"
            x="-84.171265"
            y="68.455383"
          >
            221 БЭРХ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-84.171265"
            y="71.98317"
            id="tspan117-7-54"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-61.243961"
          y="77.408997"
          id="text116-2-31"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-32"
            style="stroke-width: 0.0352778"
            x="-61.243961"
            y="77.408997"
          >
            253 ҮНЭГТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-61.243961"
            y="80.936783"
            id="tspan117-7-77"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-64.154373"
          y="87.727745"
          id="text116-2-88"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-42"
            style="stroke-width: 0.0352778"
            x="-64.154373"
            y="87.727745"
          >
            274 ТҮНХ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-64.154373"
            y="91.255531"
            id="tspan117-7-3"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-66.271042"
          y="95.136078"
          id="text116-2-7"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-61"
            style="stroke-width: 0.0352778"
            x="-66.271042"
            y="95.136078"
          >
            295 ШАТАНГ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-66.271042"
            y="98.663864"
            id="tspan117-7-59"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-88.414612"
          y="101.36328"
          id="text116-2-26"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-10"
            style="stroke-width: 0.0352778"
            x="-88.414612"
            y="101.36328"
          >
            314 МАНДАЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-88.414612"
            y="104.89107"
            id="tspan117-7-85"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-66.006462"
          y="107.83607"
          id="text116-2-64"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-24"
            style="stroke-width: 0.0352778"
            x="-66.006462"
            y="107.83607"
          >
            335 НОГООН ТОЛГОЙ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-66.006462"
            y="111.36385"
            id="tspan117-7-68"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-70.768959"
          y="114.97983"
          id="text116-2-9"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-23"
            style="stroke-width: 0.0352778"
            x="-70.768959"
            y="114.97983"
          >
            354 РАШААНТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-70.768959"
            y="118.50761"
            id="tspan117-7-56"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-89.581116"
          y="121.54444"
          id="text116-2-5"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-46"
            style="stroke-width: 0.0352778"
            x="-89.581116"
            y="121.54444"
          >
            369 ДАВАА
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-89.581116"
            y="125.07223"
            id="tspan117-7-548"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-86.506042"
          y="125.21026"
          id="text116-2-94"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-59"
            style="stroke-width: 0.0352778"
            x="-86.506042"
            y="125.21026"
          >
            378 ЭМЭЭЛТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-86.506042"
            y="128.73805"
            id="tspan117-7-62"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-84.791878"
          y="129.53191"
          id="text116-2-12"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-04"
            style="stroke-width: 0.0352778"
            x="-84.791878"
            y="129.53191"
          >
            5 СОНСГОЛОН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-84.791878"
            y="133.05969"
            id="tspan117-7-9"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-87.966873"
          y="134.2944"
          id="text116-2-50"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-41"
            style="stroke-width: 0.0352778"
            x="-87.966873"
            y="134.2944"
          >
            20 СОНГИНО
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-87.966873"
            y="137.82219"
            id="tspan117-7-561"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-77.33271"
          y="142.00517"
          id="text116-2-50-8"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-41-0"
            style="stroke-width: 0.0352778"
            x="-77.33271"
            y="142.00517"
          >
            УБ2
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-77.33271"
            y="145.53296"
            id="tspan117-7-561-1"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-67.329376"
          y="120.27149"
          id="text116-2-14"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-100"
            style="stroke-width: 0.0352778"
            x="-67.329376"
            y="120.27149"
          >
            ТОЛГОЙТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-67.329376"
            y="123.79928"
            id="tspan117-7-35"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.012829"
          y="128.23573"
          id="text116-2-72"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8"
            style="stroke-width: 0.0352778"
            x="-41.012829"
            y="128.23573"
          >
            419 ТУУЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-41.012829"
            y="131.76352"
            id="tspan117-7-2"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-44.253479"
          y="123.87587"
          id="text116-2-72-7"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-7"
            style="stroke-width: 0.0352778"
            x="-44.253479"
            y="123.87587"
          >
            412 АМГАЛАН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-44.253479"
            y="127.40366"
            id="tspan117-7-2-6"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-32.404377"
          y="132.9715"
          id="text116-2-79"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-17"
            style="stroke-width: 0.0352778"
            x="-32.404377"
            y="132.9715"
          >
            14 НАЛАЙХ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-32.404377"
            y="136.49928"
            id="tspan117-7-596"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-59.391876"
          y="134.2944"
          id="text116-2-149"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-34"
            style="stroke-width: 0.0352778"
            x="-59.391876"
            y="134.2944"
          >
            430 ХОНХОР
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-59.391876"
            y="137.82219"
            id="tspan117-7-52"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-56.216877"
          y="138.26315"
          id="text116-2-61"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-39"
            style="stroke-width: 0.0352778"
            x="-56.216877"
            y="138.26315"
          >
            439 БУМБАТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-56.216877"
            y="141.79094"
            id="tspan117-7-17"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-51.71896"
          y="143.29024"
          id="text116-2-32"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-54"
            style="stroke-width: 0.0352778"
            x="-51.71896"
            y="143.29024"
          >
            459 ХАЙРХАН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-51.71896"
            y="146.81802"
            id="tspan117-7-76"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-30.023127"
          y="137.99858"
          id="text116-2-69"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-05"
            style="stroke-width: 0.0352778"
            x="-30.023127"
            y="137.99858"
          >
            450 №4 БАЯН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-30.023127"
            y="141.52637"
            id="tspan117-7-19"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-25.789793"
          y="143.29024"
          id="text116-2-13"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-58"
            style="stroke-width: 0.0352778"
            x="-25.789793"
            y="143.29024"
          >
            466 №8 ХООЛТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-25.789793"
            y="146.81802"
            id="tspan117-7-618"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-21.027294"
          y="147.25899"
          id="text116-2-06"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-637"
            style="stroke-width: 0.0352778"
            x="-21.027294"
            y="147.25899"
          >
            №7 ЦАГААН ХЯР
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-21.027294"
            y="150.78677"
            id="tspan117-7-26"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-36.902294"
          y="153.60899"
          id="text116-2-71"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-01"
            style="stroke-width: 0.0352778"
            x="-36.902294"
            y="153.60899"
          >
            487 ЧУЛУУТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-36.902294"
            y="157.13678"
            id="tspan117-7-87"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-15.735626"
          y="151.49232"
          id="text116-2-86"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-64"
            style="stroke-width: 0.0352778"
            x="-15.735626"
            y="151.49232"
          >
            499 №9 ХАНГАЙ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-15.735626"
            y="155.02011"
            id="tspan117-7-83"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-13.61896"
          y="154.40274"
          id="text116-2-198"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-66"
            style="stroke-width: 0.0352778"
            x="-13.61896"
            y="154.40274"
          >
            509 БАГАХАНГАЙ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-13.61896"
            y="157.93053"
            id="tspan117-7-34"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-31.898071"
          y="163.17233"
          id="text116-2-46"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-7"
            style="stroke-width: 0.0352778"
            x="-31.898071"
            y="163.17233"
          >
            521 МААНЬТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-31.898071"
            y="166.70012"
            id="tspan117-7-41"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-23.408543"
          y="168.16109"
          id="text116-2-95"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-666"
            style="stroke-width: 0.0352778"
            x="-23.408543"
            y="168.16109"
          >
            545 №12
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-23.408543"
            y="171.68887"
            id="tspan117-7-03"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-32.668961"
          y="173.45274"
          id="text116-2-724"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-620"
            style="stroke-width: 0.0352778"
            x="-32.668961"
            y="173.45274"
          >
            579 НАРАН ЭЛГЭН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-32.668961"
            y="176.98053"
            id="tspan117-7-90"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="7.5477066"
          y="163.13399"
          id="text116-2-500"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-43"
            style="stroke-width: 0.0352778"
            x="7.5477066"
            y="163.13399"
          >
            82 ГҮНГАЛУУТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="7.5477066"
            y="166.66177"
            id="tspan117-7-75"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="13.958004"
          y="155.58827"
          id="text116-2-500-8"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="13.958004"
            y="155.58827"
            id="tspan125"
          >
            94
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="13.958004"
            y="159.11606"
            id="tspan117-7-75-7"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-5.7056184"
          y="159.05846"
          id="text116-2-500-8-1"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-5.7056184"
            y="159.05846"
            id="tspan125-1"
          >
            42
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-5.7056184"
            y="162.58624"
            id="tspan117-7-75-7-9"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-6.4752107"
          y="166.0444"
          id="text116-2-34"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-78"
            style="stroke-width: 0.0352778"
            x="-6.4752107"
            y="166.0444"
          >
            БУЛАГТАЙ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-6.4752107"
            y="169.57219"
            id="tspan117-7-590"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="1.4622895"
          y="175.04024"
          id="text116-2-463"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-70"
            style="stroke-width: 0.0352778"
            x="1.4622895"
            y="175.04024"
          >
            538 №16 ООРЦОГ-ЭНГЭР
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="1.4622895"
            y="178.56802"
            id="tspan117-7-16"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="6.2247896"
          y="180.33191"
          id="text116-2-465"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-82"
            style="stroke-width: 0.0352778"
            x="6.2247896"
            y="180.33191"
          >
            624 №18 ЛҮН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="6.2247896"
            y="183.8597"
            id="tspan117-7-23"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="3.5789566"
          y="193.82565"
          id="text116-2-05"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-244"
            style="stroke-width: 0.0352778"
            x="3.5789566"
            y="193.82565"
          >
            658 №20
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="3.5789566"
            y="197.35344"
            id="tspan117-7-45"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="21.835201"
          y="191.17982"
          id="text116-2-45"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-423"
            style="stroke-width: 0.0352778"
            x="21.835201"
            y="191.17982"
          >
            684 ШИВЭЭ ОВОО
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="21.835201"
            y="194.70761"
            id="tspan117-7-86"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="29.772701"
          y="195.41316"
          id="text116-2-90"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-86"
            style="stroke-width: 0.0352778"
            x="29.772701"
            y="195.41316"
          >
            №22 ШИВЭЭ ГОВЬ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="29.772701"
            y="198.94095"
            id="tspan117-7-22"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="8.4413939"
          y="203.66133"
          id="text116-2-65"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-20"
            style="stroke-width: 0.0352778"
            x="8.4413939"
            y="203.66133"
          >
            711 №24 ӨЛЗИЙТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="8.4413939"
            y="207.18912"
            id="tspan117-7-5907"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="40.202637"
          y="203.84149"
          id="text116-2-85"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-321"
            style="stroke-width: 0.0352778"
            x="40.202637"
            y="203.84149"
          >
            ОЛОН ОВОО
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="40.202637"
            y="207.36928"
            id="tspan117-7-96"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="67.503937"
          y="200.36703"
          id="text116-2-77"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-662"
            style="stroke-width: 0.0352778"
            x="67.503937"
            y="200.36703"
          >
            60
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="67.503937"
            y="203.89482"
            id="tspan117-7-63"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="44.658333"
          y="207.5379"
          id="text116-2-09"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-55"
            style="stroke-width: 0.0352778"
            x="44.658333"
            y="207.5379"
          >
            723 №26
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="44.658333"
            y="211.06569"
            id="tspan117-7-38"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="33.975433"
          y="214.65492"
          id="text116-2-98"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-27"
            style="stroke-width: 0.0352778"
            x="33.975433"
            y="214.65492"
          >
            741 №27
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="33.975433"
            y="218.18271"
            id="tspan117-7-07"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="53.320621"
          y="216.05066"
          id="text116-2-89"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-16"
            style="stroke-width: 0.0352778"
            x="53.320621"
            y="216.05066"
          >
            752 АЙРАГ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="53.320621"
            y="219.57845"
            id="tspan117-7-591"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="39.500706"
          y="221.30785"
          id="text116-2-51"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-421"
            style="stroke-width: 0.0352778"
            x="39.500706"
            y="221.30785"
          >
            768 №29
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="39.500706"
            y="224.83563"
            id="tspan117-7-94"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="56.982563"
          y="221.71809"
          id="text116-2-22"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-95"
            style="stroke-width: 0.0352778"
            x="56.982563"
            y="221.71809"
          >
            780 №30 АЛТГАНЫ ГОЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="56.982563"
            y="225.24588"
            id="tspan117-7-02"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="43.327667"
          y="227.9608"
          id="text116-2-43"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-31"
            style="stroke-width: 0.0352778"
            x="43.327667"
            y="227.9608"
          >
            793 №31
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="43.327667"
            y="231.48859"
            id="tspan117-7-900"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="61.787292"
          y="229.01524"
          id="text116-2-262"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-81"
            style="stroke-width: 0.0352778"
            x="61.787292"
            y="229.01524"
          >
            805 №32
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="61.787292"
            y="232.54303"
            id="tspan117-7-97"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="63.746681"
          y="233.35976"
          id="text116-2-986"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-041"
            style="stroke-width: 0.0352778"
            x="63.746681"
            y="233.35976"
          >
            818 №33 УЛХЫН ОВОО
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="63.746681"
            y="236.88754"
            id="tspan117-7-33"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="64.992897"
          y="237.55861"
          id="text116-2-28"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="64.992897"
            y="237.55861"
            id="tspan122"
          >
            831 №34
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="64.992897"
            y="241.0864"
            id="tspan117-7-88"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="66.430862"
          y="240.8103"
          id="text116-2-103"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-166"
            style="stroke-width: 0.0352778"
            x="66.430862"
            y="240.8103"
          >
            814 №35 АГЬ СҮМБЭР
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="66.430862"
            y="244.33809"
            id="tspan117-7-220"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="51.476284"
          y="245.12422"
          id="text116-2-017"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-631"
            style="stroke-width: 0.0352778"
            x="51.476284"
            y="245.12422"
          >
            855 №36
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="51.476284"
            y="248.65201"
            id="tspan117-7-175"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="52.576839"
          y="248.60216"
          id="text116-2-75"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-428"
            style="stroke-width: 0.0352778"
            x="52.576839"
            y="248.60216"
          >
            866 №37
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="52.576839"
            y="252.12994"
            id="tspan117-7-79"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="35.647377"
          y="263.18097"
          id="text116-2-73"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-84"
            style="stroke-width: 0.0352778"
            x="35.647377"
            y="263.18097"
          >
            50 ЗҮҮНБАЯН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="35.647377"
            y="266.70877"
            id="tspan117-7-47"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="91.297829"
          y="258.26117"
          id="text116-2-052"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-30"
            style="stroke-width: 0.0352778"
            x="91.297829"
            y="258.26117"
          >
            №43 ӨРГӨН
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="91.297829"
            y="261.78897"
            id="tspan117-7-42"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="86.20565"
          y="254.8371"
          id="text116-2-882"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-94"
            style="stroke-width: 0.0352778"
            x="86.20565"
            y="254.8371"
          >
            928 №42
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="86.20565"
            y="258.36487"
            id="tspan117-7-865"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="71.351013"
          y="260.4162"
          id="text116-2-7244"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-02"
            style="stroke-width: 0.0352778"
            x="71.351013"
            y="260.4162"
          >
            914 №41
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="71.351013"
            y="263.944"
            id="tspan117-7-73"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="64.268097"
          y="258.05045"
          id="text116-2-17"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-11"
            style="stroke-width: 0.0352778"
            x="64.268097"
            y="258.05045"
          >
            894 №39
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="64.268097"
            y="261.57825"
            id="tspan117-7-39"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="78.985199"
          y="252.45973"
          id="text116-2-1989"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-38"
            style="stroke-width: 0.0352778"
            x="78.985199"
            y="252.45973"
          >
            №40 ТҮШЛЭГ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="78.985199"
            y="255.98752"
            id="tspan117-7-14"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="72.071556"
          y="249.99789"
          id="text116-2-382"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-969"
            style="stroke-width: 0.0352778"
            x="72.071556"
            y="249.99789"
          >
            885 №38
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="72.071556"
            y="253.52568"
            id="tspan117-7-95"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="92.440598"
          y="262.49451"
          id="text116-2-24"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-015"
            style="stroke-width: 0.0352778"
            x="92.440598"
            y="262.49451"
          >
            951 №44
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="92.440598"
            y="266.02231"
            id="tspan117-7-566"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="92.893066"
          y="266.99631"
          id="text116-2-44"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-008"
            style="stroke-width: 0.0352778"
            x="92.893066"
            y="266.99631"
          >
            954 №445
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="92.893066"
            y="270.52411"
            id="tspan117-7-40"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="69.01947"
          y="273.95993"
          id="text116-2-29"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-649"
            style="stroke-width: 0.0352778"
            x="69.01947"
            y="273.95993"
          >
            986 УЛААН УУЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="69.01947"
            y="277.48773"
            id="tspan117-7-075"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-89.861938"
          y="55.521408"
          id="text116-2-38"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-40"
            style="stroke-width: 0.0352778"
            x="-89.861938"
            y="55.521408"
          >
            168 ЭРХЭТ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-89.861938"
            y="59.049194"
            id="tspan117-7-53"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="96.029716"
          y="276.40237"
          id="text116-2-58"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-248"
            style="stroke-width: 0.0352778"
            x="96.029716"
            y="276.40237"
          >
            1006 №48
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="96.029716"
            y="279.93018"
            id="tspan117-7-32"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="68.360832"
          y="281.66"
          id="text116-2-906"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-89"
            style="stroke-width: 0.0352778"
            x="68.360832"
            y="281.66"
          >
            №49 ЦАГААН ХАД
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="68.360832"
            y="285.18781"
            id="tspan117-7-44"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="98.53376"
          y="281.66733"
          id="text116-2-03"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-76"
            style="stroke-width: 0.0352778"
            x="98.53376"
            y="281.66733"
          >
            1027 №50
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="98.53376"
            y="285.19513"
            id="tspan117-7-225"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="66.45797"
          y="286.50653"
          id="text116-2-54"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-647"
            style="stroke-width: 0.0352778"
            x="66.45797"
            y="286.50653"
          >
            1046 №52 АВГЫН ГОЛ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="66.45797"
            y="290.03433"
            id="tspan117-7-613"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="62.822765"
          y="291.38022"
          id="text116-2-41"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-013"
            style="stroke-width: 0.0352778"
            x="62.822765"
            y="291.38022"
          >
            1069 №54 НАРТЫН ХОШУУ
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="62.822765"
            y="294.90802"
            id="tspan117-7-909"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="89.652985"
          y="295.04602"
          id="text116-2-96"
        >
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="89.652985"
            y="295.04602"
            id="tspan123"
          >
            1094 №56
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="89.652985"
            y="298.57382"
            id="tspan117-7-620"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="109.94145"
          y="295.16107"
          id="text116-2-034"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-48"
            style="stroke-width: 0.0352778"
            x="109.94145"
            y="295.16107"
          >
            1111
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="109.94145"
            y="298.68887"
            id="tspan117-7-979"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="60.866871"
          y="252.67435"
          id="text116-2-587"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-28"
            style="stroke-width: 0.0352778"
            x="60.866871"
            y="252.67435"
          >
            876
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="60.866871"
            y="256.20215"
            id="tspan117-7-777"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-126.47749"
          y="76.312309"
          id="text116-2-6-7"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-3-5"
            style="stroke-width: 0.0352778"
            x="-126.47749"
            y="76.312309"
          >
            120
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-126.47749"
            y="79.840096"
            id="tspan117-7-1-5"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-119.51001"
          y="67.27813"
          id="text116-2-6-2"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-3-4"
            style="stroke-width: 0.0352778"
            x="-119.51001"
            y="67.27813"
          >
            82
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-119.51001"
            y="70.805916"
            id="tspan117-7-1-3"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-108.05235"
          y="60.58297"
          id="text116-2-6-5"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-3-2"
            style="stroke-width: 0.0352778"
            x="-108.05235"
            y="60.58297"
          >
            42
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-108.05235"
            y="64.110756"
            id="tspan117-7-1-0"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-93.818024"
          y="62.600597"
          id="text116-2-2-4"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-00-6"
            style="stroke-width: 0.0352778"
            x="-93.818024"
            y="62.600597"
          >
            179
          </tspan>
          <tspan
            sodipodi:role="line"
            style="stroke-width: 0.0352778"
            x="-93.818024"
            y="66.128387"
            id="tspan117-7-64-5"
          />
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3"
            style="stroke-width: 0.0352778"
            x="-56.73424"
            y="129.34842237"
          >
            407
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-2"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-2"
            style="stroke-width: 0.0352778"
            x="-78.994468"
            y="118.163095"
          >
            361
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-9"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-3"
            style="stroke-width: 0.0352778"
            x="-77.142385"
            y="110.225595"
          >
            345
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-6"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-7"
            style="stroke-width: 0.0352778"
            x="-74.761135"
            y="105.727679"
          >
            324
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-1"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-21"
            style="stroke-width: 0.0352778"
            x="-73.173635"
            y="82.17976237"
          >
            264
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-65"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-72"
            style="stroke-width: 0.0352778"
            x="-71.808494"
            y="74.04663537"
          >
            241
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-4"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-74"
            style="stroke-width: 0.0352778"
            x="-128.762868"
            y="84.96350837"
          >
            46
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-3"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-0"
            style="stroke-width: 0.0352778"
            x="-131.121257"
            y="96.61292037"
          >
            184
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-23"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-6"
            style="stroke-width: 0.0352778"
            x="-103.336135"
            y="31.115179"
          >
            121
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-37"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-4"
            style="stroke-width: 0.0352778"
            x="-63.648635"
            y="69.479762"
          >
            231
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="small"
          x="-41.166233"
          y="128.8877"
          id="text116-2-72-0-27"
        >
          <tspan
            sodipodi:role="line"
            id="tspan116-7-8-3-22"
            style="stroke-width: 0.0352778"
            x="3.555532"
            y="189.071429"
          >
            645
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="71.353378"
          y="202.96721"
          id="text124"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="71.353378"
            y="202.96721"
          >
            БОР-ӨНДӨР
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="36.658524"
          y="254.13348"
          id="text124-5"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-3"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="36.658524"
            y="254.13348"
          >
            САЙНШАНД
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="80.537132"
          y="300.20544"
          id="text124-6"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-2"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="80.537132"
            y="300.20544"
          >
            ЗАМЫН-ҮҮД
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="15.399665"
          y="185.4646"
          id="text124-58"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-0"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="15.399665"
            y="185.4646"
          >
            ЧОЙР
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="14.122846"
          y="159.12907"
          id="text124-0"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-8"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="14.122846"
            y="159.12907"
          >
            БАГАНУУР
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="-86.154243"
          y="3.5540688"
          id="text124-66"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-87"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="-86.154243"
            y="3.5540688"
          >
            СҮХБААТАР
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="-90.533234"
          y="32.010143"
          id="text124-1"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-81"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="-90.533234"
            y="32.010143"
          >
            ДАРХАН 1
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="-88.420441"
          y="36.427479"
          id="text124-7"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-5"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="-88.420441"
            y="36.427479"
          >
            ДАРХАН 2
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="-119.94033"
          y="93.918777"
          id="text124-18"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-35"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="-119.94033"
            y="93.918777"
          >
            ЭРДЭНЭТ
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="medium"
          x="-63.929241"
          y="66.260323"
          id="text124-75"
        >
          <tspan
            sodipodi:role="line"
            id="tspan124-23"
            style="font-size: 3.88056px; stroke-width: 0.0352778"
            x="-63.929241"
            y="66.260323"
          >
            ЗҮҮНХАРАА
          </tspan>
        </text>
        <text
          xml:space="preserve"
          class="big"
          x="-51.868"
          y="119.84772"
          id="text126"
        >
          <tspan
            sodipodi:role="line"
            id="tspan126"
            style="
              font-size: 5.64444px;
              stroke-width: 0.0352778;
              stroke: #4b4b4b;
              stroke-opacity: 1;
            "
            x="-51.868"
            y="119.84772"
          >
            УЛААНБААТАР
          </tspan>
        </text>

        <path
          style="
            display: inline;
            fill: none;
            fill-rule: evenodd;
            stroke: #343434;
            stroke-width: 0.264583px;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-opacity: 1;
          "
          d="m -58.828534,124.89872 -1.60127,6.40389"
          id="path126"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
          inkscape:connection-start="#path10-16"
        />
        <path
          style="
            fill: none;
            fill-rule: evenodd;
            stroke: #343434;
            stroke-width: 0.264583px;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-opacity: 1;
          "
          d="m -71.589905,140.1233 11.198452,-8.9741"
          id="path127"
          inkscape:connector-type="polyline"
          inkscape:connector-curvature="0"
        />
        <g>
          <v-hover v-for="ring in rings">
            <template v-slot:default="{ isHovering, props }">
              <g
                v-bind="props"
                :transform="`translate(${ring.x},${ring.y})`"
                @click="clickRoute(ring.route)"
                @mouseover="mouseOverHandler($event, ring.route)"
              >
                <circle class="ring1" cx="-89.784561" cy="2.9038305" r="2.25" />
                <circle class="ring2" cx="-89.784279" cy="2.9038956" r="1.5" />
              </g>
            </template>
          </v-hover>

          <v-hover v-for="circle in circles">
            <template v-slot:default="{ isHovering, props }">
              <g
                v-bind="props"
                @click="clickRoute(circle.route)"
                @mouseover="mouseOverHandler($event, circle.route)"
              >
                <circle
                  :key="circle.route"
                  :class="circle.class"
                  :cx="circle.cx"
                  :cy="circle.cy"
                  :r="circle.class === 'blue' ? '2.5' : '1.1'"
                  @click="clickRoute(circle.route)"
                />
              </g>
            </template>
          </v-hover>
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    receivedData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      inp: "",
      multi: false,
      SelectMenu: false,
      datas: this.receivedData || [{ field: "location", level: "1" }],
      options: [],
      selects: [],
      width: this?.receivedData?.width ? this.receivedData.width : "1000px",
      height: this?.receivedData?.height ? this.receivedData.height : "1000px",
      test: "",
      rings: [
        { x: -0.04311848, y: -0.09701658, route: "1.3" },
        { x: 14.2483, y: 41.206449, route: "1.15.6" },
        { x: -4.6552057, y: 33.344333, route: "1.16" },
        { x: -4.2317446, y: 47.090921, route: "1.21" },
        { x: 22.583282, y: 64.398565, route: "1.30" },
        { x: 26.994962, y: 120.39812, route: "1.53" },
        { x: 42.162449, y: 122.07773, route: "1.57" },
        { x: 99.841615, y: 154.09231, route: "1.73.6" },
        { x: 101.15866, y: 183.37482, route: "1.83" },
        { x: 158.04995, y: 249.07773, route: "1.100" },
        { x: 198.5312, y: 294.85065, route: "1.126" },
      ],
      circles: [
        { class: "blue", cx: -95.029457, cy: 30.668556, route: "1.15" },
        { class: "blue", cx: -124.10128, cy: 92.423225, route: "1.21.13" },
        { class: "blue", cx: -53.722115, cy: 124.17323, route: "1.55" },

        { class: "dot", cx: -91.88047, cy: -2.2079268, route: "1.2" },
        { class: "dot", cx: -88.45961, cy: 8.4732294, route: "1.5" },
        { class: "dot", cx: -89.517944, cy: 13.500312, route: "1.7" },
        { class: "dot", cx: -89.253365, cy: 17.469063, route: "1.9" },
        { class: "dot", cx: -88.724197, cy: 20.908646, route: "1.11" },
        { class: "dot", cx: -92.42836, cy: 25.406563, route: "1.12" },
        { class: "dot", cx: -93.751282, cy: 43.398228, route: "1.19" },
        { class: "dot", cx: -98.778366, cy: 56.098228, route: "1.21.2" },
        { class: "dot", cx: -102.74712, cy: 61.919064, route: "1.21.3" },
        { class: "dot", cx: -113.85961, cy: 67.475311, route: "1.21.5" },
        { class: "dot", cx: -90.840866, cy: 55.569061, route: "1.22" },
        { class: "dot", cx: -88.45961, cy: 59.273228, route: "1.24" },
        { class: "dot", cx: -79.463783, cy: 62.448231, route: "1.27" },
        { class: "dot", cx: -72.32003, cy: 64.035728, route: "1.29" },
        { class: "dot", cx: -119.15128, cy: 76.735733, route: "1.21.10" },
        { class: "dot", cx: -122.85545, cy: 83.879478, route: "1.21.12" },
        { class: "dot", cx: -63.853363, cy: 76.735733, route: "1.33" },
        { class: "dot", cx: -65.705444, cy: 86.525314, route: "1.36" },
        { class: "dot", cx: -67.822113, cy: 93.933647, route: "1.40" },
        { class: "dot", cx: -69.409615, cy: 101.34198, route: "1.43" },
        { class: "dot", cx: -67.465416, cy: 106.68264, route: "1.45" },
        { class: "dot", cx: -72.58461, cy: 113.77739, route: "1.49" },
        { class: "dot", cx: -72.05545, cy: 120.92114, route: "1.51" },
        { class: "dot", cx: -67.028366, cy: 122.50864, route: "1.52" },
        { class: "dot", cx: -67.994583, cy: 132.91951, route: "1.53.1" },
        { class: "dot", cx: -62.087517, cy: 128.72929, route: "1.53.2" },
        { class: "dot", cx: -58.561699, cy: 123.83157, route: "1.54" },
        { class: "dot", cx: -42.686699, cy: 128.32948, route: "1.60" },
        { class: "dot", cx: -40.305447, cy: 132.29823, route: "1.61" },
        { class: "dot", cx: -34.749199, cy: 132.29823, route: "1.61.2" },
        { class: "dot", cx: -37.130447, cy: 135.47324, route: "1.62" },
        { class: "dot", cx: -32.897114, cy: 138.11906, route: "1.63" },
        { class: "dot", cx: -30.515863, cy: 141.02948, route: "1.64" },
        { class: "dot", cx: -27.291872, cy: 143.89677, route: "1.66" },
        { class: "dot", cx: -22.049198, cy: 148.43782, route: "1.68" },
        { class: "dot", cx: -18.960434, cy: 150.91118, route: "1.70" },
        { class: "dot", cx: -16.492947, cy: 152.72014, route: "1.71" },
        { class: "dot", cx: -14.37628, cy: 155.31699, route: "1.73" },
        { class: "dot", cx: -5.9096131, cy: 161.40239, route: "1.73.2" },
        { class: "dot", cx: 5.4674697, cy: 160.07948, route: "1.73.5" },
        { class: "dot", cx: -13.317947, cy: 161.13782, route: "1.74" },
        { class: "dot", cx: -5.9096131, cy: 170.39824, route: "1.77" },
        { class: "dot", cx: 4.9383025, cy: 181.51073, route: "1.80" },
        { class: "dot", cx: 20.28414, cy: 192.09407, route: "1.84" },
        { class: "dot", cx: 27.692471, cy: 195.53365, route: "1.85" },
        { class: "dot", cx: 39.06955, cy: 205.05864, route: "1.88" },
        { class: "dot", cx: 68.967468, cy: 202.6774, route: "1.90.3" },
        { class: "dot", cx: 50.71122, cy: 214.58365, route: "1.90" },
        { class: "dot", cx: 61.651245, cy: 233.72577, route: "1.96" },
        { class: "dot", cx: 55.7383, cy: 260.62115, route: "1.100.2" },
        { class: "dot", cx: 89.297272, cy: 257.45203, route: "1.105" },
        { class: "dot", cx: 92.250801, cy: 273.32114, route: "1.109" },
        { class: "dot", cx: 98.07164, cy: 284.16907, route: "1.118" },
      ],
      mouseOverIndicator: false,
      hoverValue: { route: "", x: 0, y: 0 },
    };
  },
  methods: {
    mouseOverHandler(event, route) {
      this.mouseOverIndicator = true;
      this.hoverValue.route = route;
      this.hoverValue.x = event.clientX;
      this.hoverValue.y = event.clientY;
    },
    async clickRoute(inp) {
      if (multi) {
        this.SelectMenu = true;
        this.inp = inp;
      } else {
        const input = {
          data: inp,
          parse: "route",
          key: "location",
        };
        const data = await GetData.getAll(input.key);
        data.forEach((element) => {
          if (element[input.parse] === input.data) {
            // this.test = element;
            this.$emit("svgReturn", [{ key: input.key, value: element }]);
          }
        });
      }
    },
    async clickRoutes(inp, field) {
      var output = [];
      await Promise.all(
        (output = this.selects.map(async (select) => {
          if (field === select.field) {
            select.input = { data: inp, parse: "route" };
            const data = await GetData.getAll(select.link);
            data.forEach((element) => {
              if (element[select.input.parse] === select.input.data) {
                return {
                  key: select.link,
                  value: element,
                };
              }
            });
          }
        })),
      );
      this.$emit("svgReturn", output);
    },
    setup() {
      if (!this.receivedData) {
        this.multi = true;
        this.options = [];
        this.selects = this.datas.map((data) => {
          this.options.push(data);
          return {
            ...data,
            input: {},
          };
        });
      }
    },
  },
  mounted() {
    this.setup();
  },
};
</script>

<style>
circle {
  z-index: 1;
}
circle.ring1 {
  fill: #000000;
  fill-opacity: 1;
  stroke: none;
  stroke-width: 0.708;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
  z-index: 1;
}

circle.ring2 {
  fill: #ffffff;
  fill-opacity: 1;
  stroke: none;
  stroke-width: 0.673464;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
  z-index: 1;
}

circle.blue {
  fill: #01d6ff;
  fill-opacity: 1;
  stroke: none;
  stroke-width: 0.670652;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
  z-index: 1;
}

circle.dot {
  fill: #000000;
  fill-opacity: 1;
  stroke: none;
  stroke-width: 0.562925;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
  z-index: 1;
}

path.line {
  fill: none;
  fill-rule: evenodd;
  stroke: #000000;
  stroke-width: 0.264583px;
  stroke-linecap: butt;
  stroke-linejoin: miter;
  stroke-opacity: 1;
}

path.dkn {
  fill: #ff0101;
  fill-opacity: 1;
  fill-rule: evenodd;
  stroke: #ff0101;
  stroke-width: 0.264583px;
  stroke-linecap: butt;
  stroke-linejoin: miter;
  stroke-opacity: 1;
}

path.dkn1 {
  fill: none;
  fill-rule: evenodd;
  stroke: #ff0000;
  stroke-width: 0.264583px;
  stroke-linecap: butt;
  stroke-linejoin: miter;
  stroke-opacity: 1;
}

path.dkn2 {
  display: inline;
  fill: none;
  fill-rule: evenodd;
  stroke: #000000;
  stroke-width: 0.264583px;
  stroke-linecap: butt;
  stroke-linejoin: miter;
  stroke-opacity: 1;
}

text.big {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 5.64444px;
  font-family: Arial;
  -inkscape-font-specification: Arial;
  fill: #000000;
  fill-opacity: 1;
  stroke: #4b4b4b;
  stroke-width: 0.0352777;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
}

text.medium {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 3.88056px;
  font-family: Arial;
  -inkscape-font-specification: Arial;
  fill: #000000;
  fill-opacity: 1;
  stroke: #000000;
  stroke-width: 0.0352777;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
}

text.small {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 2.82223px;
  font-family: Arial;
  -inkscape-font-specification: Arial;
  fill: #000000;
  fill-opacity: 1;
  stroke: #000000;
  stroke-width: 0.0352777;
  stroke-dasharray: none;
  stroke-opacity: 1;
  paint-order: markers stroke fill;
}
</style>
