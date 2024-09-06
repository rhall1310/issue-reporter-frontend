<template>
  <div>
    <Header />
    <div class="container" v-if="this.$store.state.report.details.category">
      <h1>Success</h1>
      <p>
        Thanks for your report
        {{ this.$store.state.report.details.firstName }}. Here's what you've
        told us -
      </p>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            {{ this.$store.state.report.details.category }} -
            {{ this.$store.state.report.details.subCategory }}
          </h5>
          <p>At this location -</p>
          <p>{{ this.$store.state.report.address.formatted }}</p>
        </div>
      </div>
      <div class="static-map" v-if="hasMap"><StaticMap /></div>
      <p style="padding-bottom: 0.2em">
        Thanks for helping to improve our streets
      </p>
      <a href="/">
        <button type="button" class="btn btn-primary btn-lg" id="another">
          Report something else
        </button>
      </a>
    </div>
    <Fail v-else />
  </div>
</template>

<script>
export default {
  computed: {
    hasMap() {
      return this.$store.state.report.address.lat > 0;
    },
  },
};
</script>

<style>
.card {
  margin: 1.2em;
}

.static-map {
  display: flex;
  justify-content: center;
}

#error {
  margin-top: 1em;
  text-align: center;
}

#retry {
  margin-top: 3em;
  margin-bottom: 1em;
}

#another {
  margin-bottom: 0.5em;
}
</style>
