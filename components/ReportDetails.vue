<template>
  <div class="card bg-info" v-if="report">
    <button class="close" @click="$emit('report-clear')">X</button>
    <h5 class="card-title">Report type: {{ report.category }}</h5>
    <p class="card-text">Location: {{ report.address }}</p>
    <p class="card-text">Details: {{ report.details }}</p>
    <img
      :src="report.photo"
      class="photo"
      alt="Report image "
      v-if="report.photo != null"
    />
  </div>
</template>

<script>
export default {
  props: {
    report: Object,
  },
};
</script>

<style>
body,
html {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
.photo {
  max-width: 90%;
  align-self: center;
}
.card {
  padding: 1rem;
  margin: auto;
  max-width: 90%;
  color: black;
}

.close {
  width: 1em;
  font-weight: bold;
  align-self: end;
}

@media screen and (min-width: 800px) {
  .card {
    max-width: 40%;
  }
}
</style>
