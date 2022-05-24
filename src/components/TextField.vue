<template>
  <div class="ctr-floating-input" :class="valid || 'input-not-valid'">
    <input
      :value="value"
      :name="label"
      :type="type"
      :placeholder="label"
      :maxlength="maxlength"
      :disabled="disabled"
      class="floating__input"
      autofocus
      :required="rules.length > 0"
      @input="callbackInput"
      @keypress="isNumber ? isNumberOnlyHandler($event) : ''"
    />
    <label class="floating__label" :data-content="label">
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
    type: {
      type: String,
      default: () => "text",
    },
    maxlength: Number,
    rules: Array,
    isNumber: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      valid: true,
    };
  },
  methods: {
    callbackInput(e) {
      const val = e.target.value;
      if (this.rules.length > 0) {
        const newRules = [];
        this.rules.forEach((rule) => {
          newRules.push(rule(val));
        });
        this.valid = newRules.every((n) => n === true);
      }
      this.isNumberOnlyHandler(e);
      this.$emit("input", val);
    },
    isNumberOnlyHandler(evt) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
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
