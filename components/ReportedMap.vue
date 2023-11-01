<template>
  <div id="map-wrap">
    <div class="autocomplete-container" id="autocomplete-container">
      <div class="form-check form-check-inline search">
        <input
          type="text"
          name=""
          id="search-bar"
          placeholder="Enter an address"
          v-model="addSearch"
          class="form-control"
          v-on:keyup.enter="autoComplete()"
        />
        <input
          type="button"
          value="Search"
          @click="autoComplete()"
          class="btn btn-primary"
        />
      </div>
      <div class="results">
        <div
          class="result"
          v-for="result in limitResults"
          :key="result.index"
          @click="recenterMap(result)"
        >
          {{ result.properties.formatted }}
        </div>
      </div>
    </div>

    <client-only>
      <l-map id="map" :zoom="zoom" :center="centreCoords" @click="moveMarker">
        <l-tile-layer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <div v-for="report in reports" :key="report.index">
          <l-marker
            :lat-lng="[report.lat, report.lon]"
            @click="getDets(report)"
          ></l-marker>
        </div>
      </l-map>
    </client-only>
    <div v-if="dets" class="report-details">
      <ReportDetails :report="currentReport" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reports: Array,
  },
  computed: {
    limitResults() {
      return this.autoResults.slice(0, 3);
    },
  },

  data() {
    return {
      apiKey: process.env.NUXT_ENV_API_KEY,
      zoom: 15,
      centreCoords: [50.795893175589484, 0.26435462099609897],
      lat: "50.795893175589484",
      lon: "0.26435462099609897",
      addSearch: "",
      dets: false,
      currentReport: {},
      address: {
        country_code: "gb",
        street: "Stanmer Drive",
        country: "United Kingdom",
        county: "East Sussex",
        datasource: {
          sourcename: "openstreetmap",
          attribution: "© OpenStreetMap contributors",
          license: "Open Database License",
          url: "https://www.openstreetmap.org/copyright",
        },
        state: "England",
        city: "Eastbourne",
        lon: 0.263575,
        lat: 50.795528,
        state_code: "ENG",
        distance: 68.20109792297515,
        result_type: "street",
        formatted: "Stanmer Drive, Eastbourne, United Kingdom",
        address_line1: "Stanmer Drive",
        address_line2: "Eastbourne, United Kingdom",
        county_code: "ESX",
        rank: {
          popularity: 4.7685678919278995,
        },
        place_id: "51cac342ad69ded03f59b1868bdcd3654940",
      },
      autoResults: [],
    };
  },

  mounted() {
    this.getLoc();
  },

  methods: {
    moveMarker(event) {
      this.centreCoords = event.latlng;
      this.lat = event.latlng.lat;
      this.lon = event.latlng.lng;

      this.getAddress();
    },

    autoComplete() {
      if (this.addSearch.length >= 3) {
        fetch(
          "https://api.geoapify.com/v1/geocode/autocomplete?text=" +
            this.addSearch +
            "&apiKey=" +
            this.apiKey
        )
          .then((response) => response.json())
          .then((result) => {
            this.autoResults = result.features;
          })
          .catch((error) => console.log("error", error));
      } else {
        alert("Search field must be at least 3 characters");
      }
    },

    recenterMap(result) {
      this.centreCoords = [result.properties.lat, result.properties.lon];
      this.zoom = 16;
      this.autoResults = [];
    },

    getLoc() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.centreCoords = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;

        this.getAddress();
      });
    },

    getAddress() {
      fetch(
        "https://api.geoapify.com/v1/geocode/reverse?lat=" +
          this.lat +
          "&lon=" +
          this.lon +
          "&apiKey=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((result) => {
          this.address = result.features[0].properties;
          this.address.lat = this.lat;
          this.address.lon = this.lon;
          this.$store.commit("setAddress", this.address);
        })
        .catch((error) => console.log("error", error));
    },
    getDets(i) {
      this.dets = true;
      this.currentReport = i;
    },
  },
};
</script>

<style>
#map-wrap {
  width: 100vw;
  height: 50vh;
  padding-bottom: 3em;
  margin-bottom: 10em;
}

.autocomplete-container {
  justify-content: center;
  text-align: center;
  align-items: center;
  max-width: 85%;
  margin: auto;
}

.search {
  margin-bottom: 0.4em;
}

#search-bar {
  min-width: 10em;
}

.results {
  position: absolute;
  z-index: 999;
  min-height: 8em;
  display: none;
  max-height: 30vh;
}
.result {
  padding: 1em;
  z-index: 999;
  border: 1px grey solid;
  background-color: lightgray;
}

.autocomplete-container:hover .results {
  display: block;
}

.result:hover {
  background-color: honeydew;
  cursor: pointer;
}

@media screen and (min-width: 800px) {
  .autocomplete-container {
    max-width: 25%;
  }
}
</style>
