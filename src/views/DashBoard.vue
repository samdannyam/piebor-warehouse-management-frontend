<script setup>
import axios from "axios";
import StaticData from "../scripts/staticData";
import io from "socket.io-client";
</script>
<template>
  <!-- {{ buses }} -->
  <div id="map"></div>
  <!-- <div id="bar">
    <p class="auto"><input type="text" id="autoc" /></p>
    <p><a id="clear" href="#">Click here</a> to clear map.</p>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      socketUrl: "http://82.197.92.248",
      // socketUrl: "http://localhost:3000",
      apiKey: "AIzaSyA9YZLX-zlaKT6c8WvZlsIvtRlHDr0SNJ8",
      map: null,
      drawingManager: null,
      placeIdArray: [],
      polylines: [],
      snappedCoordinates: [],
      routes: [],
      buses: [],
      mapBuses: [],
      timer: null,
    };
  },
  methods: {
    initialize() {
      var mapOptions = {
        zoom: 12,
        center: { lat: 47.88081155906676, lng: 106.87338534481036 },
        // center: { lat: 47.83990980447284, lng: 106.79051295665754},
        // center: { lat: 47.91675949646185, lng: 106.91738907465908 },
      };
      this.map = new google.maps.Map(
        document.getElementById("map"),
        mapOptions,
      );

      // Delgetsiin gold gazriin zurgiig bairluulah
      // this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      //   document.getElementById("bar"),
      // );
      // var autocomplete = new google.maps.places.Autocomplete(
      //   document.getElementById("autoc"),
      // );
      // autocomplete.bindTo("bounds", map);
      // autocomplete.addListener("place_changed", function () {
      //   var place = autocomplete.getPlace();
      //   if (place.geometry.viewport) {
      //     this.map.fitBounds(place.geometry.viewport);
      //   } else {
      //     this.map.setCenter(place.geometry.location);
      //     this.map.setZoom(14);
      //   }
      // });

      // polyline zurah
      // this.drawingManager = new google.maps.drawing.DrawingManager({
      //   drawingMode: google.maps.drawing.OverlayType.POLYLINE,
      //   drawingControl: true,
      //   drawingControlOptions: {
      //     position: google.maps.ControlPosition.TOP_CENTER,
      //     drawingModes: [google.maps.drawing.OverlayType.POLYLINE],
      //   },
      //   polylineOptions: {
      //     strokeColor: "#696969",
      //     strokeWeight: 2,
      //     strokeOpacity: 0.3,
      //   },
      // });
      // this.drawingManager.setMap(this.map);

      // // herwee polyline duuswal snap-to-road ajluulah
      // this.drawingManager.addListener(
      //   "polylinecomplete",
      //   this.polylineCompleteListener,
      // );

      //clear button
      // document
      //   .getElementById("clear")
      //   .addEventListener("click", this.clearEvent);
    },
    polylineCompleteListener(poly) {
      var path = poly.getPath();
      this.polylines.push(poly);
      this.placeIdArray = [];
      this.runSnapToRoad(path);
    },
    clearEvent(event) {
      event.preventDefault();
      for (var i = 0; i < this.polylines.length; i++) {
        this.polylines[i].setMap(null);
      }
      this.polylines = [];
      return false;
    },
    runSnapToRoad(path) {
      var pathValues = [];
      for (var i = 0; i < path.getLength(); i++) {
        pathValues.push(path.getAt(i).toUrlValue());
      }
      axios
        .get("https://roads.googleapis.com/v1/snapToRoads", {
          params: {
            interpolate: true,
            key: this.apiKey,
            path: pathValues.join("|"),
          },
        })
        .then((response) => {
          this.processSnapToRoadResponce(response.data);
          this.drawSnappedPolyline();
        })
        .catch((error) => {
          console.error("Error fetching snap to road data:", error);
        });
    },

    processSnapToRoadResponce(data) {
      this.snappedCoordinates = [];
      this.placeIdArray = [];
      for (var i = 0; i < data.snappedPoints.length; i++) {
        var latlng = new google.maps.LatLng(
          data.snappedPoints[i].location.latitude,
          data.snappedPoints[i].location.longitude,
        );
        this.snappedCoordinates.push(latlng);
        this.placeIdArray.push(data.snappedPoints[i].placeId);
      }
    },

    drawSnappedPolyline() {
      var snappedPolyline = new google.maps.Polyline({
        path: this.snappedCoordinates,
        strokeColor: "#ff0000",
        strokeWeight: 6,
        strokeOpacity: 0.7,
      });

      snappedPolyline.setMap(this.map);
      this.polylines.push(snappedPolyline);
    },
    async initRoutes() {
      const response = await axios.post("bus/routes");
      this.routes = response.data;
      this.routes.forEach((route) => {
        route.channels.forEach((channel) => {
          channel.datas.forEach((data) => {
            if (data.type === "road") {
              var roadLine = new google.maps.Polyline(data);
              roadLine.setMap(this.map);
            } else if (data.type === "station") {
              var stationPoint = new google.maps.Circle(data);
              stationPoint.setMap(this.map);
            }
          });
        });
      });
      this.initSocket();
    },
    initBuses() {
      this.busLocationFixer();
      this.buses.forEach((bus) => {
        let existingBus = this.mapBuses.find(
          (mapBus) => mapBus.bus_id === bus.bus_id,
        );
        if (existingBus) {
          let newPosition = new google.maps.LatLng(
            bus.location.lat,
            bus.location.lng,
          );
          existingBus.map.setPosition(newPosition);
          existingBus.div.innerHTML = `
            <div class="mapInfo">
              <p>${bus.bus_id} ${(bus.speed * 3.6).toFixed(0)} км/ц</p></div>`;
        } else if (bus.location.lat !== 0 && bus.location.lng) {
          let marker = new google.maps.Marker({
            position: { lat: bus.location.lat, lng: bus.location.lng },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: bus.color,
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 7,
            },
            map: this.map,
          });

          // Add a div at the same position as the marker
          let div = document.createElement("div");
          div.className = "custom-marker";
          div.innerHTML = `
            <div class="mapInfo">
              <p>${bus.bus_id} ${(bus.speed * 3.6).toFixed(0)} км/ц</p></div>`;
          div.style.position = "absolute";
          div.style.left = "0";
          div.style.top = "0";
          this.map.getDiv().appendChild(div);

          // Position the div at the marker's position
          let overlay = new google.maps.OverlayView();
          const mapDiv = document.getElementById("map");
          const height = mapDiv.clientHeight;
          const width = mapDiv.clientWidth;
          overlay.draw = function () {
            let projection = overlay.getProjection();
            let pixel = projection.fromLatLngToDivPixel(marker.getPosition());
            div.style.left = pixel.x + width / 2 + "px";
            div.style.top = pixel.y + height / 2 + "px";
          };
          overlay.setMap(this.map);

          this.mapBuses.push({
            bus_id: bus.bus_id,
            map: marker,
            div: div,
          });
        }
      });
      // Hide overlay when map is dragged
      google.maps.event.addListener(this.map, "dragstart", () => {
        this.mapBuses.forEach((bus) => {
          bus.div.style.display = "none";
        });
      });

      // Show overlay when map drag ends
      google.maps.event.addListener(this.map, "dragend", () => {
        this.mapBuses.forEach((bus) => {
          bus.div.style.display = "block";
        });
      });
    },

    busLocationFixer() {
      this.buses.forEach((bus) => {
        var near1 = { loc: null, dis: 360 };
        var near2 = { loc: null, dis: 360 };
        this.routes.forEach((route) => {
          if (route.name === bus.route) {
            route.channels.forEach((channel) => {
              if (bus.channel === channel.channel) {
                channel.datas.forEach((data) => {
                  if (data.type === "road") {
                    data.path.forEach((rloc) => {
                      var dis = this.calculateDistance(rloc, bus.location);
                      if (dis <= near1.dis) {
                        near2 = {
                          loc: near1.loc,
                          dis: near1.dis,
                        };
                        near1 = {
                          loc: rloc,
                          dis: dis,
                        };
                      } else {
                        if (dis <= near2.dis) {
                          near2 = {
                            loc: rloc,
                            dis: dis,
                          };
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        });
        const rawBusLoc = bus.location;
        const loc = this.calculateIntersectionPoint(
          near1.loc,
          near2.loc,
          bus.location,
        );
        if (this.calculateDistance(rawBusLoc, loc) <= 0.001) {
          bus.location = { lat: loc.lat, lng: loc.lng };
        }
      });
    },
    calculateDistance(p1, p2) {
      return Math.sqrt(
        Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2),
      );
    },
    calculateIntersectionPoint(p1, p2, bus) {
      const m = (p2.lat - p1.lat) / (p2.lng - p1.lng);
      const mp = -1 / m;

      const b = bus.lat - mp * bus.lng;

      const x = (b - p1.lat + m * p1.lng) / (m - mp);
      const y = mp * x + b;
      return { lat: y, lng: x };
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.buses.forEach((bus) => {
          if (bus.channel === "arhiv") {
            bus.location = {
              lat: bus.location.lat + 0.0001,
              lng: bus.location.lng + 0.0001,
            };
          } else {
            bus.location = {
              lat: bus.location.lat - 0.0001,
              lng: bus.location.lng - 0.0001,
            };
          }
        });
        this.initBuses();
      }, 10);
    },
    initSocket() {
      const socket = io(this.socketUrl);
      socket.on("buses", (datas) => {
        datas.forEach((data) => {
          var maybeNew = true;
          this.buses.forEach((bus) => {
            if (bus.bus_id === data.bus_id) {
              bus.channel = data.channel;
              bus.location = data.location;
              bus.speed = data.speed;
              bus.publishedAt = data.publishedAt;
              maybeNew = false;
            }
          });
          if (maybeNew) {
            this.buses.push(data);
          }
        });
        this.initBuses();
      });
    },
  },
  mounted() {
    this.initialize();
    this.initRoutes();
    // this.startTimer();
    // axios.get("bus/run");
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
