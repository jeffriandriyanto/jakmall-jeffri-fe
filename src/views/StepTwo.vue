<template>
  <div class="step-two">
    <div class="ctr-shipping">
      <div class="title">
        Shipment
        <div class="title-border"></div>
      </div>
      <div class="d-flex flex-wrap gap1">
        <span
          v-for="(sh, i) in shipmentData"
          :key="i"
          @click="setData(sh, 'shipping')"
        >
          <SelectedBox
            :value="sh.value"
            :label="sh.label"
            :price="sh.price"
            :isActive="g_form.selectedShipment"
          />
        </span>
      </div>
    </div>
    <div class="ctr-payment">
      <div class="title">
        Payment
        <div class="title-border"></div>
      </div>
      <div class="d-flex flex-wrap gap1">
        <span
          v-for="(py, i) in paymentData"
          :key="i"
          @click="setData(py, 'payment')"
        >
          <SelectedBox
            :value="py.value"
            :label="py.label"
            :price="py.price"
            :isActive="g_form.selectedPayment"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { shipments, payments } from "@/mock/app";
import SelectedBox from "@/components/SelectedBox.vue";

export default {
  name: "StepTwo",
  
  components: {
    SelectedBox,
  },
  data() {
    return {
      shipmentData: shipments,
      paymentData: payments,
    };
  },
  computed: {
    ...mapGetters(["g_form"]),
  },
  methods: {
    setData(data, param) {
      if (param === "shipping") {
        this.$store.commit("SET_FORM_DATA", {
          selectedShipment: data
        });
        this.$store.commit("SET_TOTAL");
      }
      if (param === "payment") {
        this.$store.commit("SET_FORM_DATA", {
          selectedPayment: data
        });
      }
      
    },
  },
};
</script>
