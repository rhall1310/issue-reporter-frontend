export const state = () => ({
  report: {
    address: {
      lat: 0.0,
      lon: 0.0,
    },
    details: {},
    menuId: "",
  },
});

export const mutations = {
  setAddress(state, newAdd) {
    state.report.address = newAdd;
  },

  setDetails(state, newDet) {
    state.report.details = newDet;
  },
  setMenuId(state, newId) {
    state.report.menuId = newId;
  },
};
