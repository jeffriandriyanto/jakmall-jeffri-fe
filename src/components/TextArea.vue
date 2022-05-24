<template>
  <div class="ctr-floating-textarea" :class="valid || 'input-not-valid'">
    <textarea
      :value="value"
      :name="label"
      :placeholder="label"
      :maxlength="maxlength"
      :disabled="disabled"
      class="floating__textarea"
      @input="callbackInput"
    />
    <label class="floating__textarea" :data-content="label">
      <span class="hidden--visually"> {{ label }} </span></label
    >
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    maxlength: Number,
    rules: Array,
    isNumber: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      valid: false,
    };
  },
  mounted() {
    if (this.value === "") this.valid = true;
  },
  methods: {
    callbackInput(e) {
      const val = e.target.value;
      this.parentNode.dataset.replicatedValue = val;
      if (this.rules.length > 0) {
        const newRules = [];
        this.rules.forEach((rule) => {
          newRules.push(rule(val));
        });
        this.valid = newRules.every((n) => n === true);
      }
      this.$emit("input", val);
    },
    isNumberOnly(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        charCode !== 43 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 190
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
