<template>
  <div id="app">
    <div id="ctr-form">
      <div class="stepper-outer">
        <Stepper :stepperList="stepperList" :stepperActive="stepperActive" />
        <div v-if="currRoute !== 'StepThree'" class="header-action">
          <div class="btn-back-action floating-btn-header" @click="backAction">
            <img :src="icArrowLeft" class="mr-1" />
            <span>{{ labelBack }}</span>
          </div>
        </div>
      </div>
      <div class="ctr-form-input">
        <div class="ctr-input container">
          <router-view />
        </div>
        <div class="ctr-summary container">
          <div class="summary-title">
            <div class="subtitle mb-1">Summary</div>
            <div>{{ itemTotal }} items purchased</div>

            <div v-if="g_form.selectedShipment.value">
              <div class="divider"></div>
              <div class="mb-1">
                Delivery estimation
                <div class="summary-shipment-detail"
                  >{{ estimation() }} by
                  {{ g_form.selectedShipment.label }}
                </div>
              </div>
            </div>
          </div>
          <div class="summary-detail">
            <div class="d-flex justify-space-between mb-1">
              Cost of goods
              <strong>{{ g_summary.cost | numberFormat }}</strong>
            </div>
            <div
              v-if="g_form.dropshipper"
              class="d-flex justify-space-between mb-1"
            >
              Dropshipping fee
              <strong>{{ g_summary.dropshipFee | numberFormat }}</strong>
            </div>
            <div
              v-if="g_form.selectedShipment.value"
              class="d-flex justify-space-between"
            >
              <div>
                <strong>{{ g_form.selectedShipment.label }}</strong> Shipment
              </div>
              <strong>{{
                g_form.selectedShipment.price | numberFormat
              }}</strong>
            </div>
            <div class="subtitle d-flex justify-space-between my-2">
              Total
              <strong>{{ g_summary.total | numberFormat }}</strong>
            </div>
          </div>
          <div v-if="currRoute !== 'StepThree'" class="summary-action">
            <button class="btn-primary" @click="submit()">{{
              labelButton
            }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "@/components/Stepper";
import { numberFormat } from "./utils/format";
import { mapGetters } from "vuex";

export default {
  filters: {
    numberFormat: (value) => {
      if (!value) return "0";
      return numberFormat(value);
    },
  },
  components: {
    Stepper,
  },
  data() {
    return {
      icArrowLeft: require("./assets/icon/ic-arrow-left.svg"),
      stepperList: ["Delivery", "Payment", "Finish"],
      stepperActive: 1,
      itemTotal: 10,
      currRoute: "StepOne",
    };
  },
  computed: {
    ...mapGetters(["g_form", "g_summary"]),
    labelBack() {
      if (this.currRoute === "StepOne") return "Back to cart";
      return "Back to delivery";
    },
    labelButton() {
      if (this.currRoute === "StepTwo") {
        if (this.g_form.selectedPayment.value)
          return `Pay with ${this.g_form.selectedPayment.label}`;
        return "Pay";
      }
      return "Continue to Payment";
    },
  },
  watch: {
    "$route.name"(newVal) {
      this.currRoute = newVal;
      this.setStep();
    },
  },
  mounted() {
    // set Initial state
    const initialData = localStorage.getItem("data");
    const initialDataOrderId = localStorage.getItem("orderId");
    if (initialData !== null) {
      this.$store.commit("SET_FORM_DATA", JSON.parse(initialData));
    }
    if (initialDataOrderId !== null) {
      this.$store.commit("SET_ORDERID", initialDataOrderId);
    }

    this.currRoute = this.$route.name;
    this.setStep();
    this.$store.commit("SET_TOTAL");
  },
  methods: {
    estimation() {
      switch (this.g_form.selectedShipment.estimate) {
        case 0:
          return "Today";
        case 1:
          return "1 day";
        default:
          return `${this.g_form.selectedShipment.estimate} days`;
      }
    },
    setStep() {
      switch (this.currRoute) {
        case "StepOne":
          this.stepperActive = 1;
          break;
        case "StepTwo":
          this.stepperActive = 2;
          break;
        default:
          this.stepperActive = 3;
          break;
      }
    },
    backAction() {
      if (this.currRoute === "StepTwo") this.$router.push("/step-one");
      if (this.currRoute === "StepThree") this.$router.push("/step-two");
    },
    submit() {
      const r = this.currRoute;
      const f = this.g_form;

      if (r === "StepOne") {
        let condition = false;
        const condition1 = f.delivery_address && f.email && f.phone_number;
        if (f.dropshipper) {
          condition =
            condition1 && f.dropshipper_name && f.dropshipper_phone_number;
        } else condition = condition1;

        if (condition) {
          this.$router.push("/step-two");
        }
        this.$store.commit("SET_FORM_DATA", this.g_form);
      }

      if (r === "StepTwo") {
        const condition = f.selectedShipment.value && f.selectedPayment.value;
        if (condition) this.$router.push("/step-three");
      }
    },
  },
};
</script>
