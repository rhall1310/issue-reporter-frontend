<template>
  <div>
    <Header />
    <h2>Select something to report</h2>
    <TileMenu :menuItems="categories" />
    <a href="/reported"><h3>Or see what's already been reported</h3></a>
  </div>
</template>

<script>
export default {
  name: "IndexPage",

  async asyncData({ $axios, params }) {
    try {
      let categories = await $axios.$get(
        `/menus/categories/?parent__isnull=true`
      );
      return { categories };
    } catch (e) {
      return { categories: [] };
    }
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async deletecategory(category_id) {
      try {
        await this.$axios.$delete(`/menus/${category_id}/`); // delete category
        let newcategories = await this.$axios.$get("/menus/categories"); // get new list of categories
        this.categories = newcategories; // update list of categories
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  padding-top: 0.2em;
}
h3 {
  text-align: center;
  padding-top: 0.2em;
}
</style>
