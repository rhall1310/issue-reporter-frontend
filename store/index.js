export const state = () => ({
  report: {
    address: {},
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
