<template>
  <div class="step-three d-flex align-center justify-center">
    <div>
      <div class="title mb-2">
        Thank you
        <div class="title-border"></div>
      </div>

      <div>
        <div class="mb-1">
          <strong>Order ID : {{ g_orderId }}</strong>
        </div>
        <div
          >Your order will be delivered today with
          {{ g_form.selectedShipment.label }}</div
        >
      </div>

      <div class="btn-back-action" @click="backToHome">
        <img :src="icArrowLeft" class="mr-1" />
        <span>Go to homepage</span>
      </div>
    </div>
  </div>
</template>

<script>
const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
import { mapGetters } from "vuex";

export default {
  name: "StepThree",
  data() {
    return {
      icArrowLeft: require("@/assets/icon/ic-arrow-left.svg"),
      orderId: "",
      orderMethod: "GO SEND",
    };
  },
  computed: {
    ...mapGetters(["g_form", "g_orderId"]),
  },
  mounted() {
    setTimeout(() => {
      if (!this.g_orderId) {
        const id = this.generateOrderId();
        this.$store.commit("SET_ORDERID", id);
      }
    }, 1000);
  },
  methods: {
    backToHome() {
      this.$router.push("/step-one");
    },
    generateOrderId() {
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    },
  },
};
</script>
