<template>
  <div class="step-one">
    <!-- <div class="d-flex align-end justify-space-between">
    </div> -->

    <div class="flex-grid mt-1">
      <div class="col d-flex gap1 flex-column">
        <div class="title-container">
          <div class="title">
            Delivery details
            <div class="title-border"></div>
          </div>
        </div>
        <j-text-field
          v-model="g_form.email"
          :rules="[rules.required, rules.email]"
          label="Email"
        ></j-text-field>
        <j-text-field
          v-model="g_form.phone_number"
          :rules="[rules.required, rules.phone_number]"
          :maxlength="15"
          :isNumber="true"
          label="Phone number"
        ></j-text-field>
        <j-text-field
          v-model="g_form.delivery_address"
          :rules="[rules.required]"
          label="Delivery address"
        ></j-text-field>
      </div>
      <div class="col d-flex gap1 flex-column">
        <div class="title-container last">
          <label>
            <input
              v-model="g_form.dropshipper"
              type="checkbox"
              id="checkbox-1"
              @change="setDropshipper"
            />
            <span class="checkbox">Send as dropshipper</span>
          </label>
        </div>
        <j-text-field
          v-model="g_form.dropshipper_name"
          :rules="[rules.required]"
          :disabled="!g_form.dropshipper"
          label="Dropshipper name"
        ></j-text-field>
        <j-text-field
          v-model="g_form.dropshipper_phone_number"
          :rules="[rules.required, rules.phone_number]"
          :disabled="!g_form.dropshipper"
          :maxlength="15"
          :isNumber="true"
          label="Dropshipper phone number"
        ></j-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StepOne",
  data() {
    return {
      currentWidth: window.innerWidth,
      rules: {
        required: (val) => !!val || false,
        email: (val) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(val) || false;
        },
        phone_number: (val) => {
          const pattern = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
          if (val.length <= 9) {
            return false;
          } else {
            return pattern.test(val) || false;
          }
        },
      },
    };
  },
  watch: {
    currentWidth(n, o) {
      console.log(n, o);
    },
  },
  computed: {
    ...mapGetters(["g_form"]),
  },
  methods: {
    setDropshipper() {
      if (!this.g_form.dropshipper) {
        const data = {
          dropshipper: false,
          dropshipper_name: "",
          dropshipper_phone_number: "",
        };
        this.$store.commit("SET_FORM_DATA", data);
      } else {
        this.$store.commit("SET_FORM_DATA", {
          dropshipper: true,
        });
      }
      this.$store.commit("SET_TOTAL");
    },
  },
};
</script>

<style lang="scss">
  .title-container {
    height: 70px;
    &.last {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>