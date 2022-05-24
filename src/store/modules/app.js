const app = {
  state: {
    orderId: null,
    form: {
      email: "",
      phone_number: "",
      delivery_address: "",
      dropshipper: false,
      dropshipper_name: "",
      dropshipper_phone_number: "",
      selectedShipment: {},
      selectedPayment: {}
    },
    summary: {
      total: 0,
      dropshipFee: 5900,
      cost: 500000
    }
  },
  mutations: {
    SET_FORM_DATA: (state, data) => {
      state.form = { ...state.form, ...data };
      localStorage.setItem("data", JSON.stringify(state.form));
    },
    SET_ORDERID: (state, data) => {
      state.orderId = data;
      localStorage.setItem("orderId", state.orderId);
    },
    SET_TOTAL: (state) => {
      const summary = state.summary;
      const form = state.form;
      summary.total = summary.cost + 
        (form.dropshipper ? summary.dropshipFee : 0) +
        (form.selectedShipment?.price ? form.selectedShipment.price : 0);
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      // setTimeout(() => {
      commit("SET_LANGUAGE", language);
      location.reload();
      // }, 1000);
    },
  }
};

export default app;
