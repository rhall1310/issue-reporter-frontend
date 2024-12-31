<template>
  <button type="button" class="btn btn-primary btn-lg" @click="setMenu(menuId)">
    <p>{{ text }}</p>

    <img id="defIcon" :src="imgSrc" />
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    imgSrc: String,
    menuId: Number,
  },
  methods: {
    setMenu(newMenuId) {
      this.$store.commit("setMenuId", newMenuId);
    },
  },
};
</script>

<style>
button {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#defIcon {
  max-height: 5em;
}

@media screen and (max-width: 320px) {
  #defIcon {
    max-height: 1.2em;
  }
}

@media screen and (min-width: 600px) {
  #defIcon {
    max-height: 4.5em;
  }
}
</style>
