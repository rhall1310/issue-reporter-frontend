<template>
  <div>
    <Header />
    <div class="menus" v-if="subCategories.length">
      <h2 class="text-center">
        {{ this.category.name }}
      </h2>
      <TileMenu :menuItems="subCategories" />
    </div>
    <div class="main-form" v-if="!subCategories.length">
      <h2>{{ this.category.name }}</h2>

      <Details :category="category.name" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let categories = await $axios.$get("/menus/categories");
      console.log(categories);
      return { categories };
      c;
    } catch (e) {
      console.log(categories);
      return { categories: [] };
    }
  },
  data() {
    return {
      categories: [],
    };
  },

  computed: {
    subCategories() {
      let subCat = this.categories.filter(
        (cat) => cat.parent === this.category.id
      );
      return subCat;
    },
    category() {
      let cat = this.categories.find((cats) => cats.url === this.$route.path);
      return cat;
    },
  },

  methods: {},
};
</script>

<style scoped>
h2 {
  text-align: center;
  padding-top: 0.2em;
}

.map-address {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  text-align: center;
}

.menus {
  padding-top: 1rem;
}

#manual-check {
  text-align: center;
}
</style>
