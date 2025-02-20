<template>
  <div class="card btn-primary" v-if="report">
    <div class="card-buttons">
      <button class="zoom" @click="$emit('zoom-to')">
        <img src="/locate-icon.png" alt="" />
      </button>
      <button class="close" @click="$emit('report-clear')">X</button>
    </div>
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
  color: white;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
  background-color: #007bff;
}
.card-buttons {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.2rem;
}

.close {
  width: 1em;
  font-weight: bold;
  font-size: 28px;
  height: 100%;
}

.zoom {
  width: 2em;
  font-weight: bold;
  align-self: start;
  padding: 0;
  background-color: transparent;
  border: 0;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

@media screen and (min-width: 800px) {
  .card {
    max-width: 60%;
  }
}
</style>
