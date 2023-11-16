<template>
  <div class="whole">
    <div class="wrapper">
      <Header />

      <ReportedMap :reports="this.$store.state.allReports" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    this.getReports();
  },

  methods: {
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
    async getReports() {
      try {
        let reports = await this.$axios.$get(`/reports/all/`);
        this.$store.commit("setReports", reports);

        for (let report of reports) {
          delete report.first_name;
          delete report.last_name;
          delete report.title;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
body,
html {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
