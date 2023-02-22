<template>
  <div>
    <div class="tiles">
      <div class="tile" v-for="(item, index) in menuItems" :key="index">
        <NuxtLink :to="menuItems[index].url">
          <TileButton
            :text="menuItems[index].name"
            :imgSrc="menuItems[index].picture"
            :menuId="menuItems[index].id"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import TileButton from "./TileButton.vue";
export default {
  components: { TileButton },

  props: {
    menuItems: Array,
    link: String,
  },

  data() {
    return {
      text: this.subOpt,
    };
  },
};
</script>

<style>
.tiles {
  padding: 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}

.tile {
  height: 40vw;
  width: 40vw;
}

@media screen and (min-width: 800px) {
  .tile {
    height: 20vw;
    width: 20vw;
  }
}
</style>
