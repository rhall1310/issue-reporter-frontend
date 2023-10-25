<template>
  <div>
    <Header />
    <h2>See what's already been reported</h2>
    <!-- <ReportedMap :reports="{ reports }" /> -->
    <p>Click on a marker to see the report details</p>
    <ReportedMap :reports="reports" />

    <a href="/"><p>Report something yourself</p></a>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let reports = await $axios.$get(`/reports/all/`);

      for (let report of reports) {
        delete report.first_name;
        delete report.last_name;
        delete report.title;
      }

      console.log(reports);

      return { reports };
    } catch (e) {
      return { reports: [] };
    }
  },
  data() {
    return {
      reports: [],
    };
  },
};
</script>

<style></style>
