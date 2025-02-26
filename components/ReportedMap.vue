<template>
  <div id="map-wrap">
    <div v-if="!currentReport">
      <h2>See what's already been reported</h2>
      <p>Click on a marker to see the details of a report</p>
    </div>

    <ReportDetails
      :report="currentReport"
      v-if="this.currentReport"
      @report-clear="clearReport"
      @zoom-to="zoomTo(currentMarker.lat, currentMarker.lon)"
    />
    <div class="autocomplete-container" id="autocomplete-container">
      <div class="form-check form-check-inline search" v-if="!currentReport">
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
      <l-map
        id="map"
        :zoom="zoom"
        :center="centreCoords"
        @update:zoom="zoomUpdated"
        @update:center="centreUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <div v-for="report in reports" :key="report.index">
          <l-marker
            :lat-lng="[report.lat, report.lon]"
            @click="getDets(report)"
          >
          </l-marker>
        </div>
        <l-marker
          v-if="this.currentReport"
          :lat-lng="[currentMarker.lat, currentMarker.lon]"
        >
          <l-icon class-name="custom-marker bg-info highlight">
            <div class="headline">Selected</div>
          </l-icon>
        </l-marker>
        <l-marker
          v-if="this.currentReport"
          :lat-lng="[currentMarker.lat, currentMarker.lon]"
        >
          <l-icon
            iconUrl="/marker-icon.png"
            :icon-anchor="staticAnchor"
            class-name="highlight"
          >
          </l-icon>
        </l-marker>
      </l-map>
    </client-only>

    <a href="/"><h3 class="else">Report something yourself</h3></a>
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
      bounds: [],
      lat: "50.795893175589484",
      lon: "0.26435462099609897",
      addSearch: "",
      currentReport: null,
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
      staticAnchor: [12, 41],
      autoResults: [],
    };
  },

  mounted() {
    this.getLoc();
  },

  methods: {
    // Map methods
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centreUpdated(center) {
      this.centreCoords = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    // auto complete for searches
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
    // center map on search result
    recenterMap(result) {
      this.centreCoords = [result.properties.lat, result.properties.lon];
      this.zoom = 16;
      this.autoResults = [];
    },

    zoomTo(lat, lon) {
      this.centreCoords = [lat, lon];
      setTimeout(() => {
        this.zoom = 18;
      }, 250);
    },

    getLoc() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.centreCoords = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      });
    },

    getDets(i) {
      this.currentReport = i;
      this.currentMarker = i;
    },
    clearReport() {
      this.currentReport = null;
    },
  },
};
</script>

<style>
#map-wrap {
  width: 100vw;
  height: 50vh;
}
#map {
  margin-bottom: 1em;
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

p,
h2 {
  padding: 0.3rem;
  text-align: center;
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
.custom-marker {
  padding: 10px;
  border: 1px solid #333;
  border-radius: 0 20px 20px 20px;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  font-weight: bold;
}

.highlight {
  z-index: 999 !important;
}

.else {
  text-align: center;
  padding-bottom: 1em;
}

@media screen and (min-width: 800px) {
  .autocomplete-container {
    max-width: 25%;
  }
}
</style>
