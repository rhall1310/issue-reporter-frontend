<template>
  <div class="card">
    <!-- <p>{{ report }}</p> -->

    <h5 class="card-title">Report type: {{ report.category }}</h5>
    <p class="card-text">Location: {{ report.address }}</p>
    <p class="card-text">Details: {{ report.details }}</p>
    <img
      class="card-img-top photo"
      :src="report.photo"
      alt="Card image cap"
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
.photo {
  max-width: 200px;
  align-self: center;
}

.card {
  padding: 1rem;

  margin: auto;
  max-width: 90%;
  background-color: #007bff;
  color: black;
}

@media screen and (min-width: 800px) {
  .card {
    max-width: 40%;
  }
}
</style>
